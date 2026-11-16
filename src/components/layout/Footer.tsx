import React from 'react';
import { ZahrtiBlossomMark } from '@/src/components/ornaments/BotanicalArt';
import { toHref } from '@/src/hooks/useRouter';

interface FooterProps {
  onNavigate: (to: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const go = (e: React.MouseEvent, to: string) => {
    e.preventDefault();
    onNavigate(to);
  };

  return (
    <footer className="mt-20 border-t border-[#E9D8D1] bg-[#FFFDF9]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5 text-[#351B38]">
              <ZahrtiBlossomMark className="h-6 w-6" />
              <span className="font-display text-lg font-bold">
                زهرتي — <span dir="ltr">ZAHRTI</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[#5F4562] max-w-md">
              منصة استكشافية مستقلة لاكتشاف الاهتمامات المهنية والتخصصات الجامعية بوعي وهدوء، مع
              مساحة مشتركة تقيس التقارب والتكامل الفكري بين شخصين بوضوح وشفافية.
            </p>
            <p className="text-xs leading-relaxed text-[#6F5472]">
              مشروع ويب مستقل غير تابع لأي جامعة أو وزارة أو جهة رسمية.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5">
            <h2 className="font-display text-sm font-bold text-[#351B38]">
              مسارات المنصة
            </h2>
            <ul className="space-y-2 text-sm text-[#5F4562]">
              <li>
                <a href={toHref('/intro')} onClick={(e) => go(e, '/intro')} className="hover:text-[#762D50]">
                  إعداد الأسماء والبدء
                </a>
              </li>
              <li>
                <a href={toHref('/interests')} onClick={(e) => go(e, '/interests')} className="hover:text-[#762D50]">
                  أنماط الاهتمامات الستة
                </a>
              </li>
              <li>
                <a href={toHref('/majors')} onClick={(e) => go(e, '/majors')} className="hover:text-[#762D50]">
                  دليل التخصصات
                </a>
              </li>
              <li>
                <a href={toHref('/compare')} onClick={(e) => go(e, '/compare')} className="hover:text-[#762D50]">
                  مقارنة التخصصات
                </a>
              </li>
              <li>
                <a href={toHref('/compatibility')} onClick={(e) => go(e, '/compatibility')} className="hover:text-[#762D50]">
                  تحليل التوافق
                </a>
              </li>
              <li>
                <a href={toHref('/our-world')} onClick={(e) => go(e, '/our-world')} className="hover:text-[#762D50]">
                  عالمنا
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-2.5">
            <h2 className="font-display text-sm font-bold text-[#351B38]">
              الشفافية والخصوصية
            </h2>
            <ul className="space-y-2 text-sm text-[#5F4562]">
              <li>
                <a href={toHref('/about')} onClick={(e) => go(e, '/about')} className="hover:text-[#762D50]">
                  عن اختبار زهرتي
                </a>
              </li>
              <li>
                <a href={toHref('/methodology')} onClick={(e) => go(e, '/methodology')} className="hover:text-[#762D50]">
                  المصادر والمنهجية العلمية
                </a>
              </li>
              <li>
                <a href={toHref('/settings')} onClick={(e) => go(e, '/settings')} className="hover:text-[#762D50]">
                  إعدادات الخصوصية والنسخ الاحتياطي
                </a>
              </li>
              <li>
                <a href={toHref('/privacy')} onClick={(e) => go(e, '/privacy')} className="hover:text-[#762D50]">
                  سياسة الخصوصية المحلية
                </a>
              </li>
              <li>
                <a
                  href={toHref('/terms')}
                  onClick={(e) => go(e, '/terms')}
                  className="font-medium text-[#762D50] hover:underline"
                >
                  التعديلات وإخلاء المسؤولية (ترخيص <span dir="ltr">O*NET</span>)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[#E9D8D1] pt-6 text-xs leading-relaxed text-[#6F5472]">
          <p>
            يتضمن هذا الموقع معلومات مستندة إلى أدوات <span dir="ltr">O*NET Career Exploration Tools</span>{' '}
            الصادرة عن <span dir="ltr">USDOL/ETA</span> بموجب رخصة مطوري أدوات O*NET. O*NET® علامة
            تجارية مسجلة لـ <span dir="ltr">USDOL/ETA</span>. قام مشروع زهرتي (<span dir="ltr">ZAHRTI</span>)
            بتكييف هذا المحتوى، ولم تعتمد الوزارة أو تصادق أو تختبر هذه التعديلات.
          </p>
        </div>
      </div>
    </footer>
  );
}
