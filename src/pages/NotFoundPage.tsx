import React from 'react';
import { ArrowRight } from 'lucide-react';
import { AnalyzingBlossomArch } from '@/src/components/ornaments/BotanicalArt';

interface NotFoundPageProps {
  onNavigate: (to: string) => void;
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <div className="mx-auto max-w-xl px-4 py-14 sm:px-6 text-center">
      <div className="rounded-[2rem] border border-[#EAD3E0] bg-[#FFFCFA] p-8 sm:p-10 space-y-5">
        <div className="flex justify-center">
          <AnalyzingBlossomArch className="w-36 h-44 opacity-90" />
        </div>
        <p className="font-display text-sm font-bold text-[#C04472] tabular-nums">
          404 · الصفحة غير موجودة
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#351B38]">
          يبدو أن هذا المسار غير متوفر
        </h1>
        <p className="text-sm leading-relaxed text-[#5F4163]">
          ربما تغير رابط الصفحة أو كُتب بشكل غير صحيح. يمكنكِ العودة إلى الصفحة الرئيسية أو بدء
          الاختبار لاستكشاف التخصصات.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-gradient-to-l from-[#C04472] to-[#7651B8] px-6 py-2.5 text-sm font-medium text-white hover:opacity-95 cursor-pointer"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
            <span>العودة للرئيسية</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/majors')}
            className="inline-flex min-h-[44px] items-center rounded-full border border-[#EAD3E0] bg-white px-6 py-2.5 text-sm font-medium text-[#351B38] hover:bg-[#FDF0F5] cursor-pointer"
          >
            تصفح التخصصات
          </button>
        </div>
      </div>
    </div>
  );
}
