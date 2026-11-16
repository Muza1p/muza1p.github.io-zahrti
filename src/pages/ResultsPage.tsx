import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  BookmarkCheck,
  CheckCircle2,
  GitCompare,
  Info,
  Printer,
  RotateCcw,
  Trash2,
} from 'lucide-react';
import { CharacterStage } from '@/src/components/characters/CharacterStage';
import {
  CoquetteRibbonBow,
  FloralDivider,
} from '@/src/components/ornaments/BotanicalArt';
import {
  DOMAIN_CHARACTER_MAP,
  RIASEC_CHARACTER_MAP,
} from '@/src/data/characters/kawaiiCharacters';
import { RIASEC_PROFILES } from '@/src/data/interests/riasecProfiles';
import { MAJORS_CATALOG } from '@/src/data/majors/majorsCatalog';
import { recommendMajorsForResult } from '@/src/matching/majorMatcher';
import { AssessmentResult, SavedResultRecord } from '@/src/types';

interface ResultsPageProps {
  result: AssessmentResult | null;
  savedRecords: SavedResultRecord[];
  compareIds: string[];
  onSaveResult: () => boolean;
  onDeleteSavedRecord: (id: string) => void;
  onToggleCompare: (majorId: string) => void;
  onRestartQuiz: () => void;
  onNavigate: (to: string) => void;
}

