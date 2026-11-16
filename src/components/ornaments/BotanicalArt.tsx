import React from 'react';
import { MajorCategory, RiasecCode } from '@/src/types';

export function ZahrtiBlossomMark({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Five layered petals in soft blush and dusty rose */}
      <path
        d="M24 6C28 6 31 11 29 17C35 15 40 18 40 22C40 26 35 29 29 27C31 33 28 38 24 38C20 38 17 33 19 27C13 29 8 26 8 22C8 18 13 15 19 17C17 11 20 6 24 6Z"
        fill="#F4DCE2"
        stroke="#A9506C"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M24 11C26.5 11 28 14.5 26.8 18.5C30.8 17.3 34.3 19 34.3 21.5C34.3 24 30.8 25.7 26.8 24.5C28 28.5 26.5 32 24 32C21.5 32 20 28.5 21.2 24.5C17.2 25.7 13.7 24 13.7 21.5C13.7 19 17.2 17.3 21.2 18.5C20 14.5 21.5 11 24 11Z"
        fill="#EAC1CC"
        opacity="0.7"
      />
      <circle cx="24" cy="21.5" r="4" fill="#A9506C" />
      <circle cx="24" cy="21.5" r="1.6" fill="#FDF9F6" />
      {/* Small botanical leaves */}
      <path
        d="M17 36C13 38 11 41 12 43C15 43 18 40 19 37"
        fill="#DCE6DC"
        stroke="#7D967E"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M31 36C35 38 37 41 36 43C33 43 30 40 29 37"
        fill="#DCE6DC"
        stroke="#7D967E"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CoquetteRibbonBow({ className = 'w-16 h-9' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Left loop */}
      <path
        d="M54 27C39 11 16 12 14 24C12 36 33 40 54 31Z"
        fill="#F4D4DC"
        stroke="#A9506C"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M49 28C37 19 23 20 22 25C21 30 34 32 49 29"
        stroke="#C97D95"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Right loop */}
      <path
        d="M66 27C81 11 104 12 106 24C108 36 87 40 66 31Z"
        fill="#F4D4DC"
        stroke="#A9506C"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M71 28C83 19 97 20 98 25C99 30 86 32 71 29"
        stroke="#C97D95"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Hanging ribbons */}
      <path
        d="M55 32C49 43 43 52 36 58L44 55L47 60C52 51 56 42 58 34"
        fill="#F7E0E6"
        stroke="#A9506C"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M65 32C71 43 77 52 84 58L76 55L73 60C68 51 64 42 62 34"
        fill="#F7E0E6"
        stroke="#A9506C"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* Center knot */}
      <rect
        x="53"
        y="22"
        width="14"
        height="13"
        rx="5"
        fill="#E5AEBE"
        stroke="#A9506C"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function FloralDivider({ className = 'my-8' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
      <div className="h-px flex-1 bg-gradient-to-l from-[#E8CED5] to-transparent" />
      <CoquetteRibbonBow className="w-12 h-6 opacity-85" />
      <div className="h-px flex-1 bg-gradient-to-r from-[#E8CED5] to-transparent" />
    </div>
  );
}

