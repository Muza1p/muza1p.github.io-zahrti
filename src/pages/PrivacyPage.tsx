import React from 'react';
import { Lock } from 'lucide-react';
import { EditorialCrest } from '@/src/components/ornaments/BotanicalArt';

interface PrivacyPageProps {
  activePersonName: string;
  answeredCount: number;
  onNavigate: (to: string) => void;
}

export function PrivacyPage({
  activePersonName,
  answeredCount,
  onNavigate,
}: PrivacyPageProps) {
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
            الخصوصية وأمان بياناتكِ
          </h1>
          <p className="text-sm sm:text-base text-[#5F4562]">
            لا نطلب معلومات شخصية أو بريد إلكتروني أو أرقام هواتف، ولا نفرض إنشاء حساب.
          </p>
        </header>

        <section className="space-y-4 text-sm sm:text-base leading-relaxed text-[#5F4562]">
          <h2 className="font-display text-lg font-bold text-[#351B38]">
            كيف يتعامل موقع زهرتي مع خصوصية الطرفين؟
          </h2>
          <ul className="space-y-2.5 list-disc list-inside">
            <li>
              <strong>تخزين محلي معزول لكل طرف:</strong> تُحفظ إجابات ونتائج ومفضلة كل شخص في
              مفاتيح منفصلة داخل متصفحكِ (<span dir="ltr">localStorage</span>).
            </li>
            <li>
              <strong>عدم كشف الإجابات الفردية:</strong> لا تعرض شاشة أحد الطرفين إجابات الطرف
              الآخر، ولا تكشف صفحة التوافق أو عالمنا تفاصيل الأسئلة الثلاثين بل تعرض ملخص الأنماط
              المشتركة والمكملة فقط وبعد إتمام الطرفين للاختبار.
            </li>
            <li>
              <strong>العمل دون إنترنت أو خوادم حفظ:</strong> على الاستضافة الساكنة (<span dir="ltr">GitHub Pages</span>)،
              تُحسب جميع النتائج محلياً داخل المتصفح دون إرسال إجاباتج إلى أي قاعدة بيانات خارجية.
            </li>
            <li>
              <strong>التحكم التام:</strong> يمكنكِ تصدير نسخة <span dir="ltr">JSON</span> أو إيقاف
              المشاركة في التوافق أو حذف بيانات كل طرف من صفحة الإعدادات في أي لحظة.
            </li>
          </ul>
        </section>

        <div className="rounded-2xl border border-[#E9D8D1] bg-[#F9F3EC] p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm text-[#351B38]">
            <p className="font-semibold">حالة الجلسة النشطة ({activePersonName}):</p>
            <p className="text-xs text-[#5F4562] tabular-nums">
              {answeredCount > 0
                ? `يوجد تقدم محفوظ حالياً (${answeredCount} من 30 إجابة).`
                : 'لا توجد إجابات محفوظة حالياً لهذه الجلسة.'}
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
