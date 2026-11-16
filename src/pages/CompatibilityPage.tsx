import React from 'react';
import {
  ArrowLeft,
  Compass,
  HeartHandshake,
  Info,
  Lock,
  MessageCircleHeart,
  Sparkles,
} from 'lucide-react';
import { EditorialCrest, FloralDivider } from '@/src/components/ornaments/BotanicalArt';
import { Zahrti3DStage } from '@/src/components/three/Zahrti3DStage';
import { RIASEC_PROFILES } from '@/src/data/interests/riasecProfiles';
import { CompatibilityReport, PersonId } from '@/src/types';

interface CompatibilityPageProps {
  person1Name: string;
  person2Name: string;
  person1Completed: boolean;
  person2Completed: boolean;
  lockedReason: string | null;
  report: CompatibilityReport | null;
  onStartPersonTest: (personId: PersonId) => void;
  onNavigate: (to: string) => void;
}

export function CompatibilityPage({
  person1Name,
  person2Name,
  person1Completed,
  person2Completed,
  lockedReason,
  report,
  onStartPersonTest,
  onNavigate,
}: CompatibilityPageProps) {
  // Strictly gated: never display partial/fabricated compatibility before BOTH finish
  if (lockedReason !== null || !report) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="rounded-3xl border border-[#E9D8D1] bg-[#FFFDF9] p-8 sm:p-12 text-center space-y-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#C6A56B]/45 bg-[#F9F3EC] text-[#762D50]">
            <Lock className="h-6 w-6" aria-hidden="true" />
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-wider text-[#9F7E44]">
              مساحة التوافق المشتركة مغلقة مؤقتاً
            </p>
            <h1 className="font-display text-3xl font-bold text-[#351B38]">
              يلزم إكمال الطرفين لاختبارهما أولاً
            </h1>
            <p className="mx-auto max-w-xl text-sm sm:text-base leading-relaxed text-[#5F4562]">
              {lockedReason || 'تُحسب نتائج التوافق من الملفين الفعليين للطرفين معاً دون تخمين أو بيانات جزئية.'}
            </p>
          </div>

          {/* Honest status indicator per person (boolean completion only — never raw answers) */}
          <div className="mx-auto max-w-md grid gap-3 sm:grid-cols-2 text-sm text-right">
            <div className="rounded-2xl border border-[#E9D8D1] bg-[#F9F3EC] p-4 space-y-2">
              <div className="font-display font-bold text-[#351B38]">{person1Name}</div>
              <p className="text-xs text-[#5F4562]">
                {person1Completed ? 'أكمل الاختبار ✓' : 'لم يُكمل الاختبار بعد'}
              </p>
              {!person1Completed && (
                <button
                  type="button"
                  onClick={() => onStartPersonTest('person1')}
                  className="text-xs font-semibold text-[#762D50] hover:underline cursor-pointer"
                >
                  بدء / متابعة اختبار {person1Name}
                </button>
              )}
            </div>

            <div className="rounded-2xl border border-[#E9D8D1] bg-[#F9F3EC] p-4 space-y-2">
              <div className="font-display font-bold text-[#351B38]">{person2Name}</div>
              <p className="text-xs text-[#5F4562]">
                {person2Completed ? 'أكمل الاختبار ✓' : 'لم يُكمل الاختبار بعد'}
              </p>
              {!person2Completed && (
                <button
                  type="button"
                  onClick={() => onStartPersonTest('person2')}
                  className="text-xs font-semibold text-[#762D50] hover:underline cursor-pointer"
                >
                  بدء / متابعة اختبار {person2Name}
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('/intro')}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#762D50] px-6 py-2.5 text-sm font-medium text-[#F9F3EC] hover:bg-[#5D223E] cursor-pointer"
            >
              <span>إعداد الأسماء أو الاختبار</span>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/settings')}
              className="inline-flex min-h-[44px] items-center rounded-full border border-[#E9D8D1] bg-white px-5 py-2.5 text-sm font-medium text-[#351B38] hover:bg-[#F9F3EC] cursor-pointer"
            >
              إعدادات الخصوصية
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 space-y-10">
      {/* Dark Deep Plum Harmony Centerpiece */}
      <section className="rounded-3xl bg-[#351B38] text-[#F9F3EC] p-6 sm:p-10 border border-[#C6A56B]/30">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#C6A56B]">
              <HeartHandshake className="h-4 w-4" aria-hidden="true" />
              <span>التوافق الاستكشافي بين شخصيتين</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-bold leading-snug text-[#F9F3EC]">
              تلاقي اهتمامات {person1Name} و{person2Name}
            </h1>

            <p className="text-sm sm:text-base leading-relaxed text-[#E9D8D1]/90">
              تُظهر هذه القراءة أوجه التقارب والتكامل انطلاقاً من ملفات <span dir="ltr">RIASEC</span>{' '}
              الفعلية لكل منكما، دون عرض الإجابات الفردية لأي طرف.
            </p>

            {/* Primary Computed Compatibility Metrics */}
            <dl className="grid grid-cols-3 gap-4 border-t border-[#C6A56B]/25 pt-5">
              <div>
                <dt className="text-xs text-[#E9D8D1]/75">مؤشر الانسجام العام</dt>
                <dd className="font-display text-3xl font-bold text-[#C6A56B] tabular-nums mt-0.5">
                  {report.harmonyIndex}%
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[#E9D8D1]/75">تشابه الاتجاهات</dt>
                <dd className="font-display text-2xl font-bold text-[#F9F3EC] tabular-nums mt-1">
                  {report.cosineSimilarityPct}%
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[#E9D8D1]/75">تقارب الشدة</dt>
                <dd className="font-display text-2xl font-bold text-[#F9F3EC] tabular-nums mt-1">
                  {report.proximityAlignmentPct}%
                </dd>
              </div>
            </dl>

            <div className="pt-1">
              <button
                type="button"
                onClick={() => onNavigate('/our-world')}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#762D50] border border-[#C6A56B]/35 px-6 py-2.5 text-sm font-medium text-[#F9F3EC] hover:bg-[#8E3862] cursor-pointer"
              >
                <span>الانتقال إلى «عالمنا»</span>
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <Zahrti3DStage
              mode="compatibility"
              darkSurface
              harmonyIndex={report.harmonyIndex}
              heightClass="h-[280px] sm:h-[340px]"
              hintText="مدار ثلاثي الأبعاد يعكس تقارب شخصيتيكما وتكامل أنماطكما"
            />
          </div>
        </div>
      </section>

      {/* Two Personality Summaries */}
      <section className="grid gap-5 md:grid-cols-2">
        <article className="rounded-2xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-[#351B38]">{person1Name}</h2>
            <span className="text-xs font-semibold text-[#762D50]" dir="ltr">
              {report.person1TopCodes.map((c) => RIASEC_PROFILES[c].letter).join('')}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-[#5F4562]">
            {report.personalitySummaryPerson1Ar}
          </p>
        </article>

        <article className="rounded-2xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-[#351B38]">{person2Name}</h2>
            <span className="text-xs font-semibold text-[#762D50]" dir="ltr">
              {report.person2TopCodes.map((c) => RIASEC_PROFILES[c].letter).join('')}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-[#5F4562]">
            {report.personalitySummaryPerson2Ar}
          </p>
        </article>
      </section>

      {/* 6-Dimension Visual Comparison Table */}
      <section className="rounded-3xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 sm:p-8 space-y-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-[#351B38]">
            مقارنة الأبعاد الستة بين {person1Name} و{person2Name}
          </h2>
          <span className="text-xs text-[#6F5472]">المقياس من 0 إلى 20 لكل بُعد</span>
        </div>

        <div className="space-y-4">
          {report.allDimensionComparisons.map((dim) => (
            <div
              key={dim.code}
              className="rounded-2xl border border-[#E9D8D1] bg-[#F9F3EC]/60 p-4 space-y-2.5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                <strong className="font-display text-[#351B38]">{dim.nameAr}</strong>
                <div className="flex items-center gap-4 text-xs tabular-nums">
                  <span className="text-[#762D50] font-bold">
                    {person1Name}: {dim.person1Score}/20
                  </span>
                  <span className="text-[#351B38] font-bold">
                    {person2Name}: {dim.person2Score}/20
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="h-2 w-full rounded-full bg-[#E9D8D1] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#762D50]"
                    style={{ width: `${Math.max(4, (dim.person1Score / 20) * 100)}%` }}
                  />
                </div>
                <div className="h-2 w-full rounded-full bg-[#E9D8D1] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#C6A56B]"
                    style={{ width: `${Math.max(4, (dim.person2Score / 20) * 100)}%` }}
                  />
                </div>
              </div>
              <p className="text-xs text-[#5F4562]">{dim.noteAr}</p>
            </div>
          ))}
        </div>
      </section>

      <FloralDivider />

      {/* Shared Strengths & Complementary Differences */}
      <section className="grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 space-y-4">
          <div className="flex items-center gap-2 text-[#762D50]">
            <Sparkles className="h-5 w-5 text-[#C6A56B]" aria-hidden="true" />
            <h2 className="font-display text-xl font-bold text-[#351B38]">
              نقاط الالتقاء والتشابه
            </h2>
          </div>
          <ul className="space-y-3 text-sm text-[#5F4562]">
            {report.sharedStrengths.map((item) => (
              <li key={item.code} className="border-b border-[#E9D8D1] pb-2.5 last:border-b-0 last:pb-0">
                <strong className="text-[#351B38] block">{item.nameAr}</strong>
                <span>{item.noteAr}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 space-y-4">
          <div className="flex items-center gap-2 text-[#762D50]">
            <Compass className="h-5 w-5 text-[#762D50]" aria-hidden="true" />
            <h2 className="font-display text-xl font-bold text-[#351B38]">
              نقاط الاختلاف والتكامل
            </h2>
          </div>
          {report.complementaryDifferences.length > 0 ? (
            <ul className="space-y-3 text-sm text-[#5F4562]">
              {report.complementaryDifferences.map((item) => (
                <li key={item.code} className="border-b border-[#E9D8D1] pb-2.5 last:border-b-0 last:pb-0">
                  <strong className="text-[#351B38] block">{item.nameAr}</strong>
                  <span>{item.noteAr}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm leading-relaxed text-[#5F4562]">
              درجاتكما متقاربة عبر جميع الأبعاد دون تباينات حادة، مما يشير إلى إيقاع اهتمامات متشابه جداً.
            </p>
          )}
        </article>
      </section>

      {/* Communication, Decisions, Shared Activities & Understanding */}
      <section className="grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 space-y-3">
          <div className="flex items-center gap-2 text-[#762D50]">
            <MessageCircleHeart className="h-5 w-5" aria-hidden="true" />
            <h2 className="font-display text-xl font-bold text-[#351B38]">
              أسلوب التواصل واتخاذ القرار
            </h2>
          </div>
          <div className="space-y-3 text-sm leading-relaxed text-[#5F4562]">
            <p>
              <strong className="text-[#351B38]">التواصل المحتمل: </strong>
              {report.communicationTendencyAr}
            </p>
            <p>
              <strong className="text-[#351B38]">اتخاذ القرارات: </strong>
              {report.decisionStyleAr}
            </p>
          </div>
        </article>

        <article className="rounded-2xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 space-y-3">
          <div className="flex items-center gap-2 text-[#762D50]">
            <EditorialCrest className="w-7 h-5" />
            <h2 className="font-display text-xl font-bold text-[#351B38]">
              أنشطة وتوصيات للتفاهم
            </h2>
          </div>
          <ul className="list-disc list-inside space-y-1.5 text-sm leading-relaxed text-[#5F4562]">
            {report.sharedActivitiesAr.map((act) => (
              <li key={act}>{act}</li>
            ))}
          </ul>
          <div className="border-t border-[#E9D8D1] pt-3 space-y-1 text-xs leading-relaxed text-[#6F5472]">
            {report.mutualUnderstandingTipsAr.map((tip) => (
              <p key={tip}>• {tip}</p>
            ))}
          </div>
        </article>
      </section>

      {/* Methodology & Exploratory Scope Transparency */}
      <section className="rounded-2xl border border-[#E9D8D1] bg-[#FFFDF9] p-5 flex items-start gap-3 text-xs sm:text-sm text-[#5F4562]">
        <Info className="h-5 w-5 shrink-0 text-[#762D50] mt-0.5" aria-hidden="true" />
        <p className="leading-relaxed">
          <strong>منهجية الحساب ونطاق التفسير:</strong> {report.formulaDescriptionAr} جميع قراءات
          التواصل والقرار استنتاجات استكشافية مبنية على أوزان الاهتمامات المهنية ولا تشكل تشخيصاً
          نفسياً أو حكماً مصيرياً على العلاقة.
        </p>
      </section>
    </div>
  );
}
