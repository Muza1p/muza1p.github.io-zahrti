import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
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
import { RiasecRadarChart } from '@/src/components/charts/RiasecRadarChart';
import { CharacterStage } from '@/src/components/characters/CharacterStage';
import {
  CoquetteRibbonBow,
  FloralDivider,
} from '@/src/components/ornaments/BotanicalArt';
import { Zahrti3DStage } from '@/src/components/three/Zahrti3DStage';
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
        <div className="rounded-[2rem] border border-[#EAD3E0] bg-[#FFFCFA] p-8 sm:p-10 text-center space-y-5">
          <div className="flex justify-center">
            <CoquetteRibbonBow className="w-16 h-9" />
          </div>
          <h1 className="font-display text-2xl font-bold text-[#351B38]">
            لم تُكملي الاختبار بعد
          </h1>
          <p className="text-sm leading-relaxed text-[#5F4163]">
            لا يمكن عرض ملف الاهتمامات قبل الإجابة على الأسئلة الثلاثين. ابدئي الاختبار الآن
            لاستكشاف اهتماماتج والتخصصات التي قد تشبهج.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('/intro')}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-gradient-to-l from-[#C04472] to-[#7651B8] px-7 py-2.5 text-sm font-medium text-white hover:opacity-95 cursor-pointer"
            >
              <span>ابدئي الاختبار</span>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/majors')}
              className="inline-flex min-h-[44px] items-center rounded-full border border-[#EAD3E0] bg-white px-6 py-2.5 text-sm font-medium text-[#351B38] hover:bg-[#FDF0F5] cursor-pointer"
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
      {/* Header + Visual Visualizations: 3D Constellation Blossom + SVG RIASEC Radar Chart */}
      <section className="rounded-[2rem] border border-[#EAD3E0] bg-[#FFFCFA] p-6 sm:p-10 space-y-8 shadow-[0_14px_45px_-26px_rgba(118,81,184,0.22)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <CoquetteRibbonBow className="w-12 h-7" />
              <span className="text-xs font-semibold text-[#C04472]">
                {result.scoringMode === 'onet_official_api'
                  ? 'محسوب عبر O*NET API v2 الرسمي'
                  : 'نتائج تجريبية وفق معادلة Mini-IP (تكييف عربي غير مقنن بعد)'}
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#351B38]">
              هذا ملف اهتماماتج
            </h1>
            <p className="text-sm sm:text-base leading-relaxed text-[#5F4163] max-w-2xl">
              تعبر هذه الخريطة عن ميولج الحالية تجاه أنشطة العمل المختلفة. لا تختزل نفسج في نمط
              واحد فقط، فالتنوع بين الأنماط الستة هو ما يمنح اختياراتج طابعها الخاص.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 no-print shrink-0">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full border border-[#F2C6D8] bg-[#FDF0F5] px-4 py-2 text-xs sm:text-sm font-medium text-[#351B38] hover:bg-[#FADCE8] cursor-pointer whitespace-nowrap"
            >
              <BookmarkCheck className="h-4 w-4 text-[#C04472]" aria-hidden="true" />
              <span>احفظي النتيجة</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full border border-[#EAD3E0] bg-white px-4 py-2 text-xs sm:text-sm font-medium text-[#351B38] hover:bg-[#FDF0F5] cursor-pointer whitespace-nowrap"
            >
              <Printer className="h-4 w-4 text-[#5F4163]" aria-hidden="true" />
              <span>اطبعي النتيجة</span>
            </button>
          </div>
        </div>

        {/* Dual Visual Analytics: 3D Score Blossom + Hexagonal SVG Radar Chart */}
        <div className="grid gap-6 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 space-y-2">
            <h2 className="font-display text-sm font-bold text-[#7651B8]">
              الزهرة التفاعلية لاهتماماتكِ (تتشكّل بتلاتها حسب درجاتكِ)
            </h2>
            <Zahrti3DStage
              mode="results"
              scores={result.scores}
              heightClass="h-[270px] sm:h-[310px]"
              hintText="كل بتلة وكرة زجاجية تتسع بمقدار درجتكِ في نمط RIASEC"
            />
          </div>

          <div className="lg:col-span-6 rounded-3xl border border-[#EAD3E0] bg-[#FFF8F3] p-5">
            <h2 className="font-display text-sm font-bold text-[#351B38] text-center mb-2">
              المخطط الشبكي للأنماط الستة (<span dir="ltr">{result.hollandCode}</span>)
            </h2>
            <RiasecRadarChart scores={result.scores} />
          </div>
        </div>

        {savedFeedback && (
          <div
            role="status"
            className="flex items-center gap-2 rounded-2xl border border-[#C5DBC9] bg-[#EEF5F0] px-4 py-2.5 text-sm text-[#2F4F39]"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{savedFeedback}</span>
          </div>
        )}

        {/* Notice if flat profile or uniform answers */}
        {(result.flatProfile || result.allOneAnswer !== null) && (
          <div className="rounded-2xl border border-[#EAD8AF] bg-[#FCF7EC] p-4 text-sm text-[#5C4321] space-y-1">
            <p className="font-semibold">ملاحظة مهمة حول إجاباتج:</p>
            <p className="leading-relaxed">
              {result.allOneAnswer !== null
                ? 'اختيار نفس الإجابة لجميع الأسئلة يعطي درجات متطابقة عبر الأنماط الستة. للاستفادة بشكل أعمق، جربي إعادة الاختبار مع التمييز بين ما تفضلينه أكثر وما تفضلينه أقل.'
                : 'تظهر درجاتج تقارباً عالياً بين عدة أنماط اهتمام. هذا طبيعي حين تتعدد اهتماماتج أو تكون متقاربة؛ استكشفي الأنماط الأعلى وتفاصيل التخصصات بهدوء.'}
            </p>
          </div>
        )}

        {/* Summary of top interests */}
        <div className="rounded-3xl border border-[#EAD3E0] bg-gradient-to-br from-[#FFF8F3] to-[#F4EFFB]/70 p-5 sm:p-6 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <span className="font-display font-bold text-[#351B38]">
              ملخص أبرز الاهتمامات ({result.hollandCode})
            </span>
            {result.elapsedSeconds !== null && (
              <span className="text-xs text-[#5F4163] tabular-nums">
                الزمن المقاس للإجابة: {Math.floor(result.elapsedSeconds / 60)} د{' '}
                {result.elapsedSeconds % 60} ث
              </span>
            )}
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-[#4F3553]">
            أعلى مجالات اهتمامج وفق هذه الجلسة هي{' '}
            <strong style={{ color: topOne.colorHex }}>{topOne.nameAr}</strong>
            {topTwo ? (
              <>
                {' '}يليها <strong style={{ color: topTwo.colorHex }}>{topTwo.nameAr}</strong>
              </>
            ) : null}
            {topThree ? (
              <>
                {' '}ثم <strong style={{ color: topThree.colorHex }}>{topThree.nameAr}</strong>
              </>
            ) : null}
            . يعني هذا أنج تميلين غالباً إلى الأنشطة التي تجمع بين{' '}
            {topOne.subtitleAr}
            {topTwo ? `، مع جانب من ${topTwo.subtitleAr}` : ''}.
          </p>
        </div>

        {/* 6 RIASEC Color-Coded Score Bars */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-xl font-bold text-[#351B38]">
              تفصيل أنماط الاهتمامات الستة (RIASEC)
            </h2>
            <p className="text-xs text-[#5F4163]">
              الدرجات المعروضة هي درجات اهتمام على مقياس Mini-IP من 0 إلى 20 (وليست نسب نجاح أو قبول)
            </p>
          </div>

          <div className="space-y-3">
            {result.orderedAreas.map((area, index) => {
              const info = RIASEC_PROFILES[area.code];
              const widthPct = Math.max(4, Math.round((area.score / area.maxScore) * 100));
              return (
                <motion.div
                  key={area.code}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.04 }}
                  className="rounded-2xl border bg-[#FFFCFA] p-4 space-y-2.5 print-break-inside-avoid"
                  style={{ borderColor: info.borderHex }}
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
                        <span className="font-display text-sm sm:text-base font-bold text-[#351B38]">
                          {info.nameAr}
                        </span>
                        <span className="mx-2 text-xs text-[#6E5073]" dir="ltr">
                          {info.letter} · {info.nameEn}
                        </span>
                      </div>
                    </div>
                    <div
                      className="text-sm font-bold tabular-nums"
                      style={{ color: info.colorHex }}
                    >
                      درجة الاهتمام: {area.score} / {area.maxScore}
                    </div>
                  </div>

                  <div className="h-3.5 w-full overflow-hidden rounded-full bg-[#F5EDF4]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${widthPct}%` }}
                      transition={{ duration: 0.55, delay: 0.1 + index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: info.colorHex }}
                    />
                  </div>
                  <p className="text-xs leading-relaxed text-[#5F4163]">
                    {info.descriptionAr}
                  </p>
                </motion.div>
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
              className="font-display text-2xl sm:text-3xl font-bold text-[#351B38]"
            >
              تخصصات مقترحة للاستكشاف
            </h2>
            <p className="text-sm text-[#5F4163]">
              خمسة مسارات متنوعة تتقاطع أنشطتها مع أكثر من بُعد في ملف اهتماماتج، وليست حكماً نهائياً
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/compare')}
            className="no-print inline-flex min-h-[42px] items-center gap-2 rounded-full border border-[#B49AE8] bg-[#F4EFFB] px-5 py-2 text-sm font-medium text-[#351B38] hover:bg-[#EAE0F8] cursor-pointer whitespace-nowrap"
          >
            <GitCompare className="h-4 w-4 text-[#7651B8]" aria-hidden="true" />
            <span>قارني التخصصات ({compareIds.length})</span>
          </button>
        </div>

        <div className="space-y-4">
          {recommendations.primaryRecommendations.map((rec, idx) => {
            const isInCompare = compareIds.includes(rec.major.id);
            return (
              <motion.article
                key={rec.major.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: idx * 0.05 }}
                className="rounded-3xl border border-[#EAD3E0] bg-[#FFFCFA] p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 print-break-inside-avoid hover:border-[#C04472] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <CharacterStage
                    characterId={DOMAIN_CHARACTER_MAP[rec.major.category]}
                    variant="avatar"
                    interactive={false}
                    className="h-16 w-16 shrink-0"
                  />
                  <div className="space-y-1.5">
                    <div className="text-xs text-[#6E5073] flex flex-wrap items-center gap-1.5">
                      <span>{rec.major.categoryLabelAr}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-semibold text-[#7651B8]">
                        {rec.major.credentialLabelAr}
                      </span>
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#351B38]">
                      {rec.major.nameAr}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#4F3553]">
                      {rec.reasonAr}
                    </p>
                    <p className="text-xs font-medium text-[#C04472]">
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
                        ? 'border-[#7651B8] bg-[#F4EFFB] text-[#351B38]'
                        : 'border-[#EAD3E0] bg-white text-[#5F4163] hover:bg-[#FDF0F5]'
                    }`}
                  >
                    {isInCompare ? 'مضاف للمقارنة ✓' : 'أضيفي للمقارنة'}
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate(`/majors/${rec.major.id}`)}
                    className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-gradient-to-l from-[#C04472] to-[#7651B8] px-5 py-2 text-xs sm:text-sm font-medium text-white hover:opacity-95 transition-opacity cursor-pointer whitespace-nowrap"
                  >
                    <span>اكتشفي التفاصيل</span>
                    <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Close alternatives */}
        <div className="space-y-3 pt-4">
          <h3 className="font-display text-lg font-bold text-[#351B38]">
            بدائل قريبة تستحق النظرة أيضاً
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            {recommendations.closeAlternatives.map((alt) => (
              <article
                key={alt.major.id}
                className="rounded-2xl border border-[#EAD3E0] bg-[#FFFCFA] p-5 flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <p className="text-xs text-[#6E5073]">
                    {alt.major.categoryLabelAr} · {alt.major.credentialLabelAr}
                  </p>
                  <h4 className="font-display text-base font-bold text-[#351B38]">
                    {alt.major.nameAr}
                  </h4>
                  <p className="text-xs leading-relaxed text-[#5F4163]">
                    {alt.reasonAr}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate(`/majors/${alt.major.id}`)}
                  className="no-print inline-flex items-center justify-center gap-1.5 rounded-full border border-[#F2C6D8] bg-[#FDF0F5] px-4 py-2 text-xs font-medium text-[#351B38] hover:bg-[#FADCE8] cursor-pointer"
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
        <div className="rounded-3xl border border-[#EAD3E0] bg-[#FFFCFA] p-6 sm:p-7 space-y-4">
          <h2 className="font-display text-xl font-bold text-[#351B38]">
            أسئلة تساعدكِ على التفكير قبل الاختيار
          </h2>
          <ul className="space-y-2.5 text-sm leading-relaxed text-[#4F3553]">
            <li>١. أي المواد المدرسية شعرتِ فيها بفضول حقيقي للتعلم، لا بمجرد حفظ للامتحان؟</li>
            <li>٢. هل تفضلين العمل الميداني والحركي أم المكتب والمختبر أم التواصل المستمر مع الناس؟</li>
            <li>٣. ما مقدار صعوبة المواد والتحديات اليومية التي تستعدين لتحملها في التخصص؟</li>
            <li>٤. هل تتوافق متطلبات القبول والمعدل وظروف المحافظة/الجامعة مع اختياراتج؟</li>
          </ul>
        </div>

        <div className="rounded-3xl border border-[#D8C9F2] bg-[#F4EFFB] p-6 sm:p-7 space-y-4">
          <h2 className="font-display text-xl font-bold text-[#351B38]">
            خطوات عملية لاستكشاف التخصص
          </h2>
          <ul className="space-y-2.5 text-sm leading-relaxed text-[#4F3553]">
            <li>١. افتحي صفحات التفاصيل لتخصصين أو ثلاثة واستخدمي صفحة المقارنة بينها.</li>
            <li>٢. اطلعي على الخطة الدراسية وأسماء المواد في مواقع الكليات العراقية الرسمية.</li>
            <li>٣. تحدثي مع طالبة أو خريجة حديثة في التخصص عن واقع الدراسة والتحديات لا المميزات فقط.</li>
            <li>٤. تذكري أن الاهتمامات وحدها لا تكفي؛ ضعي القدرة والظروف وفرص العمل في الحسبان.</li>
          </ul>
        </div>
      </section>

      {/* Scientific honesty notice */}
      <section className="rounded-2xl border border-[#EAD3E0] bg-[#FFF8F3] p-5 flex items-start gap-3 text-xs sm:text-sm text-[#5F4163]">
        <Info className="h-5 w-5 shrink-0 text-[#C04472] mt-0.5" aria-hidden="true" />
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
              className="font-semibold text-[#C04472] hover:underline"
            >
              التعديلات وإخلاء المسؤولية
            </a>
          </p>
        </div>
      </section>

      {/* Saved Results History */}
      {savedRecords.length > 0 && (
        <section className="no-print rounded-3xl border border-[#EAD3E0] bg-[#FFFCFA] p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-[#351B38]">
            النتائج المحفوظة على هذا الجهاز
          </h2>
          <div className="divide-y divide-[#F2E2EB]">
            {savedRecords.map((rec) => (
              <div
                key={rec.id}
                className="py-3 flex flex-wrap items-center justify-between gap-3 text-sm"
              >
                <div className="space-y-0.5">
                  <p className="font-semibold text-[#351B38]">
                    الرمز: {rec.hollandCode} — {rec.topAreaNamesAr.join(' · ')}
                  </p>
                  <p className="text-xs text-[#5F4163] tabular-nums">
                    حُفظت في: {new Date(rec.savedAtIso).toLocaleDateString('ar-IQ')}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onDeleteSavedRecord(rec.id)}
                  aria-label="حذف النتيجة المحفوظة"
                  className="inline-flex items-center gap-1 rounded-full border border-[#EAD3E0] px-3 py-1.5 text-xs text-[#9B2953] hover:bg-[#FDF0F5] cursor-pointer"
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
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#EAD3E0] bg-[#FFFCFA] px-6 py-2.5 text-sm font-medium text-[#351B38] hover:bg-[#FDF0F5] cursor-pointer"
        >
          <RotateCcw className="h-4 w-4 text-[#C04472]" aria-hidden="true" />
          <span>ابدئي الاختبار من جديد</span>
        </button>
      </div>
    </div>
  );
}
