import React, { Suspense, lazy, useEffect, useState } from 'react';
import { RiasecAreaScore, RiasecCode } from '@/src/types';
import { Botanical2DFallback, Zahrti3DMode } from './Botanical2DFallback';

const LazyZahrti3DCanvas = lazy(() => import('./Zahrti3DCanvas'));

interface Zahrti3DStageProps {
  mode: Zahrti3DMode;
  scores?: Record<RiasecCode, RiasecAreaScore>;
  harmonyIndex?: number;
  bloomProgress?: number;
  darkSurface?: boolean;
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
        (canvas.getContext('webgl2') ||
          canvas.getContext('webgl') ||
          canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export function Zahrti3DStage({
  mode,
  scores,
  harmonyIndex = 78,
  bloomProgress = 1,
  darkSurface = false,
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

  const containerSurface = darkSurface
    ? 'border-[#C6A56B]/30 bg-gradient-to-br from-[#351B38] via-[#412144] to-[#27122A]'
    : 'border-[#E9D8D1] bg-gradient-to-br from-[#F9F3EC] via-[#F4EAE3] to-[#EFE2DC]';

  return (
    <div className={`space-y-2.5 ${className}`}>
      <div className={`relative w-full overflow-hidden rounded-3xl border ${containerSurface} ${heightClass}`}>
        {show3D ? (
          <Suspense
            fallback={
              <Botanical2DFallback
                mode={mode}
                scores={scores}
                harmonyIndex={harmonyIndex}
                darkSurface={darkSurface}
              />
            }
          >
            <LazyZahrti3DCanvas
              mode={mode}
              scores={scores}
              harmonyIndex={harmonyIndex}
              bloomProgress={bloomProgress}
              darkSurface={darkSurface}
            />
          </Suspense>
        ) : (
          <Botanical2DFallback
            mode={mode}
            scores={scores}
            harmonyIndex={harmonyIndex}
            darkSurface={darkSurface}
          />
        )}
      </div>

      {(hintText || (webglReady && !reducedMotion)) && (
        <div
          className={`flex flex-wrap items-center justify-between gap-2 px-1 text-xs ${
            darkSurface ? 'text-[#E9D8D1]/85' : 'text-[#5F4562]'
          }`}
        >
          <span>{hintText ?? ''}</span>
          {webglReady && !reducedMotion && (
            <button
              type="button"
              onClick={() => setPrefer2D((v) => !v)}
              className={`text-xs font-medium hover:underline cursor-pointer whitespace-nowrap ${
                darkSurface ? 'text-[#C6A56B]' : 'text-[#762D50]'
              }`}
            >
              {prefer2D ? 'تفعيل العرض ثلاثي الأبعاد' : 'التبديل للعرض الثابت'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
