import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ZahrtiBlossomMark } from '@/src/components/ornaments/BotanicalArt';

interface NavbarProps {
  currentPath: string;
  onNavigate: (to: string) => void;
  answeredCount: number;
  hasResult: boolean;
}

const NAV_LINKS = [
  { label: 'الاهتمامات', path: '/interests' },
  { label: 'التخصصات', path: '/majors' },
  { label: 'مقارنة', path: '/compare' },
  { label: 'عن الاختبار', path: '/about' },
];

export function Navbar({
  currentPath,
  onNavigate,
  answeredCount,
  hasResult,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = (path: string) => {
    setMobileOpen(false);
    onNavigate(path);
  };

  const primaryCtaLabel = hasResult
    ? 'عرض النتيجة'
    : answeredCount > 0 && answeredCount < 30
    ? 'متابعة الاختبار'
    : 'ابدئي الاختبار';

  const primaryCtaTarget = hasResult
    ? '/results'
    : answeredCount > 0 && answeredCount < 30
    ? '/quiz'
    : '/intro';

  return (
    <header className="sticky top-0 z-40 border-b border-[#EAD3E0] bg-[#FFF8F3]/98">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-3 sm:px-6">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('/');
          }}
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 text-[#351B38] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C04472] rounded-lg"
        >
          <ZahrtiBlossomMark className="h-7 w-7 shrink-0" />
          <span className="font-display text-lg font-bold tracking-tight">
            ZAHRTI · زهرتي
          </span>
        </a>

        {/* Zone 2: 4 concise single-line text nav links */}
        <nav
          aria-label="التنقل الرئيسي"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5F4163]"
        >
          {NAV_LINKS.map((link) => {
            const isActive =
              currentPath === link.path ||
              (link.path === '/majors' && currentPath.startsWith('/majors/'));
            return (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.path);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`whitespace-nowrap shrink-0 py-1 transition-colors border-b-2 ${
                  isActive
                    ? 'border-[#C04472] text-[#351B38] font-semibold'
                    : 'border-transparent hover:text-[#351B38] hover:border-[#F2A6C1]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary CTA + Mobile drawer toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleLinkClick(primaryCtaTarget)}
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-gradient-to-l from-[#C04472] to-[#7651B8] px-5 py-2 text-sm font-medium text-white shadow-xs transition-opacity hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C04472] whitespace-nowrap shrink-0 cursor-pointer"
          >
            {primaryCtaLabel}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            className="inline-flex md:hidden min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-[#EAD3E0] bg-[#FFFCFA] text-[#351B38] hover:bg-[#FDF0F5] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          aria-label="قائمة الهاتف"
          className="md:hidden border-t border-[#EAD3E0] bg-[#FFFCFA] px-4 py-4 space-y-2"
        >
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/');
            }}
            className="block rounded-xl px-4 py-2.5 text-sm font-medium text-[#351B38] hover:bg-[#FDF0F5]"
          >
            الرئيسية
          </a>
          {NAV_LINKS.map((link) => (
            <a
              key={link.path}
              href={link.path}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.path);
              }}
              className={`block rounded-xl px-4 py-2.5 text-sm font-medium ${
                currentPath === link.path
                  ? 'bg-[#FDF0F5] text-[#C04472] font-semibold'
                  : 'text-[#5F4163] hover:bg-[#FDF0F5]'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/methodology"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/methodology');
            }}
            className="block rounded-xl px-4 py-2.5 text-sm font-medium text-[#5F4163] hover:bg-[#FDF0F5]"
          >
            المصادر والمنهجية
          </a>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleLinkClick(primaryCtaTarget)}
              className="w-full min-h-[44px] rounded-full bg-gradient-to-l from-[#C04472] to-[#7651B8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-95 cursor-pointer"
            >
              {primaryCtaLabel}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
