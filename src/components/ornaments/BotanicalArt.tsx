import React from 'react';
import { MajorCategory, RiasecCode } from '@/src/types';

export function ZahrtiBlossomMark({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
      <circle cx="24" cy="24" r="21" stroke="#C6A56B" strokeWidth="1.2" opacity="0.65" />
      <path
        d="M24 7C27.5 11.5 28 16.5 25.6 20.8C29.8 18.4 34.8 18.8 39 22.4C34.5 26 29.8 26.4 25.6 24.4C27.8 28.8 27.2 33.8 24 38.5C20.8 33.8 20.2 28.8 22.4 24.4C18.2 26.4 13.5 26 9 22.4C13.2 18.8 18.2 18.4 22.4 20.8C20 16.5 20.5 11.5 24 7Z"
        fill="#E9D8D1"
        stroke="#762D50"
        strokeWidth="1.45"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="22.6" r="4.2" fill="#762D50" />
      <circle cx="24" cy="22.6" r="1.8" fill="#C6A56B" />
    </svg>
  );
}

export function EditorialCrest({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" fill="none" aria-hidden="true" className={className}>
      <path d="M6 20H22" stroke="#C6A56B" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M42 20H58" stroke="#C6A56B" strokeWidth="1.2" strokeLinecap="round" />
      <path
        d="M32 7C34.8 11.5 34.8 15.8 32 20C29.2 15.8 29.2 11.5 32 7ZM32 33C34.8 28.5 34.8 24.2 32 20C29.2 24.2 29.2 28.5 32 33ZM19 20C23.5 17.2 27.8 17.2 32 20C27.8 22.8 23.5 22.8 19 20ZM45 20C40.5 17.2 36.2 17.2 32 20C36.2 22.8 40.5 22.8 45 20Z"
        fill="#E9D8D1"
        stroke="#762D50"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="20" r="2.6" fill="#C6A56B" />
    </svg>
  );
}