export function HeroBotanicalBouquet({ className = 'w-full max-w-md' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 460"
      fill="none"
      role="img"
      aria-label="رسم توضيحي فني يضم وردة وردية وكتابين وشريط فيونكة يعبر عن رحلة اختبار زهرتي"
      className={className}
    >
      {/* Arched warm paper frame */}
      <path
        d="M40 430V210C40 116 116 40 210 40C304 40 380 116 380 210V430H40Z"
        fill="#FFFDFB"
        stroke="#E8CED5"
        strokeWidth="2"
      />
      <path
        d="M54 416V210C54 124 124 54 210 54C296 54 366 124 366 210V416H54Z"
        fill="#FDF4F6"
        stroke="#F1DCE2"
        strokeWidth="1.2"
        strokeDasharray="4 4"
      />

      {/* Soft halo */}
      <circle cx="210" cy="200" r="108" fill="#F8E4EA" opacity="0.65" />
      <circle cx="255" cy="155" r="54" fill="#EFE8F5" opacity="0.55" />

      {/* Botanical foliage & stems */}
      <path
        d="M210 340C208 280 206 235 210 180"
        stroke="#7D967E"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M208 280C172 252 145 215 132 175"
        stroke="#88A189"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M212 270C250 245 278 212 292 174"
        stroke="#88A189"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Leaves */}
      <path
        d="M168 242C146 238 134 252 138 264C155 268 171 258 175 245Z"
        fill="#D6E2D5"
        stroke="#7D967E"
        strokeWidth="1.5"
      />
      <path
        d="M254 236C276 232 288 246 284 258C267 262 251 252 247 239Z"
        fill="#D6E2D5"
        stroke="#7D967E"
        strokeWidth="1.5"
      />
      <path
        d="M180 302C155 304 142 320 148 332C168 334 185 320 188 306Z"
        fill="#DCE6DC"
        stroke="#7D967E"
        strokeWidth="1.5"
      />

      {/* Main Center Rose */}
      <g transform="translate(210, 175)">
        <circle cx="0" cy="0" r="46" fill="#F2C9D4" stroke="#A9506C" strokeWidth="1.8" />
        <path
          d="M-30 -8C-32 -28 -8 -42 14 -34C32 -27 40 -5 30 16C20 35 -10 38 -25 22C-36 10 -34 -2 -20 -12"
          fill="#F9E0E7"
          stroke="#A9506C"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M-16 4C-18 -12 -4 -22 10 -18C22 -14 25 2 16 14C7 24 -10 20 -12 8C-13 -2 -3 -8 6 -5"
          fill="#E5A9BA"
          stroke="#A9506C"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="1" cy="2" r="5" fill="#A9506C" />
      </g>

      {/* Left Blossom */}
      <g transform="translate(130, 168)">
        <circle cx="0" cy="0" r="24" fill="#F6D8E0" stroke="#A9506C" strokeWidth="1.5" />
        <path
          d="M-14 -4C-14 -15 0 -20 10 -14C19 -8 18 8 8 14C-2 19 -14 11 -10 0"
          fill="#FBECEF"
          stroke="#A9506C"
          strokeWidth="1.3"
        />
        <circle cx="0" cy="1" r="3.5" fill="#A9506C" />
      </g>

      {/* Right Lavender Blossom */}
      <g transform="translate(292, 168)">
        <circle cx="0" cy="0" r="22" fill="#E6DBF0" stroke="#8E74A8" strokeWidth="1.5" />
        <path
          d="M-12 -3C-12 -13 0 -18 9 -12C17 -7 16 7 7 12C-2 17 -12 10 -8 0"
          fill="#F6F1FA"
          stroke="#8E74A8"
          strokeWidth="1.3"
        />
        <circle cx="0" cy="1" r="3.5" fill="#8E74A8" />
      </g>

      {/* Stacked Editorial Books wrapped with ribbon */}
      <g transform="translate(105, 326)">
        {/* Bottom book */}
        <rect x="0" y="34" width="210" height="34" rx="8" fill="#F2D7DF" stroke="#A9506C" strokeWidth="1.7" />
        <line x1="18" y1="45" x2="190" y2="45" stroke="#FDF9F6" strokeWidth="2.5" strokeLinecap="round" />
        {/* Top book */}
        <rect x="18" y="4" width="174" height="30" rx="7" fill="#E9DFF2" stroke="#8E74A8" strokeWidth="1.7" />
        <line x1="34" y1="15" x2="174" y2="15" stroke="#FDF9F6" strokeWidth="2.2" strokeLinecap="round" />
        {/* Vertical Ribbon */}
        <rect x="97" y="4" width="16" height="64" fill="#D4849C" opacity="0.88" />
      </g>

      {/* Bow sitting on books */}
      <g transform="translate(150, 294)">
        <CoquetteRibbonBow className="w-28 h-16" />
      </g>

      {/* Small gentle stars */}
      <path d="M96 105L99 113L107 116L99 119L96 127L93 119L85 116L93 113Z" fill="#DFB6C2" />
      <path d="M324 112L326 118L332 120L326 122L324 128L322 122L316 120L322 118Z" fill="#C7B6DA" />
      <circle cx="88" cy="274" r="3" fill="#E4B9C6" />
      <circle cx="332" cy="264" r="3.5" fill="#D0C0E0" />
    </svg>
  );
}

