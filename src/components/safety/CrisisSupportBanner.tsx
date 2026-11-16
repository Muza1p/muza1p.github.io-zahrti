import React from 'react';
import { HeartHandshake, PhoneCall } from 'lucide-react';

interface CrisisSupportBannerProps {
  reasonAr?: string;
}

export function CrisisSupportBanner({ reasonAr }: CrisisSupportBannerProps) {
  return (
    <aside
      role="alert"
      aria-live="assertive"
      className="rounded-2xl border border-[#762D50] bg-[#FAF0F3] p-6 sm:p-7 space-y-4 text-[#351B38]"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#762D50] text-[#F9F3EC]">
          <HeartHandshake className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="space-y-1.5">
          <h2 className="font-display text-lg sm:text-xl font-bold text-[#762D50]">
            تنبيه رعاية ودعم بشري — لستِ مضطرةً لحمل هذا الثقل وحدكِ
          </h2>
          <p className="text-sm leading-relaxed text-[#351B38]">
            {reasonAr ||
              'تشير بعض إجاباتكِ إلى مستوى مرتفع من الضيق أو الإرهاق النفسي يستحق رعاية مباشرة من مختص بشري.'}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-[#E9D8D1] bg-[#FFFDF9] p-4 space-y-2 text-xs sm:text-sm leading-relaxed text-[#5F4562]">
        <p className="font-semibold text-[#351B38]">
          خطوات مساندة هادئة ومتاحة الآن:
        </p>
        <ul className="list-disc list-inside space-y-1.5">
          <li>
            إذا كنتِ تشعرين بخطر فوري على سلامتكِ، تواصلي الآن مع{' '}
            <strong>خدمات الطوارئ المحلية</strong> في بلدكِ (مثل{' '}
            <span dir="ltr" className="font-semibold text-[#351B38]">
              122 / 911 / 997 / 999
            </span>{' '}
            حسب البلد) أو توجّهي إلى أقرب قسم طوارئ.
          </li>
          <li>
            تحدّثي اليوم مع طبيب أسرة، أو أخصائي نفسي، أو مستشارة جامعية، أو شخص مقرّب تثقين به
            ليكون بجانبكِ.
          </li>
          <li>
            إن كنتِ في بلد تتوفر فيه خطوط مساندة نفسية وطنية مجانية، ابحثي عبر الدليل الرسمي
            لوزارة الصحة في بلدكِ أو تواصل مع منصة{' '}
            <a
              href="https://findahelpline.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[#762D50] underline"
            >
              <span dir="ltr">findahelpline.com</span>
              <PhoneCall className="h-3.5 w-3.5" aria-hidden="true" />
            </a>{' '}
            للعثور على أرقام المساندة المعتمدة في منطقتكِ.
          </li>
        </ul>
        <p className="text-xs text-[#6F5472] pt-1">
          ملاحظة مسؤولة: زهرتي أداة استكشاف وتثقيف رقمية ولا تقدم تشخيصاً طبياً أو بديلاً عن التدخل
          البشري المتخصص.
        </p>
      </div>
    </aside>
  );
}
