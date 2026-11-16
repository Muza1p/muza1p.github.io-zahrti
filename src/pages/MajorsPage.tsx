import React, { useMemo, useState } from 'react';
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
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#381F2E]">
            دليل التخصصات الجامعية والمسارات
          </h1>
          <p className="max-w-2xl text-sm sm:text-base text-[#69495B]">
            قاعدة معرفية قابلة للتوسع تغطي تسعة مجالات علمية وإنسانية وتقنية، مع فصل واضح بين
            شهادة البكالوريوس والدبلوم التقني والشهادات المهنية.
          </p>
          <p className="text-xs text-[#7A596C]">
            الشخصيات ثلاثية الأبعاد مخصصة للشرح البصري والتمييز بين المجالات فقط، ولا تعني أن
            مجالاً معيناً أنسب لطالبة لمجرد الصورة.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('/compare')}
          className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-[#D8CBE7] bg-[#F4EFF8] px-5 py-2 text-sm font-medium text-[#381F2E] hover:bg-[#EAE0F3] cursor-pointer self-start md:self-auto whitespace-nowrap"
        >
          <GitCompare className="h-4 w-4 text-[#8E74A8]" aria-hidden="true" />
          <span>مقارنة المختارة ({compareIds.length})</span>
        </button>
      </header>

      {/* Search & Filters */}
      <section
        aria-label="أدوات البحث والتصفية"
        className="rounded-3xl border border-[#E8CED5] bg-[#FFFDFB] p-5 space-y-4"
      >
        <div className="grid gap-4 md:grid-cols-12">
          <div className="md:col-span-6">
            <label htmlFor="majors-search" className="sr-only">
              ابحثي عن تخصص
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7A596C]"
                aria-hidden="true"
              />
              <input
                id="majors-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحثي باسم التخصص أو المجال (مثل: الصيدلة، البرمجيات، التصميم)..."
                className="w-full min-h-[44px] rounded-2xl border border-[#E8CED5] bg-[#FDF9F6] pr-10 pl-4 text-sm text-[#381F2E] placeholder:text-[#8E6F80] focus:border-[#A9506C] focus:outline-none"
              />
            </div>
          </div>

          <div className="md:col-span-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-[#69495B] ml-1">نوع الشهادة:</span>
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
                    ? 'border-[#A9506C] bg-[#A9506C] text-white'
                    : 'border-[#E8CED5] bg-[#FDF9F6] text-[#69495B] hover:bg-[#FBF1F3]'
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
                ? 'border-[#381F2E] bg-[#381F2E] text-white'
                : 'border-[#E8CED5] bg-white text-[#69495B] hover:bg-[#FBF1F3]'
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
                  ? 'border-[#381F2E] bg-[#381F2E] text-white'
                  : 'border-[#E8CED5] bg-white text-[#69495B] hover:bg-[#FBF1F3]'
              }`}
            >
              {cat.labelAr}
            </button>
          ))}
        </div>
      </section>

      {/* Majors List / Empty State */}
      {filteredMajors.length === 0 ? (
        <div className="rounded-3xl border border-[#E8CED5] bg-[#FFFDFB] p-10 text-center space-y-3">
          <p className="font-display text-lg font-bold text-[#381F2E]">
            لم نجد تخصصاً يطابق خيارات البحث الحالية
          </p>
          <p className="text-sm text-[#69495B]">
            جربي مسح كلمة البحث أو اختيار «كل المجالات» لعرض جميع التخصصات المتوفرة.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedCredential('all');
            }}
            className="mt-2 rounded-full bg-[#A9506C] px-5 py-2 text-xs font-medium text-white hover:bg-[#913F59] cursor-pointer"
          >
            إعادة ضبط الفلاتر
          </button>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredMajors.map((major) => {
            const isInCompare = compareIds.includes(major.id);
            return (
              <article
                key={major.id}
                className="rounded-3xl border border-[#E8CED5] bg-[#FFFDFB] p-5 flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start gap-3.5">
                    <CharacterStage
                      characterId={DOMAIN_CHARACTER_MAP[major.category]}
                      variant="avatar"
                      interactive={false}
                      className="h-16 w-16 shrink-0"
                    />
                    <div className="min-w-0 space-y-1">
                      <p className="text-xs text-[#7A596C]">
                        {major.categoryLabelAr} · {major.credentialLabelAr}
                      </p>
                      <h2 className="font-display text-lg font-bold text-[#381F2E]">
                        {major.nameAr}
                      </h2>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-[#573E4E]">
                    {major.shortDescriptionAr}
                  </p>
                  <p className="text-xs text-[#7A596C]">
                    حالة التوثيق:{' '}
                    {major.verificationStatus === 'verified_official'
                      ? 'موثق من مواقع جامعات/وزارات رسمية'
                      : 'موثق جزئياً — راجعي دليل القبول السنوي'}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#F2E2E6]">
                  <button
                    type="button"
                    onClick={() => onToggleCompare(major.id)}
                    className={`min-h-[38px] whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                      isInCompare
                        ? 'border-[#8E74A8] bg-[#F4EFF8] text-[#381F2E]'
                        : 'border-[#E8CED5] bg-white text-[#69495B] hover:bg-[#FBF1F3]'
                    }`}
                  >
                    {isInCompare ? 'في المقارنة ✓' : 'قارني'}
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate(`/majors/${major.id}`)}
                    className="inline-flex min-h-[38px] whitespace-nowrap items-center gap-1.5 rounded-full bg-[#A9506C] px-4 py-1.5 text-xs font-medium text-white hover:bg-[#913F59] cursor-pointer"
                  >
                    <span>اكتشفي التفاصيل</span>
                    <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
