import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RIASEC_ORDER } from '@/src/data/interests/riasecProfiles';
import { RiasecAreaScore, RiasecCode } from '@/src/types';
import { Zahrti3DMode } from './Botanical2DFallback';

interface Zahrti3DCanvasProps {
  mode: Zahrti3DMode;
  scores?: Record<RiasecCode, RiasecAreaScore>;
  harmonyIndex?: number;
  bloomProgress?: number; // 0..1 progressive opening
  darkSurface?: boolean;
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

function createSculptedPetalGeometry(length = 1.38, width = 0.6): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(width * 0.68, length * 0.24, width * 0.88, length * 0.72, 0, length);
  shape.bezierCurveTo(-width * 0.88, length * 0.72, -width * 0.68, length * 0.24, 0, 0);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.04,
    bevelEnabled: true,
    bevelThickness: 0.028,
    bevelSize: 0.032,
    bevelSegments: 4,
    curveSegments: 20,
  });

  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const t = Math.max(0, Math.min(1, y / length));
    const cup = x * x * 0.28;
    const arch = Math.sin(t * Math.PI * 0.85) * 0.24 - t * t * 0.16;
    pos.setZ(i, z + cup + arch);
  }
  geo.computeVertexNormals();
  return geo;
}

export default function Zahrti3DCanvas({
  mode,
  scores,
  harmonyIndex = 78,
  bloomProgress = 1,
  darkSurface = false,
  className = 'w-full h-full',
}: Zahrti3DCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  const modeRef = useRef<Zahrti3DMode>(mode);
  const scoresRef = useRef<Record<RiasecCode, RiasecAreaScore> | undefined>(scores);
  const harmonyRef = useRef<number>(harmonyIndex);
  const bloomRef = useRef<number>(bloomProgress);
  const darkSurfaceRef = useRef<boolean>(darkSurface);
  const pointerTargetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const pulseImpulseRef = useRef<number>(0);

  modeRef.current = mode;
  scoresRef.current = scores;
  harmonyRef.current = harmonyIndex;
  bloomRef.current = bloomProgress;
  darkSurfaceRef.current = darkSurface;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareGl();
    const width = Math.max(260, container.clientWidth || 420);
    const height = Math.max(240, container.clientHeight || 360);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
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
    scene.fog = new THREE.Fog(darkSurfaceRef.current ? '#351B38' : '#F9F3EC', 9.0, 19.0);

    const camera = new THREE.PerspectiveCamera(37, width / height, 0.1, 45);
    camera.position.set(0, 1.25, 6.4);
    camera.lookAt(0, 0.12, 0);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envRT = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = envRT.texture;
    scene.environmentIntensity = 0.82;

    // 3-Point Warm-Cool Editorial Studio Lighting
    const hemiLight = new THREE.HemisphereLight('#F9F3EC', '#762D50', 0.95);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight('#FFF6EC', 2.2);
    keyLight.position.set(3.8, 5.6, 4.5);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      keyLight.shadow.camera.near = 1;
      keyLight.shadow.camera.far = 14;
      keyLight.shadow.bias = -0.0005;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight('#C47C91', 1.35);
    rimLight.position.set(-4.2, 2.8, -3.5);
    scene.add(rimLight);

    const goldCoreLight = new THREE.PointLight('#C6A56B', 1.05, 8);
    goldCoreLight.position.set(0, 0.5, 1.1);
    scene.add(goldCoreLight);

    const disposables: Array<{ dispose: () => void }> = [envRT, roomEnv, pmremGenerator];

    // Contact shadow grounding
    const shadowDiscGeo = new THREE.CircleGeometry(2.35, 48);
    const shadowDiscMat = new THREE.MeshBasicMaterial({
      color: '#1E0D20',
      transparent: true,
      opacity: darkSurfaceRef.current ? 0.24 : 0.08,
      depthWrite: false,
    });
    const shadowDisc = new THREE.Mesh(shadowDiscGeo, shadowDiscMat);
    shadowDisc.rotation.x = -Math.PI / 2;
    shadowDisc.position.y = -1.82;
    scene.add(shadowDisc);
    disposables.push(shadowDiscGeo, shadowDiscMat);

    // Shared luxury PBR materials
    const goldMat = new THREE.MeshStandardMaterial({
      color: '#C6A56B',
      metalness: 0.9,
      roughness: 0.18,
    });
    const burgundyVelvetMat = new THREE.MeshPhysicalMaterial({
      color: '#762D50',
      roughness: 0.36,
      metalness: 0.06,
      clearcoat: 0.35,
      clearcoatRoughness: 0.24,
    });
    const roseSilkMat = new THREE.MeshPhysicalMaterial({
      color: '#C47C91',
      roughness: 0.28,
      metalness: 0.04,
      clearcoat: 0.48,
      clearcoatRoughness: 0.18,
    });
    const blushPearlMat = new THREE.MeshPhysicalMaterial({
      color: '#E9D8D1',
      roughness: 0.22,
      metalness: 0.05,
      clearcoat: 0.68,
      clearcoatRoughness: 0.16,
    });
    const crystalGlassMat = new THREE.MeshPhysicalMaterial({
      color: '#F9F3EC',
      roughness: 0.06,
      metalness: 0.0,
      ior: 1.52,
      thickness: isSoftwareGl ? 0 : 0.9,
      transmission: isSoftwareGl ? 0 : 0.92,
      transparent: true,
      opacity: isSoftwareGl ? 0.22 : 1,
      depthWrite: false,
      clearcoat: 0.92,
      clearcoatRoughness: 0.06,
    });
    disposables.push(goldMat, burgundyVelvetMat, roseSilkMat, blushPearlMat, crystalGlassMat);

    // Root centerpiece group
    const rootGroup = new THREE.Group();
    rootGroup.position.set(0, 0.14, 0);
    scene.add(rootGroup);

    // === MODE A: SINGLE PROGRESSIVE BLOSSOM & GLASS SCULPTURE (hero, intro, analyzing, results) ===
    const blossomSculptureGroup = new THREE.Group();
    rootGroup.add(blossomSculptureGroup);

    // Stamen dome & golden crown
    const domeGeo = new THREE.SphereGeometry(0.4, 32, 24);
    const coreDome = new THREE.Mesh(domeGeo, goldMat);
    coreDome.scale.set(1, 0.65, 1);
    blossomSculptureGroup.add(coreDome);

    const collarGeo = new THREE.TorusGeometry(0.48, 0.036, 16, 48);
    const coreCollar = new THREE.Mesh(collarGeo, blushPearlMat);
    coreCollar.rotation.x = Math.PI / 2;
    coreCollar.position.y = -0.04;
    blossomSculptureGroup.add(coreCollar);

    const beadGeo = new THREE.SphereGeometry(0.05, 16, 12);
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      const bead = new THREE.Mesh(beadGeo, goldMat);
      bead.position.set(Math.cos(a) * 0.37, 0.16, Math.sin(a) * 0.37);
      blossomSculptureGroup.add(bead);
    }

    // Outer translucent glass dome
    const outerGlassGeo = new THREE.SphereGeometry(1.82, 40, 32);
    const outerGlassSphere = new THREE.Mesh(outerGlassGeo, crystalGlassMat);
    outerGlassSphere.renderOrder = 3;
    blossomSculptureGroup.add(outerGlassSphere);

    // Architectural gold & rose rings
    const ring1Geo = new THREE.TorusGeometry(2.16, 0.02, 16, 96);
    const ring1 = new THREE.Mesh(ring1Geo, goldMat);
    ring1.rotation.set(Math.PI * 0.38, Math.PI * 0.12, 0);
    blossomSculptureGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.98, 0.015, 16, 96);
    const ring2 = new THREE.Mesh(ring2Geo, roseSilkMat);
    ring2.rotation.set(-Math.PI * 0.34, -Math.PI * 0.18, 0);
    blossomSculptureGroup.add(ring2);

    const outerPetalGeo = createSculptedPetalGeometry(1.34, 0.56);
    const innerPetalGeo = createSculptedPetalGeometry(0.88, 0.4);
    const miniOrbGeo = new THREE.SphereGeometry(0.17, 24, 20);
    disposables.push(
      domeGeo,
      collarGeo,
      beadGeo,
      outerGlassGeo,
      ring1Geo,
      ring2Geo,
      outerPetalGeo,
      innerPetalGeo,
      miniOrbGeo
    );

    const royalPalette = ['#762D50', '#C47C91', '#4B2B4E', '#C6A56B', '#762D50', '#C47C91'];

    interface PetalRig {
      code: RiasecCode;
      arm: THREE.Group;
      outerMesh: THREE.Mesh;
      innerMesh: THREE.Mesh;
      orbMesh: THREE.Mesh;
      currentScale: number;
      currentOpenAngle: number;
    }

    const petalRigs: PetalRig[] = [];
    const flowerHead = new THREE.Group();
    flowerHead.rotation.x = Math.PI * 0.26;
    blossomSculptureGroup.add(flowerHead);

    RIASEC_ORDER.forEach((code, idx) => {
      const arm = new THREE.Group();
      arm.rotation.z = (idx / 6) * Math.PI * 2;
      flowerHead.add(arm);

      const outerMat = new THREE.MeshPhysicalMaterial({
        color: royalPalette[idx],
        roughness: 0.3,
        metalness: 0.06,
        clearcoat: 0.42,
        clearcoatRoughness: 0.22,
      });
      const outerMesh = new THREE.Mesh(outerPetalGeo, outerMat);
      outerMesh.position.set(0, 0.32, 0.02);
      outerMesh.rotation.x = -0.36;
      if (!isSoftwareGl) outerMesh.castShadow = true;
      arm.add(outerMesh);
      disposables.push(outerMat);

      const innerMat = new THREE.MeshPhysicalMaterial({
        color: idx % 2 === 0 ? '#E9D8D1' : '#C47C91',
        roughness: 0.32,
        metalness: 0.04,
        clearcoat: 0.4,
      });
      const innerMesh = new THREE.Mesh(innerPetalGeo, innerMat);
      innerMesh.position.set(0, 0.24, 0.16);
      innerMesh.rotation.x = -0.62;
      innerMesh.rotation.z = 0.28;
      arm.add(innerMesh);
      disposables.push(innerMat);

      const orbMesh = new THREE.Mesh(miniOrbGeo, idx % 2 === 0 ? goldMat : crystalGlassMat);
      orbMesh.position.set(0, 1.9, 0.22);
      orbMesh.renderOrder = 2;
      arm.add(orbMesh);

      petalRigs.push({
        code,
        arm,
        outerMesh,
        innerMesh,
        orbMesh,
        currentScale: 1,
        currentOpenAngle: -0.36,
      });
    });

    // === MODE B: DUAL-FORM HARMONY SCULPTURE (compatibility) ===
    const twinSculptureGroup = new THREE.Group();
    rootGroup.add(twinSculptureGroup);

    const twinRingGeo = new THREE.TorusGeometry(2.15, 0.022, 16, 96);
    const twinOuterRing = new THREE.Mesh(twinRingGeo, goldMat);
    twinOuterRing.rotation.x = Math.PI * 0.34;
    twinSculptureGroup.add(twinOuterRing);

    const twinCoreGeo = new THREE.OctahedronGeometry(0.24, 2);
    const twinBridgeCore = new THREE.Mesh(twinCoreGeo, goldMat);
    twinSculptureGroup.add(twinBridgeCore);

    // Person 1 Form (Burgundy & Gold Crystal Blossom)
    const twinForm1 = new THREE.Group();
    const formCore1Geo = new THREE.SphereGeometry(0.48, 32, 24);
    const formMesh1 = new THREE.Mesh(formCore1Geo, burgundyVelvetMat);
    const formShell1Geo = new THREE.IcosahedronGeometry(0.76, 1);
    const formShell1 = new THREE.Mesh(formShell1Geo, crystalGlassMat);
    const formHalo1Geo = new THREE.TorusGeometry(0.92, 0.018, 12, 64);
    const formHalo1 = new THREE.Mesh(formHalo1Geo, goldMat);
    formHalo1.rotation.x = Math.PI * 0.42;
    twinForm1.add(formMesh1, formShell1, formHalo1);
    twinSculptureGroup.add(twinForm1);

    // Person 2 Form (Rose Silk & Blush Pearl Crystal Blossom)
    const twinForm2 = new THREE.Group();
    const formMesh2 = new THREE.Mesh(formCore1Geo, roseSilkMat);
    const formShell2 = new THREE.Mesh(formShell1Geo, crystalGlassMat);
    const formHalo2 = new THREE.Mesh(formHalo1Geo, blushPearlMat);
    formHalo2.rotation.x = -Math.PI * 0.42;
    twinForm2.add(formMesh2, formShell2, formHalo2);
    twinSculptureGroup.add(twinForm2);

    disposables.push(twinRingGeo, twinCoreGeo, formCore1Geo, formShell1Geo, formHalo1Geo);

    // Subtle Gold Dust Motes (InstancedMesh, zero per-frame allocations)
    const particleCount = 24;
    const moteGeo = new THREE.OctahedronGeometry(0.055, 1);
    const moteMat = new THREE.MeshStandardMaterial({
      color: '#C6A56B',
      roughness: 0.24,
      metalness: 0.72,
    });
    const instancedMotes = new THREE.InstancedMesh(moteGeo, moteMat, particleCount);
    instancedMotes.frustumCulled = false;

    const paletteColors = [
      new THREE.Color('#C6A56B'),
      new THREE.Color('#C47C91'),
      new THREE.Color('#E9D8D1'),
      new THREE.Color('#762D50'),
    ];
    const moteSeeds = Array.from({ length: particleCount }, (_, i) => {
      instancedMotes.setColorAt(i, paletteColors[i % paletteColors.length]);
      return {
        radius: 2.3 + (i % 5) * 0.25,
        speed: 0.18 + (i % 7) * 0.035,
        phase: (i / particleCount) * Math.PI * 2,
        yBase: ((i % 9) - 4) * 0.3,
        scale: 0.5 + (i % 4) * 0.2,
      };
    });
    if (instancedMotes.instanceColor) instancedMotes.instanceColor.needsUpdate = true;
    scene.add(instancedMotes);
    disposables.push(moteGeo, moteMat);

    const _dummy = new THREE.Object3D();
    const _targetColor = new THREE.Color();

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

    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const w = Math.max(200, container.clientWidth);
      const h = Math.max(200, container.clientHeight);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

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
      const currentBloom = Math.max(0.25, Math.min(1, bloomRef.current));
      const harmonyRatio = Math.max(0.2, Math.min(1, harmonyRef.current / 100));

      const isTwin = currentMode === 'compatibility';
      blossomSculptureGroup.visible = !isTwin;
      twinSculptureGroup.visible = isTwin;

      pulseImpulseRef.current = THREE.MathUtils.damp(pulseImpulseRef.current, 0, 4.5, dt);
      const tapBoost = 1 + pulseImpulseRef.current * 0.1;

      const spinSpeed = currentMode === 'analyzing' ? 0.5 : 0.14;
      const targetRotY = pointerTargetRef.current.x * 0.36 + elapsed * spinSpeed;
      const targetRotX = pointerTargetRef.current.y * 0.18;

      rootGroup.rotation.y = THREE.MathUtils.damp(rootGroup.rotation.y, targetRotY, 4.0, dt);
      rootGroup.rotation.x = THREE.MathUtils.damp(rootGroup.rotation.x, targetRotX, 4.0, dt);
      rootGroup.position.y = 0.14 + Math.sin(elapsed * 1.25) * 0.06;
      rootGroup.scale.setScalar(tapBoost);

      if (isTwin) {
        // Twin orbiting forms closer together as harmonyIndex increases
        const orbitRadius = 1.48 - harmonyRatio * 0.56;
        const orbitAngle = elapsed * 0.55;
        twinForm1.position.set(
          Math.cos(orbitAngle) * orbitRadius,
          Math.sin(elapsed * 1.3) * 0.16,
          Math.sin(orbitAngle) * orbitRadius * 0.55
        );
        twinForm2.position.set(
          -Math.cos(orbitAngle) * orbitRadius,
          -Math.sin(elapsed * 1.3) * 0.16,
          -Math.sin(orbitAngle) * orbitRadius * 0.55
        );
        twinForm1.rotation.y = elapsed * 0.6;
        twinForm2.rotation.y = -elapsed * 0.6;
        twinOuterRing.rotation.z = elapsed * 0.18;
        twinBridgeCore.rotation.set(elapsed * 0.4, elapsed * 0.7, 0);
        twinBridgeCore.scale.setScalar(0.85 + harmonyRatio * 0.45);
      } else {
        ring1.rotation.z = elapsed * (currentMode === 'analyzing' ? 0.42 : 0.14);
        ring2.rotation.z = -elapsed * (currentMode === 'analyzing' ? 0.34 : 0.11);
        flowerHead.rotation.z = elapsed * (currentMode === 'analyzing' ? 0.3 : 0.06);

        for (let i = 0; i < petalRigs.length; i++) {
          const rig = petalRigs[i];
          let targetScale = 0.78 + currentBloom * 0.24;
          let targetAngle = -0.78 + currentBloom * 0.46;

          if (currentMode === 'results' && currentScores?.[rig.code]) {
            const area = currentScores[rig.code];
            const ratio = area.score / Math.max(1, area.maxScore);
            targetScale = 0.65 + ratio * 0.6;
            targetAngle = -0.45 + ratio * 0.22;
            _targetColor.set(royalPalette[i]);
            (rig.outerMesh.material as THREE.MeshPhysicalMaterial).color.lerp(_targetColor, 0.12);
          } else if (currentMode === 'analyzing') {
            targetScale = 0.9 + Math.sin(elapsed * 2.6 + i * 1.04) * 0.14;
          } else {
            targetScale += Math.sin(elapsed * 1.4 + i * 0.8) * 0.04;
          }

          rig.currentScale = THREE.MathUtils.damp(rig.currentScale, targetScale, 5.2, dt);
          rig.currentOpenAngle = THREE.MathUtils.damp(rig.currentOpenAngle, targetAngle, 5.0, dt);
          rig.outerMesh.scale.set(
            0.9 + (rig.currentScale - 0.8) * 0.24,
            rig.currentScale,
            1
          );
          rig.outerMesh.rotation.x = rig.currentOpenAngle;
          rig.orbMesh.position.y = 1.66 + rig.currentScale * 0.34;
          rig.orbMesh.scale.setScalar(0.8 + rig.currentScale * 0.22);
        }
      }

      for (let i = 0; i < particleCount; i++) {
        const seed = moteSeeds[i];
        const angle = seed.phase + elapsed * seed.speed;
        _dummy.position.set(
          Math.cos(angle) * seed.radius,
          seed.yBase + Math.sin(elapsed * 1.2 + seed.phase) * 0.2,
          Math.sin(angle) * seed.radius
        );
        _dummy.rotation.set(elapsed * 0.5 + seed.phase, elapsed * 0.7, seed.phase);
        const s = seed.scale * (0.85 + 0.15 * Math.sin(elapsed * 1.8 + seed.phase));
        _dummy.scale.set(s, s * 1.35, s * 0.45);
        _dummy.updateMatrix();
        instancedMotes.setMatrixAt(i, _dummy.matrix);
      }
      instancedMotes.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);
      if (!isDisposed) {
        afterDraw(tick);
      }
    };

    // Draw initial frame synchronously so the canvas never flashes blank after Suspense resolves
    tick(performance.now());

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
        mode === 'compatibility'
          ? 'مجسم ثلاثي الأبعاد يجسد تلاقي شخصيتين في مدار متناغم'
          : mode === 'results'
          ? 'زهرة ثلاثية الأبعاد تتفتح بتلاتها وفق نتائج أنماط اهتماماتك الستة'
          : 'مجسم زهرة ثلاثي الأبعاد في غلاف زجاجي ولمسات ذهبية هادئة'
      }
      style={{ touchAction: 'pan-y' }}
      className={`relative select-none cursor-grab active:cursor-grabbing ${className}`}
    />
  );
}
