import React from 'react';
import { RIASEC_ORDER, RIASEC_PROFILES } from '@/src/data/interests/riasecProfiles';
import { RiasecAreaScore, RiasecCode } from '@/src/types';

export type Zahrti3DMode = 'hero' | 'intro' | 'analyzing' | 'results';

interface Botanical2DFallbackProps {
  mode: Zahrti3DMode;
  scores?: Record<RiasecCode, RiasecAreaScore>;
  className?: string;
}

export function Botanical2DFallback({
  mode,
  scores,
  className = 'w-full h-full',
}: Botanical2DFallbackProps) {
  const petalAngles = [0, 60, 120, 180, 240, 300];

  return (
    <div
      className={`relative flex items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-[#FFF8F3] via-[#FCEEF4] to-[#F3ECFA] p-4 ${className}`}
    >
      <svg
        viewBox="0 0 360 320"
        fill="none"
        role="img"
        aria-label={
          mode === 'results'
            ? 'رسم تفاعلي لمتفتح زهرة أنماط RIASEC الستة'
            : 'زهرة زهرتي ثلاثية الأبعاد مع بتلات وكرات زجاجية'
        }
        className="w-full h-full max-h-[340px]"
      >
        <defs>
          <radialGradient id="zahrtiOrbGlow" cx="50%" cy="45%" r="52%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#F2A6C1" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#B49AE8" stopOpacity="0.16" />
          </radialGradient>
          <linearGradient id="zahrtiPetalBerry" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F2A6C1" />
            <stop offset="100%" stopColor="#C04472" />
          </linearGradient>
          <linearGradient id="zahrtiPetalViolet" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#B49AE8" />
            <stop offset="100%" stopColor="#7651B8" />
          </linearGradient>
        </defs>

        {/* Grounded soft shadow */}
        <ellipse cx="180" cy="284" rx="88" ry="14" fill="#351B38" opacity="0.08" />

        {/* Orbital Gold & Lilac rings */}
        <ellipse
          cx="180"
          cy="158"
          rx="124"
          ry="46"
          transform="rotate(-16 180 158)"
          stroke="#D5B36A"
          strokeWidth="1.6"
          strokeDasharray={mode === 'analyzing' ? '6 5' : undefined}
          opacity="0.72"
        />
        <ellipse
          cx="180"
          cy="158"
          rx="114"
          ry="42"
          transform="rotate(22 180 158)"
          stroke="#B49AE8"
          strokeWidth="1.4"
          opacity="0.65"
        />

        {/* Translucent crystal sphere halo */}
        <circle
          cx="180"
          cy="158"
          r="94"
          fill="url(#zahrtiOrbGlow)"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          opacity="0.92"
        />

        {/* 6 Petals — dynamically scaled when mode === 'results' */}
        <g transform="translate(180, 158)">
          {RIASEC_ORDER.map((code, idx) => {
            const angle = petalAngles[idx];
            const ratio =
              mode === 'results' && scores?.[code]
                ? 0.58 + (scores[code].score / Math.max(1, scores[code].maxScore)) * 0.56
                : mode === 'intro'
                ? 0.85
                : 0.96;
            const fillColor =
              mode === 'results'
                ? RIASEC_PROFILES[code].colorHex
                : idx % 2 === 0
                ? 'url(#zahrtiPetalBerry)'
                : 'url(#zahrtiPetalViolet)';

            return (
              <g key={code} transform={`rotate(${angle}) scale(${ratio})`}>
                <path
                  d="M0 -14 C22 -24, 30 -64, 0 -86 C-30 -64, -22 -24, 0 -14 Z"
                  fill={fillColor}
                  opacity="0.88"
                  stroke="#FFF8F3"
                  strokeWidth="1.6"
                />
                <circle cx="0" cy="-94" r="6" fill={RIASEC_PROFILES[code].colorHex} opacity="0.85" />
              </g>
            );
          })}

          {/* Inner Soft Gold crown */}
          <circle cx="0" cy="0" r="24" fill="#FDF0F5" stroke="#D5B36A" strokeWidth="2.4" />
          <circle cx="0" cy="0" r="14" fill="#D5B36A" />
          <circle cx="-4" cy="-4" r="4" fill="#FFF8F3" opacity="0.7" />
        </g>

        {/* Orbiting glass pearls */}
        <circle cx="72" cy="112" r="12" fill="#F2A6C1" opacity="0.72" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="288" cy="126" r="10" fill="#B49AE8" opacity="0.72" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="256" cy="236" r="8" fill="#D5B36A" opacity="0.78" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="96" cy="222" r="7" fill="#C04472" opacity="0.58" stroke="#FFFFFF" strokeWidth="1.2" />
      </svg>
    </div>
  );
}
