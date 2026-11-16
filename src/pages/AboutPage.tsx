import React from 'react';
import { ArrowLeft, HeartHandshake, Shield } from 'lucide-react';
import { EditorialCrest, FloralDivider } from '@/src/components/ornaments/BotanicalArt';

interface AboutPageProps {
  onNavigate: (to: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 space-y-8">
      <article className="rounded-3xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 sm:p-10 space-y-7">
        <header className="space-y-3 text-center">
          <div className="flex justify-center">
            <EditorialCrest className="w-16 h-9" />
          </div>
          <p className="text-xs font-semibold text-[#762D50]">
            زهرتي — <span dir="ltr">ZAHRTI</span>
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#351B38]">
            عن اختبار زهرتي
          </h1>
          <p className="mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-[#5F4562]">
            مبادرة رقمية مستقلة صُممت لمساعدة الطالبات والشباب على التعرف إلى اهتماماتهم المهنية
            واستكشاف التخصصات الجامعية بوعي وهدوء، مع مساحة متزنة لقراءة التوافق الفكري بين شخصين.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2 pt-2">
          <div className="rounded-2xl border border-[#E9D8D1] bg-[#F9F3EC] p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-[#762D50]">
              <HeartHandshake className="h-5 w-5" aria-hidden="true" />
              <h2 className="font-display text-lg font-bold text-[#351B38]">
                ما الذي يقيسه هذا الاختبار؟
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-[#5F4562]">
              يركز المقياس على استكشاف <strong>الاهتمام بالأنشطة المهنية</strong> فقط عبر ستة أنماط (
              <span dir="ltr">RIASEC</span>): ماذا تحبين أن تفعلي، وما نوع البيئات التي تجذب فضولكِ؟
            </p>
          </div>

          <div className="rounded-2xl border border-[#E9D8D1] bg-[#F9F3EC] p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-[#351B38]">
              <Shield className="h-5 w-5 text-[#C6A56B]" aria-hidden="true" />
              <h2 className="font-display text-lg font-bold text-[#351B38]">
                ما الذي لا يقيسه الاختبار؟
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-[#5F4562]">
              لا يقيس الذكاء أو التحصيل الدراسي أو الشخصية السريرية، ولا يتنبأ باحتمالية القبول
              الجامعي أو نجاح العلاقات الشخصية بشكل قاطع.
            </p>
          </div>
        </section>

        <FloralDivider />

        <section className="space-y-3 text-sm sm:text-base leading-relaxed text-[#5F4562]">
          <h2 className="font-display text-xl font-bold text-[#351B38]">
            استقلالية المشروع ومصادره
          </h2>
          <p>
            مشروع زهرتي مشروع ويب مستقل تماماً؛ غير تابع لأي جامعة أو معهد أو وزارة. يستند مقياس
            الاهتمامات إلى بنية <span dir="ltr">O*NET® Interest Profiler Mini-IP</span> مع تكييف
            عربي مبدئي موثق وبانتظار المراجعة والتحقق العلمي.
          </p>
          <p>
            أما بيانات التخصصات فتُبنى استناداً إلى الأدلة الرسمية لوزارة التعليم العالي والبحث
            العلمي العراقية ومواقع الجامعات الرسمية، مع الإفصاح الواضح عن تاريخ آخر تحقق.
          </p>
        </section>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onNavigate('/methodology')}
            className="rounded-full border border-[#E9D8D1] bg-[#F9F3EC] px-5 py-2.5 text-sm font-medium text-[#351B38] hover:border-[#762D50] cursor-pointer"
          >
            المصادر والمنهجية
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/terms')}
            className="rounded-full border border-[#E9D8D1] bg-white px-5 py-2.5 text-sm font-medium text-[#762D50] hover:bg-[#F9F3EC] cursor-pointer"
          >
            التعديلات وإخلاء المسؤولية
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/intro')}
            className="inline-flex items-center gap-2 rounded-full bg-[#762D50] px-6 py-2.5 text-sm font-medium text-[#F9F3EC] hover:bg-[#5D223E] cursor-pointer"
          >
            <span>ابدئي الاختبار</span>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </article>
    </div>
  );
}