export function AnalyzingBlossomArch({ className = 'w-52 h-60' }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 250" fill="none" aria-hidden="true" className={className}>
      <path
        d="M24 232V112C24 64.5 62.5 26 110 26C157.5 26 196 64.5 196 112V232H24Z"
        fill="#FFFDFB"
        stroke="#E8CED5"
        strokeWidth="2"
      />
      <circle cx="110" cy="112" r="56" fill="#F9E7EC" />
      <path d="M110 205V128" stroke="#7D967E" strokeWidth="2.6" strokeLinecap="round" />
      <path
        d="M110 176C90 168 80 156 84 146C96 146 106 158 110 170Z"
        fill="#D6E2D5"
        stroke="#7D967E"
        strokeWidth="1.4"
      />
      <path
        d="M110 166C130 158 140 146 136 136C124 136 114 148 110 160Z"
        fill="#D6E2D5"
        stroke="#7D967E"
        strokeWidth="1.4"
      />
      {/* 5-petal blossom */}
      <path
        d="M110 62C122 62 128 76 122 90C136 86 150 92 150 104C150 116 136 122 122 116C128 130 122 144 110 144C98 144 92 130 98 116C84 122 70 116 70 104C70 92 84 86 98 90C92 76 98 62 110 62Z"
        fill="#F4CFD9"
        stroke="#A9506C"
        strokeWidth="1.8"
      />
      <circle cx="110" cy="103" r="9" fill="#A9506C" />
      <circle cx="110" cy="103" r="3.5" fill="#FDF9F6" />
      {/* Mini bow on stem */}
      <g transform="translate(80, 174) scale(0.5)">
        <CoquetteRibbonBow />
      </g>
    </svg>
  );
}

