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
      <article className="rounded-[2rem] border border-[#E8CED5] bg-[#FFFDFB] p-6 sm:p-10 space-y-7">
        <header className="space-y-3 text-center">
          <div className="flex justify-center">
            <CoquetteRibbonBow className="w-16 h-9" />
          </div>
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#FBF1F3] text-[#A9506C]">
            <Scale className="h-5 w-5" aria-hidden="true" />
          </div>
          <h1 className="font-display text-3xl font-bold text-[#381F2E]">
            التعديلات وإخلاء المسؤولية
          </h1>
          <p className="text-sm text-[#69495B]">
            الشروط العلمية، إسناد ترخيص O*NET Tools Developer License، وتوضيح حدود الاستخدام
          </p>
        </header>

        {/* Verbatim O*NET Required Notice */}
        <section className="space-y-3 rounded-2xl border border-[#E8CED5] bg-[#FDF9F6] p-5 sm:p-6">
          <h2 className="font-display text-lg font-bold text-[#381F2E]">
            إشعار ترخيص مطوري أدوات O*NET® الرسمي
          </h2>
          <blockquote
            dir="ltr"
            className="rounded-xl border border-[#F0DDE2] bg-white p-4 text-xs sm:text-sm font-mono leading-relaxed text-[#381F2E]"
          >
            {ONET_LICENSE_NOTICE_EN}
          </blockquote>
          <p className="text-sm leading-relaxed text-[#573E4E]">{ONET_LICENSE_NOTICE_AR}</p>
          <p className="text-xs">
            <a
              href="https://www.onetcenter.org/license_toolsdev.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-[#A9506C] hover:underline"
            >
              <span>نص رخصة O*NET Tools Developer License الرسمي</span>
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          </p>
        </section>

        {/* Nature of Modifications & Validation Study */}
        <section className="space-y-3 text-sm sm:text-base leading-relaxed text-[#573E4E]">
          <h2 className="font-display text-xl font-bold text-[#381F2E]">
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
        <section className="space-y-3 text-sm sm:text-base leading-relaxed text-[#573E4E]">
          <h2 className="font-display text-xl font-bold text-[#381F2E]">
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
            className="rounded-full border border-[#E8CED5] bg-[#FBF1F3] px-5 py-2.5 text-sm font-medium text-[#381F2E] hover:bg-[#F4DCE2] cursor-pointer"
          >
            المصادر والمنهجية
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="rounded-full bg-[#A9506C] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#913F59] cursor-pointer"
          >
            العودة للرئيسية
          </button>
        </div>
      </article>
    </div>
  );
}
