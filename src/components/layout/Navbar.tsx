import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ZahrtiBlossomMark } from '@/src/components/ornaments/BotanicalArt';
import { toHref } from '@/src/hooks/useRouter';
import { PersonId } from '@/src/types';

interface NavbarProps {
  currentPath: string;
  onNavigate: (to: string) => void;
  activePersonId: PersonId;
  activePersonName: string;
  answeredCount: number;
  hasResult: boolean;
}

const NAV_LINKS = [
  { label: 'التخصصات', path: '/majors' },
  { label: 'التوافق', path: '/compatibility' },
  { label: 'عالمنا', path: '/our-world' },
  { label: 'الإعدادات', path: '/settings' },
];

export function Navbar({
  currentPath,
  onNavigate,
  activePersonName,
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
    <header className="sticky top-0 z-40 border-b border-[#E9D8D1] bg-[#F9F3EC]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3.5 sm:px-6">
        {/* Zone 1: Editorial Wordmark */}
        <a
          href={toHref('/')}
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('/');
          }}
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 text-[#351B38] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#762D50]"
        >
          <ZahrtiBlossomMark className="h-7 w-7 shrink-0" />
          <span className="font-display text-lg font-bold tracking-tight">
            زهرتي · <span dir="ltr" className="text-base font-semibold text-[#762D50]">ZAHRTI</span>
          </span>
        </a>

        {/* Zone 2: 4 Clean Single-Line Nav Links */}
        <nav
          aria-label="التنقل الرئيسي"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5F4562]"
        >
          {NAV_LINKS.map((link) => {
            const isActive =
              currentPath === link.path ||
              (link.path === '/majors' && currentPath.startsWith('/majors/'));
            return (
              <a
                key={link.path}
                href={toHref(link.path)}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.path);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`whitespace-nowrap shrink-0 py-1 transition-colors border-b-2 ${
                  isActive
                    ? 'border-[#762D50] text-[#351B38] font-semibold'
                    : 'border-transparent hover:text-[#351B38] hover:border-[#C47C91]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Active Profile Indicator + 1 Primary CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleLinkClick('/intro')}
            title="تبديل الشخص النشط"
            className="hidden lg:inline-flex items-center gap-1.5 text-xs font-medium text-[#5F4562] hover:text-[#351B38] border-b border-[#C6A56B]/50 pb-0.5 whitespace-nowrap cursor-pointer"
          >
            <span className="text-[#9F7E44]">الجلسة:</span>
            <span className="font-semibold text-[#351B38]">{activePersonName}</span>
          </button>

          <button
            type="button"
            onClick={() => handleLinkClick(primaryCtaTarget)}
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#762D50] px-5 py-2 text-sm font-medium text-[#F9F3EC] transition-colors hover:bg-[#5D223E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#762D50] whitespace-nowrap shrink-0 cursor-pointer"
          >
            {primaryCtaLabel}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            className="inline-flex md:hidden min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-[#E9D8D1] bg-[#FFFDF9] text-[#351B38] hover:bg-[#F4EAE3] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          aria-label="قائمة الهاتف"
          className="md:hidden border-t border-[#E9D8D1] bg-[#FFFDF9] px-4 py-4 space-y-1.5"
        >
          <div className="flex items-center justify-between border-b border-[#E9D8D1] pb-3 mb-2 text-xs">
            <span className="text-[#5F4562]">
              الجلسة الحالية: <strong className="text-[#351B38]">{activePersonName}</strong>
            </span>
            <button
              type="button"
              onClick={() => handleLinkClick('/intro')}
              className="font-semibold text-[#762D50] hover:underline cursor-pointer"
            >
              تبديل
            </button>
          </div>

          <a
            href={toHref('/')}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/');
            }}
            className="block rounded-xl px-4 py-2.5 text-sm font-medium text-[#351B38] hover:bg-[#F9F3EC]"
          >
            الرئيسية
          </a>

          {NAV_LINKS.map((link) => (
            <a
              key={link.path}
              href={toHref(link.path)}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.path);
              }}
              className={`block rounded-xl px-4 py-2.5 text-sm font-medium ${
                currentPath === link.path
                  ? 'bg-[#F9F3EC] text-[#762D50] font-semibold'
                  : 'text-[#5F4562] hover:bg-[#F9F3EC]'
              }`}
            >
              {link.label}
            </a>
          ))}

          <a
            href={toHref('/interests')}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/interests');
            }}
            className="block rounded-xl px-4 py-2.5 text-sm font-medium text-[#5F4562] hover:bg-[#F9F3EC]"
          >
            أنماط الاهتمامات الستة
          </a>
          <a
            href={toHref('/compare')}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/compare');
            }}
            className="block rounded-xl px-4 py-2.5 text-sm font-medium text-[#5F4562] hover:bg-[#F9F3EC]"
          >
            مقارنة التخصصات
          </a>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleLinkClick(primaryCtaTarget)}
              className="w-full min-h-[44px] rounded-full bg-[#762D50] px-5 py-2.5 text-sm font-medium text-[#F9F3EC] hover:bg-[#5D223E] cursor-pointer"
            >
              {primaryCtaLabel}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
