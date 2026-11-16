import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  GitCompare,
  HeartHandshake,
  Info,
  Printer,
  RotateCcw,
  Trash2,
} from 'lucide-react';
import { RiasecRadarChart } from '@/src/components/charts/RiasecRadarChart';
import {
  CategoryIllustration,
  EditorialCrest,
  FloralDivider,
  RiasecBadgeGlyph,
} from '@/src/components/ornaments/BotanicalArt';
import { Zahrti3DStage } from '@/src/components/three/Zahrti3DStage';
import { RIASEC_PROFILES } from '@/src/data/interests/riasecProfiles';
import { MAJORS_CATALOG } from '@/src/data/majors/majorsCatalog';
import { recommendMajorsForResult } from '@/src/matching/majorMatcher';
import { toHref } from '@/src/hooks/useRouter';
import { AssessmentResult, SavedResultRecord } from '@/src/types';

interface ResultsPageProps {
  activePersonName: string;
  result: AssessmentResult | null;
  savedRecords: SavedResultRecord[];
  favoriteMajorIds: string[];
  compareIds: string[];
  bothCompleted: boolean;
  onSaveResult: () => boolean;
  onRestoreRecord: (id: string) => boolean;
  onDeleteSavedRecord: (id: string) => void;
  onToggleFavorite: (majorId: string) => void;
  onToggleCompare: (majorId: string) => void;
  onRestartQuiz: () => void;
  onNavigate: (to: string) => void;
}

const RANK_LABELS = [
  'أفضل تطابق مع شخصيتها',
  'الخيار الثاني المناسب',
  'الخيار الثالث المناسب',
];

