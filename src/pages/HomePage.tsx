import React from 'react';
import {
  ArrowLeft,
  BookOpenCheck,
  Compass,
  FileText,
  Lock,
  ShieldCheck,
} from 'lucide-react';
import {
  CategoryIllustration,
  FloralDivider,
  ZahrtiBlossomMark,
} from '@/src/components/ornaments/BotanicalArt';
import { Zahrti3DStage } from '@/src/components/three/Zahrti3DStage';
import {
  PSYCH_DOMAIN_ORDER,
  PSYCH_DOMAINS,
  PSYCH_INSTRUMENTS_REGISTRY,
} from '@/src/data/assessments/registry';
import { MAJORS_CATALOG } from '@/src/data/majors/majorsCatalog';
import { PsychCompletedResult, PsychSessionState } from '@/src/types/psychology';

interface HomePageProps {
  onNavigate: (to: string) => void;
  personalName: string;
  completedResults: PsychCompletedResult[];
  sessions: Record<string, PsychSessionState>;
  hasCareerResult: boolean;
  careerAnsweredCount: number;
}

export function HomePage({
  onNavigate,
  personalName,
  completedResults,
  sessions,
  hasCareerResult,
  careerAnsweredCount,
}: HomePageProps) {
  const playableInstruments = PSYCH_INSTRUMENTS_REGISTRY.filter(
    (item) => item.scientificStatus !== 'requires_license_reference'
  );
  const completedSet = new Set(completedResults.map((r) => r.instrumentId));
  if (hasCareerResult) completedSet.add('onet-mini-ip');

  const inProgressEntry = Object.values(sessions).find(
    (s) => Object.keys(s.answers).length > 0
  );

  const featuredIds = [
    'phq-9',
    'gad-7',
    'who-5',
    'ipip-big5-50',
    'brs-6',
    'swls-5',
  ];
  const featuredInstruments = featuredIds
    .map((id) => PSYCH_INSTRUMENTS_REGISTRY.find((s) => s.id === id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const spotlightMajors = [
    MAJORS_CATALOG.find((m) => m.id === 'general-medicine'),
    MAJORS_CATALOG.find((m) => m.id === 'computer-science'),
    MAJORS_CATALOG.find((m) => m.id === 'graphic-design'),
  ].filter(Boolean);

  const completionRatio =
    playableInstruments.length > 0
      ? completedSet.size / playableInstruments.length
      : 0;
  const bloomProgress = Math.max(0.42, Math.min(1, 0.42 + completionRatio * 0.58));

  return (
    <div>
      {/* Luxury Deep Plum Hero Canvas */}
      <section className="bg-[#351B38] text-[#F9F3EC] border-b border-[#C6A56B]/25">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            {/* Editorial Copy Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2.5 text-xs tracking-wide text-[#C6A56B]">
                <ZahrtiBlossomMark className="h-5 w-5" />
                <span>
                  زهرتي — <span dir="ltr">ZAHRTI</span> · مساحة فهم الذات والصحة النفسية
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.85rem] font-bold leading-[1.68] text-[#F9F3EC]">
                {personalName ? `أهلاً ${personalName} في مساحتكِ، ` : 'مساحتكِ الهادئة '}
                <span className="block sm:inline text-[#C47C91]">
                  لفهم شخصيتكِ ومشاعركِ وميولكِ
                </span>
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-[#E9D8D1]/90 max-w-xl">
                منصة نفسية واستكشافية متكاملة مخصصة لكِ وحدكِ: تجمع مقاييس علمية مفتوحة المصدر
                للشخصية والقلق والمزاج والمرونة والرضا، مع تجربة سؤال واحد في كل شاشة وتقرير عربي
                شامل قابل للحفظ والطباعة <span dir="ltr">PDF</span>.
              </p>

              {/* Primary Single-User Action Row */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <button
                  type="button"
                  onClick={() =>
                    onNavigate(
                      inProgressEntry
                        ? `/assessment/${inProgressEntry.instrumentId}/play`
                        : '/library'
                    )
                  }
                  className="inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-[#762D50] px-7 py-3 text-sm sm:text-base font-medium text-[#F9F3EC] border border-[#C6A56B]/35 transition-colors hover:bg-[#8E3862] cursor-pointer"
                >
                  <span>
                    {inProgressEntry ? 'استكمال الجلسة المحفوظة' : 'استكشفي مكتبة الاختبارات'}
                  </span>
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate(completedSet.size > 0 ? '/report' : '/intro')}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[#E9D8D1]/35 px-6 py-3 text-sm sm:text-base font-medium text-[#F9F3EC] transition-colors hover:bg-[#4B2B4E] cursor-pointer"
                >
                  <span>
                    {completedSet.size > 0
                      ? 'فتح التقرير النفسي الشامل'
                      : careerAnsweredCount > 0 && careerAnsweredCount < 30
                      ? 'متابعة اختبار التخصصات'
                      : 'اختبار الميول المهنية'}
                  </span>
                </button>
              </div>

              {/* Clean Metric Baseline */}
              <dl className="grid grid-cols-3 gap-4 border-t border-[#C6A56B]/20 pt-6 text-xs sm:text-sm">
                <div>
                  <dt className="text-[#E9D8D1]/70">أدوات المكتبة المتاحة</dt>
                  <dd className="font-display text-lg font-bold text-[#F9F3EC] tabular-nums mt-0.5">
                    {playableInstruments.length} أداة
                  </dd>
                </div>
                <div>
                  <dt className="text-[#E9D8D1]/70">المنجز في ملفكِ</dt>
                  <dd dir="ltr" className="font-display text-lg font-bold text-[#C6A56B] tabular-nums mt-0.5 inline-block">
                    {completedSet.size} / {playableInstruments.length}
                  </dd>
                </div>
                <div>
                  <dt className="text-[#E9D8D1]/70">التخصصات الموثقة</dt>
                  <dd className="font-display text-lg font-bold text-[#F9F3EC] tabular-nums mt-0.5">
                    {MAJORS_CATALOG.length} تخصصاً
                  </dd>
                </div>
              </dl>
            </div>

            {/* 3D Blooming Sculpture Stage */}
            <div className="lg:col-span-6">
              <Zahrti3DStage
                mode="hero"
                darkSurface
                bloomProgress={bloomProgress}
                heightClass="h-[310px] sm:h-[380px] lg:h-[420px]"
                hintText="زهرة زهرتي تتفتح تدريجياً مع كل مقياس تنهينه في رحلتكِ"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Psychological Domains Overview Section */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E9D8D1] pb-5">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold tracking-wider text-[#762D50]">
              رحلة فهم الذات الشاملة · حساب شخصي واحد
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#351B38]">
              ثمانية مجالات للاكتشاف النفسي والمهني بخصوصية تامة
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/library')}
            className="text-sm font-semibold text-[#762D50] hover:underline whitespace-nowrap cursor-pointer"
          >
            دخول المكتبة الكاملة ({PSYCH_INSTRUMENTS_REGISTRY.length})
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PSYCH_DOMAIN_ORDER.map((dId) => {
            const info = PSYCH_DOMAINS[dId];
            return (
              <button
                key={dId}
                type="button"
                onClick={() => onNavigate('/library')}
                className="text-right rounded-2xl border border-[#E9D8D1] bg-[#FFFDF9] p-5 space-y-2 hover:border-[#762D50]/60 transition-colors cursor-pointer"
              >
                <p dir="ltr" className="text-[11px] font-medium text-[#9F7E44] text-right">
                  {info.nameEn}
                </p>
                <h3 className="font-display text-lg font-bold text-[#351B38]">{info.nameAr}</h3>
                <p className="text-xs leading-relaxed text-[#5F4562]">{info.shortDescAr}</p>
              </button>
            );
          })}
        </div>

        <FloralDivider />

        {/* Featured Validated Open-Access Assessments */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-[#762D50]">أبرز المقاييس العلمية المفتوحة</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#351B38]">
                ابدئي من مقياس موثوق يناسب سؤالكِ اليوم
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/report')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#762D50] hover:underline cursor-pointer"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              <span>التقرير النفسي الشامل (PDF)</span>
            </button>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {featuredInstruments.map((spec) => {
              const isDone = completedSet.has(spec.id);
              return (
                <article
                  key={spec.id}
                  className="rounded-2xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 flex flex-col justify-between gap-4 hover:border-[#762D50]/50 transition-colors"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs text-[#6F5472]">
                      <span dir="ltr" className="font-semibold text-[#762D50]">
                        {spec.shortCode}
                      </span>
                      <span className="tabular-nums">
                        {spec.questionCount} فقرة · {spec.estimatedMinutes} د
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#351B38]">
                      {spec.titleAr}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#5F4562] line-clamp-3">
                      {spec.shortDescriptionAr}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => onNavigate(`/assessment/${spec.id}`)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#762D50] hover:underline cursor-pointer"
                    >
                      <span>{isDone ? 'عرض التفاصيل أو الإعادة' : 'بدء المقياس'}</span>
                      <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                    {isDone && (
                      <button
                        type="button"
                        onClick={() => onNavigate(`/assessment/${spec.id}/result`)}
                        className="text-xs font-semibold text-[#351B38] hover:underline cursor-pointer"
                      >
                        النتيجة ✓
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <FloralDivider />

        {/* Architectural Discipline Spotlight (Majors Preserved!) */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-[#762D50]">الميول المهنية والتخصصات</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#351B38]">
                دليل التخصصات الجامعية واختبار <span dir="ltr">O*NET Mini-IP</span>
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/majors')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#762D50] hover:underline cursor-pointer"
            >
              <span>عرض جميع التخصصات ({MAJORS_CATALOG.length})</span>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {spotlightMajors.map((major) =>
              major ? (
                <article
                  key={major.id}
                  className="rounded-2xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 flex flex-col justify-between gap-4 hover:border-[#762D50]/50 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <CategoryIllustration category={major.category} className="h-12 w-12" />
                      <span className="text-xs text-[#6F5472]">{major.categoryLabelAr}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#351B38]">
                      {major.nameAr}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#5F4562] line-clamp-2">
                      {major.shortDescriptionAr}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate(`/majors/${major.id}`)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#762D50] hover:underline cursor-pointer"
                  >
                    <span>قراءة تفاصيل التخصص</span>
                    <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </article>
              ) : null
            )}
          </div>
        </section>

        {/* Quiet 3-pillar Scientific Integrity Closure */}
        <section className="rounded-2xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 sm:p-8 grid gap-6 md:grid-cols-3 text-sm">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#762D50] font-display font-bold text-base">
              <BookOpenCheck className="h-4 w-4 text-[#C6A56B]" aria-hidden="true" />
              <span>أدوات معيارية وشفافية علمية</span>
            </div>
            <p className="leading-relaxed text-[#5F4562]">
              نلتزم بالمعادلات الأصلية للمقاييس المفتوحة ونفصل بوضوح بين الأدوات المقننة والوحدات
              الاستكشافية دون نسخ نصوص محمية.
            </p>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#762D50] font-display font-bold text-base">
              <Lock className="h-4 w-4 text-[#C6A56B]" aria-hidden="true" />
              <span>مساحة فردية محفوظة محلياً</span>
            </div>
            <p className="leading-relaxed text-[#5F4562]">
              كل إجاباتج وتقاريرج تُحفظ محلياً في متصفحج فقط بدون تسجيل إلزامي أو إرسال لخوادم
              خارجية.
            </p>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#762D50] font-display font-bold text-base">
              <ShieldCheck className="h-4 w-4 text-[#C6A56B]" aria-hidden="true" />
              <span>رعاية وسلامة بلا تشخيص طبي</span>
            </div>
            <p className="leading-relaxed text-[#5F4562]">
              زهرتي منصة وعي وتثقيف لا تصدر تشخيصاً سريرياً، وتوفر تنبيهات دعم إنسانية مسؤولة عند
              مؤشرات الضيق المرتفع.
            </p>
          </div>
        </section>
      </section>
    </div>
  );
}
