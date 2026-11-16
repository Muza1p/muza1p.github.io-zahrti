import React from 'react';
import { ArrowLeft, BookOpenCheck, Shield } from 'lucide-react';
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
            عن منصة زهرتي النفسية والمهنية
          </h1>
          <p className="mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-[#5F4562]">
            منصة عربية هادئة ومستقلة صُممت خصيصاً لمستخدمة واحدة، لتساعدها على استكشاف شخصيتها
            ومشاعرها وسلوكها وميولها المهنية عبر مقاييس موثقة وتقارير تفصيلية محترمة.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2 pt-2">
          <div className="rounded-2xl border border-[#E9D8D1] bg-[#F9F3EC] p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-[#762D50]">
              <BookOpenCheck className="h-5 w-5" aria-hidden="true" />
              <h2 className="font-display text-lg font-bold text-[#351B38]">
                ما الذي تقدمه المنصة؟
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-[#5F4562]">
              أدوات معيارية مفتوحة المصدر في الشخصية والقلق والمزاج والمرونة والتعاطف والرضا عن
              الحياة، بالإضافة إلى وحدات تأملية غير مقننة موسومة بوضوح، ومقياس الميول المهنية{' '}
              <span dir="ltr">O*NET Mini-IP</span>.
            </p>
          </div>

          <div className="rounded-2xl border border-[#E9D8D1] bg-[#F9F3EC] p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-[#351B38]">
              <Shield className="h-5 w-5 text-[#C6A56B]" aria-hidden="true" />
              <h2 className="font-display text-lg font-bold text-[#351B38]">
                ما الذي لا تدّعيه المنصة؟
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-[#5F4562]">
              لا تصدر المنصة تشخيصاً طبياً أو إكلينيكياً، ولا تصنع رقماً مصطنعاً يدمج نتائج مقاييس
              مختلفة، ولا تنسخ أي مقياس محمي بحقوق نشر دون ترخيص.
            </p>
          </div>
        </section>

        <FloralDivider />

        <section className="space-y-3 text-sm sm:text-base leading-relaxed text-[#5F4562]">
          <h2 className="font-display text-xl font-bold text-[#351B38]">
            الشفافية العلمية والتراخيص
          </h2>
          <p>
            تحمل كل أداة في المكتبة ملفها التوثيقي الكامل: المؤلف، سنة النشر، المصدر الرسمي، نص
            الترخيص، طريقة الحساب، وحالة التحقق العربي؛ ليكون كل رقم تقرئينه مبنياً على علم واضح
            وليس على خوارزميات مبهمة.
          </p>
        </section>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onNavigate('/methodology')}
            className="rounded-full border border-[#E9D8D1] bg-[#F9F3EC] px-5 py-2.5 text-sm font-medium text-[#351B38] hover:border-[#762D50] cursor-pointer"
          >
            المصادر والمنهجية العلمية
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/library')}
            className="inline-flex items-center gap-2 rounded-full bg-[#762D50] px-6 py-2.5 text-sm font-medium text-[#F9F3EC] hover:bg-[#5D223E] cursor-pointer"
          >
            <span>دخول مكتبة الاختبارات</span>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </article>
    </div>
  );
}