export function ResultsPage({
  activePersonName,
  result,
  savedRecords,
  favoriteMajorIds,
  compareIds,
  bothCompleted,
  onSaveResult,
  onRestoreRecord,
  onDeleteSavedRecord,
  onToggleFavorite,
  onToggleCompare,
  onRestartQuiz,
  onNavigate,
}: ResultsPageProps) {
  const [savedFeedback, setSavedFeedback] = useState<string | null>(null);

  const recommendations = useMemo(() => {
    if (!result) return null;
    return recommendMajorsForResult(result, MAJORS_CATALOG, {
      primaryCount: 6,
      alternativesCount: 3,
      includeNonBachelor: true,
    });
  }, [result]);

  if (!result || !recommendations) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <div className="rounded-3xl border border-[#E9D8D1] bg-[#FFFDF9] p-8 sm:p-10 text-center space-y-5">
          <div className="flex justify-center">
            <EditorialCrest className="w-14 h-8" />
          </div>
          <h1 className="font-display text-2xl font-bold text-[#351B38]">
            لم تُكمل {activePersonName} الاختبار بعد
          </h1>
          <p className="text-sm leading-relaxed text-[#5F4562]">
            لا يمكن عرض ملف الاهتمامات قبل الإجابة على الأسئلة الثلاثين الخاصة بـ{' '}
            <strong>{activePersonName}</strong>.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('/intro')}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#762D50] px-7 py-2.5 text-sm font-medium text-[#F9F3EC] hover:bg-[#5D223E] cursor-pointer"
            >
              <span>ابدئي الاختبار</span>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/majors')}
              className="inline-flex min-h-[44px] items-center rounded-full border border-[#E9D8D1] bg-[#F9F3EC] px-6 py-2.5 text-sm font-medium text-[#351B38] hover:bg-[#EFE2DC] cursor-pointer"
            >
              تصفحي التخصصات
            </button>
          </div>
        </div>
      </div>
    );
  }

  const topOne = RIASEC_PROFILES[result.topThreeCodes[0]];
  const topTwo = result.topThreeCodes[1] ? RIASEC_PROFILES[result.topThreeCodes[1]] : null;
  const topThree = result.topThreeCodes[2] ? RIASEC_PROFILES[result.topThreeCodes[2]] : null;

  const topThreeMajors = recommendations.primaryRecommendations.slice(0, 3);
  const additionalMajors = [
    ...recommendations.primaryRecommendations.slice(3),
    ...recommendations.closeAlternatives,
  ];

  const handleSave = () => {
    const ok = onSaveResult();
    if (ok) {
      setSavedFeedback(`تم حفظ نسخة في سجل نتائج ${activePersonName} على هذا الجهاز.`);
      window.setTimeout(() => setSavedFeedback(null), 4000);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 space-y-10">
      {/* Header + 3D Blossom + RIASEC Radar */}
      <section className="rounded-3xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 sm:p-10 space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-[#9F7E44]">
              <EditorialCrest className="w-10 h-6" />
              <span>
                {result.scoringMode === 'onet_official_api'
                  ? 'محسوب عبر O*NET API v2 الرسمي'
                  : 'محسوب وفق معادلة Mini-IP الموثقة'}
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#351B38]">
              نتيجة {activePersonName} — زهرتي
            </h1>
            <p className="text-sm sm:text-base leading-relaxed text-[#5F4562] max-w-2xl">
              خريطة تفاعلية لاهتماماتج الحالية عبر ستة أبعاد. لا نختصر مستقبلج في مسار واحد، بل
              نرتب لكِ التخصصات الأنسب ثم البدائل الأخرى لتختاري بوعي.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 no-print shrink-0">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full border border-[#E9D8D1] bg-[#F9F3EC] px-4 py-2 text-xs sm:text-sm font-medium text-[#351B38] hover:bg-[#EFE2DC] cursor-pointer whitespace-nowrap"
            >
              <BookmarkCheck className="h-4 w-4 text-[#762D50]" aria-hidden="true" />
              <span>حفظ في السجل</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full border border-[#E9D8D1] bg-white px-4 py-2 text-xs sm:text-sm font-medium text-[#351B38] hover:bg-[#F9F3EC] cursor-pointer whitespace-nowrap"
            >
              <Printer className="h-4 w-4 text-[#5F4562]" aria-hidden="true" />
              <span>طباعة</span>
            </button>
            {bothCompleted && (
              <button
                type="button"
                onClick={() => onNavigate('/compatibility')}
                className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full bg-[#351B38] px-4 py-2 text-xs sm:text-sm font-medium text-[#F9F3EC] hover:bg-[#4B2B4E] cursor-pointer whitespace-nowrap"
              >
                <HeartHandshake className="h-4 w-4 text-[#C6A56B]" aria-hidden="true" />
                <span>انتقلي إلى التوافق</span>
              </button>
            )}
          </div>
        </div>

        {/* 3D + Radar Dual Analytics */}
        <div className="grid gap-6 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 space-y-2">
            <h2 className="font-display text-sm font-bold text-[#762D50]">
              الزهرة ثلاثية الأبعاد لميول {activePersonName}
            </h2>
            <Zahrti3DStage
              mode="results"
              darkSurface
              scores={result.scores}
              heightClass="h-[270px] sm:h-[310px]"
              hintText="تتشكل البتلات بمقدار درجتج في أنماط RIASEC الستة"
            />
          </div>

          <div className="lg:col-span-6 rounded-2xl border border-[#E9D8D1] bg-[#F9F3EC]/70 p-5">
            <h2 className="font-display text-sm font-bold text-[#351B38] text-center mb-2">
              المخطط الشبكي للأنماط (<span dir="ltr">{result.hollandCode}</span>)
            </h2>
            <RiasecRadarChart scores={result.scores} />
          </div>
        </div>

        {savedFeedback && (
          <div
            role="status"
            className="flex items-center gap-2 rounded-xl border border-[#C6A56B]/50 bg-[#F9F3EC] px-4 py-2.5 text-sm text-[#351B38]"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0 text-[#762D50]" aria-hidden="true" />
            <span>{savedFeedback}</span>
          </div>
        )}

        {(result.flatProfile || result.allOneAnswer !== null) && (
          <div className="rounded-2xl border border-[#C6A56B]/50 bg-[#F9F3EC] p-4 text-sm text-[#5F4562] space-y-1">
            <p className="font-bold text-[#351B38]">ملاحظة حول توزيع الإجابات:</p>
            <p className="leading-relaxed">
              {result.allOneAnswer !== null
                ? 'اختيار نفس الإجابة لجميع الأسئلة يعطي درجات متطابقة عبر الأنماط الستة. جربي إعادة المحاولة مع التفريق بين الأنشطة.'
                : 'تظهر درجاتج تقارباً بين أكثر من نمط، وهذا طبيعي حين تتعدد الاهتمامات؛ راجعي تفاصيل التخصصات بهدوء.'}
            </p>
          </div>
        )}

        {/* Executive Summary */}
        <div className="rounded-2xl border border-[#E9D8D1] bg-[#F9F3EC] p-5 sm:p-6 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <span className="font-display font-bold text-[#351B38]">
              الرمز الثلاثي (<span dir="ltr">{result.hollandCode}</span>) — {activePersonName}
            </span>
            {result.elapsedSeconds !== null && (
              <span className="text-xs text-[#5F4562] tabular-nums">
                زمن الإجابة: {Math.floor(result.elapsedSeconds / 60)} د {result.elapsedSeconds % 60} ث
              </span>
            )}
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-[#5F4562]">
            تتصدر اهتماماتج في هذه الجلسة كل من{' '}
            <strong className="text-[#762D50]">{topOne.nameAr}</strong>
            {topTwo ? (
              <>
                {' '}يليها <strong className="text-[#351B38]">{topTwo.nameAr}</strong>
              </>
            ) : null}
            {topThree ? (
              <>
                {' '}ثم <strong className="text-[#351B38]">{topThree.nameAr}</strong>
              </>
            ) : null}
            ، مما يشير إلى انجذابج للأنشطة المرتبطة بـ {topOne.subtitleAr}
            {topTwo ? ` إلى جانب ${topTwo.subtitleAr}` : ''}.
          </p>
        </div>

        {/* 6 RIASEC Dimension Breakdown */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-xl font-bold text-[#351B38]">
              تفصيل الدرجات عبر الأنماط الستة (<span dir="ltr">RIASEC</span>)
            </h2>
            <p className="text-xs text-[#6F5472]">درجة الاهتمام على مقياس 0 إلى 20</p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {result.orderedAreas.map((area) => {
              const info = RIASEC_PROFILES[area.code];
              const widthPct = Math.max(4, Math.round((area.score / area.maxScore) * 100));
              return (
                <div
                  key={area.code}
                  className="rounded-2xl border border-[#E9D8D1] bg-[#FFFDF9] p-4 space-y-2.5 print-break-inside-avoid"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <RiasecBadgeGlyph area={area.code} className="h-9 w-9 shrink-0" />
                      <div>
                        <span className="font-display text-sm font-bold text-[#351B38]">
                          {info.nameAr}
                        </span>
                        <span className="mx-1.5 text-xs text-[#6F5472]" dir="ltr">
                          {info.letter}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-[#762D50] tabular-nums">
                      {area.score} / {area.maxScore}
                    </span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#E9D8D1]">
                    <div
                      className="h-full rounded-full bg-[#762D50]"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                  <p className="text-xs leading-relaxed text-[#5F4562]">{info.descriptionAr}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <FloralDivider />

      {/* Ranked Ordered Major Recommendations (Top 3 Distinct Tiers + Additional) */}
      <section className="space-y-8" aria-labelledby="recommended-majors-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E9D8D1] pb-5">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-[#762D50]">
              توصيات مرتبة من الأعلى توافقاً — وليست تخصصاً مفروضاً
            </p>
            <h2
              id="recommended-majors-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-[#351B38]"
            >
              التخصصات اللي تناسب شخصيتج، مرتبة للاستكشاف
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/compare')}
            className="no-print inline-flex min-h-[42px] items-center gap-2 rounded-full border border-[#351B38] px-5 py-2 text-sm font-medium text-[#351B38] hover:bg-[#351B38] hover:text-[#F9F3EC] transition-colors cursor-pointer whitespace-nowrap"
          >
            <GitCompare className="h-4 w-4" aria-hidden="true" />
            <span>قارني التخصصات ({compareIds.length})</span>
          </button>
        </div>

        {/* Top 3 Priority Matches */}
        <div className="space-y-5">
          {topThreeMajors.map((rec, idx) => {
            const isFav = favoriteMajorIds.includes(rec.major.id);
            const isInCompare = compareIds.includes(rec.major.id);
            const isRank1 = idx === 0;
            return (
              <article
                key={rec.major.id}
                className={`rounded-3xl border p-6 sm:p-8 space-y-5 print-break-inside-avoid ${
                  isRank1
                    ? 'border-[#762D50] bg-[#FFFDF9]'
                    : 'border-[#E9D8D1] bg-[#FFFDF9]'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
                  <div className="flex items-start gap-4">
                    <CategoryIllustration
                      category={rec.major.category}
                      className="h-14 w-14 shrink-0"
                    />
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-bold text-[#762D50]">
                          {RANK_LABELS[idx]}
                        </span>
                        <span aria-hidden="true" className="text-[#C6A56B]">·</span>
                        <span className="font-bold text-[#351B38] tabular-nums">
                          توافق الميول المحسوب: {rec.affinityPercentage}%
                        </span>
                        <span aria-hidden="true" className="text-[#C6A56B]">·</span>
                        <span className="text-[#6F5472]">{rec.major.credentialLabelAr}</span>
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#351B38]">
                        {rec.major.nameAr}
                      </h3>
                      <p className="text-sm leading-relaxed text-[#5F4562]">{rec.reasonAr}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0 no-print">
                    <button
                      type="button"
                      onClick={() => onToggleFavorite(rec.major.id)}
                      aria-label={isFav ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
                      className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
                        isFav
                          ? 'border-[#762D50] bg-[#762D50] text-[#F9F3EC]'
                          : 'border-[#E9D8D1] bg-[#F9F3EC] text-[#351B38] hover:border-[#762D50]'
                      }`}
                    >
                      <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{isFav ? 'في المفضلة' : 'حفظ للمفضلة'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleCompare(rec.major.id)}
                      className={`min-h-[40px] rounded-full border px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
                        isInCompare
                          ? 'border-[#351B38] bg-[#351B38] text-[#F9F3EC]'
                          : 'border-[#E9D8D1] bg-white text-[#5F4562] hover:bg-[#F9F3EC]'
                      }`}
                    >
                      {isInCompare ? 'بالمقارنة ✓' : 'أضيفي للمقارنة'}
                    </button>

                    <button
                      type="button"
                      onClick={() => onNavigate(`/majors/${rec.major.id}`)}
                      className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-[#762D50] px-4 py-2 text-xs sm:text-sm font-medium text-[#762D50] hover:bg-[#762D50] hover:text-[#F9F3EC] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <span>التفاصيل الكاملة</span>
                      <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* Essential Decision Matrix inside Rank Cards */}
                <div className="grid gap-4 border-t border-[#E9D8D1] pt-5 sm:grid-cols-2 lg:grid-cols-4 text-xs leading-relaxed">
                  <div>
                    <h4 className="font-bold text-[#351B38] mb-1">طبيعة الدراسة</h4>
                    <p className="text-[#5F4562]">{rec.major.studyNatureAr}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#351B38] mb-1">المهارات والميول المرتبطة</h4>
                    <p className="text-[#5F4562]">{rec.major.usefulSkillsAr.slice(0, 3).join('، ')}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#351B38] mb-1">المجالات المهنية المحتملة</h4>
                    <p className="text-[#5F4562]">{rec.major.potentialCareersAr.slice(0, 3).join('، ')}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#351B38] mb-1">أبرز التحديات</h4>
                    <p className="text-[#5F4562]">{rec.major.challengesAr.slice(0, 2).join('؛ ')}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Additional Options Worth Exploring */}
        <div className="space-y-4 pt-2">
          <h3 className="font-display text-xl font-bold text-[#351B38]">
            خيارات أخرى تستحق الاستكشاف
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            {additionalMajors.map((rec) => {
              const isFav = favoriteMajorIds.includes(rec.major.id);
              return (
                <article
                  key={rec.major.id}
                  className="rounded-2xl border border-[#E9D8D1] bg-[#FFFDF9] p-5 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#6F5472]">
                      <span>{rec.major.categoryLabelAr}</span>
                      <span className="font-bold text-[#762D50] tabular-nums">
                        {rec.affinityPercentage}%
                      </span>
                    </div>
                    <h4 className="font-display text-lg font-bold text-[#351B38]">
                      {rec.major.nameAr}
                    </h4>
                    <p className="text-xs leading-relaxed text-[#5F4562]">{rec.reasonAr}</p>
                  </div>
                  <div className="flex items-center justify-between gap-2 no-print pt-2 border-t border-[#E9D8D1]">
                    <button
                      type="button"
                      onClick={() => onToggleFavorite(rec.major.id)}
                      className="text-xs font-medium text-[#762D50] hover:underline cursor-pointer"
                    >
                      {isFav ? 'محفوظ في المفضلة ✓' : '+ المفضلة'}
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate(`/majors/${rec.major.id}`)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#351B38] hover:text-[#762D50] cursor-pointer"
                    >
                      <span>التفاصيل</span>
                      <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Transparent Calculation Notice */}
      <section className="rounded-2xl border border-[#E9D8D1] bg-[#FFFDF9] p-5 flex items-start gap-3 text-xs sm:text-sm text-[#5F4562]">
        <Info className="h-5 w-5 shrink-0 text-[#762D50] mt-0.5" aria-hidden="true" />
        <div className="space-y-1">
          <p>
            <strong>توضيح حول نسبة التوافق المحسوبة:</strong> تُحسب النسبة المئوية رياضياً من
            تطابق متجه ميولج (<span dir="ltr">Cosine Similarity</span>) مع أوزان الأنشطة
            الستة لكل تخصص. هي مؤشر استرشادي لتقارب الاهتمامات وليست توقعاً للقبول الجامعي أو
            النجاح، ولا تزال الملاءمة العربية قيد المراجعة العلمية.
          </p>
          <p>
            <a
              href={toHref('/terms')}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/terms');
              }}
              className="font-semibold text-[#762D50] hover:underline"
            >
              اطلعي على رخصة O*NET والتعديلات
            </a>
          </p>
        </div>
      </section>

      {/* Saved Results History for THIS Person */}
      {savedRecords.length > 0 && (
        <section className="no-print rounded-2xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-[#351B38]">
            سجل النتائج السابقة لـ {activePersonName}
          </h2>
          <div className="divide-y divide-[#E9D8D1]">
            {savedRecords.map((rec) => (
              <div
                key={rec.id}
                className="py-3 flex flex-wrap items-center justify-between gap-3 text-sm"
              >
                <div className="space-y-0.5">
                  <p className="font-semibold text-[#351B38]">
                    الرمز: <span dir="ltr">{rec.hollandCode}</span> — {rec.topAreaNamesAr.join(' · ')}
                  </p>
                  <p className="text-xs text-[#6F5472] tabular-nums">
                    بتاريخ: {new Date(rec.savedAtIso).toLocaleDateString('ar-IQ')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onRestoreRecord(rec.id)}
                    className="rounded-full border border-[#E9D8D1] bg-[#F9F3EC] px-3 py-1.5 text-xs font-medium text-[#351B38] hover:border-[#762D50] cursor-pointer"
                  >
                    استعراض هذه النتيجة
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteSavedRecord(rec.id)}
                    aria-label="حذف النتيجة من السجل"
                    className="inline-flex items-center gap-1 rounded-full border border-[#E9D8D1] px-3 py-1.5 text-xs text-[#762D50] hover:bg-[#F9F3EC] cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>حذف</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Restart CTA */}
      <div className="no-print flex justify-center pt-2">
        <button
          type="button"
          onClick={() => {
            onRestartQuiz();
            onNavigate('/quiz');
          }}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#E9D8D1] bg-[#FFFDF9] px-6 py-2.5 text-sm font-medium text-[#351B38] hover:border-[#762D50] cursor-pointer"
        >
          <RotateCcw className="h-4 w-4 text-[#762D50]" aria-hidden="true" />
          <span>إجراء اختبار جديد لـ {activePersonName} (مع الاحتفاظ بالسجل)</span>
        </button>
      </div>
    </div>
  );
}
