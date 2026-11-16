import React, { Suspense, lazy, useEffect, useState } from 'react';
import { RiasecAreaScore, RiasecCode } from '@/src/types';
import { Botanical2DFallback, Zahrti3DMode } from './Botanical2DFallback';

const LazyZahrti3DCanvas = lazy(() => import('./Zahrti3DCanvas'));

interface Zahrti3DStageProps {
  mode: Zahrti3DMode;
  scores?: Record<RiasecCode, RiasecAreaScore>;
  className?: string;
  heightClass?: string;
  hintText?: string;
}

function checkWebGLSupport(): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export function Zahrti3DStage({
  mode,
  scores,
  className = '',
  heightClass = 'h-[300px] sm:h-[360px]',
  hintText,
}: Zahrti3DStageProps) {
  const [webglReady, setWebglReady] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [prefer2D, setPrefer2D] = useState<boolean>(false);

  useEffect(() => {
    setWebglReady(checkWebGLSupport());
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mq.matches);
      const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, []);

  const show3D = webglReady && !reducedMotion && !prefer2D;

  return (
    <div className={`space-y-2 ${className}`}>
      <div
        className={`relative w-full overflow-hidden rounded-[2rem] border border-[#EAD3E0] bg-gradient-to-br from-[#FFF8F3] via-[#FDF0F5] to-[#F4EFFB] ${heightClass}`}
      >
        {show3D ? (
          <Suspense fallback={<Botanical2DFallback mode={mode} scores={scores} />}>
            <LazyZahrti3DCanvas mode={mode} scores={scores} />
          </Suspense>
        ) : (
          <Botanical2DFallback mode={mode} scores={scores} />
        )}
      </div>

      {/* Subtle caption + accessibility 2D/3D toggle BELOW canvas (never overlapping WebGL) */}
      {(hintText || (webglReady && !reducedMotion)) && (
        <div className="flex flex-wrap items-center justify-between gap-2 px-2 text-xs text-[#5F4163]">
          <span>{hintText ?? ''}</span>
          {webglReady && !reducedMotion && (
            <button
              type="button"
              onClick={() => setPrefer2D((v) => !v)}
              className="text-xs font-medium text-[#7651B8] hover:text-[#C04472] hover:underline cursor-pointer whitespace-nowrap"
            >
              {prefer2D ? 'تفعيل العرض ثلاثي الأبعاد' : 'التبديل للعرض الثابت'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
