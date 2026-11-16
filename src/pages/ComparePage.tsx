import React, { useMemo } from 'react';
import { ArrowLeft, Info, Plus, X } from 'lucide-react';
import { CharacterStage } from '@/src/components/characters/CharacterStage';
import { CoquetteRibbonBow } from '@/src/components/ornaments/BotanicalArt';
import { DOMAIN_CHARACTER_MAP } from '@/src/data/characters/kawaiiCharacters';
import { RIASEC_ORDER, RIASEC_PROFILES } from '@/src/data/interests/riasecProfiles';
import { MAJORS_CATALOG } from '@/src/data/majors/majorsCatalog';
import { Major } from '@/src/types';

interface ComparePageProps {
  compareIds: string[];
  onToggleCompare: (majorId: string) => void;
  onSetCompareIds: (ids: string[]) => void;
  onNavigate: (to: string) => void;
}

export function ComparePage({
  compareIds,
  onToggleCompare,
  onSetCompareIds,
  onNavigate,
}: ComparePageProps) {
  const selectedMajors = useMemo(
    () =>
      compareIds
        .map((id) => MAJORS_CATALOG.find((m) => m.id === id))
        .filter((m): m is Major => Boolean(m))
        .slice(0, 3),
    [compareIds]
  );

  const availableToAdd = MAJORS_CATALOG.filter(
    (m) => !selectedMajors.some((sel) => sel.id === m.id)
  );

  const comparisonSummary = useMemo(() => {
    if (selectedMajors.length < 2) return null;

    const sharedDimensions = RIASEC_ORDER.filter((code) =>
      selectedMajors.every((m) => (m.riasecWeights[code] ?? 0) >= 0.45)
    ).map((code) => RIASEC_PROFILES[code].nameAr);

    const distinctDimensions = selectedMajors.map((m) => {
      const top = [...RIASEC_ORDER]
        .sort((a, b) => (m.riasecWeights[b] ?? 0) - (m.riasecWeights[a] ?? 0))
        .slice(0, 2)
        .map((c) => RIASEC_PROFILES[c].nameAr.replace('النمط ', ''));
      return {
        nameAr: m.nameAr,
        credentialLabelAr: m.credentialLabelAr,
        categoryLabelAr: m.categoryLabelAr,
        topTraits: top.join(' و'),
      };
    });

    const uniqueCategories = new Set(selectedMajors.map((m) => m.categoryLabelAr));
    const uniqueCredentials = new Set(selectedMajors.map((m) => m.credentialLabelAr));

    return {
      sharedDimensions,
      distinctDimensions,
      sameCategory: uniqueCategories.size === 1,
      sameCredential: uniqueCredentials.size === 1,
    };
  }, [selectedMajors]);

  const handleAddSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (!val) return;
    if (selectedMajors.length >= 3) return;
    onSetCompareIds([...selectedMajors.map((m) => m.id), val]);
    e.target.value = '';
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 space-y-8">
      <header className="space-y-2">
        <CoquetteRibbonBow className="w-12 h-7" />
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#381F2E]">
          مقارنة التخصصات
        </h1>
        <p className="max-w-2xl text-sm sm:text-base text-[#69495B]">
          قارني بين تخصصين أو ثلاثة لفهم الفروق في طبيعة الدراسة، المواد، المهارات، والتحديات.
          هذه المقارنة للمساعدة على الفهم وليست ترتيباً للأفضلية.
        </p>
      </header>

      {/* Selected majors chips + add dropdown */}
      <section className="rounded-3xl border border-[#E8CED5] bg-[#FFFDFB] p-5">
        <div className="flex flex-wrap items-center gap-3">
          {selectedMajors.map((m) => (
            <div
              key={m.id}
              className="inline-flex items-center gap-2 rounded-2xl border border-[#E8CED5] bg-[#FBF1F3] px-3.5 py-2 text-sm font-medium text-[#381F2E]"
            >
              <span>{m.nameAr}</span>
              <button
                type="button"
                onClick={() => onToggleCompare(m.id)}
                aria-label={`إزالة ${m.nameAr} من المقارنة`}
                className="rounded-full p-0.5 text-[#69495B] hover:bg-[#F4DCE2] hover:text-[#381F2E] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}

          {selectedMajors.length < 3 && (
            <div className="w-full sm:w-auto sm:max-w-xs">
              <label htmlFor="add-compare-select" className="sr-only">
                إضافة تخصص للمقارنة
              </label>
              <div className="relative flex items-center">
                <Plus
                  className="pointer-events-none absolute right-3 h-4 w-4 text-[#A9506C]"
                  aria-hidden="true"
                />
                <select
                  id="add-compare-select"
                  defaultValue=""
                  onChange={handleAddSelect}
                  className="w-full min-h-[42px] rounded-2xl border border-[#E8CED5] bg-[#FDF9F6] pr-9 pl-8 text-sm text-[#381F2E] focus:border-[#A9506C] focus:outline-none cursor-pointer"
                >
                  <option value="" disabled>
                    أضيفي تخصصاً للمقارنة...
                  </option>
                  {availableToAdd.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.nameAr} ({m.categoryLabelAr})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </section>

      {selectedMajors.length < 2 ? (
        <div className="rounded-3xl border border-[#E8CED5] bg-[#FFFDFB] p-8 text-center space-y-4">
          <p className="font-display text-lg font-bold text-[#381F2E]">
            اختاري تخصصين على الأقل للبدء بالمقارنة
          </p>
          <p className="text-sm text-[#69495B]">
            يمكنكِ إضافة تخصصات من القائمة أعلاه أو عبر دليل التخصصات.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('/majors')}
            className="rounded-full bg-[#A9506C] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#913F59] cursor-pointer"
          >
            استعراض التخصصات
          </button>
        </div>
      ) : (
        <>
          {/* Responsive stacked cards (mobile) -> 2 or 3 equal columns (desktop) */}
          <div
            className={`grid gap-5 ${
              selectedMajors.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'
            }`}
          >
            {selectedMajors.map((major) => (
              <article
                key={major.id}
                className="rounded-3xl border border-[#E8CED5] bg-[#FFFDFB] p-6 flex flex-col justify-between gap-5"
              >
                <div className="space-y-5">
                  <div className="flex items-start gap-3.5 pb-4 border-b border-[#F2E2E6]">
                    <CharacterStage
                      characterId={DOMAIN_CHARACTER_MAP[major.category]}
                      variant="avatar"
                      interactive={false}
                      className="h-16 w-16 shrink-0"
                    />
                    <div>
                      <p className="text-xs text-[#7A596C]">
                        {major.categoryLabelAr} · {major.credentialLabelAr}
                      </p>
                      <h2 className="font-display text-lg font-bold text-[#381F2E]">
                        {major.nameAr}
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div>
                      <h3 className="font-display text-xs font-bold text-[#A9506C] mb-1">
                        طبيعة الدراسة
                      </h3>
                      <p className="text-[#573E4E] leading-relaxed">{major.studyNatureAr}</p>
                    </div>

                    <div>
                      <h3 className="font-display text-xs font-bold text-[#A9506C] mb-1">
                        أبرز المواد
                      </h3>
                      <ul className="list-disc list-inside text-[#573E4E] space-y-0.5">
                        {major.sampleSubjectsAr.slice(0, 4).map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-display text-xs font-bold text-[#A9506C] mb-1">
                        المهارات المطلوبة
                      </h3>
                      <ul className="list-disc list-inside text-[#573E4E] space-y-0.5">
                        {major.usefulSkillsAr.slice(0, 3).map((sk) => (
                          <li key={sk}>{sk}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-display text-xs font-bold text-[#A9506C] mb-1">
                        أنشطة تهم الطالبة فيه
                      </h3>
                      <ul className="list-disc list-inside text-[#573E4E] space-y-0.5">
                        {major.appealingActivitiesAr.map((act) => (
                          <li key={act}>{act}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-display text-xs font-bold text-[#8B2945] mb-1">
                        التحديات
                      </h3>
                      <ul className="list-disc list-inside text-[#573E4E] space-y-0.5">
                        {major.challengesAr.map((ch) => (
                          <li key={ch}>{ch}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-display text-xs font-bold text-[#8E74A8] mb-1">
                        مجالات العمل المحتملة
                      </h3>
                      <ul className="list-disc list-inside text-[#573E4E] space-y-0.5">
                        {major.potentialCareersAr.map((job) => (
                          <li key={job}>{job}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F2E2E6]">
                  <button
                    type="button"
                    onClick={() => onNavigate(`/majors/${major.id}`)}
                    className="w-full inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-full border border-[#E8CED5] bg-[#FBF1F3] px-4 py-2 text-xs font-medium text-[#381F2E] hover:bg-[#F4DCE2] cursor-pointer"
                  >
                    <span>عرض الصفحة الكاملة للتخصص</span>
                    <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Dynamic similarities & differences summary */}
          {comparisonSummary && (
            <section className="rounded-3xl border border-[#D8CBE7] bg-[#F8F4FB] p-6 space-y-4 text-sm text-[#573E4E]">
              <div className="flex items-center gap-2 font-display font-bold text-[#381F2E]">
                <Info className="h-4 w-4 text-[#8E74A8]" aria-hidden="true" />
                <span>نقاط التشابه والاختلاف بين التخصصات المختارة</span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-[#E4D9F0] bg-[#FFFDFB] p-4 space-y-1.5">
                  <h3 className="font-display text-xs font-bold text-[#8E74A8]">
                    أوجه التشابه المشتركة
                  </h3>
                  <p className="leading-relaxed">
                    {comparisonSummary.sharedDimensions.length > 0 ? (
                      <>
                        تشترك التخصصات المختارة في اعتمادها على{' '}
                        <strong>{comparisonSummary.sharedDimensions.join(' و')}</strong>
                        {comparisonSummary.sameCategory
                          ? `، كما تنتمي جميعها إلى مجال ${selectedMajors[0].categoryLabelAr}.`
                          : ' رغم اختلاف مجالاتها الأكاديمية.'}
                      </>
                    ) : (
                      <>
                        تتنوع هذه التخصصات في اهتماماتها الأساسية، وتجمعها الحاجة إلى الممارسة
                        العملية وبناء المهارات بالتوازي مع الدراسة{' '}
                        {comparisonSummary.sameCredential
                          ? `ضمن مسار ${selectedMajors[0].credentialLabelAr}.`
                          : '.'}
                      </>
                    )}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#E4D9F0] bg-[#FFFDFB] p-4 space-y-1.5">
                  <h3 className="font-display text-xs font-bold text-[#A9506C]">
                    أبرز الفروق والتركيز لكل مسار
                  </h3>
                  <ul className="space-y-1 text-xs sm:text-sm">
                    {comparisonSummary.distinctDimensions.map((item) => (
                      <li key={item.nameAr}>
                        <strong>{item.nameAr}</strong> ({item.credentialLabelAr}): يغلب عليه الجانب{' '}
                        {item.topTraits}.
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
