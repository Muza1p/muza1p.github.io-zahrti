import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RIASEC_ORDER, RIASEC_PROFILES } from '@/src/data/interests/riasecProfiles';
import { RiasecAreaScore, RiasecCode } from '@/src/types';
import { Zahrti3DMode } from './Botanical2DFallback';

interface Zahrti3DCanvasProps {
  mode: Zahrti3DMode;
  scores?: Record<RiasecCode, RiasecAreaScore>;
  className?: string;
}

function detectSoftwareGl(): boolean {
  if (typeof document === 'undefined') return false;
  try {
    const probeCanvas = document.createElement('canvas');
    const gl =
      (probeCanvas.getContext('webgl2') as WebGL2RenderingContext | null) ||
      (probeCanvas.getContext('webgl') as WebGLRenderingContext | null);
    if (!gl) return false;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    if (ext) {
      const renderer = String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || '');
      if (/SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(renderer)) {
        return true;
      }
    }
  } catch {
    return false;
  }
  return false;
}

function createSculptedPetalGeometry(length = 1.35, width = 0.62): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(width * 0.65, length * 0.22, width * 0.85, length * 0.68, 0, length);
  shape.bezierCurveTo(-width * 0.85, length * 0.68, -width * 0.65, length * 0.22, 0, 0);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.045,
    bevelEnabled: true,
    bevelThickness: 0.032,
    bevelSize: 0.035,
    bevelSegments: 4,
    curveSegments: 18,
  });

  // Gently cup and arch the petal in 3D space so it catches highlights from every angle
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const t = Math.max(0, Math.min(1, y / length));
    const cup = (x * x) * 0.26;
    const arch = Math.sin(t * Math.PI * 0.85) * 0.22 - t * t * 0.14;
    pos.setZ(i, z + cup + arch);
  }
  geo.computeVertexNormals();
  return geo;
}

