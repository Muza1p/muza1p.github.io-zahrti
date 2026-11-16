import React, { useMemo, useState } from 'react';
import { ArrowLeft, Bookmark, GitCompare, Search } from 'lucide-react';
import { CategoryIllustration, EditorialCrest } from '@/src/components/ornaments/BotanicalArt';
import { MAJOR_CATEGORIES, MAJORS_CATALOG } from '@/src/data/majors/majorsCatalog';
import { CredentialType, MajorCategory } from '@/src/types';

interface MajorsPageProps {
  favoriteMajorIds: string[];
  compareIds: string[];
  onToggleFavorite: (majorId: string) => void;
  onToggleCompare: (majorId: string) => void;
  onNavigate: (to: string) => void;
}

export function MajorsPage({
  favoriteMajorIds,
  compareIds,
  onToggleFavorite,
  onToggleCompare,
  onNavigate,
}: MajorsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCredential, setSelectedCredential] = useState<'all' | CredentialType>('all');
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);

  const filteredMajors = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return MAJORS_CATALOG.filter((m) => {
      if (onlyFavorites && !favoriteMajorIds.includes(m.id)) {
        return false;
      }
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
  }, [favoriteMajorIds, onlyFavorites, searchQuery, selectedCategory, selectedCredential]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E9D8D1] pb-6">
        <div className="space-y-2">
          <EditorialCrest className="w-12 h-7" />
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#351B38]">
            دليل التخصصات الجامعية والمسارات
          </h1>
          <p className="max-w-2xl text-sm sm:text-base text-[#5F4562]">
            قاعدة معرفية تغطي تسعة مجالات علمية وإنسانية وتقنية، مع إمكانية حفظ التخصصات المفضلة
            والمقارنة بينها بوضوح.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setOnlyFavorites((v) => !v)}
            className={`inline-flex min-h-[42px] items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
              onlyFavorites
                ? 'border-[#762D50] bg-[#762D50] text-[#F9F3EC]'
                : 'border-[#E9D8D1] bg-[#FFFDF9] text-[#351B38] hover:border-[#762D50]'
            }`}
          >
            <Bookmark className="h-4 w-4" aria-hidden="true" />
            <span>المفضلة ({favoriteMajorIds.length})</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/compare')}
            className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-[#351B38] bg-[#FFFDF9] px-5 py-2 text-sm font-medium text-[#351B38] hover:bg-[#351B38] hover:text-[#F9F3EC] transition-colors cursor-pointer whitespace-nowrap"
          >
            <GitCompare className="h-4 w-4" aria-hidden="true" />
            <span>المقارنة ({compareIds.length})</span>
          </button>
        </div>
      </header>

      {/* Search & Filters */}
      <section
        aria-label="أدوات البحث والتصفية"
        className="rounded-3xl border border-[#E9D8D1] bg-[#FFFDF9] p-5 space-y-4"
      >
        <div className="grid gap-4 md:grid-cols-12">
          <div className="md:col-span-6">
            <label htmlFor="majors-search" className="sr-only">
              ابحثي عن تخصص
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6F5472]"
                aria-hidden="true"
              />
              <input
                id="majors-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحثي باسم التخصص أو المجال (مثل: الصيدلة، البرمجيات، التصميم)..."
                className="w-full min-h-[44px] rounded-xl border border-[#E9D8D1] bg-[#F9F3EC] pr-10 pl-4 text-sm text-[#351B38] placeholder:text-[#6F5472]/60 focus:border-[#762D50] focus:outline-none"
              />
            </div>
          </div>

          <div className="md:col-span-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-[#5F4562] ml-1">نوع الشهادة:</span>
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
                    ? 'border-[#762D50] bg-[#762D50] text-[#F9F3EC]'
                    : 'border-[#E9D8D1] bg-[#F9F3EC] text-[#5F4562] hover:border-[#762D50]'
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
                ? 'border-[#351B38] bg-[#351B38] text-[#F9F3EC]'
                : 'border-[#E9D8D1] bg-white text-[#5F4562] hover:bg-[#F9F3EC]'
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
                  ? 'border-[#762D50] bg-[#762D50] text-[#F9F3EC]'
                  : 'border-[#E9D8D1] bg-white text-[#5F4562] hover:bg-[#F9F3EC]'
              }`}
            >
              {cat.labelAr}
            </button>
          ))}
        </div>
      </section>

      {/* Majors List / Empty State */}
      {filteredMajors.length === 0 ? (
        <div className="rounded-3xl border border-[#E9D8D1] bg-[#FFFDF9] p-10 text-center space-y-3">
          <p className="font-display text-lg font-bold text-[#351B38]">
            {onlyFavorites
              ? 'قائمة المفضلة فارغة حالياً'
              : 'لم نجد تخصصاً يطابق خيارات البحث الحالية'}
          </p>
          <p className="text-sm text-[#5F4562]">
            {onlyFavorites
              ? 'اضغطي على زر الحفظ بجانب أي تخصص لإضافته إلى مفضلتج والعودة إليه لاحقاً.'
              : 'جربي مسح كلمة البحث أو اختيار «كل المجالات» لعرض جميع التخصصات.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedCredential('all');
              setOnlyFavorites(false);
            }}
            className="mt-2 rounded-full bg-[#762D50] px-5 py-2 text-xs font-medium text-[#F9F3EC] hover:bg-[#5D223E] cursor-pointer"
          >
            إعادة ضبط الفلاتر
          </button>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredMajors.map((major) => {
            const isInCompare = compareIds.includes(major.id);
            const isFav = favoriteMajorIds.includes(major.id);
            return (
              <article
                key={major.id}
                className="rounded-2xl border border-[#E9D8D1] bg-[#FFFDF9] p-5 flex flex-col justify-between gap-4 hover:border-[#762D50]/60 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <CategoryIllustration
                        category={major.category}
                        className="h-12 w-12 shrink-0"
                      />
                      <div className="min-w-0 space-y-1">
                        <p className="text-xs text-[#6F5472]">
                          {major.categoryLabelAr} ·{' '}
                          <span className="font-semibold text-[#762D50]">
                            {major.credentialLabelAr}
                          </span>
                        </p>
                        <h2 className="font-display text-lg font-bold text-[#351B38]">
                          {major.nameAr}
                        </h2>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onToggleFavorite(major.id)}
                      aria-label={isFav ? `إزالة ${major.nameAr} من المفضلة` : `حفظ ${major.nameAr} في المفضلة`}
                      className={`p-2 rounded-full border transition-colors shrink-0 cursor-pointer ${
                        isFav
                          ? 'border-[#762D50] bg-[#762D50] text-[#F9F3EC]'
                          : 'border-[#E9D8D1] bg-[#F9F3EC] text-[#5F4562] hover:border-[#762D50]'
                      }`}
                    >
                      <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>

                  <p className="text-sm leading-relaxed text-[#5F4562]">
                    {major.shortDescriptionAr}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#E9D8D1]">
                  <button
                    type="button"
                    onClick={() => onToggleCompare(major.id)}
                    className={`min-h-[38px] whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                      isInCompare
                        ? 'border-[#351B38] bg-[#351B38] text-[#F9F3EC]'
                        : 'border-[#E9D8D1] bg-white text-[#5F4562] hover:bg-[#F9F3EC]'
                    }`}
                  >
                    {isInCompare ? 'في المقارنة ✓' : 'قارني'}
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate(`/majors/${major.id}`)}
                    className="inline-flex min-h-[38px] whitespace-nowrap items-center gap-1.5 rounded-full bg-[#762D50] px-4 py-1.5 text-xs font-medium text-[#F9F3EC] hover:bg-[#5D223E] cursor-pointer"
                  >
                    <span>التفاصيل</span>
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
