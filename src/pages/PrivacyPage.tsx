import React from 'react';
import { Lock } from 'lucide-react';
import { EditorialCrest } from '@/src/components/ornaments/BotanicalArt';

interface PrivacyPageProps {
  completedCount: number;
  onNavigate: (to: string) => void;
}

export function PrivacyPage({ completedCount, onNavigate }: PrivacyPageProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <article className="rounded-3xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 sm:p-10 space-y-7">
        <header className="space-y-3 text-center">
          <div className="flex justify-center">
            <EditorialCrest className="w-16 h-9" />
          </div>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#E9D8D1] bg-[#F9F3EC] text-[#762D50]">
            <Lock className="h-5 w-5" aria-hidden="true" />
          </div>
          <h1 className="font-display text-3xl font-bold text-[#351B38]">
            الخصوصية وأمان بياناتكِ النفسية
          </h1>
          <p className="text-sm sm:text-base text-[#5F4562]">
            لا نطلب إنشاء حساب، ولا نجمع بريدكِ الإلكتروني أو رقم هاتفكِ، والمنصة مصممة لشخص واحد
            فقط.
          </p>
        </header>

        <section className="space-y-4 text-sm sm:text-base leading-relaxed text-[#5F4562]">
          <h2 className="font-display text-lg font-bold text-[#351B38]">
            أين تُحفظ بياناتكِ وكيف نضمن سريتها؟
          </h2>
          <ul className="space-y-2.5 list-disc list-inside">
            <li>
              <strong>حفظ محلي بالكامل على جهازكِ:</strong> تُخزن جلساتكِ قيد التقدم ونتائجكِ
              المكتملة محلياً داخل متصفحكِ (<span dir="ltr">localStorage</span>) دون إرسال أي
              إجابات نفسية أو حساسة إلى طرف ثالث.
            </li>
            <li>
              <strong>حساب فردي حصري:</strong> لا توجد ميزة تبديل مستخدمين أو كشف سجل لشخص آخر؛
              ما تدخلينه يخص مساحتكِ وحدكِ.
            </li>
            <li>
              <strong>التصدير والتحكم الكامل:</strong> بوسعكِ تحميل تقرير{' '}
              <span dir="ltr">PDF</span> عربي للنتائج أو تصدير نسخة <span dir="ltr">JSON</span>{' '}
              أو مسح كل السجلات نهائياً في أي وقت من الإعدادات.
            </li>
          </ul>
        </section>

        <div className="rounded-2xl border border-[#E9D8D1] bg-[#F9F3EC] p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm text-[#351B38]">
            <p className="font-semibold">ملخص السجل المحفوظ على هذا المتصفح:</p>
            <p className="text-xs text-[#5F4562] tabular-nums">
              {completedCount > 0
                ? `يوجد ${completedCount} تقييم مكتمل محفوظ محلياً.`
                : 'لا توجد نتائج مكتملة محفوظة حالياً.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/settings')}
            className="rounded-full bg-[#351B38] px-5 py-2 text-xs font-medium text-[#F9F3EC] hover:bg-[#4B2B4E] cursor-pointer"
          >
            إدارة البيانات والإعدادات
          </button>
        </div>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => onNavigate('/library')}
            className="rounded-full bg-[#762D50] px-6 py-2.5 text-sm font-medium text-[#F9F3EC] hover:bg-[#5D223E] cursor-pointer"
          >
            الذهاب إلى مكتبة الاختبارات
          </button>
        </div>
      </article>
    </div>
  );
}
