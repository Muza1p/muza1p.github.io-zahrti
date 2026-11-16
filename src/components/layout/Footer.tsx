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
    <footer className="mt-16 border-t border-[#EAD3E0] bg-[#FFFCFA]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2 text-[#351B38]">
              <ZahrtiBlossomMark className="h-6 w-6" />
              <span className="font-display text-base font-bold">
                ZAHRTI — اختبار زهرتي
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[#5F4163] max-w-md">
              منصة استكشافية مستقلة لمساعدة الطالبات على التعرف إلى اهتماماتهن المهنية
              واستكشاف التخصصات الجامعية بوعي وتوازن، دون ادعاءات أو قرارات حتمية.
            </p>
            <p className="text-xs leading-relaxed text-[#6E5073]">
              مشروع مستقل غير تابع لجامعة أو وزارة أو جهة رسمية.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5">
            <h2 className="font-display text-sm font-semibold text-[#351B38]">
              استكشاف الموقع
            </h2>
            <ul className="space-y-1.5 text-sm text-[#5F4163]">
              <li>
                <a href="/intro" onClick={(e) => go(e, '/intro')} className="hover:text-[#C04472]">
                  مقدمة الاختبار
                </a>
              </li>
              <li>
                <a href="/interests" onClick={(e) => go(e, '/interests')} className="hover:text-[#C04472]">
                  أنماط الاهتمامات الستة
                </a>
              </li>
              <li>
                <a href="/majors" onClick={(e) => go(e, '/majors')} className="hover:text-[#C04472]">
                  دليل التخصصات
                </a>
              </li>
              <li>
                <a href="/compare" onClick={(e) => go(e, '/compare')} className="hover:text-[#C04472]">
                  مقارنة التخصصات
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-2.5">
            <h2 className="font-display text-sm font-semibold text-[#351B38]">
              الشفافية والتوثيق
            </h2>
            <ul className="space-y-1.5 text-sm text-[#5F4163]">
              <li>
                <a href="/about" onClick={(e) => go(e, '/about')} className="hover:text-[#C04472]">
                  عن اختبار زهرتي
                </a>
              </li>
              <li>
                <a href="/methodology" onClick={(e) => go(e, '/methodology')} className="hover:text-[#C04472]">
                  المصادر والمنهجية العلمية
                </a>
              </li>
              <li>
                <a href="/privacy" onClick={(e) => go(e, '/privacy')} className="hover:text-[#C04472]">
                  الخصوصية والأمان
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  onClick={(e) => go(e, '/terms')}
                  className="font-medium text-[#C04472] hover:underline"
                >
                  التعديلات وإخلاء المسؤولية (ترخيص O*NET)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-[#F0DDE7] pt-6 text-xs leading-relaxed text-[#6E5073] space-y-2">
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
