import React from 'react';
import { ExternalLink, Scale } from 'lucide-react';
import { CoquetteRibbonBow } from '@/src/components/ornaments/BotanicalArt';
import {
  ONET_LICENSE_NOTICE_AR,
  ONET_LICENSE_NOTICE_EN,
} from '@/src/data/sources/officialSources';

interface TermsPageProps {
  onNavigate: (to: string) => void;
}

export function TermsPage({ onNavigate }: TermsPageProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <article className="rounded-[2rem] border border-[#EAD3E0] bg-[#FFFCFA] p-6 sm:p-10 space-y-7">
        <header className="space-y-3 text-center">
          <div className="flex justify-center">
            <CoquetteRibbonBow className="w-16 h-9" />
          </div>
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#FDF0F5] text-[#C04472]">
            <Scale className="h-5 w-5" aria-hidden="true" />
          </div>
          <h1 className="font-display text-3xl font-bold text-[#351B38]">
            التعديلات وإخلاء المسؤولية
          </h1>
          <p className="text-sm text-[#5F4163]">
            الشروط العلمية، إسناد ترخيص O*NET Tools Developer License، وتوضيح حدود الاستخدام
          </p>
        </header>

        {/* Verbatim O*NET Required Notice */}
        <section className="space-y-3 rounded-2xl border border-[#EAD3E0] bg-[#FFF8F3] p-5 sm:p-6">
          <h2 className="font-display text-lg font-bold text-[#351B38]">
            إشعار ترخيص مطوري أدوات O*NET® الرسمي
          </h2>
          <blockquote
            dir="ltr"
            className="rounded-xl border border-[#F0DDE7] bg-white p-4 text-xs sm:text-sm font-mono leading-relaxed text-[#351B38]"
          >
            {ONET_LICENSE_NOTICE_EN}
          </blockquote>
          <p className="text-sm leading-relaxed text-[#4F3553]">{ONET_LICENSE_NOTICE_AR}</p>
          <p className="text-xs">
            <a
              href="https://www.onetcenter.org/license_toolsdev.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[#C04472] hover:underline"
            >
              <span>نص رخصة O*NET Tools Developer License الرسمي</span>
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          </p>
        </section>

        {/* Nature of Modifications & Validation Study */}
        <section className="space-y-3 text-sm sm:text-base leading-relaxed text-[#4F3553]">
          <h2 className="font-display text-xl font-bold text-[#351B38]">
            طبيعة التعديلات ومتطلب التحقق العلمي (Validation Study)
          </h2>
          <p>
            قام مشروع زهرتي (ZAHRTI) بترجمة فقرات O*NET® Mini-IP الثلاثين ومقياس الاستجابة
            الخماسي من الإنجليزية إلى اللغة العربية الفصيحة المبسطة، وبناء طبقة استكشاف محلية تربط
            الاهتمامات بتخصصات جامعية ومهنية في البيئة العراقية والعربية.
          </p>
          <p>
            لا تزعم زهرتي أن النسخة العربية مقننة أو معتمدة من جهات رسمية في العراق أو من وزارة
            العمل الأمريكية (USDOL/ETA). ووفق شروط O*NET Tools Developer License، فإن أي إطلاق
            رسمي أو اعتماد سيكومتري للنسخة المترجمة والمعدلة يتطلب إجراء{' '}
            <strong>دراسة تحقق علمية (Validation Study)</strong> وفق المعايير المهنية (مثل معايير
            APA/AERA/NCME).
          </p>
        </section>

        {/* General Educational Disclaimer */}
        <section className="space-y-3 text-sm sm:text-base leading-relaxed text-[#4F3553]">
          <h2 className="font-display text-xl font-bold text-[#351B38]">
            إخلاء المسؤولية التعليمية والأكاديمية
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              نتائج اختبار زهرتي وتوصيات التخصصات هي أدوات استكشافية توعوية وليست استشارة طبية أو
              نفسية أو ضماناً للقبول الجامعي أو التوظيف.
            </li>
            <li>
              تخضع حدود القبول الجامعي والخطط الدراسية وافتتاح الأقسام لتحديثات وزارة التعليم العالي
              والبحث العلمي العراقية والجامعات الرسمية سنوياً؛ يجب دائماً الرجوع إلى دليل القبول
              المركزي الرسمي للعام الدراسي المعني.
            </li>
            <li>
              جميع الأسماء والمعلومات الجامعية المذكورة موثقة بتاريخ مراجعتها، ويُذكر صراحةً عند عدم
              التحقق من شمولية القائمة.
            </li>
          </ul>
        </section>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onNavigate('/methodology')}
            className="rounded-full border border-[#F2C6D8] bg-[#FDF0F5] px-5 py-2.5 text-sm font-medium text-[#351B38] hover:bg-[#FADCE8] cursor-pointer"
          >
            المصادر والمنهجية
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="rounded-full bg-gradient-to-l from-[#C04472] to-[#7651B8] px-6 py-2.5 text-sm font-medium text-white hover:opacity-95 cursor-pointer"
          >
            العودة للرئيسية
          </button>
        </div>
      </article>
    </div>
  );
}
