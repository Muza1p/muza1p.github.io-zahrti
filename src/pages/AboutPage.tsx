import React from 'react';
import { ArrowLeft, HeartHandshake, Shield } from 'lucide-react';
import { CoquetteRibbonBow, FloralDivider } from '@/src/components/ornaments/BotanicalArt';

interface AboutPageProps {
  onNavigate: (to: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 space-y-8">
      <article className="rounded-[2rem] border border-[#E8CED5] bg-[#FFFDFB] p-6 sm:p-10 space-y-7">
        <header className="space-y-3 text-center">
          <div className="flex justify-center">
            <CoquetteRibbonBow className="w-16 h-9" />
          </div>
          <p className="text-xs font-medium text-[#A9506C]">ZAHRTI · اختبار زهرتي</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#381F2E]">
            عن اختبار زهرتي
          </h1>
          <p className="mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-[#69495B]">
            مبادرة رقمية مستقلة صُممت خصيصاً لمساعدة الطالبات في عمر 18–19 سنة (وكل من يرغب في
            استكشاف ميوله) على التعرف إلى اهتماماتهن المهنية بهدوء ووضوح، بعيداً عن الضجيج أو
            التوجيه القسري.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2 pt-2">
          <div className="rounded-2xl border border-[#F0DDE2] bg-[#FDF9F6] p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-[#A9506C]">
              <HeartHandshake className="h-5 w-5" aria-hidden="true" />
              <h2 className="font-display text-lg font-bold text-[#381F2E]">
                ما الذي يقيسه هذا الاختبار؟
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-[#573E4E]">
              يركز المقياس على استكشاف <strong>الاهتمام بالأنشطة المهنية</strong> فقط عبر ستة
              أنماط (RIASEC): ماذا تحبين أن تفعلي، وما نوع البيئات التي تجذب فضولكِ؟
            </p>
          </div>

          <div className="rounded-2xl border border-[#D8CBE7] bg-[#F8F4FB] p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-[#8E74A8]">
              <Shield className="h-5 w-5" aria-hidden="true" />
              <h2 className="font-display text-lg font-bold text-[#381F2E]">
                ما الذي لا يقيسه الاختبار؟
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-[#573E4E]">
              لا يقيس هذا الاختبار الذكاء، أو القدرة العقلية، أو التحصيل الدراسي، أو الشخصية
              العامة، أو القيم الشخصية، ولا يتنبأ باحتمالية القبول الجامعي أو النجاح المهني.
            </p>
          </div>
        </section>

        <FloralDivider />

        <section className="space-y-3 text-sm sm:text-base leading-relaxed text-[#573E4E]">
          <h2 className="font-display text-xl font-bold text-[#381F2E]">
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
            className="rounded-full border border-[#E8CED5] bg-[#FBF1F3] px-5 py-2.5 text-sm font-medium text-[#381F2E] hover:bg-[#F4DCE2] cursor-pointer"
          >
            المصادر والمنهجية
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/terms')}
            className="rounded-full border border-[#E8CED5] bg-white px-5 py-2.5 text-sm font-medium text-[#A9506C] hover:bg-[#FBF1F3] cursor-pointer"
          >
            التعديلات وإخلاء المسؤولية
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/intro')}
            className="inline-flex items-center gap-2 rounded-full bg-[#A9506C] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#913F59] cursor-pointer"
          >
            <span>ابدئي الاختبار</span>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </article>
    </div>
  );
}
