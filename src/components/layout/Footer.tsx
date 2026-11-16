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
              منصة فردية هادئة وموثقة للاختبارات النفسية وفهم الشخصية والمشاعر والسلوك والنمو الذاتي
              والميول المهنية، مع حفظ محلي آمن وإخراج <span dir="ltr">PDF</span> عربي متكامل.
            </p>
            <p className="text-xs leading-relaxed text-[#6F5472]">
              منصة استكشافية وتثقيفية مستقلة لصاحب حساب واحد فقط — لا تقدم تشخيصاً طبياً.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5">
            <h2 className="font-display text-sm font-bold text-[#351B38]">
              الأدوات والتقارير
            </h2>
            <ul className="space-y-2 text-sm text-[#5F4562]">
              <li>
                <a href={toHref('/library')} onClick={(e) => go(e, '/library')} className="hover:text-[#762D50]">
                  مكتبة الاختبارات النفسية
                </a>
              </li>
              <li>
                <a href={toHref('/report')} onClick={(e) => go(e, '/report')} className="hover:text-[#762D50]">
                  التقرير النفسي الشامل
                </a>
              </li>
              <li>
                <a href={toHref('/intro')} onClick={(e) => go(e, '/intro')} className="hover:text-[#762D50]">
                  مقياس الميول المهنية (O*NET)
                </a>
              </li>
              <li>
                <a href={toHref('/majors')} onClick={(e) => go(e, '/majors')} className="hover:text-[#762D50]">
                  دليل التخصصات الجامعية
                </a>
              </li>
              <li>
                <a href={toHref('/compare')} onClick={(e) => go(e, '/compare')} className="hover:text-[#762D50]">
                  مقارنة التخصصات
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
                  عن منصة زهرتي
                </a>
              </li>
              <li>
                <a href={toHref('/methodology')} onClick={(e) => go(e, '/methodology')} className="hover:text-[#762D50]">
                  المصادر والمنهجية العلمية
                </a>
              </li>
              <li>
                <a href={toHref('/settings')} onClick={(e) => go(e, '/settings')} className="hover:text-[#762D50]">
                  إعدادات البيانات والنسخ الاحتياطي
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
                  التراخيص وإخلاء المسؤولية العلمية
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[#E9D8D1] pt-6 text-xs leading-relaxed text-[#6F5472] space-y-1.5">
          <p>
            تُعرض جميع المقاييس العلمية المفتوحة (مثل{' '}
            <span dir="ltr">IPIP-50, RSES, PHQ-9, GAD-7, DASS-21, WHO-5, BRS, SWLS, GSE, IRI</span>)
            وفق رخصها الأصلية مع الإسناد الكامل، وتُفصل بصراحة عن الوحدات الاستكشافية غير المقننة.
          </p>
          <p>
            يتضمن قسم الميول المهنية محتوى مستنداً إلى أدوات <span dir="ltr">O*NET Career Exploration Tools</span>{' '}
            الصادرة عن <span dir="ltr">USDOL/ETA</span> بموجب رخصة مطوري أدوات O*NET دون مصادقة
            رسمية من الوزارة على الترجمة العربية.
          </p>
        </div>
      </div>
    </footer>
  );
}
