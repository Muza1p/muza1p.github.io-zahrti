import React from 'react';
import { ZahrtiBlossomMark } from '@/src/components/ornaments/BotanicalArt';

interface FooterProps {
  onNavigate: (to: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const go = (e: React.MouseEvent, to: string) => {
    e.preventDefault();
    onNavigate(to);
  };

  return (
    <footer className="mt-16 border-t border-[#E8CED5] bg-[#FFFDFB]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2 text-[#381F2E]">
              <ZahrtiBlossomMark className="h-6 w-6" />
              <span className="font-display text-base font-bold">
                ZAHRTI — اختبار زهرتي
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[#69495B] max-w-md">
              منصة استكشافية مستقلة لمساعدة الطالبات على التعرف إلى اهتماماتهن المهنية
              واستكشاف التخصصات الجامعية بوعي وتوازن، دون ادعاءات أو قرارات حتمية.
            </p>
            <p className="text-xs leading-relaxed text-[#7A596C]">
              مشروع مستقل غير تابع لجامعة أو وزارة أو جهة رسمية.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5">
            <h2 className="font-display text-sm font-semibold text-[#381F2E]">
              استكشاف الموقع
            </h2>
            <ul className="space-y-1.5 text-sm text-[#69495B]">
              <li>
                <a href="/intro" onClick={(e) => go(e, '/intro')} className="hover:text-[#A9506C]">
                  مقدمة الاختبار
                </a>
              </li>
              <li>
                <a href="/interests" onClick={(e) => go(e, '/interests')} className="hover:text-[#A9506C]">
                  أنماط الاهتمامات الستة
                </a>
              </li>
              <li>
                <a href="/majors" onClick={(e) => go(e, '/majors')} className="hover:text-[#A9506C]">
                  دليل التخصصات
                </a>
              </li>
              <li>
                <a href="/compare" onClick={(e) => go(e, '/compare')} className="hover:text-[#A9506C]">
                  مقارنة التخصصات
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-2.5">
            <h2 className="font-display text-sm font-semibold text-[#381F2E]">
              الشفافية والتوثيق
            </h2>
            <ul className="space-y-1.5 text-sm text-[#69495B]">
              <li>
                <a href="/about" onClick={(e) => go(e, '/about')} className="hover:text-[#A9506C]">
                  عن اختبار زهرتي
                </a>
              </li>
              <li>
                <a href="/methodology" onClick={(e) => go(e, '/methodology')} className="hover:text-[#A9506C]">
                  المصادر والمنهجية العلمية
                </a>
              </li>
              <li>
                <a href="/privacy" onClick={(e) => go(e, '/privacy')} className="hover:text-[#A9506C]">
                  الخصوصية والأمان
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  onClick={(e) => go(e, '/terms')}
                  className="font-medium text-[#A9506C] hover:underline"
                >
                  التعديلات وإخلاء المسؤولية (ترخيص O*NET)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-[#F0DDE2] pt-6 text-xs leading-relaxed text-[#7A596C] space-y-2">
          <p>
            يتضمن هذا الموقع معلومات مستندة إلى أدوات O*NET Career Exploration Tools الصادرة عن
            USDOL/ETA بموجب رخصة مطوري أدوات O*NET. O*NET® علامة تجارية مسجلة لـ USDOL/ETA. قام
            مشروع زهرتي (ZAHRTI) بتكييف هذا المحتوى، ولم تعتمد الوزارة أو تصادق أو تختبر هذه
            التعديلات.
          </p>
        </div>
      </div>
    </footer>
  );
}
