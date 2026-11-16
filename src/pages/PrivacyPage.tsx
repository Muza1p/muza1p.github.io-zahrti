import React from 'react';
import { Lock, Trash2 } from 'lucide-react';
import { CoquetteRibbonBow } from '@/src/components/ornaments/BotanicalArt';

interface PrivacyPageProps {
  answeredCount: number;
  onResetProgress: () => void;
  onNavigate: (to: string) => void;
}

export function PrivacyPage({
  answeredCount,
  onResetProgress,
  onNavigate,
}: PrivacyPageProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <article className="rounded-[2rem] border border-[#EAD3E0] bg-[#FFFCFA] p-6 sm:p-10 space-y-7">
        <header className="space-y-3 text-center">
          <div className="flex justify-center">
            <CoquetteRibbonBow className="w-16 h-9" />
          </div>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FDF0F5] text-[#C04472]">
            <Lock className="h-6 w-6" aria-hidden="true" />
          </div>
          <h1 className="font-display text-3xl font-bold text-[#351B38]">
            الخصوصية وحماية بياناتج
          </h1>
          <p className="text-sm sm:text-base text-[#5F4163]">
            لا نطلب اسمج الكامل، رقم هاتفج، رقمج الجامعي، أو عنوان سكنج، ولا نفرض إنشاء حساب.
          </p>
        </header>

        <section className="space-y-4 text-sm sm:text-base leading-relaxed text-[#4F3553]">
          <h2 className="font-display text-lg font-bold text-[#351B38]">
            كيف يتعامل موقع زهرتي مع إجاباتج؟
          </h2>
          <ul className="space-y-2.5 list-disc list-inside">
            <li>
              <strong>التخزين المحلي فقط:</strong> تُحفظ إجابات الاختبار والنتائج المحفوظة وقائمة
              المقارنة محلياً في متصفحكِ (<span dir="ltr">localStorage</span>) حتى لا تضيع عند تحديث
              الصفحة.
            </li>
            <li>
              <strong>بدون تسجيل دخول أو تتبع:</strong> لا توجد إعلانات، ولا ملفات تتبع خفية، ولا
              تحليلات شخصية لسلوك المستخدمة.
            </li>
            <li>
              <strong>عند استخدام التحليل عبر الخادم:</strong> تُرسل فقط الأرقام المجهولة (30 رقماً
              من 1 إلى 5) لحساب النتيجة وإعادتها لكِ فوراً، دون تسجيلها في قاعدة بيانات أو ربطها
              بهويتج.
            </li>
            <li>
              <strong>التحكم الكامل ببياناتج:</strong> يمكنكِ حذف تقدمج وإعادة الاختبار في أي لحظة
              بضغطة زر.
            </li>
          </ul>
        </section>

        <div className="rounded-2xl border border-[#EAD3E0] bg-[#FFF8F3] p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm text-[#351B38]">
            <p className="font-semibold">حالة البيانات المحلية على هذا الجهاز:</p>
            <p className="text-xs text-[#5F4163] tabular-nums">
              {answeredCount > 0
                ? `يوجد تقدم محفوظ حالياً (${answeredCount} من 30 إجابة).`
                : 'لا توجد إجابات محفوظة حالياً على هذا الجهاز.'}
            </p>
          </div>
          {answeredCount > 0 && (
            <button
              type="button"
              onClick={() => {
                onResetProgress();
              }}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-[#DF99B2] bg-white px-4 py-2 text-xs font-medium text-[#9B2953] hover:bg-[#FDF0F5] cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>حذف جميع الإجابات المحلية</span>
            </button>
          )}
        </div>

        <div className="text-center pt-2">
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
