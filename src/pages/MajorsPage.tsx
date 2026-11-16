import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, GitCompare, Search } from 'lucide-react';
import { CharacterStage } from '@/src/components/characters/CharacterStage';
import { CoquetteRibbonBow } from '@/src/components/ornaments/BotanicalArt';
import { DOMAIN_CHARACTER_MAP } from '@/src/data/characters/kawaiiCharacters';
import { MAJOR_CATEGORIES, MAJORS_CATALOG } from '@/src/data/majors/majorsCatalog';
import { CredentialType, MajorCategory } from '@/src/types';

interface MajorsPageProps {
  compareIds: string[];
  onToggleCompare: (majorId: string) => void;
  onNavigate: (to: string) => void;
}

const CREDENTIAL_STYLES: Record<CredentialType, { bg: string; text: string; border: string }> = {
  bachelor: { bg: '#FDF0F5', text: '#C04472', border: '#F2C6D8' },
  diploma_institute: { bg: '#F4EFFB', text: '#7651B8', border: '#D8C9F2' },
  vocational_certificate: { bg: '#FCF7EC', text: '#9F7C33', border: '#EAD8AF' },
};

export function MajorsPage({
  compareIds,
  onToggleCompare,
  onNavigate,
}: MajorsPageProps) {
  const initialCat = (() => {
    if (typeof window === 'undefined') return 'all';
    const p = new URLSearchParams(window.location.search).get('category');
    return p || 'all';
  })();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCat);
  const [selectedCredential, setSelectedCredential] = useState<'all' | CredentialType>('all');

  const filteredMajors = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return MAJORS_CATALOG.filter((m) => {
      if (selectedCategory !== 'all' && m.category !== (selectedCategory as MajorCategory)) {
        return false;
      }
      if (selectedCredential !== 'all' && m.credentialType !== selectedCredential) {
        return false;
      }
      if (!q) return true;
      return (
        m.nameAr.toLowerCase().includes(q) ||
        m.nameEn.toLowerCase().includes(q) ||
        m.shortDescriptionAr.toLowerCase().includes(q) ||
        m.categoryLabelAr.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedCategory, selectedCredential]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <CoquetteRibbonBow className="w-12 h-7" />
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#351B38]">
            دليل التخصصات الجامعية والمسارات
          </h1>
          <p className="max-w-2xl text-sm sm:text-base text-[#5F4163]">
            قاعدة معرفية تغطي تسعة مجالات علمية وإنسانية وتقنية، مع تمييز واضح بين مسار
            البكالوريوس والدبلوم التقني والشهادات المهنية.
          </p>
          <p className="text-xs text-[#6E5073]">
            الشخصيات مخصصة للشرح البصري والتمييز بين المجالات فقط، ولا تعني أن مجالاً معيناً أنسب لطالبة لمجرد الصورة.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('/compare')}
          className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-[#B49AE8] bg-[#F4EFFB] px-5 py-2 text-sm font-medium text-[#351B38] hover:bg-[#EAE0F8] cursor-pointer self-start md:self-auto whitespace-nowrap"
        >
          <GitCompare className="h-4 w-4 text-[#7651B8]" aria-hidden="true" />
          <span>مقارنة المختارة ({compareIds.length})</span>
        </button>
      </header>

      {/* Search & Filters */}
      <section
        aria-label="أدوات البحث والتصفية"
        className="rounded-3xl border border-[#EAD3E0] bg-[#FFFCFA] p-5 space-y-4 shadow-[0_10px_34px_-24px_rgba(53,27,56,0.18)]"
      >
        <div className="grid gap-4 md:grid-cols-12">
          <div className="md:col-span-6">
            <label htmlFor="majors-search" className="sr-only">
              ابحثي عن تخصص
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6E5073]"
                aria-hidden="true"
              />
              <input
                id="majors-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحثي باسم التخصص أو المجال (مثل: الصيدلة، البرمجيات، التصميم)..."
                className="w-full min-h-[44px] rounded-2xl border border-[#EAD3E0] bg-[#FFF8F3] pr-10 pl-4 text-sm text-[#351B38] placeholder:text-[#7E6083] focus:border-[#C04472] focus:outline-none"
              />
            </div>
          </div>

          <div className="md:col-span-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-[#5F4163] ml-1">نوع الشهادة:</span>
            {(
              [
                { id: 'all', label: 'الجميع' },
                { id: 'bachelor', label: 'بكالوريوس جامعي' },
                { id: 'diploma_institute', label: 'دبلوم / معهد' },
                { id: 'vocational_certificate', label: 'شهادة مهنية' },
              ] as const
            ).map((cred) => (
              <button
                key={cred.id}
                type="button"
                onClick={() => setSelectedCredential(cred.id)}
                className={`min-h-[38px] whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  selectedCredential === cred.id
                    ? 'border-[#C04472] bg-[#C04472] text-white'
                    : 'border-[#EAD3E0] bg-[#FFF8F3] text-[#5F4163] hover:bg-[#FDF0F5]'
                }`}
              >
                {cred.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category filter bar */}
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`min-h-[36px] whitespace-nowrap rounded-full border px-3.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'border-[#351B38] bg-[#351B38] text-white'
                : 'border-[#EAD3E0] bg-white text-[#5F4163] hover:bg-[#FDF0F5]'
            }`}
          >
            كل المجالات ({MAJORS_CATALOG.length})
          </button>
          {MAJOR_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`min-h-[36px] whitespace-nowrap rounded-full border px-3.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'border-[#7651B8] bg-[#7651B8] text-white'
                  : 'border-[#EAD3E0] bg-white text-[#5F4163] hover:bg-[#F4EFFB]'
              }`}
            >
              {cat.labelAr}
            </button>
          ))}
        </div>
      </section>

      {/* Majors List / Empty State */}
      {filteredMajors.length === 0 ? (
        <div className="rounded-3xl border border-[#EAD3E0] bg-[#FFFCFA] p-10 text-center space-y-3">
          <p className="font-display text-lg font-bold text-[#351B38]">
            لم نجد تخصصاً يطابق خيارات البحث الحالية
          </p>
          <p className="text-sm text-[#5F4163]">
            جربي مسح كلمة البحث أو اختيار «كل المجالات» لعرض جميع التخصصات المتوفرة.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedCredential('all');
            }}
            className="mt-2 rounded-full bg-[#C04472] px-5 py-2 text-xs font-medium text-white hover:bg-[#A6345F] cursor-pointer"
          >
            إعادة ضبط الفلاتر
          </button>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredMajors.map((major) => {
            const isInCompare = compareIds.includes(major.id);
            const credStyle = CREDENTIAL_STYLES[major.credentialType];
            return (
              <motion.article
                key={major.id}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="rounded-3xl border border-[#EAD3E0] bg-[#FFFCFA] p-5 flex flex-col justify-between gap-4 hover:border-[#C04472]/70 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-start gap-3.5">
                    <CharacterStage
                      characterId={DOMAIN_CHARACTER_MAP[major.category]}
                      variant="avatar"
                      interactive={false}
                      className="h-16 w-16 shrink-0"
                    />
                    <div className="min-w-0 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-1.5 text-xs">
                        <span className="text-[#6E5073]">{major.categoryLabelAr}</span>
                        <span
                          className="rounded-md border px-2 py-0.5 text-[11px] font-semibold"
                          style={{
                            backgroundColor: credStyle.bg,
                            color: credStyle.text,
                            borderColor: credStyle.border,
                          }}
                        >
                          {major.credentialLabelAr}
                        </span>
                      </div>
                      <h2 className="font-display text-lg font-bold text-[#351B38]">
                        {major.nameAr}
                      </h2>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-[#4F3553]">
                    {major.shortDescriptionAr}
                  </p>
                  <p className="text-xs text-[#6E5073]">
                    حالة التوثيق:{' '}
                    {major.verificationStatus === 'verified_official'
                      ? 'موثق من مواقع جامعات/وزارات رسمية'
                      : 'موثق جزئياً — راجعي دليل القبول السنوي'}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#F2E2EB]">
                  <button
                    type="button"
                    onClick={() => onToggleCompare(major.id)}
                    className={`min-h-[38px] whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                      isInCompare
                        ? 'border-[#7651B8] bg-[#F4EFFB] text-[#351B38]'
                        : 'border-[#EAD3E0] bg-white text-[#5F4163] hover:bg-[#FDF0F5]'
                    }`}
                  >
                    {isInCompare ? 'في المقارنة ✓' : 'قارني'}
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate(`/majors/${major.id}`)}
                    className="inline-flex min-h-[38px] whitespace-nowrap items-center gap-1.5 rounded-full bg-gradient-to-l from-[#C04472] to-[#7651B8] px-4 py-1.5 text-xs font-medium text-white hover:opacity-95 cursor-pointer"
                  >
                    <span>اكتشفي التفاصيل</span>
                    <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}
    </div>
  );
}
