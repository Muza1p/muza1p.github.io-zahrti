import React from 'react';
import { ArrowRight } from 'lucide-react';
import { EditorialCrest } from '@/src/components/ornaments/BotanicalArt';

interface NotFoundPageProps {
  onNavigate: (to: string) => void;
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <div className="mx-auto max-w-xl px-4 py-14 sm:px-6 text-center">
      <div className="rounded-3xl border border-[#E9D8D1] bg-[#FFFDF9] p-8 sm:p-10 space-y-5">
        <div className="flex justify-center">
          <EditorialCrest className="w-16 h-10" />
        </div>
        <p className="font-display text-sm font-bold text-[#762D50] tabular-nums">
          404 · الصفحة غير موجودة
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#351B38]">
          هذا المسار غير متوفر
        </h1>
        <p className="text-sm leading-relaxed text-[#5F4562]">
          ربما تغير رابط الصفحة أو كُتب بشكل غير صحيح. يمكنكِ العودة إلى الصفحة الرئيسية أو تصفح التخصصات.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#762D50] px-6 py-2.5 text-sm font-medium text-[#F9F3EC] hover:bg-[#5D223E] cursor-pointer"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
            <span>العودة للرئيسية</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/majors')}
            className="inline-flex min-h-[44px] items-center rounded-full border border-[#E9D8D1] bg-white px-6 py-2.5 text-sm font-medium text-[#351B38] hover:bg-[#F9F3EC] cursor-pointer"
          >
            تصفح التخصصات
          </button>
        </div>
      </div>
    </div>
  );
}