export function ResultsPage({
  result,
  savedRecords,
  compareIds,
  onSaveResult,
  onDeleteSavedRecord,
  onToggleCompare,
  onRestartQuiz,
  onNavigate,
}: ResultsPageProps) {
  const [savedFeedback, setSavedFeedback] = useState<string | null>(null);

  const recommendations = useMemo(() => {
    if (!result) return null;
    return recommendMajorsForResult(result, MAJORS_CATALOG, {
      primaryCount: 5,
      alternativesCount: 3,
      includeNonBachelor: true,
    });
  }, [result]);

  if (!result || !recommendations) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <div className="rounded-[2rem] border border-[#E8CED5] bg-[#FFFDFB] p-8 sm:p-10 text-center space-y-5">
          <div className="flex justify-center">
            <CoquetteRibbonBow className="w-16 h-9" />
          </div>
          <h1 className="font-display text-2xl font-bold text-[#381F2E]">
            لم تُكملي الاختبار بعد
          </h1>
          <p className="text-sm leading-relaxed text-[#69495B]">
            لا يمكن عرض ملف الاهتمامات قبل الإجابة على الأسئلة الثلاثين. ابدئي الاختبار الآن
            لاستكشاف اهتماماتج والتخصصات التي قد تشبهج.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('/intro')}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#A9506C] px-7 py-2.5 text-sm font-medium text-white hover:bg-[#913F59] cursor-pointer"
            >
              <span>ابدئي الاختبار</span>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/majors')}
              className="inline-flex min-h-[44px] items-center rounded-full border border-[#E8CED5] bg-white px-6 py-2.5 text-sm font-medium text-[#381F2E] hover:bg-[#FBF1F3] cursor-pointer"
            >
              تصفحي التخصصات مباشرة
            </button>
          </div>
        </div>
      </div>
    );
  }

  const topOne = RIASEC_PROFILES[result.topThreeCodes[0]];
  const topTwo = result.topThreeCodes[1] ? RIASEC_PROFILES[result.topThreeCodes[1]] : null;
  const topThree = result.topThreeCodes[2] ? RIASEC_PROFILES[result.topThreeCodes[2]] : null;

  const handleSave = () => {
    const ok = onSaveResult();
    if (ok) {
      setSavedFeedback('تم حفظ نسخة من نتيجتج محلياً في هذا الجهاز.');
      window.setTimeout(() => setSavedFeedback(null), 4000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 space-y-10">
      {/* Header card: هذا ملف اهتماماتج + 3D Celebration Scene */}
      <section className="rounded-[2rem] border border-[#E8CED5] bg-[#FFFDFB] p-6 sm:p-10 space-y-6 shadow-[0_10px_40px_-24px_rgba(169,80,108,0.2)]">
        <div className="grid items-center gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <CoquetteRibbonBow className="w-12 h-7" />
              <span className="text-xs font-medium text-[#A9506C]">
                {result.scoringMode === 'onet_official_api'
                  ? 'محسوب عبر O*NET API v2 الرسمي'
                  : 'نتائج تجريبية وفق معادلة Mini-IP (تكييف عربي غير مقنن بعد)'}
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#381F2E]">
              هذا ملف اهتماماتج
            </h1>
            <p className="text-sm sm:text-base leading-relaxed text-[#69495B] max-w-2xl">
              تعبر هذه الخريطة عن ميولج الحالية تجاه أنشطة العمل المختلفة. لا تختزل نفسج في نمط
              واحد فقط، فالتنوع بين الأنماط الستة هو ما يمنح اختياراتج طابعها الخاص.
            </p>

            <div className="flex flex-wrap gap-2 no-print pt-1">
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-[#E8CED5] bg-[#FBF1F3] px-4 py-2 text-xs sm:text-sm font-medium text-[#381F2E] hover:bg-[#F4DCE2] cursor-pointer whitespace-nowrap"
              >
                <BookmarkCheck className="h-4 w-4 text-[#A9506C]" aria-hidden="true" />
                <span>احفظي النتيجة</span>
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-[#E8CED5] bg-white px-4 py-2 text-xs sm:text-sm font-medium text-[#381F2E] hover:bg-[#FBF1F3] cursor-pointer whitespace-nowrap"
              >
                <Printer className="h-4 w-4 text-[#69495B]" aria-hidden="true" />
                <span>اطبعي النتيجة</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <CharacterStage
              characterId="results_celebration"
              variant="scene"
              eager={true}
              showCaption={true}
              className="w-full max-w-[340px]"
            />
          </div>
        </div>

        {savedFeedback && (
          <div
            role="status"
            className="flex items-center gap-2 rounded-2xl border border-[#C9D8C9] bg-[#EFF4EF] px-4 py-2.5 text-sm text-[#355237]"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{savedFeedback}</span>
          </div>
        )}

        {/* Notice if flat profile or uniform answers */}
        {(result.flatProfile || result.allOneAnswer !== null) && (
          <div className="rounded-2xl border border-[#E6D3B8] bg-[#FAF4EA] p-4 text-sm text-[#5C4321] space-y-1">
            <p className="font-semibold">ملاحظة مهمة حول إجاباتج:</p>
            <p className="leading-relaxed">
              {result.allOneAnswer !== null
                ? 'اختيار نفس الإجابة لجميع الأسئلة يعطي درجات متطابقة عبر الأنماط الستة. للاستفادة بشكل أعمق، جربي إعادة الاختبار مع التمييز بين ما تفضلينه أكثر وما تفضلينه أقل.'
                : 'تظهر درجاتج تقارباً عالياً بين عدة أنماط اهتمام. هذا طبيعي حين تتعدد اهتماماتج أو تكون متقاربة؛ استكشفي الأنماط الأعلى وتفاصيل التخصصات بهدوء.'}
            </p>
          </div>
        )}

        {/* Summary of top interests */}
        <div className="rounded-3xl border border-[#F0DDE2] bg-[#FDF9F6] p-5 sm:p-6 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <span className="font-display font-bold text-[#381F2E]">
              ملخص أبرز الاهتمامات ({result.hollandCode})
            </span>
            {result.elapsedSeconds !== null && (
              <span className="text-xs text-[#69495B] tabular-nums">
                الزمن المقاس للإجابة: {Math.floor(result.elapsedSeconds / 60)} د{' '}
                {result.elapsedSeconds % 60} ث
              </span>
            )}
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-[#573E4E]">
            أعلى مجالات اهتمامج وفق هذه الجلسة هي{' '}
            <strong>{topOne.nameAr}</strong>
            {topTwo ? (
              <>
                {' '}يليها <strong>{topTwo.nameAr}</strong>
              </>
            ) : null}
            {topThree ? (
              <>
                {' '}ثم <strong>{topThree.nameAr}</strong>
              </>
            ) : null}
            . يعني هذا أنج تميلين غالباً إلى الأنشطة التي تجمع بين{' '}
            {topOne.subtitleAr}
            {topTwo ? `، مع جانب من ${topTwo.subtitleAr}` : ''}.
          </p>
        </div>

        {/* 6 RIASEC Bar Chart */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-xl font-bold text-[#381F2E]">
              أنماط الاهتمامات الستة (RIASEC)
            </h2>
            <p className="text-xs text-[#69495B]">
              الدرجات المعروضة هي درجات اهتمام على مقياس Mini-IP من 0 إلى 20 (وليست نسب نجاح أو قبول)
            </p>
          </div>

          <div className="space-y-3">
            {result.orderedAreas.map((area) => {
              const info = RIASEC_PROFILES[area.code];
              const widthPct = Math.max(4, Math.round((area.score / area.maxScore) * 100));
              return (
                <div
                  key={area.code}
                  className="rounded-2xl border border-[#F0DDE2] bg-[#FFFDFB] p-4 space-y-2 print-break-inside-avoid"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <CharacterStage
                        characterId={RIASEC_CHARACTER_MAP[area.code]}
                        variant="avatar"
                        interactive={false}
                        className="h-12 w-12 shrink-0"
                      />
                      <div>
                        <span className="font-display text-sm sm:text-base font-bold text-[#381F2E]">
                          {info.nameAr}
                        </span>
                        <span className="mx-2 text-xs text-[#7A596C]" dir="ltr">
                          {info.letter} · {info.nameEn}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-[#381F2E] tabular-nums">
                      درجة الاهتمام: {area.score} / {area.maxScore}
                    </div>
                  </div>

                  <div className="h-3.5 w-full overflow-hidden rounded-full bg-[#F5EDF0]">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${widthPct}%`,
                        backgroundColor: info.colorHex,
                      }}
                    />
                  </div>
                  <p className="text-xs leading-relaxed text-[#69495B]">
                    {info.descriptionAr}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <FloralDivider />

      {/* 5 Recommended Majors */}
      <section className="space-y-6" aria-labelledby="recommended-majors-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <h2
              id="recommended-majors-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-[#381F2E]"
            >
              تخصصات مقترحة للاستكشاف
            </h2>
            <p className="text-sm text-[#69495B]">
              خمسة مسارات متنوعة تتقاطع أنشطتها مع أكثر من بُعد في ملف اهتماماتج، وليست حكماً نهائياً
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/compare')}
            className="no-print inline-flex min-h-[42px] items-center gap-2 rounded-full border border-[#D8CBE7] bg-[#F4EFF8] px-5 py-2 text-sm font-medium text-[#381F2E] hover:bg-[#EAE0F3] cursor-pointer whitespace-nowrap"
          >
            <GitCompare className="h-4 w-4 text-[#8E74A8]" aria-hidden="true" />
            <span>قارني التخصصات ({compareIds.length})</span>
          </button>
        </div>

        <div className="space-y-4">
          {recommendations.primaryRecommendations.map((rec) => {
            const isInCompare = compareIds.includes(rec.major.id);
            return (
              <article
                key={rec.major.id}
                className="rounded-3xl border border-[#E8CED5] bg-[#FFFDFB] p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 print-break-inside-avoid"
              >
                <div className="flex items-start gap-4">
                  <CharacterStage
                    characterId={DOMAIN_CHARACTER_MAP[rec.major.category]}
                    variant="avatar"
                    interactive={false}
                    className="h-16 w-16 shrink-0"
                  />
                  <div className="space-y-1.5">
                    <div className="text-xs text-[#7A596C]">
                      <span>{rec.major.categoryLabelAr}</span>
                      <span className="mx-1.5" aria-hidden="true">·</span>
                      <span>{rec.major.credentialLabelAr}</span>
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#381F2E]">
                      {rec.major.nameAr}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#573E4E]">
                      {rec.reasonAr}
                    </p>
                    <p className="text-xs text-[#69495B]">
                      تقاطع الاهتمامات:{' '}
                      {rec.matchedInterests
                        .map((c) => RIASEC_PROFILES[c].nameAr.replace('النمط ', ''))
                        .join(' · ')}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0 no-print">
                  <button
                    type="button"
                    onClick={() => onToggleCompare(rec.major.id)}
                    className={`min-h-[40px] rounded-full border px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
                      isInCompare
                        ? 'border-[#8E74A8] bg-[#F4EFF8] text-[#381F2E]'
                        : 'border-[#E8CED5] bg-white text-[#69495B] hover:bg-[#FBF1F3]'
                    }`}
                  >
                    {isInCompare ? 'مضاف للمقارنة ✓' : 'أضيفي للمقارنة'}
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate(`/majors/${rec.major.id}`)}
                    className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-[#A9506C] px-5 py-2 text-xs sm:text-sm font-medium text-white hover:bg-[#913F59] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>اكتشفي التفاصيل</span>
                    <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Close alternatives */}
        <div className="space-y-3 pt-4">
          <h3 className="font-display text-lg font-bold text-[#381F2E]">
            بدائل قريبة تستحق النظرة أيضاً
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            {recommendations.closeAlternatives.map((alt) => (
              <article
                key={alt.major.id}
                className="rounded-2xl border border-[#E8CED5] bg-[#FFFDFB] p-5 flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <p className="text-xs text-[#7A596C]">
                    {alt.major.categoryLabelAr} · {alt.major.credentialLabelAr}
                  </p>
                  <h4 className="font-display text-base font-bold text-[#381F2E]">
                    {alt.major.nameAr}
                  </h4>
                  <p className="text-xs leading-relaxed text-[#69495B]">
                    {alt.reasonAr}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate(`/majors/${alt.major.id}`)}
                  className="no-print inline-flex items-center justify-center gap-1.5 rounded-full border border-[#E8CED5] bg-[#FBF1F3] px-4 py-2 text-xs font-medium text-[#381F2E] hover:bg-[#F4DCE2] cursor-pointer"
                >
                  <span>اكتشفي التفاصيل</span>
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Reflective questions & practical next steps */}
      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-[#E8CED5] bg-[#FFFDFB] p-6 sm:p-7 space-y-4">
          <h2 className="font-display text-xl font-bold text-[#381F2E]">
            أسئلة تساعدكِ على التفكير قبل الاختيار
          </h2>
          <ul className="space-y-2.5 text-sm leading-relaxed text-[#573E4E]">
            <li>١. أي المواد المدرسية شعرتِ فيها بفضول حقيقي للتعلم، لا بمجرد حفظ للامتحان؟</li>
            <li>٢. هل تفضلين العمل الميداني والحركي أم المكتب والمختبر أم التواصل المستمر مع الناس؟</li>
            <li>٣. ما مقدار صعوبة المواد والتحديات اليومية التي تستعدين لتحملها في التخصص؟</li>
            <li>٤. هل تتوافق متطلبات القبول والمعدل وظروف المحافظة/الجامعة مع اختياراتج؟</li>
          </ul>
        </div>

        <div className="rounded-3xl border border-[#D8CBE7] bg-[#F8F4FB] p-6 sm:p-7 space-y-4">
          <h2 className="font-display text-xl font-bold text-[#381F2E]">
            خطوات عملية لاستكشاف التخصص
          </h2>
          <ul className="space-y-2.5 text-sm leading-relaxed text-[#573E4E]">
            <li>١. افتحي صفحات التفاصيل لتخصصين أو ثلاثة واستخدمي صفحة المقارنة بينها.</li>
            <li>٢. اطلعي على الخطة الدراسية وأسماء المواد في مواقع الكليات العراقية الرسمية.</li>
            <li>٣. تحدثي مع طالبة أو خريجة حديثة في التخصص عن واقع الدراسة والتحديات لا المميزات فقط.</li>
            <li>٤. تذكري أن الاهتمامات وحدها لا تكفي؛ ضعي القدرة والظروف وفرص العمل في الحسبان.</li>
          </ul>
        </div>
      </section>

      {/* Scientific honesty notice */}
      <section className="rounded-2xl border border-[#E8CED5] bg-[#FDF9F6] p-5 flex items-start gap-3 text-xs sm:text-sm text-[#69495B]">
        <Info className="h-5 w-5 shrink-0 text-[#A9506C] mt-0.5" aria-hidden="true" />
        <div className="space-y-1">
          <p>
            <strong>توضيح علمي مهم:</strong> نموذج ترشيح التخصصات المحلي في هذه النسخة مخصص
            للاستكشاف الأولي ولم يخضع بعد لدراسة تحقق علمية (Validation Study)، كما أن الترجمة
            العربية لا تزال قيد المراجعة العلمية.
          </p>
          <p>
            للاطلاع على رخصة O*NET والتعديلات:{' '}
            <a
              href="/terms"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/terms');
              }}
              className="font-medium text-[#A9506C] hover:underline"
            >
              التعديلات وإخلاء المسؤولية
            </a>
          </p>
        </div>
      </section>

      {/* Saved Results History */}
      {savedRecords.length > 0 && (
        <section className="no-print rounded-3xl border border-[#E8CED5] bg-[#FFFDFB] p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-[#381F2E]">
            النتائج المحفوظة على هذا الجهاز
          </h2>
          <div className="divide-y divide-[#F2E2E6]">
            {savedRecords.map((rec) => (
              <div
                key={rec.id}
                className="py-3 flex flex-wrap items-center justify-between gap-3 text-sm"
              >
                <div className="space-y-0.5">
                  <p className="font-semibold text-[#381F2E]">
                    الرمز: {rec.hollandCode} — {rec.topAreaNamesAr.join(' · ')}
                  </p>
                  <p className="text-xs text-[#69495B] tabular-nums">
                    حُفظت في: {new Date(rec.savedAtIso).toLocaleDateString('ar-IQ')}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onDeleteSavedRecord(rec.id)}
                  aria-label="حذف النتيجة المحفوظة"
                  className="inline-flex items-center gap-1 rounded-full border border-[#E8CED5] px-3 py-1.5 text-xs text-[#8B2945] hover:bg-[#FDF0F3] cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>حذف</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Bottom restart action */}
      <div className="no-print flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => {
            onRestartQuiz();
            onNavigate('/intro');
          }}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#E8CED5] bg-[#FFFDFB] px-6 py-2.5 text-sm font-medium text-[#381F2E] hover:bg-[#FBF1F3] cursor-pointer"
        >
          <RotateCcw className="h-4 w-4 text-[#A9506C]" aria-hidden="true" />
          <span>ابدئي الاختبار من جديد</span>
        </button>
      </div>
    </div>
  );
}
