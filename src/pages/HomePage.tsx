import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, BookOpen, Compass, ShieldCheck } from 'lucide-react';
import { CharacterStage } from '@/src/components/characters/CharacterStage';
import {
  CoquetteRibbonBow,
  FloralDivider,
} from '@/src/components/ornaments/BotanicalArt';
import { Zahrti3DStage } from '@/src/components/three/Zahrti3DStage';
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
      {/* Asymmetric 3D Botanical Hero Stage */}
      <section className="relative overflow-hidden rounded-[2rem] border border-[#EAD3E0] bg-[#FFFCFA] px-6 py-9 sm:px-10 lg:px-12 lg:py-12 shadow-[0_18px_48px_-28px_rgba(118,81,184,0.28)]">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6 text-center lg:text-right"
          >
            <div className="flex justify-center lg:justify-start">
              <CoquetteRibbonBow className="w-16 h-9" />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-[#C04472] tracking-wide">
                ZAHRTI · عالم اختبار زهرتي
              </p>
              <h1 className="font-display text-3xl font-bold leading-snug text-[#351B38] sm:text-4xl lg:text-5xl">
                اكتشفي التخصص اللي يشبهج
              </h1>
              <p className="mx-auto max-w-xl text-base leading-relaxed text-[#5F4163] sm:text-lg lg:mx-0">
                تجربة تفاعلية دافئة تجمع بين عالم زهرتي ثلاثي الأبعاد ومنهجية استكشاف الاهتمامات،
                لتكتشفي ميولكِ المهنية وتقارني التخصصات الجامعية بوضوح وهدوء.
              </p>
            </div>

            {/* Primary Berry-Violet Gradient CTA & secondary resume/explore buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2 lg:justify-start">
              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('/intro')}
                className="inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-gradient-to-l from-[#C04472] to-[#7651B8] px-8 py-3 text-base font-medium text-white shadow-sm hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C04472] cursor-pointer whitespace-nowrap"
              >
                <span>ابدئي رحلتج</span>
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </motion.button>

              {answeredCount > 0 && answeredCount < 30 && (
                <button
                  type="button"
                  onClick={() => onNavigate('/quiz')}
                  className="inline-flex min-h-[46px] items-center rounded-full border border-[#F2A6C1] bg-[#FDF0F5] px-6 py-3 text-sm font-medium text-[#351B38] transition-colors hover:bg-[#FADCE8] cursor-pointer whitespace-nowrap"
                >
                  متابعة التقدم المحفوظ ({answeredCount} من 30)
                </button>
              )}

              {hasResult && (
                <button
                  type="button"
                  onClick={() => onNavigate('/results')}
                  className="inline-flex min-h-[46px] items-center rounded-full border border-[#B49AE8] bg-[#F4EFFB] px-6 py-3 text-sm font-medium text-[#351B38] transition-colors hover:bg-[#EAE0F8] cursor-pointer whitespace-nowrap"
                >
                  عرض نتيجتي المحفوظة
                </button>
              )}
            </div>

            {/* Visual stage preview strip */}
            <div className="pt-4 border-t border-[#F2E2EB]">
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-[#5F4163] lg:justify-start">
                <span>٠١. أجيبي على ٣٠ نشاطاً مهنياً</span>
                <span aria-hidden="true" className="text-[#D5B36A]">✦</span>
                <span>٠٢. تعرّفي على زهرة اهتماماتج</span>
                <span aria-hidden="true" className="text-[#D5B36A]">✦</span>
                <span>٠٣. استكشفي وقارني التخصصات</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <Zahrti3DStage
              mode="hero"
              heightClass="h-[320px] sm:h-[380px]"
              hintText="حرّكي المؤشر أو اضغطي على زهرة زهرتي التفاعلية"
            />
          </motion.div>
        </div>
      </section>

      {/* Section 1: كيف يعمل الاختبار؟ (Distinct tonal progression ribbon) */}
      <section className="mt-14 space-y-8" aria-labelledby="how-it-works-heading">
        <div className="text-center space-y-2">
          <h2
            id="how-it-works-heading"
            className="font-display text-2xl font-bold text-[#351B38] sm:text-3xl"
          >
            كيف يعمل الاختبار؟
          </h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base text-[#5F4163]">
            ثلاث خطوات بسيطة ومجانية دون الحاجة لإنشاء حساب أو إدخال بيانات شخصية
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-3xl border border-[#F2C6D8] bg-[#FFFCFA] p-6 space-y-3">
            <p className="font-display text-xs font-bold text-[#C04472] tabular-nums">
              المرحلة 01 · الدفء والوضوح
            </p>
            <h3 className="font-display text-lg font-bold text-[#351B38]">
              تعبّرين عن شعورج نحو الأنشطة
            </h3>
            <p className="text-sm leading-relaxed text-[#5F4163]">
              تقرئين ٣٠ عبارة تصف أنشطة عمل واقعية، وتختارين مدى رغبتج بها من «لا أحبه أبداً» إلى
              «أحبه جداً»، مع حفظ تقدمج تلقائياً على جهازج.
            </p>
          </article>

          <article className="rounded-3xl border border-[#D8C9F2] bg-[#F4EFFB]/75 p-6 space-y-3">
            <p className="font-display text-xs font-bold text-[#7651B8] tabular-nums">
              المرحلة 02 · الخيال والاستكشاف
            </p>
            <h3 className="font-display text-lg font-bold text-[#351B38]">
              نرتب أنماط اهتماماتج الستة
            </h3>
            <p className="text-sm leading-relaxed text-[#5F4163]">
              تُحسب درجات اهتماماتج وفق نموذج RIASEC المعتمد في أداة O*NET Mini-IP عبر ستة أبعاد:
              العملي، البحثي، الفني، الاجتماعي، الريادي، والتنظيمي.
            </p>
          </article>

          <article className="rounded-3xl border border-[#EAD8AF] bg-[#FCF7EC]/80 p-6 space-y-3">
            <p className="font-display text-xs font-bold text-[#9F7C33] tabular-nums">
              المرحلة 03 · مقارنة متوازنة
            </p>
            <h3 className="font-display text-lg font-bold text-[#351B38]">
              تستكشفين التخصصات وتقارنين بينها
            </h3>
            <p className="text-sm leading-relaxed text-[#5F4163]">
              نعرض لج تخصصات تتقاطع مع ملف اهتماماتج، مع توضيح المواد الدراسية والتحديات الواقعية
              والجامعات العراقية الموثقة، وأداة لمقارنة التخصصات.
            </p>
          </article>
        </div>
      </section>

      <FloralDivider className="my-12" />

      {/* Section 2: ماذا ستكتشفين؟ + طبيعة النتائج (Editorial asymmetric split) */}
      <section className="grid gap-8 lg:grid-cols-12 items-start">
        <div className="lg:col-span-7 space-y-6 rounded-3xl border border-[#EAD3E0] bg-[#FFFCFA] p-7 sm:p-9">
          <div className="flex items-center gap-2.5 text-[#C04472]">
            <Compass className="h-5 w-5" aria-hidden="true" />
            <h2 className="font-display text-2xl font-bold text-[#351B38]">
              ماذا ستكتشفين في زهرتي؟
            </h2>
          </div>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#5F4163]">
            <p>
              لا يكتفي الاختبار بوضعج داخل قالب واحد، بل يوضح لج كيف تتوزع ميولج بين الأنماط
              الستة لتكوين صورة أوسع عن الأنشطة التي تشعرين فيها بالفضول والارتياح.
            </p>
            <ul className="space-y-2.5 pt-1 text-[#351B38]">
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#C04472]" aria-hidden="true" />
                <span>خريطة تفاعلية ثلاثية الأبعاد ورادار شبكي للأنماط الستة (RIASEC).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#7651B8]" aria-hidden="true" />
                <span>ترشيح استكشافي لتخصصات متنوعة لا تقتصر على الطب والهندسة فقط، مع بدائل قريبة.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#D5B36A]" aria-hidden="true" />
                <span>تفاصيل متوازنة لكل تخصص: المواد، المهارات، طبيعة الدراسة، والتحديات الحقيقية.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#C04472]" aria-hidden="true" />
                <span>أسئلة للتفكير الذاتي وخطوات عملية قبل ملء استمارة القبول.</span>
              </li>
            </ul>
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate('/interests')}
              className="rounded-full border border-[#F2C6D8] bg-[#FDF0F5] px-5 py-2 text-sm font-medium text-[#351B38] hover:bg-[#FADCE8] transition-colors cursor-pointer whitespace-nowrap"
            >
              تعرّفي على الأنماط الستة
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/majors')}
              className="rounded-full border border-[#EAD3E0] bg-white px-5 py-2 text-sm font-medium text-[#5F4163] hover:text-[#351B38] hover:bg-[#FDF0F5] transition-colors cursor-pointer whitespace-nowrap"
            >
              تصفحي دليل التخصصات
            </button>
          </div>
        </div>

        {/* Nature of results & important disclaimer */}
        <aside className="lg:col-span-5 space-y-6 rounded-3xl border border-[#D8C9F2] bg-[#F4EFFB] p-7 sm:p-8">
          <div className="flex items-center gap-2.5 text-[#7651B8]">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            <h2 className="font-display text-xl font-bold text-[#351B38]">
              الاختبار لا يقرر مستقبلكِ نيابة عنكِ
            </h2>
          </div>

          <div className="space-y-3 text-sm leading-relaxed text-[#4F3553]">
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

          <div className="pt-2 border-t border-[#E0D4F2] text-xs text-[#5F4163] space-y-1">
            <p>
              الترجمة العربية في هذه النسخة تكييف مبدئي لم تخضع بعد لدراسة تقنين علمي رسمية.
            </p>
            <a
              href="/methodology"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/methodology');
              }}
              className="inline-block font-semibold text-[#7651B8] hover:underline"
            >
              اقرئي عن الأساس العلمي والمصادر
            </a>
          </div>
        </aside>
      </section>

      {/* Section 3: المجالات التي يمكن استكشافها (9 domains with Kawaii 3D companion guides) */}
      <section className="mt-14 space-y-7" aria-labelledby="fields-heading">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1.5">
            <h2
              id="fields-heading"
              className="font-display text-2xl font-bold text-[#351B38]"
            >
              المجالات التي يمكنكِ استكشافها
            </h2>
            <p className="text-sm text-[#5F4163]">
              تسعة مجالات أكاديمية وتقنية ترافقها شخصيات بصرية للتعريف بالمسارات دون تفضيل مجال على آخر
            </p>
          </div>
          <a
            href="/majors"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/majors');
            }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C04472] hover:underline whitespace-nowrap"
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
              className="group flex items-center gap-4 rounded-3xl border border-[#EAD3E0] bg-[#FFFCFA] p-4 text-right transition-all hover:-translate-y-0.5 hover:border-[#C04472] hover:bg-[#FDF0F5]/65 cursor-pointer"
            >
              <CharacterStage
                characterId={DOMAIN_CHARACTER_MAP[cat.id]}
                variant="avatar"
                interactive={false}
                className="h-20 w-20 shrink-0"
              />
              <div className="space-y-1 min-w-0">
                <h3 className="font-display text-base font-bold text-[#351B38] group-hover:text-[#C04472] transition-colors">
                  {cat.labelAr}
                </h3>
                <p className="text-xs leading-relaxed text-[#5F4163]">
                  {cat.descriptionAr}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Section 4: RIASEC quick ribbon + bottom CTA */}
      <section className="mt-14 rounded-3xl border border-[#EAD3E0] bg-gradient-to-br from-[#FDF0F5] via-[#FFF8F3] to-[#F4EFFB] p-7 sm:p-10 text-center space-y-6">
        <div className="space-y-2">
          <h2 className="font-display text-2xl font-bold text-[#351B38]">
            مستعدة تبدئين؟
          </h2>
          <p className="mx-auto max-w-xl text-sm sm:text-base text-[#5F4163]">
            اختبري اهتماماتج في أجواء هادئة، واكتشفي التخصصات اللي تشبه ميولج عبر الأنماط الستة (
            {RIASEC_ORDER.map((c) => RIASEC_PROFILES[c].letter).join(' · ')})
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('/intro')}
            className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-gradient-to-l from-[#C04472] to-[#7651B8] px-8 py-3 text-base font-medium text-white shadow-sm hover:opacity-95 transition-opacity cursor-pointer"
          >
            <span>ابدئي الاختبار الآن</span>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}