export function FloralDivider({ className = 'my-10' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-5 ${className}`} aria-hidden="true">
      <div className="h-px flex-1 bg-gradient-to-l from-[#E9D8D1] via-[#C6A56B]/50 to-transparent" />
      <EditorialCrest className="w-12 h-7 opacity-90" />
      <div className="h-px flex-1 bg-gradient-to-r from-[#E9D8D1] via-[#C6A56B]/50 to-transparent" />
    </div>
  );
}

export function RiasecBadgeGlyph({
  area,
  className = 'w-9 h-9',
}: {
  area: RiasecCode;
  className?: string;
}) {
  switch (area) {
    case 'realistic':
      return (
        <svg viewBox="0 0 36 36" fill="none" aria-hidden="true" className={className}>
          <circle cx="18" cy="18" r="16" fill="#F9F3EC" stroke="#E9D8D1" />
          <path d="M12 24L22 14M20 12L24 16M11 15L15 11L18 14L14 18Z" stroke="#762D50" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'investigative':
      return (
        <svg viewBox="0 0 36 36" fill="none" aria-hidden="true" className={className}>
          <circle cx="18" cy="18" r="16" fill="#F9F3EC" stroke="#E9D8D1" />
          <circle cx="16" cy="16" r="5.5" stroke="#351B38" strokeWidth="1.6" />
          <path d="M20.5 20.5L25 25" stroke="#C6A56B" strokeWidth="1.9" strokeLinecap="round" />
        </svg>
      );
    case 'artistic':
      return (
        <svg viewBox="0 0 36 36" fill="none" aria-hidden="true" className={className}>
          <circle cx="18" cy="18" r="16" fill="#F9F3EC" stroke="#E9D8D1" />
          <path d="M18 10C13 10 10 14 10 18.5C10 22 12.5 24 15 24C16.2 24 17 23.2 17 22C17 21 17.8 20.2 19 20.2H21.5C24 20.2 26 18.2 26 15.8C26 12.5 22.5 10 18 10Z" stroke="#C47C91" strokeWidth="1.6" />
          <circle cx="15" cy="15.5" r="1.2" fill="#762D50" />
          <circle cx="19" cy="14" r="1.2" fill="#C6A56B" />
        </svg>
      );
    case 'social':
      return (
        <svg viewBox="0 0 36 36" fill="none" aria-hidden="true" className={className}>
          <circle cx="18" cy="18" r="16" fill="#F9F3EC" stroke="#E9D8D1" />
          <circle cx="15" cy="14" r="3" stroke="#762D50" strokeWidth="1.5" />
          <circle cx="21.5" cy="15" r="2.4" stroke="#C47C91" strokeWidth="1.4" />
          <path d="M10.5 23.5C11.3 20.5 13 19.2 15.2 19.2C17.4 19.2 19.1 20.5 19.8 23.5M19 22.8C19.6 20.8 21 19.8 22.7 19.8C24.2 19.8 25.3 20.8 25.8 22.8" stroke="#351B38" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'enterprising':
      return (
        <svg viewBox="0 0 36 36" fill="none" aria-hidden="true" className={className}>
          <circle cx="18" cy="18" r="16" fill="#F9F3EC" stroke="#E9D8D1" />
          <path d="M12 23L16.5 18L19.5 20.5L24.5 13.5M24.5 13.5H20.5M24.5 13.5V17.5" stroke="#762D50" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'conventional':
      return (
        <svg viewBox="0 0 36 36" fill="none" aria-hidden="true" className={className}>
          <circle cx="18" cy="18" r="16" fill="#F9F3EC" stroke="#E9D8D1" />
          <rect x="12" y="11" width="12" height="14" rx="2" stroke="#351B38" strokeWidth="1.5" />
          <path d="M15 15.5H21M15 19H21M15 22H18.5" stroke="#C6A56B" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
  }
}

export function CategoryIllustration({
  category,
  className = 'w-12 h-12',
}: {
  category: MajorCategory;
  className?: string;
}) {
  const palette: Record<MajorCategory, { bg: string; stroke: string; accent: string }> = {
    health_medicine: { bg: '#F9F3EC', stroke: '#762D50', accent: '#C6A56B' },
    engineering: { bg: '#F9F3EC', stroke: '#351B38', accent: '#C6A56B' },
    computing_tech: { bg: '#F9F3EC', stroke: '#351B38', accent: '#C47C91' },
    sciences: { bg: '#F9F3EC', stroke: '#762D50', accent: '#C47C91' },
    education: { bg: '#F9F3EC', stroke: '#762D50', accent: '#C6A56B' },
    law_management_econ: { bg: '#F9F3EC', stroke: '#351B38', accent: '#C6A56B' },
    arts_media: { bg: '#F9F3EC', stroke: '#762D50', accent: '#C47C91' },
    humanities_social: { bg: '#F9F3EC', stroke: '#351B38', accent: '#C47C91' },
    agriculture_env: { bg: '#F9F3EC', stroke: '#762D50', accent: '#C6A56B' },
  };
  const c = palette[category];

  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      <rect x="4" y="4" width="56" height="56" rx="14" fill={c.bg} stroke="#E9D8D1" strokeWidth="1.5" />
      {category === 'health_medicine' && (
        <>
          <path d="M32 20V44M20 32H44" stroke={c.stroke} strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="32" cy="32" r="15" stroke={c.accent} strokeWidth="1.3" strokeDasharray="3 3" />
        </>
      )}
      {category === 'engineering' && (
        <>
          <path d="M18 44L32 18L46 44H18Z" stroke={c.stroke} strokeWidth="2" strokeLinejoin="round" />
          <path d="M25 36H39" stroke={c.accent} strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="32" cy="18" r="2.8" fill={c.stroke} />
        </>
      )}
      {category === 'computing_tech' && (
        <>
          <rect x="16" y="19" width="32" height="21" rx="3" stroke={c.stroke} strokeWidth="2" />
          <path d="M13 44H51" stroke={c.stroke} strokeWidth="2" strokeLinecap="round" />
          <path d="M27 26L23 29.5L27 33M37 26L41 29.5L37 33" stroke={c.accent} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {category === 'sciences' && (
        <>
          <path d="M27 17H37M29 17V25L20 42C19 44 20.5 46 23 46H41C43.5 46 45 44 44 42L35 25V17" stroke={c.stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 37H40" stroke={c.accent} strokeWidth="1.8" />
        </>
      )}
      {category === 'education' && (
        <>
          <path d="M18 22C23 20 28 21 32 24C36 21 41 20 46 22V42C41 40 36 41 32 44C28 41 23 40 18 42V22Z" stroke={c.stroke} strokeWidth="2" strokeLinejoin="round" />
          <path d="M32 24V44" stroke={c.accent} strokeWidth="1.6" />
        </>
      )}
      {category === 'law_management_econ' && (
        <>
          <path d="M32 17V45M22 45H42M20 24H44" stroke={c.stroke} strokeWidth="2" strokeLinecap="round" />
          <path d="M16 34C16 36.5 24 36.5 24 34L20 24L16 34ZM40 34C40 36.5 48 36.5 48 34L44 24L40 34Z" stroke={c.accent} strokeWidth="1.7" strokeLinejoin="round" />
        </>
      )}
      {category === 'arts_media' && (
        <>
          <circle cx="32" cy="32" r="14" stroke={c.stroke} strokeWidth="2" />
          <path d="M32 18C35 24 35 40 32 46M18 32C24 29 40 29 46 32" stroke={c.accent} strokeWidth="1.6" />
          <circle cx="32" cy="32" r="3.6" fill={c.stroke} />
        </>
      )}
      {category === 'humanities_social' && (
        <>
          <path d="M22 21H42C44 21 45 22.5 45 24.5V35.5C45 37.5 44 39 42 39H30L23 45V39H22C20 39 19 37.5 19 35.5V24.5C19 22.5 20 21 22 21Z" stroke={c.stroke} strokeWidth="2" strokeLinejoin="round" />
          <path d="M26 28H38M26 33H34" stroke={c.accent} strokeWidth="1.6" strokeLinecap="round" />
        </>
      )}
      {category === 'agriculture_env' && (
        <>
          <path d="M32 45V29M32 34C22 34 19 26 20 19C28 19 33 24 32 34ZM32 31C42 31 45 23 44 17C36 17 31 22 32 31Z" stroke={c.stroke} strokeWidth="2" strokeLinejoin="round" />
        </>
      )}
    </svg>
  );
}
