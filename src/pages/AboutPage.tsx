import React from 'react';
import { ArrowLeft, HeartHandshake, Shield } from 'lucide-react';
import { CoquetteRibbonBow, FloralDivider } from '@/src/components/ornaments/BotanicalArt';

interface AboutPageProps {
  onNavigate: (to: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 space-y-8">
      <article className="rounded-[2rem] border border-[#EAD3E0] bg-[#FFFCFA] p-6 sm:p-10 space-y-7">
        <header className="space-y-3 text-center">
          <div className="flex justify-center">
            <CoquetteRibbonBow className="w-16 h-9" />
          </div>
          <p className="text-xs font-semibold text-[#C04472]">ZAHRTI · اختبار زهرتي</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#351B38]">
            عن اختبار زهرتي
          </h1>
          <p className="mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-[#5F4163]">
            مبادرة رقمية مستقلة صُممت خصيصاً لمساعدة الطالبات في عمر 18–19 سنة (وكل من يرغب في
            استكشاف ميوله) على التعرف إلى اهتماماتهن المهنية بهدوء ووضوح، بعيداً عن الضجيج أو
            التوجيه القسري.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2 pt-2">
          <div className="rounded-2xl border border-[#F2C6D8] bg-[#FDF0F5] p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-[#C04472]">
              <HeartHandshake className="h-5 w-5" aria-hidden="true" />
              <h2 className="font-display text-lg font-bold text-[#351B38]">
                ما الذي يقيسه هذا الاختبار؟
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-[#4F3553]">
              يركز المقياس على استكشاف <strong>الاهتمام بالأنشطة المهنية</strong> فقط عبر ستة
              أنماط (RIASEC): ماذا تحبين أن تفعلي، وما نوع البيئات التي تجذب فضولكِ؟
            </p>
          </div>

          <div className="rounded-2xl border border-[#D8C9F2] bg-[#F4EFFB] p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-[#7651B8]">
              <Shield className="h-5 w-5" aria-hidden="true" />
              <h2 className="font-display text-lg font-bold text-[#351B38]">
                ما الذي لا يقيسه الاختبار؟
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-[#4F3553]">
              لا يقيس هذا الاختبار الذكاء، أو القدرة العقلية، أو التحصيل الدراسي، أو الشخصية
              العامة، أو القيم الشخصية، ولا يتنبأ باحتمالية القبول الجامعي أو النجاح المهني.
            </p>
          </div>
        </section>

        <FloralDivider />

        <section className="space-y-3 text-sm sm:text-base leading-relaxed text-[#4F3553]">
          <h2 className="font-display text-xl font-bold text-[#351B38]">
            استقلالية المشروع ومصادره
          </h2>
          <p>
            مشروع زهرتي هو مشروع ويب مستقل تماماً؛ غير تابع لأي جامعة أو معهد أو وزارة أو جهة
            حكومية. يستند مقياس الاهتمامات فيه إلى بنية O*NET® Interest Profiler Mini-IP مع
            تكييف عربي مبدئي موثق وبانتظار المراجعة والتحقق العلمي.
          </p>
          <p>
            أما بيانات التخصصات فتُبنى استناداً إلى الأدلة الرسمية لوزارة التعليم العالي
            والبحث العلمي العراقية ومواقع الجامعات الرسمية، مع الإفصاح الواضح عن تاريخ آخر تحقق
            وما لم يتم التحقق منه بعد.
          </p>
        </section>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onNavigate('/methodology')}
            className="rounded-full border border-[#F2C6D8] bg-[#FDF0F5] px-5 py-2.5 text-sm font-medium text-[#351B38] hover:bg-[#FADCE8] cursor-pointer"
          >
            المصادر والمنهجية
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/terms')}
            className="rounded-full border border-[#EAD3E0] bg-white px-5 py-2.5 text-sm font-medium text-[#C04472] hover:bg-[#FDF0F5] cursor-pointer"
          >
            التعديلات وإخلاء المسؤولية
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/intro')}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-l from-[#C04472] to-[#7651B8] px-6 py-2.5 text-sm font-medium text-white hover:opacity-95 cursor-pointer"
          >
            <span>ابدئي الاختبار</span>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </article>
    </div>
  );
}
