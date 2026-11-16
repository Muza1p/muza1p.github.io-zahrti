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
    <header className="sticky top-0 z-40 border-b border-[#E8CED5]/80 bg-[#FDF9F6]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-3 sm:px-6">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('/');
          }}
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 text-[#381F2E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A9506C] rounded-lg"
        >
          <ZahrtiBlossomMark className="h-7 w-7 shrink-0" />
          <span className="font-display text-lg font-bold tracking-tight">
            ZAHRTI · زهرتي
          </span>
        </a>

        {/* Zone 2: 4 concise single-line text nav links */}
        <nav
          aria-label="التنقل الرئيسي"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#69495B]"
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
                    ? 'border-[#A9506C] text-[#381F2E] font-semibold'
                    : 'border-transparent hover:text-[#381F2E] hover:border-[#E8CED5]'
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
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#A9506C] px-5 py-2 text-sm font-medium text-white shadow-xs transition-colors hover:bg-[#913F59] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A9506C] whitespace-nowrap shrink-0 cursor-pointer"
          >
            {primaryCtaLabel}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            className="inline-flex md:hidden min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-[#E8CED5] bg-[#FFFDFB] text-[#381F2E] hover:bg-[#F7E7EB] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          aria-label="قائمة الهاتف"
          className="md:hidden border-t border-[#E8CED5] bg-[#FFFDFB] px-4 py-4 space-y-2"
        >
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/');
            }}
            className="block rounded-xl px-4 py-2.5 text-sm font-medium text-[#381F2E] hover:bg-[#FBF1F3]"
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
                  ? 'bg-[#F7E7EB] text-[#381F2E] font-semibold'
                  : 'text-[#69495B] hover:bg-[#FBF1F3]'
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
            className="block rounded-xl px-4 py-2.5 text-sm font-medium text-[#69495B] hover:bg-[#FBF1F3]"
          >
            المصادر والمنهجية
          </a>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleLinkClick(primaryCtaTarget)}
              className="w-full min-h-[44px] rounded-full bg-[#A9506C] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#913F59] cursor-pointer"
            >
              {primaryCtaLabel}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
