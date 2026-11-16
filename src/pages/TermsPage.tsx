import React from 'react';
import { ExternalLink, Scale } from 'lucide-react';
import { EditorialCrest } from '@/src/components/ornaments/BotanicalArt';
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
      <article className="rounded-3xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 sm:p-10 space-y-7">
        <header className="space-y-3 text-center">
          <div className="flex justify-center">
            <EditorialCrest className="w-16 h-9" />
          </div>
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#E9D8D1] bg-[#F9F3EC] text-[#762D50]">
            <Scale className="h-5 w-5" aria-hidden="true" />
          </div>
          <h1 className="font-display text-3xl font-bold text-[#351B38]">
            التعديلات وإخلاء المسؤولية
          </h1>
          <p className="text-sm text-[#5F4562]">
            الشروط العلمية، إسناد ترخيص <span dir="ltr">O*NET Tools Developer License</span>، وتوضيح
            حدود الاستخدام
          </p>
        </header>

        <section className="space-y-3 rounded-2xl border border-[#E9D8D1] bg-[#F9F3EC] p-5 sm:p-6">
          <h2 className="font-display text-lg font-bold text-[#351B38]">
            إشعار ترخيص مطوري أدوات <span dir="ltr">O*NET®</span> الرسمي
          </h2>
          <blockquote
            dir="ltr"
            className="rounded-xl border border-[#E9D8D1] bg-white p-4 text-xs sm:text-sm font-mono leading-relaxed text-[#351B38]"
          >
            {ONET_LICENSE_NOTICE_EN}
          </blockquote>
          <p className="text-sm leading-relaxed text-[#5F4562]">{ONET_LICENSE_NOTICE_AR}</p>
          <p className="text-xs">
            <a
              href="https://www.onetcenter.org/license_toolsdev.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[#762D50] hover:underline"
            >
              <span>نص رخصة O*NET Tools Developer License الرسمي</span>
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          </p>
        </section>

        <section className="space-y-3 text-sm sm:text-base leading-relaxed text-[#5F4562]">
          <h2 className="font-display text-xl font-bold text-[#351B38]">
            طبيعة التعديلات ومتطلب التحقق العلمي (<span dir="ltr">Validation Study</span>)
          </h2>
          <p>
            قام مشروع زهرتي (<span dir="ltr">ZAHRTI</span>) بترجمة فقرات O*NET® Mini-IP الثلاثين
            ومقياس الاستجابة الخماسي إلى اللغة العربية الفصيحة المبسطة، وبناء طبقة استكشاف محلية
            تربط الاهتمامات بتخصصات جامعية، إضافةً إلى حساب توافق استكشافي بين شخصين.
          </p>
          <p>
            لا تزعم زهرتي أن النسخة العربية مقننة أو معتمدة من جهات رسمية في العراق أو من وزارة
            العمل الأمريكية (<span dir="ltr">USDOL/ETA</span>). ووفق شروط الترخيص، يتطلب أي اعتماد
            سيكومتري إجراء <strong>دراسة تحقق علمية (Validation Study)</strong> وفق المعايير المهنية.
          </p>
        </section>

        <section className="space-y-3 text-sm sm:text-base leading-relaxed text-[#5F4562]">
          <h2 className="font-display text-xl font-bold text-[#351B38]">
            إخلاء المسؤولية التعليمية والأكاديمية
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              نتائج اختبار زهرتي وتحليلات التوافق وتوصيات التخصصات هي أدوات استكشافية توعوية وليست
              استشارة طبية أو نفسية أو ضماناً للقبول الجامعي أو التوظيف.
            </li>
            <li>
              تخضع حدود القبول الجامعي والخطط الدراسية لتحديثات وزارة التعليم العالي والبحث العلمي
              العراقية والجامعات الرسمية سنوياً.
            </li>
          </ul>
        </section>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onNavigate('/methodology')}
            className="rounded-full border border-[#E9D8D1] bg-[#F9F3EC] px-5 py-2.5 text-sm font-medium text-[#351B38] hover:border-[#762D50] cursor-pointer"
          >
            المصادر والمنهجية
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="rounded-full bg-[#762D50] px-6 py-2.5 text-sm font-medium text-[#F9F3EC] hover:bg-[#5D223E] cursor-pointer"
          >
            العودة للرئيسية
          </button>
        </div>
      </article>
    </div>
  );
}
