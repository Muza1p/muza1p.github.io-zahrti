import React from 'react';
import { RIASEC_ORDER } from '@/src/data/interests/riasecProfiles';
import { RiasecAreaScore, RiasecCode } from '@/src/types';

export type Zahrti3DMode = 'hero' | 'intro' | 'analyzing' | 'results' | 'compatibility';

interface Botanical2DFallbackProps {
  mode: Zahrti3DMode;
  scores?: Record<RiasecCode, RiasecAreaScore>;
  harmonyIndex?: number;
  darkSurface?: boolean;
  className?: string;
}

export function Botanical2DFallback({
  mode,
  scores,
  harmonyIndex = 78,
  darkSurface = false,
  className = 'w-full h-full',
}: Botanical2DFallbackProps) {
  const petalAngles = [0, 60, 120, 180, 240, 300];
  const bgClass = darkSurface
    ? 'bg-gradient-to-br from-[#351B38] via-[#412144] to-[#28132B]'
    : 'bg-gradient-to-br from-[#F9F3EC] via-[#F4EAE3] to-[#EFE2DC]';

  if (mode === 'compatibility') {
    const separation = 48 - Math.round((harmonyIndex / 100) * 18);
    return (
      <div className={`relative flex items-center justify-center p-4 ${bgClass} ${className}`}>
        <svg
          viewBox="0 0 360 300"
          fill="none"
          role="img"
          aria-label="تجسيد ثنائي متناغم يرمز إلى التقاء شخصيتين"
          className="w-full h-full max-h-[320px]"
        >
          <ellipse
            cx="180"
            cy="150"
            rx="126"
            ry="66"
            stroke="#C6A56B"
            strokeWidth="1.2"
            opacity="0.55"
          />
          <ellipse
            cx="180"
            cy="150"
            rx="94"
            ry="48"
            transform="rotate(-14 180 150)"
            stroke="#C47C91"
            strokeWidth="1.1"
            opacity="0.6"
          />
          <g transform={`translate(${180 - separation}, 150)`}>
            <circle cx="0" cy="0" r="44" fill="#762D50" fillOpacity="0.45" stroke="#C6A56B" strokeWidth="1.4" />
            <circle cx="0" cy="0" r="18" fill="#C47C91" fillOpacity="0.85" />
          </g>
          <g transform={`translate(${180 + separation}, 150)`}>
            <circle cx="0" cy="0" r="44" fill="#C47C91" fillOpacity="0.35" stroke="#E9D8D1" strokeWidth="1.4" />
            <circle cx="0" cy="0" r="18" fill="#C6A56B" fillOpacity="0.9" />
          </g>
          <circle cx="180" cy="150" r="9" fill="#F9F3EC" stroke="#C6A56B" strokeWidth="1.8" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center p-4 ${bgClass} ${className}`}>
      <svg
        viewBox="0 0 360 320"
        fill="none"
        role="img"
        aria-label={
          mode === 'results'
            ? 'زهرة الاهتمامات المهنية الستة'
            : 'زهرة زهرتي ثلاثية الأبعاد بإطار زجاجي وذهبي'
        }
        className="w-full h-full max-h-[340px]"
      >
        <defs>
          <linearGradient id="luxPetalA" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C47C91" />
            <stop offset="100%" stopColor="#762D50" />
          </linearGradient>
          <linearGradient id="luxPetalB" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E9D8D1" />
            <stop offset="100%" stopColor="#C47C91" />
          </linearGradient>
        </defs>

        <ellipse
          cx="180"
          cy="158"
          rx="124"
          ry="44"
          transform="rotate(-16 180 158)"
          stroke="#C6A56B"
          strokeWidth="1.3"
          opacity="0.72"
        />
        <ellipse
          cx="180"
          cy="158"
          rx="112"
          ry="38"
          transform="rotate(20 180 158)"
          stroke="#C47C91"
          strokeWidth="1.1"
          opacity="0.55"
        />
        <circle
          cx="180"
          cy="158"
          r="92"
          fill={darkSurface ? '#4B2B4E' : '#FFFDF9'}
          fillOpacity={darkSurface ? 0.36 : 0.72}
          stroke="#C6A56B"
          strokeOpacity="0.45"
          strokeWidth="1.2"
        />

        <g transform="translate(180, 158)">
          {RIASEC_ORDER.map((code, idx) => {
            const angle = petalAngles[idx];
            const ratio =
              mode === 'results' && scores?.[code]
                ? 0.6 + (scores[code].score / Math.max(1, scores[code].maxScore)) * 0.55
                : mode === 'intro'
                ? 0.84
                : 0.96;
            return (
              <g key={code} transform={`rotate(${angle}) scale(${ratio})`}>
                <path
                  d="M0 -14 C22 -24, 30 -64, 0 -86 C-30 -64, -22 -24, 0 -14 Z"
                  fill={idx % 2 === 0 ? 'url(#luxPetalA)' : 'url(#luxPetalB)'}
                  opacity="0.92"
                  stroke="#C6A56B"
                  strokeWidth="1.1"
                />
              </g>
            );
          })}
          <circle cx="0" cy="0" r="21" fill="#351B38" stroke="#C6A56B" strokeWidth="2" />
          <circle cx="0" cy="0" r="10" fill="#C6A56B" />
        </g>
      </svg>
    </div>
  );
}