export default function Zahrti3DCanvas({
  mode,
  scores,
  className = 'w-full h-full',
}: Zahrti3DCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  // Refs prevent React prop changes from tearing down WebGLRenderer
  const modeRef = useRef<Zahrti3DMode>(mode);
  const scoresRef = useRef<Record<RiasecCode, RiasecAreaScore> | undefined>(scores);
  const pointerTargetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const pulseImpulseRef = useRef<number>(0);

  modeRef.current = mode;
  scoresRef.current = scores;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareGl();
    const width = Math.max(260, container.clientWidth || 420);
    const height = Math.max(240, container.clientHeight || 360);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    const gl2 = renderer.getContext() as WebGL2RenderingContext;
    const canFenceSync = typeof gl2?.fenceSync === 'function';

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog('#FFF8F3', 8.5, 17.5);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 40);
    camera.position.set(0, 1.35, 6.25);
    camera.lookAt(0, 0.15, 0);

    // Studio PBR environment reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envRT = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = envRT.texture;
    scene.environmentIntensity = 0.72;

    // 3-Point Studio Lighting + Warm Soft Gold center accent
    const hemiLight = new THREE.HemisphereLight('#F3EAFC', '#F7DCE7', 0.92);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight('#FFF6ED', 2.05);
    keyLight.position.set(3.8, 5.5, 4.4);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      keyLight.shadow.camera.near = 1;
      keyLight.shadow.camera.far = 14;
      keyLight.shadow.bias = -0.0005;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight('#B49AE8', 1.25);
    rimLight.position.set(-4.2, 2.8, -3.5);
    scene.add(rimLight);

    const goldCoreLight = new THREE.PointLight('#D5B36A', 0.85, 7);
    goldCoreLight.position.set(0, 0.4, 0.8);
    scene.add(goldCoreLight);

    // Disposables tracking
    const disposables: Array<{ dispose: () => void }> = [envRT, roomEnv, pmremGenerator];

    // Subtle grounded contact disc
    const shadowDiscGeo = new THREE.CircleGeometry(2.3, 48);
    const shadowDiscMat = new THREE.MeshBasicMaterial({
      color: '#351B38',
      transparent: true,
      opacity: 0.075,
      depthWrite: false,
    });
    const shadowDisc = new THREE.Mesh(shadowDiscGeo, shadowDiscMat);
    shadowDisc.rotation.x = -Math.PI / 2;
    shadowDisc.position.y = -1.78;
    scene.add(shadowDisc);
    disposables.push(shadowDiscGeo, shadowDiscMat);

    // Root interactive centerpiece group
    const rootGroup = new THREE.Group();
    rootGroup.position.set(0, 0.15, 0);
    scene.add(rootGroup);

    // 1. Central Soft Gold Stamen Dome + Pistil Ring
    const coreGroup = new THREE.Group();
    rootGroup.add(coreGroup);

    const domeGeo = new THREE.SphereGeometry(0.42, 32, 24);
    const goldMat = new THREE.MeshStandardMaterial({
      color: '#D5B36A',
      metalness: 0.85,
      roughness: 0.22,
    });
    const coreDome = new THREE.Mesh(domeGeo, goldMat);
    coreDome.scale.set(1, 0.68, 1);
    coreGroup.add(coreDome);
    disposables.push(domeGeo, goldMat);

    const collarGeo = new THREE.TorusGeometry(0.48, 0.042, 16, 48);
    const ivoryPearlMat = new THREE.MeshPhysicalMaterial({
      color: '#FFF8F3',
      roughness: 0.2,
      metalness: 0.05,
      clearcoat: 0.75,
      clearcoatRoughness: 0.18,
    });
    const coreCollar = new THREE.Mesh(collarGeo, ivoryPearlMat);
    coreCollar.rotation.x = Math.PI / 2;
    coreCollar.position.y = -0.04;
    coreGroup.add(coreCollar);
    disposables.push(collarGeo, ivoryPearlMat);

    // Tiny golden pistil beads around center
    const beadGeo = new THREE.SphereGeometry(0.055, 16, 12);
    disposables.push(beadGeo);
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const bead = new THREE.Mesh(beadGeo, goldMat);
      bead.position.set(Math.cos(a) * 0.36, 0.18, Math.sin(a) * 0.36);
      coreGroup.add(bead);
    }

    // 2. Outer Translucent Crystal Glass Sphere cradling the inner flower
    const outerGlassGeo = new THREE.SphereGeometry(1.78, 40, 32);
    const outerGlassMat = new THREE.MeshPhysicalMaterial({
      color: '#FFF8F3',
      roughness: 0.07,
      metalness: 0.0,
      ior: 1.48,
      thickness: isSoftwareGl ? 0 : 0.7,
      transmission: isSoftwareGl ? 0 : 0.9,
      transparent: true,
      opacity: isSoftwareGl ? 0.24 : 1,
      depthWrite: false,
      clearcoat: 0.85,
      clearcoatRoughness: 0.08,
    });
    const outerGlassSphere = new THREE.Mesh(outerGlassGeo, outerGlassMat);
    outerGlassSphere.renderOrder = 3;
    rootGroup.add(outerGlassSphere);
    disposables.push(outerGlassGeo, outerGlassMat);

    // 3. Two Tilted Soft Gold & Lilac Orbital Rings
    const ring1Geo = new THREE.TorusGeometry(2.15, 0.022, 16, 96);
    const ring1 = new THREE.Mesh(ring1Geo, goldMat);
    ring1.rotation.set(Math.PI * 0.38, Math.PI * 0.12, 0);
    rootGroup.add(ring1);
    disposables.push(ring1Geo);

    const ring2Geo = new THREE.TorusGeometry(1.98, 0.018, 16, 96);
    const lilacMetalMat = new THREE.MeshStandardMaterial({
      color: '#B49AE8',
      metalness: 0.65,
      roughness: 0.26,
    });
    const ring2 = new THREE.Mesh(ring2Geo, lilacMetalMat);
    ring2.rotation.set(-Math.PI * 0.34, -Math.PI * 0.18, 0);
    rootGroup.add(ring2);
    disposables.push(ring2Geo, lilacMetalMat);

    // 4. Sculpted 6 Outer Petals + 6 Inner Petals + 6 Orbiting RIASEC Glass Spheres
    const outerPetalGeo = createSculptedPetalGeometry(1.32, 0.56);
    const innerPetalGeo = createSculptedPetalGeometry(0.86, 0.4);
    const miniOrbGeo = new THREE.SphereGeometry(0.21, 28, 22);
    disposables.push(outerPetalGeo, innerPetalGeo, miniOrbGeo);

    interface PetalRig {
      code: RiasecCode;
      arm: THREE.Group;
      outerMesh: THREE.Mesh;
      innerMesh: THREE.Mesh;
      orbMesh: THREE.Mesh;
      baseAngle: number;
      currentScale: number;
    }

    const petalRigs: PetalRig[] = [];
    const blossomGroup = new THREE.Group();
    blossomGroup.rotation.x = Math.PI * 0.28; // Tilt flower slightly toward camera for lush sculptural silhouette
    rootGroup.add(blossomGroup);

    const defaultColors = [
      '#C04472', // Berry Pink
      '#7651B8', // Royal Violet
      '#F2A6C1', // Rose
      '#B49AE8', // Lilac
      '#C04472', // Berry Pink
      '#7651B8', // Royal Violet
    ];

    RIASEC_ORDER.forEach((code, idx) => {
      const baseAngle = (idx / 6) * Math.PI * 2;
      const arm = new THREE.Group();
      arm.rotation.z = baseAngle;
      blossomGroup.add(arm);

      const riasecColor = RIASEC_PROFILES[code].colorHex;
      const initialColor = mode === 'results' ? riasecColor : defaultColors[idx];

      const outerMat = new THREE.MeshPhysicalMaterial({
        color: initialColor,
        roughness: 0.32,
        metalness: 0.04,
        clearcoat: 0.45,
        clearcoatRoughness: 0.22,
      });
      const outerMesh = new THREE.Mesh(outerPetalGeo, outerMat);
      outerMesh.position.set(0, 0.34, 0.02);
      outerMesh.rotation.x = -0.34;
      if (!isSoftwareGl) outerMesh.castShadow = true;
      arm.add(outerMesh);
      disposables.push(outerMat);

      const innerMat = new THREE.MeshPhysicalMaterial({
        color: idx % 2 === 0 ? '#F2A6C1' : '#B49AE8',
        roughness: 0.36,
        metalness: 0.02,
        clearcoat: 0.35,
        clearcoatRoughness: 0.25,
      });
      const innerMesh = new THREE.Mesh(innerPetalGeo, innerMat);
      innerMesh.position.set(0, 0.26, 0.16);
      innerMesh.rotation.x = -0.58;
      innerMesh.rotation.z = 0.26;
      arm.add(innerMesh);
      disposables.push(innerMat);

      const orbMat = new THREE.MeshPhysicalMaterial({
        color: riasecColor,
        roughness: 0.1,
        metalness: 0.05,
        ior: 1.45,
        transmission: isSoftwareGl ? 0 : 0.72,
        transparent: true,
        opacity: isSoftwareGl ? 0.78 : 1,
        clearcoat: 0.9,
        clearcoatRoughness: 0.1,
      });
      const orbMesh = new THREE.Mesh(miniOrbGeo, orbMat);
      orbMesh.position.set(0, 1.92, 0.22);
      orbMesh.renderOrder = 2;
      arm.add(orbMesh);
      disposables.push(orbMat);

      petalRigs.push({
        code,
        arm,
        outerMesh,
        innerMesh,
        orbMesh,
        baseAngle,
        currentScale: 1,
      });
    });

    // 5. InstancedMesh Floating Petals & Golden Pollen Motes (Zero per-frame allocations)
    const particleCount = 26;
    const moteGeo = new THREE.OctahedronGeometry(0.07, 1);
    const moteMat = new THREE.MeshStandardMaterial({
      color: '#FFF8F3',
      roughness: 0.28,
      metalness: 0.4,
    });
    const instancedMotes = new THREE.InstancedMesh(moteGeo, moteMat, particleCount);
    instancedMotes.frustumCulled = false;

    const paletteColors = [
      new THREE.Color('#C04472'),
      new THREE.Color('#7651B8'),
      new THREE.Color('#F2A6C1'),
      new THREE.Color('#B49AE8'),
      new THREE.Color('#D5B36A'),
    ];
    const moteSeeds = Array.from({ length: particleCount }, (_, i) => {
      instancedMotes.setColorAt(i, paletteColors[i % paletteColors.length]);
      return {
        radius: 2.25 + (i % 5) * 0.28,
        speed: 0.22 + (i % 7) * 0.045,
        phase: (i / particleCount) * Math.PI * 2,
        yBase: ((i % 9) - 4) * 0.34,
        scale: 0.55 + (i % 4) * 0.24,
      };
    });
    if (instancedMotes.instanceColor) instancedMotes.instanceColor.needsUpdate = true;
    scene.add(instancedMotes);
    disposables.push(moteGeo, moteMat);

    // Pre-allocated math objects for render loop
    const _dummy = new THREE.Object3D();
    const _targetColor = new THREE.Color();

    // Pointer parallax & tap/click pulse handlers
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      pointerTargetRef.current.x = Math.max(-1, Math.min(1, nx));
      pointerTargetRef.current.y = Math.max(-1, Math.min(1, ny));
    };

    const handlePointerLeave = () => {
      pointerTargetRef.current.x = 0;
      pointerTargetRef.current.y = 0;
    };

    const handlePointerDown = () => {
      pulseImpulseRef.current = 1.0;
    };

    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    container.addEventListener('pointerdown', handlePointerDown, { passive: true });

    // Responsive ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const w = Math.max(200, container.clientWidth);
      const h = Math.max(200, container.clientHeight);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

    // Animation loop with SwiftShader afterDraw pacing
    let rafId = 0;
    let timeoutId = 0;
    let isDisposed = false;
    let prevTime = performance.now();
    let elapsed = 0;

    const afterDraw = (callback: FrameRequestCallback) => {
      if (isSoftwareGl && canFenceSync) {
        const sync = gl2.fenceSync(gl2.SYNC_GPU_COMMANDS_COMPLETE, 0);
        if (!sync) {
          timeoutId = window.setTimeout(() => {
            if (!isDisposed) rafId = requestAnimationFrame(callback);
          }, 80);
          return;
        }
        const pollSync = () => {
          if (isDisposed) {
            gl2.deleteSync(sync);
            return;
          }
          const status = gl2.clientWaitSync(sync, 0, 0);
          if (status === gl2.TIMEOUT_EXPIRED) {
            timeoutId = window.setTimeout(pollSync, 4);
          } else {
            gl2.deleteSync(sync);
            timeoutId = window.setTimeout(() => {
              if (!isDisposed) rafId = requestAnimationFrame(callback);
            }, 80);
          }
        };
        timeoutId = window.setTimeout(pollSync, 4);
      } else {
        rafId = requestAnimationFrame(callback);
      }
    };

    const tick = (now: number) => {
      if (isDisposed) return;
      const dt = Math.min(0.08, Math.max(0.001, (now - prevTime) / 1000));
      prevTime = now;
      elapsed += dt;

      const currentMode = modeRef.current;
      const currentScores = scoresRef.current;

      // Decay tap pulse smoothly
      pulseImpulseRef.current = THREE.MathUtils.damp(pulseImpulseRef.current, 0, 4.5, dt);
      const tapBoost = 1 + pulseImpulseRef.current * 0.12;

      // Mode-specific rhythmic motion
      const spinSpeed =
        currentMode === 'analyzing' ? 0.58 : currentMode === 'intro' ? 0.24 : 0.18;

      const targetRotY =
        pointerTargetRef.current.x * 0.34 + elapsed * spinSpeed * (currentMode === 'analyzing' ? 1 : 0.45);
      const targetRotX = pointerTargetRef.current.y * 0.2;

      rootGroup.rotation.y = THREE.MathUtils.damp(rootGroup.rotation.y, targetRotY, 4.2, dt);
      rootGroup.rotation.x = THREE.MathUtils.damp(rootGroup.rotation.x, targetRotX, 4.2, dt);
      rootGroup.position.y = 0.15 + Math.sin(elapsed * 1.45) * 0.08;
      rootGroup.scale.setScalar(tapBoost);

      // Gentle orbital ring precession
      ring1.rotation.z = elapsed * (currentMode === 'analyzing' ? 0.48 : 0.16);
      ring2.rotation.z = -elapsed * (currentMode === 'analyzing' ? 0.38 : 0.13);

      // Blossom breath & dynamic RIASEC score sculpting
      blossomGroup.rotation.z = elapsed * (currentMode === 'analyzing' ? 0.35 : 0.08);
      for (let i = 0; i < petalRigs.length; i++) {
        const rig = petalRigs[i];
        let targetScale = 1;
        if (currentMode === 'results' && currentScores?.[rig.code]) {
          const area = currentScores[rig.code];
          const ratio = area.score / Math.max(1, area.maxScore);
          targetScale = 0.62 + ratio * 0.62;
          _targetColor.set(RIASEC_PROFILES[rig.code].colorHex);
          (rig.outerMesh.material as THREE.MeshPhysicalMaterial).color.lerp(_targetColor, 0.12);
        } else if (currentMode === 'analyzing') {
          targetScale = 0.92 + Math.sin(elapsed * 2.8 + i * 1.04) * 0.14;
        } else {
          targetScale = 0.98 + Math.sin(elapsed * 1.6 + i * 0.9) * 0.05;
        }

        rig.currentScale = THREE.MathUtils.damp(rig.currentScale, targetScale, 5.5, dt);
        rig.outerMesh.scale.set(
          0.9 + (rig.currentScale - 0.8) * 0.25,
          rig.currentScale,
          1
        );
        rig.orbMesh.position.y = 1.65 + rig.currentScale * 0.38;
        rig.orbMesh.scale.setScalar(0.82 + rig.currentScale * 0.26);
      }

      // Floating motes orbit
      for (let i = 0; i < particleCount; i++) {
        const seed = moteSeeds[i];
        const angle = seed.phase + elapsed * seed.speed;
        _dummy.position.set(
          Math.cos(angle) * seed.radius,
          seed.yBase + Math.sin(elapsed * 1.3 + seed.phase) * 0.24,
          Math.sin(angle) * seed.radius
        );
        _dummy.rotation.set(elapsed * 0.6 + seed.phase, elapsed * 0.8, seed.phase);
        const s = seed.scale * (0.85 + 0.15 * Math.sin(elapsed * 2 + seed.phase));
        _dummy.scale.set(s, s * 1.45, s * 0.45);
        _dummy.updateMatrix();
        instancedMotes.setMatrixAt(i, _dummy.matrix);
      }
      instancedMotes.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);
      afterDraw(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      container.removeEventListener('pointerdown', handlePointerDown);

      for (const d of disposables) {
        d.dispose();
      }
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      role="img"
      aria-label={
        mode === 'results'
          ? 'مجسم زهرة ثلاثي الأبعاد يعرض توازن أنماط اهتماماتك الستة'
          : 'مشهد ثلاثي الأبعاد لزهرة زهرتي وكرات زجاجية وبتلات عائمة'
      }
      style={{ touchAction: 'pan-y' }}
      className={`relative select-none cursor-grab active:cursor-grabbing ${className}`}
    />
  );
}
