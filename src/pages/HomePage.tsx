import React from 'react';
import { ArrowLeft, Compass, HeartHandshake, Lock, Sparkles, UserCheck } from 'lucide-react';
import {
  CategoryIllustration,
  FloralDivider,
  ZahrtiBlossomMark,
} from '@/src/components/ornaments/BotanicalArt';
import { Zahrti3DStage } from '@/src/components/three/Zahrti3DStage';
import { MAJORS_CATALOG } from '@/src/data/majors/majorsCatalog';
import { PersonId } from '@/src/types';

interface HomePageProps {
  onNavigate: (to: string) => void;
  activePersonId: PersonId;
  person1Name: string;
  person2Name: string;
  hasCustomNames: boolean;
  person1Completed: boolean;
  person2Completed: boolean;
  person1AnsweredCount: number;
  person2AnsweredCount: number;
  onSelectPerson: (personId: PersonId) => void;
}

export function HomePage({
  onNavigate,
  activePersonId,
  person1Name,
  person2Name,
  hasCustomNames,
  person1Completed,
  person2Completed,
  person1AnsweredCount,
  person2AnsweredCount,
  onSelectPerson,
}: HomePageProps) {
  const spotlightMajors = [
    MAJORS_CATALOG.find((m) => m.id === 'general-medicine'),
    MAJORS_CATALOG.find((m) => m.id === 'computer-science'),
    MAJORS_CATALOG.find((m) => m.id === 'graphic-design'),
  ].filter(Boolean);

  // Progressive 3D bloom reflects real overall journey completion
  const totalAnswered = person1AnsweredCount + person2AnsweredCount;
  const bloomProgress = Math.max(0.38, Math.min(1, 0.38 + (totalAnswered / 60) * 0.62));
  const bothReady = person1Completed && person2Completed;

  const openPersonJourney = (personId: PersonId, completed: boolean) => {
    onSelectPerson(personId);
    if (!hasCustomNames) {
      onNavigate('/intro');
      return;
    }
    onNavigate(completed ? '/results' : '/quiz');
  };

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
                <span>زهرتي — <span dir="ltr">ZAHRTI</span> · استكشاف الميول والتوافق</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.95rem] font-bold leading-[1.7] text-[#F9F3EC]">
                اكتشفي التخصص اللي يشبهج،{' '}
                <span className="block sm:inline text-[#C47C91]">
                  واكتشفا نقطة التقاء شخصيتيكما
                </span>
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-[#E9D8D1]/90 max-w-xl">
                تجربة هادئة وموثقة مبنية على مقياس الاهتمامات المهنية (
                <span dir="ltr" className="inline-block">
                  O*NET Mini-IP
                </span>
                ): يخوض كل طرف اختباره بخصوصية تامة، ليستكشف مساراته الجامعية أو تلتقي نتائجكما في
                صفحة التوافق وعالمنا.
              </p>

              {/* Personalized Action Row */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <button
                  type="button"
                  onClick={() => onNavigate('/intro')}
                  className="inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-[#762D50] px-7 py-3 text-sm sm:text-base font-medium text-[#F9F3EC] border border-[#C6A56B]/35 transition-colors hover:bg-[#8E3862] cursor-pointer"
                >
                  <span>
                    {hasCustomNames
                      ? `متابعة رحلة ${activePersonId === 'person1' ? person1Name : person2Name}`
                      : 'إعداد الأسماء والبدء'}
                  </span>
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate(bothReady ? '/compatibility' : '/majors')}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[#E9D8D1]/35 px-6 py-3 text-sm sm:text-base font-medium text-[#F9F3EC] transition-colors hover:bg-[#4B2B4E] cursor-pointer"
                >
                  <span>{bothReady ? 'عرض التوافق المشترك' : 'تصفحي دليل التخصصات'}</span>
                </button>
              </div>

              {/* Clean Metric Baseline */}
              <dl className="grid grid-cols-3 gap-4 border-t border-[#C6A56B]/20 pt-6 text-xs sm:text-sm">
                <div>
                  <dt className="text-[#E9D8D1]/70">عدد الأسئلة</dt>
                  <dd className="font-display text-lg font-bold text-[#F9F3EC] tabular-nums mt-0.5">
                    30 فقرة
                  </dd>
                </div>
                <div>
                  <dt className="text-[#E9D8D1]/70">الزمن التقريبي</dt>
                  <dd className="font-display text-lg font-bold text-[#F9F3EC] tabular-nums mt-0.5">
                    4 دقائق
                  </dd>
                </div>
                <div>
                  <dt className="text-[#E9D8D1]/70">التخصصات الموثقة</dt>
                  <dd className="font-display text-lg font-bold text-[#C6A56B] tabular-nums mt-0.5">
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
                hintText="زهرة زهرتي تتفتح تدريجياً مع تقدمكما في استكشاف اهتماماتكما · حرّكي المؤشر للتأمل"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Two-Person Private Journey Entry Section */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E9D8D1] pb-5">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold tracking-wider text-[#762D50]">
              مساران مستقلان · نتيجة مشتركة
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#351B38]">
              {hasCustomNames
                ? `رحلة ${person1Name} و${person2Name} في زهرتي`
                : 'ابدآ بتحديد الأسماء ثم يخوض كل طرف اختباره باستقلال'}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/intro')}
            className="text-sm font-semibold text-[#762D50] hover:underline whitespace-nowrap cursor-pointer"
          >
            {hasCustomNames ? 'تعديل الأسماء أو تبديل الجلسة' : 'إدخال الاسمين الآن'}
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Person 1 Panel */}
          <article className="rounded-2xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 flex flex-col justify-between gap-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-[#6F5472]">
                <span className="font-semibold text-[#762D50]">المسار الأول</span>
                <UserCheck className="h-4 w-4 text-[#C6A56B]" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#351B38]">
                {person1Name}
              </h3>
              <p className="text-sm leading-relaxed text-[#5F4562] tabular-nums">
                {person1Completed
                  ? 'اكتمل الاختبار الشخصي وجاهز لعرض التخصصات المقترحة.'
                  : person1AnsweredCount > 0
                  ? `تمت الإجابة على ${person1AnsweredCount} من 30 فقرة.`
                  : 'جلسة مستقلة ومحفوظة محلياً؛ لم يبدأ الاختبار بعد.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => openPersonJourney('person1', person1Completed)}
              className="w-full min-h-[44px] rounded-full bg-[#351B38] px-5 py-2.5 text-sm font-medium text-[#F9F3EC] hover:bg-[#4B2B4E] transition-colors cursor-pointer"
            >
              {person1Completed
                ? `نتيجة ${person1Name}`
                : person1AnsweredCount > 0
                ? 'متابعة الاختبار'
                : 'بدء اختبار الطرف الأول'}
            </button>
          </article>

          {/* Person 2 Panel */}
          <article className="rounded-2xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 flex flex-col justify-between gap-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-[#6F5472]">
                <span className="font-semibold text-[#762D50]">المسار الثاني</span>
                <UserCheck className="h-4 w-4 text-[#C47C91]" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#351B38]">
                {person2Name}
              </h3>
              <p className="text-sm leading-relaxed text-[#5F4562] tabular-nums">
                {person2Completed
                  ? 'اكتمل الاختبار الشخصي وجاهز لعرض التخصصات المقترحة.'
                  : person2AnsweredCount > 0
                  ? `تمت الإجابة على ${person2AnsweredCount} من 30 فقرة.`
                  : 'جلسة منفصلة تماماً عن المسار الأول؛ لم يبدأ الاختبار بعد.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => openPersonJourney('person2', person2Completed)}
              className="w-full min-h-[44px] rounded-full bg-[#762D50] px-5 py-2.5 text-sm font-medium text-[#F9F3EC] hover:bg-[#5D223E] transition-colors cursor-pointer"
            >
              {person2Completed
                ? `نتيجة ${person2Name}`
                : person2AnsweredCount > 0
                ? 'متابعة الاختبار'
                : 'بدء اختبار الطرف الثاني'}
            </button>
          </article>

          {/* Compatibility & Our World Gate Panel */}
          <article className="rounded-2xl border border-[#C6A56B]/55 bg-gradient-to-br from-[#F9F3EC] to-[#F3E7DF] p-6 flex flex-col justify-between gap-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-[#6F5472]">
                <span className="font-semibold text-[#9F7E44]">المساحة المشتركة</span>
                {bothReady ? (
                  <HeartHandshake className="h-4 w-4 text-[#762D50]" aria-hidden="true" />
                ) : (
                  <Lock className="h-4 w-4 text-[#9F7E44]" aria-hidden="true" />
                )}
              </div>
              <h3 className="font-display text-xl font-bold text-[#351B38]">
                التوافق وعالمنا
              </h3>
              <p className="text-sm leading-relaxed text-[#5F4562]">
                {bothReady
                  ? 'اكتمل المساران. يمكنكُما الآن استعراض تحليل التوافق الثلاثي الأبعاد وصفحة عالمنا.'
                  : 'يُفتح تحليل التوافق وصفحة عالمنا تلقائياً فور إكمال الطرفين لاختبارهما، دون عرض إجابات أحدهما للآخر.'}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onNavigate('/compatibility')}
                className="flex-1 min-h-[44px] rounded-full border border-[#351B38] bg-transparent px-4 py-2 text-sm font-medium text-[#351B38] hover:bg-[#351B38] hover:text-[#F9F3EC] transition-colors cursor-pointer"
              >
                التوافق
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/our-world')}
                className="flex-1 min-h-[44px] rounded-full border border-[#762D50]/50 bg-[#FFFDF9] px-4 py-2 text-sm font-medium text-[#762D50] hover:bg-[#762D50] hover:text-[#F9F3EC] transition-colors cursor-pointer"
              >
                عالمنا
              </button>
            </div>
          </article>
        </div>

        <FloralDivider />

        {/* Architectural Discipline Spotlight */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-[#762D50]">دليل التخصصات الجامعية</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#351B38]">
                استكشفي التخصصات مع إمكانية الحفظ والمقارنة
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

        {/* Quiet 3-pillar editorial closure */}
        <section className="rounded-2xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 sm:p-8 grid gap-6 md:grid-cols-3 text-sm">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#762D50] font-display font-bold text-base">
              <Sparkles className="h-4 w-4 text-[#C6A56B]" aria-hidden="true" />
              <span>ترتيب واقعي للتخصصات</span>
            </div>
            <p className="leading-relaxed text-[#5F4562]">
              نرتب لكِ الأنسب أولاً ثم البدائل المناسبة، مع نسبة توافق محسوبة رياضياً وسبب واضح لكل خيار.
            </p>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#762D50] font-display font-bold text-base">
              <Lock className="h-4 w-4 text-[#C6A56B]" aria-hidden="true" />
              <span>فصل تام وخصوصية محلية</span>
            </div>
            <p className="leading-relaxed text-[#5F4562]">
              ملف كل طرف محفوظ بصورة مستقلة في هذا المتصفح، ولا تفتح مساحة التوافق إلا بعد إكمال الطرفين.
            </p>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#762D50] font-display font-bold text-base">
              <Compass className="h-4 w-4 text-[#C6A56B]" aria-hidden="true" />
              <span>توجيه بلا أحكام حتمية</span>
            </div>
            <p className="leading-relaxed text-[#5F4562]">
              اختبار زهرتي أداة تأمل واستكشاف أولية تدعم قراركِ الواعي، ولا تقيد مستقبلج بتصنيف واحد.
            </p>
          </div>
        </section>
      </section>
    </div>
  );
}
