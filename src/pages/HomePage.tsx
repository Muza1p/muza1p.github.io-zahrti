import React from 'react';
import { ArrowLeft, BookOpen, Compass, ShieldCheck } from 'lucide-react';
import { CharacterStage } from '@/src/components/characters/CharacterStage';
import {
  CoquetteRibbonBow,
  FloralDivider,
} from '@/src/components/ornaments/BotanicalArt';
import { DOMAIN_CHARACTER_MAP } from '@/src/data/characters/kawaiiCharacters';
import { MAJOR_CATEGORIES } from '@/src/data/majors/majorsCatalog';
import { RIASEC_ORDER, RIASEC_PROFILES } from '@/src/data/interests/riasecProfiles';

interface HomePageProps {
  onNavigate: (to: string) => void;
  answeredCount: number;
  hasResult: boolean;
}

export function HomePage({ onNavigate, answeredCount, hasResult }: HomePageProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
      {/* Editorial 3D Kawaii Hero Section */}
      <section className="relative overflow-hidden rounded-[2rem] border border-[#E8CED5] bg-[#FFFDFB] px-6 py-9 sm:px-10 lg:px-12 lg:py-12 shadow-[0_14px_45px_-24px_rgba(169,80,108,0.24)]">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6 space-y-6 text-center lg:text-right">
            <div className="flex justify-center lg:justify-start">
              <CoquetteRibbonBow className="w-16 h-9" />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-[#A9506C] tracking-wide">
                ZAHRTI · عالم اختبار زهرتي
              </p>
              <h1 className="font-display text-3xl font-bold leading-snug text-[#381F2E] sm:text-4xl lg:text-5xl">
                اكتشفي التخصص اللي يشبهج
              </h1>
              <p className="mx-auto max-w-xl text-base leading-relaxed text-[#69495B] sm:text-lg lg:mx-0">
                رحلة تفاعلية دافئة برفقة شخصيات زهرتي الثلاثية الأبعاد تساعدك على استكشاف
                اهتماماتك المهنية وفهم التخصصات الجامعية التي قد تنسجم مع ميولك.
              </p>
            </div>

            {/* Primary CTA & secondary resume/explore link */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2 lg:justify-start">
              <button
                type="button"
                onClick={() => onNavigate('/intro')}
                className="inline-flex min-h-[46px] items-center gap-2.5 rounded-full bg-[#A9506C] px-7 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-[#913F59] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A9506C] cursor-pointer whitespace-nowrap"
              >
                <span>ابدئي رحلتج</span>
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>

              {answeredCount > 0 && answeredCount < 30 && (
                <button
                  type="button"
                  onClick={() => onNavigate('/quiz')}
                  className="inline-flex min-h-[46px] items-center rounded-full border border-[#E8CED5] bg-[#FBF1F3] px-6 py-3 text-sm font-medium text-[#381F2E] transition-colors hover:bg-[#F4DCE2] cursor-pointer whitespace-nowrap"
                >
                  متابعة التقدم المحفوظ ({answeredCount} من 30)
                </button>
              )}

              {hasResult && (
                <button
                  type="button"
                  onClick={() => onNavigate('/results')}
                  className="inline-flex min-h-[46px] items-center rounded-full border border-[#D8CBE7] bg-[#F4EFF8] px-6 py-3 text-sm font-medium text-[#381F2E] transition-colors hover:bg-[#EAE0F3] cursor-pointer whitespace-nowrap"
                >
                  عرض نتيجتي المحفوظة
                </button>
              )}
            </div>

            {/* Visual stage preview strip */}
            <div className="pt-4 border-t border-[#F2E2E6]">
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-[#69495B] lg:justify-start">
                <span>٠١. أجيبي على ٣٠ نشاطاً مهنياً</span>
                <span aria-hidden="true" className="text-[#C99AA8]">·</span>
                <span>٠٢. تعرّفي على خريطة اهتماماتج</span>
                <span aria-hidden="true" className="text-[#C99AA8]">·</span>
                <span>٠٣. استكشفي وقارني التخصصات</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <CharacterStage
              characterId="hero_trio"
              variant="hero"
              eager={true}
              showCaption={true}
              className="w-full max-w-[490px]"
            />
          </div>
        </div>
      </section>

      {/* Section 1: كيف يعمل الاختبار؟ (Editorial 3-stage progression) */}
      <section className="mt-14 space-y-8" aria-labelledby="how-it-works-heading">
        <div className="text-center space-y-2">
          <h2
            id="how-it-works-heading"
            className="font-display text-2xl font-bold text-[#381F2E] sm:text-3xl"
          >
            كيف يعمل الاختبار؟
          </h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base text-[#69495B]">
            ثلاث خطوات بسيطة ومجانية دون الحاجة لإنشاء حساب أو إدخال بيانات شخصية
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-3xl border border-[#E8CED5] bg-[#FFFDFB] p-6 space-y-3">
            <p className="font-display text-xs font-semibold text-[#A9506C] tabular-nums">
              المرحلة 01
            </p>
            <h3 className="font-display text-lg font-bold text-[#381F2E]">
              تعبّرين عن شعورج نحو الأنشطة
            </h3>
            <p className="text-sm leading-relaxed text-[#69495B]">
              تقرئين ٣٠ عبارة تصف أنشطة عمل واقعية، وتختارين مدى رغبتج بها من «لا أحبه أبداً» إلى
              «أحبه جداً»، مع حفظ تقدمج تلقائياً على جهازج.
            </p>
          </article>

          <article className="rounded-3xl border border-[#D8CBE7] bg-[#F8F4FB]/70 p-6 space-y-3">
            <p className="font-display text-xs font-semibold text-[#8E74A8] tabular-nums">
              المرحلة 02
            </p>
            <h3 className="font-display text-lg font-bold text-[#381F2E]">
              نرتب أنماط اهتماماتج الستة
            </h3>
            <p className="text-sm leading-relaxed text-[#69495B]">
              تُحسب درجات اهتماماتج وفق نموذج RIASEC المعتمد في أداة O*NET Mini-IP عبر ستة أبعاد:
              العملي، البحثي، الفني، الاجتماعي، الريادي، والتنظيمي.
            </p>
          </article>

          <article className="rounded-3xl border border-[#E8CED5] bg-[#FFFDFB] p-6 space-y-3">
            <p className="font-display text-xs font-semibold text-[#A9506C] tabular-nums">
              المرحلة 03
            </p>
            <h3 className="font-display text-lg font-bold text-[#381F2E]">
              تستكشفين التخصصات وتقارنين بينها
            </h3>
            <p className="text-sm leading-relaxed text-[#69495B]">
              نعرض لج تخصصات تتقاطع مع ملف اهتماماتج، مع توضيح المواد الدراسية والتحديات الواقعية
              والجامعات العراقية الموثقة، وأداة لمقارنة التخصصات.
            </p>
          </article>
        </div>
      </section>

      <FloralDivider className="my-12" />

      {/* Section 2: ماذا ستكتشفين؟ + طبيعة النتائج (Editorial asymmetric split) */}
      <section className="grid gap-8 lg:grid-cols-12 items-start">
        <div className="lg:col-span-7 space-y-6 rounded-3xl border border-[#E8CED5] bg-[#FFFDFB] p-7 sm:p-9">
          <div className="flex items-center gap-2.5 text-[#A9506C]">
            <Compass className="h-5 w-5" aria-hidden="true" />
            <h2 className="font-display text-2xl font-bold text-[#381F2E]">
              ماذا ستكتشفين في زهرتي؟
            </h2>
          </div>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#69495B]">
            <p>
              لا يكتفي الاختبار بوضعج داخل قالب واحد، بل يوضح لج كيف تتوزع ميولج بين الأنماط
              الستة لتكوين صورة أوسع عن الأنشطة التي تشعرين فيها بالفضول والارتياح.
            </p>
            <ul className="space-y-2.5 pt-1 text-[#381F2E]">
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A9506C]" aria-hidden="true" />
                <span>خريطة واضحة للأنماط الستة (RIASEC) وأعلى ثلاثة مجالات اهتمام لديكِ.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A9506C]" aria-hidden="true" />
                <span>ترشيح استكشافي لتخصصات متنوعة لا تقتصر على الطب والهندسة فقط، مع بدائل قريبة.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A9506C]" aria-hidden="true" />
                <span>تفاصيل متوازنة لكل تخصص: المواد، المهارات، طبيعة الدراسة، والتحديات الحقيقية.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A9506C]" aria-hidden="true" />
                <span>أسئلة للتفكير الذاتي وخطوات عملية قبل ملء استمارة القبول.</span>
              </li>
            </ul>
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate('/interests')}
              className="rounded-full border border-[#E8CED5] bg-[#FBF1F3] px-5 py-2 text-sm font-medium text-[#381F2E] hover:bg-[#F4DCE2] transition-colors cursor-pointer whitespace-nowrap"
            >
              تعرّفي على الأنماط الستة
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/majors')}
              className="rounded-full border border-[#E8CED5] bg-white px-5 py-2 text-sm font-medium text-[#69495B] hover:text-[#381F2E] hover:bg-[#FBF1F3] transition-colors cursor-pointer whitespace-nowrap"
            >
              تصفحي دليل التخصصات
            </button>
          </div>
        </div>

        {/* Nature of results & important disclaimer */}
        <aside className="lg:col-span-5 space-y-6 rounded-3xl border border-[#D8CBE7] bg-[#F8F4FB] p-7 sm:p-8">
          <div className="flex items-center gap-2.5 text-[#8E74A8]">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            <h2 className="font-display text-xl font-bold text-[#381F2E]">
              الاختبار لا يقرر مستقبلكِ نيابة عنكِ
            </h2>
          </div>

          <div className="space-y-3 text-sm leading-relaxed text-[#573E4E]">
            <p>
              النتيجة التي تحصلين عليها هي <strong>دليل للاستكشاف</strong> وبداية للحوار مع نفسج،
              وليست حكماً قطعياً ولا شهادة قبول جامعي.
            </p>
            <p>
              مقياس الاهتمامات المهنية يستكشف <strong>ميولج نحو الأنشطة</strong> فقط، ولا يقيس
              الذكاء، أو القدرات العقلية، أو التحصيل الدراسي، أو فرص التوظيف والنجاح المضمون.
            </p>
            <p>
              لذلك، ننصح دائماً بالنظر إلى الاهتمامات جنباً إلى جنب مع قدراتج الدراسية، ومعدلات
              القبول، والظروف الشخصية، واستشارة المختصين والمقربين.
            </p>
          </div>

          <div className="pt-2 border-t border-[#E4D9EE] text-xs text-[#69495B] space-y-1">
            <p>
              الترجمة العربية في هذه النسخة تكييف مبدئي لم تخضع بعد لدراسة تقنين علمي رسمية.
            </p>
            <a
              href="/methodology"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/methodology');
              }}
              className="inline-block font-medium text-[#8E74A8] hover:underline"
            >
              اقرئي عن الأساس العلمي والمصادر
            </a>
          </div>
        </aside>
      </section>

      {/* Section 3: المجالات التي يمكن استكشافها (9 domains with unified 3D characters) */}
      <section className="mt-14 space-y-7" aria-labelledby="fields-heading">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1.5">
            <h2
              id="fields-heading"
              className="font-display text-2xl font-bold text-[#381F2E]"
            >
              المجالات التي يمكنكِ استكشافها
            </h2>
            <p className="text-sm text-[#69495B]">
              تسعة مجالات أكاديمية وتقنية ترافقها شخصيات ثلاثية الأبعاد للتوضيح البصري فقط
            </p>
          </div>
          <a
            href="/majors"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/majors');
            }}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#A9506C] hover:underline whitespace-nowrap"
          >
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            <span>عرض جميع التخصصات</span>
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MAJOR_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onNavigate(`/majors?category=${cat.id}`)}
              className="group flex items-center gap-4 rounded-3xl border border-[#E8CED5] bg-[#FFFDFB] p-4 text-right transition-colors hover:border-[#A9506C] hover:bg-[#FBF1F3]/60 cursor-pointer"
            >
              <CharacterStage
                characterId={DOMAIN_CHARACTER_MAP[cat.id]}
                variant="avatar"
                interactive={false}
                className="h-20 w-20 shrink-0"
              />
              <div className="space-y-1 min-w-0">
                <h3 className="font-display text-base font-bold text-[#381F2E] group-hover:text-[#A9506C] transition-colors">
                  {cat.labelAr}
                </h3>
                <p className="text-xs leading-relaxed text-[#69495B]">
                  {cat.descriptionAr}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Section 4: RIASEC quick ribbon + bottom CTA */}
      <section className="mt-14 rounded-3xl border border-[#E8CED5] bg-[#FBF1F3]/70 p-7 sm:p-10 text-center space-y-6">
        <div className="space-y-2">
          <h2 className="font-display text-2xl font-bold text-[#381F2E]">
            مستعدة تبدئين؟
          </h2>
          <p className="mx-auto max-w-xl text-sm sm:text-base text-[#69495B]">
            اختبري اهتماماتج في أجواء هادئة، واكتشفي التخصصات اللي تشبه ميولج عبر الأنماط الستة (
            {RIASEC_ORDER.map((c) => RIASEC_PROFILES[c].letter).join(' · ')})
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('/intro')}
            className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#A9506C] px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-[#913F59] transition-colors cursor-pointer"
          >
            <span>ابدئي الاختبار الآن</span>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}