export function RiasecBadgeGlyph({
  area,
  className = 'w-8 h-8',
}: {
  area: RiasecCode;
  className?: string;
}) {
  switch (area) {
    case 'realistic':
      return (
        <svg viewBox="0 0 36 36" fill="none" aria-hidden="true" className={className}>
          <circle cx="18" cy="18" r="16" fill="#F9EBEE" stroke="#E8C5CE" />
          <path d="M12 24L22 14M20 12L24 16M11 15L15 11L18 14L14 18Z" stroke="#A9506C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'investigative':
      return (
        <svg viewBox="0 0 36 36" fill="none" aria-hidden="true" className={className}>
          <circle cx="18" cy="18" r="16" fill="#F3EEF9" stroke="#D8CBE7" />
          <circle cx="16" cy="16" r="6" stroke="#8E74A8" strokeWidth="1.8" />
          <path d="M20.5 20.5L25 25" stroke="#8E74A8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'artistic':
      return (
        <svg viewBox="0 0 36 36" fill="none" aria-hidden="true" className={className}>
          <circle cx="18" cy="18" r="16" fill="#EFF4EF" stroke="#C9D8C9" />
          <path d="M18 10C13 10 10 14 10 18.5C10 22 12.5 24 15 24C16.2 24 17 23.2 17 22C17 21 17.8 20.2 19 20.2H21.5C24 20.2 26 18.2 26 15.8C26 12.5 22.5 10 18 10Z" stroke="#6B836C" strokeWidth="1.7" />
          <circle cx="14.5" cy="15.5" r="1.2" fill="#6B836C" />
          <circle cx="18.5" cy="14" r="1.2" fill="#6B836C" />
          <circle cx="22" cy="16" r="1.2" fill="#6B836C" />
        </svg>
      );
    case 'social':
      return (
        <svg viewBox="0 0 36 36" fill="none" aria-hidden="true" className={className}>
          <circle cx="18" cy="18" r="16" fill="#EDF2F8" stroke="#C5D3E6" />
          <path d="M18 24.5C18 24.5 11 20 11 14.8C11 12.6 12.7 11 14.8 11C16.2 11 17.3 11.7 18 12.8C18.7 11.7 19.8 11 21.2 11C23.3 11 25 12.6 25 14.8C25 20 18 24.5 18 24.5Z" stroke="#637EA1" strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
      );
    case 'enterprising':
      return (
        <svg viewBox="0 0 36 36" fill="none" aria-hidden="true" className={className}>
          <circle cx="18" cy="18" r="16" fill="#FAF0ED" stroke="#E8CBC4" />
          <path d="M12 23L16.5 18L19.5 20.5L24.5 13.5M24.5 13.5H20.5M24.5 13.5V17.5" stroke="#B66B5A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'conventional':
      return (
        <svg viewBox="0 0 36 36" fill="none" aria-hidden="true" className={className}>
          <circle cx="18" cy="18" r="16" fill="#FAF4EA" stroke="#E6D3B8" />
          <rect x="12" y="11" width="12" height="14" rx="2.5" stroke="#AC824A" strokeWidth="1.7" />
          <path d="M15 15.5H21M15 19H21M15 22H18.5" stroke="#AC824A" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
  }
}

export function CategoryIllustration({
  category,
  className = 'w-14 h-14',
}: {
  category: MajorCategory;
  className?: string;
}) {
  const palette: Record<MajorCategory, { bg: string; stroke: string; accent: string }> = {
    health_medicine: { bg: '#F9EBEE', stroke: '#A9506C', accent: '#E5B4C2' },
    engineering: { bg: '#FAF0ED', stroke: '#B66B5A', accent: '#E9C6BD' },
    computing_tech: { bg: '#F3EEF9', stroke: '#8E74A8', accent: '#D4C4E6' },
    sciences: { bg: '#EDF2F8', stroke: '#637EA1', accent: '#C4D4E6' },
    education: { bg: '#EFF4EF', stroke: '#6B836C', accent: '#C8DAC9' },
    law_management_econ: { bg: '#FAF4EA', stroke: '#AC824A', accent: '#E5D1B3' },
    arts_media: { bg: '#FBEFF3', stroke: '#A9506C', accent: '#ECC3D0' },
    humanities_social: { bg: '#F4EFF8', stroke: '#8E74A8', accent: '#D8CBE7' },
    agriculture_env: { bg: '#EFF4EF', stroke: '#6B836C', accent: '#C6D9C7' },
  };
  const c = palette[category];

  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      <rect x="4" y="4" width="56" height="56" rx="18" fill={c.bg} stroke={c.accent} strokeWidth="1.5" />
      {category === 'health_medicine' && (
        <>
          <path d="M32 20V44M20 32H44" stroke={c.stroke} strokeWidth="3.2" strokeLinecap="round" />
          <circle cx="32" cy="32" r="16" stroke={c.accent} strokeWidth="1.5" strokeDasharray="3 3" />
        </>
      )}
      {category === 'engineering' && (
        <>
          <path d="M18 44L32 18L46 44H18Z" stroke={c.stroke} strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M25 36H39" stroke={c.stroke} strokeWidth="2" strokeLinecap="round" />
          <circle cx="32" cy="18" r="3" fill={c.stroke} />
        </>
      )}
      {category === 'computing_tech' && (
        <>
          <rect x="16" y="19" width="32" height="21" rx="3.5" stroke={c.stroke} strokeWidth="2.2" />
          <path d="M13 44H51" stroke={c.stroke} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M27 26L23 29.5L27 33M37 26L41 29.5L37 33" stroke={c.stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {category === 'sciences' && (
        <>
          <path d="M27 17H37M29 17V25L20 42C19 44 20.5 46 23 46H41C43.5 46 45 44 44 42L35 25V17" stroke={c.stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 37H40" stroke={c.accent} strokeWidth="2" />
        </>
      )}
      {category === 'education' && (
        <>
          <path d="M18 22C23 20 28 21 32 24C36 21 41 20 46 22V42C41 40 36 41 32 44C28 41 23 40 18 42V22Z" stroke={c.stroke} strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M32 24V44" stroke={c.stroke} strokeWidth="1.8" />
        </>
      )}
      {category === 'law_management_econ' && (
        <>
          <path d="M32 17V45M22 45H42M20 24H44" stroke={c.stroke} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M16 34C16 36.5 24 36.5 24 34L20 24L16 34ZM40 34C40 36.5 48 36.5 48 34L44 24L40 34Z" stroke={c.stroke} strokeWidth="1.8" strokeLinejoin="round" />
        </>
      )}
      {category === 'arts_media' && (
        <>
          <circle cx="32" cy="32" r="14" stroke={c.stroke} strokeWidth="2.1" />
          <path d="M32 18C35 24 35 40 32 46M18 32C24 29 40 29 46 32" stroke={c.accent} strokeWidth="1.8" />
          <circle cx="32" cy="32" r="4" fill={c.stroke} />
        </>
      )}
      {category === 'humanities_social' && (
        <>
          <path d="M22 21H42C44 21 45 22.5 45 24.5V35.5C45 37.5 44 39 42 39H30L23 45V39H22C20 39 19 37.5 19 35.5V24.5C19 22.5 20 21 22 21Z" stroke={c.stroke} strokeWidth="2.1" strokeLinejoin="round" />
          <path d="M26 28H38M26 33H34" stroke={c.stroke} strokeWidth="1.8" strokeLinecap="round" />
        </>
      )}
      {category === 'agriculture_env' && (
        <>
          <path d="M32 45V29M32 34C22 34 19 26 20 19C28 19 33 24 32 34ZM32 31C42 31 45 23 44 17C36 17 31 22 32 31Z" stroke={c.stroke} strokeWidth="2.1" strokeLinejoin="round" />
        </>
      )}
    </svg>
  );
}
