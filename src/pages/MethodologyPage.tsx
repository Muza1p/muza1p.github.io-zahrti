import React, { useEffect, useState } from 'react';
import { ExternalLink, FileCheck2, Info } from 'lucide-react';
import { EditorialCrest } from '@/src/components/ornaments/BotanicalArt';
import { MINI_IP_QUESTIONS } from '@/src/data/questions/miniIpQuestions';
import {
  OFFICIAL_IRAQI_SOURCES,
  OFFICIAL_ONET_SOURCES,
  ONET_LICENSE_NOTICE_AR,
  ONET_LICENSE_NOTICE_EN,
} from '@/src/data/sources/officialSources';

interface MethodologyPageProps {
  onNavigate: (to: string) => void;
}

export function MethodologyPage({ onNavigate }: MethodologyPageProps) {
  const [onetConfigured, setOnetConfigured] = useState<boolean | null>(null);
  const [showQuestionsAudit, setShowQuestionsAudit] = useState(false);

  useEffect(() => {
    const isStaticHost =
      typeof window !== 'undefined' &&
      (window.location.hostname.endsWith('github.io') ||
        window.location.hostname.endsWith('netlify.app') ||
        window.location.hostname.endsWith('pages.dev') ||
        window.location.hostname.endsWith('vercel.app') ||
        window.location.protocol === 'file:');
    if (isStaticHost) {
      setOnetConfigured(false);
      return;
    }

    fetch('/api/health')
      .then(async (r) => {
        const ct = r.headers.get('content-type') || '';
        if (!r.ok || !ct.includes('application/json')) return { onetApiConfigured: false };
        return r.json() as Promise<{ onetApiConfigured?: boolean }>;
      })
      .then((d) => setOnetConfigured(Boolean(d.onetApiConfigured)))
      .catch(() => setOnetConfigured(false));
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 space-y-8">
      <header className="space-y-2 border-b border-[#E9D8D1] pb-6">
        <EditorialCrest className="w-12 h-7" />
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#351B38]">
          المصادر والمنهجية العلمية
        </h1>
        <p className="max-w-3xl text-sm sm:text-base text-[#5F4562]">
          توثيق شفاف للأساس العلمي للمقاييس النفسية المفتوحة، سياسة التراخيص وحقوق الملكية،
          معادلة <span dir="ltr">O*NET® Mini-IP</span>، والمصادر العراقية الرسمية لقاعدة التخصصات.
        </p>
      </header>

      {/* Complete Psychological Library Registry Audit */}
      <section className="rounded-3xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-2 text-[#762D50]">
          <FileCheck2 className="h-5 w-5" aria-hidden="true" />
          <h2 className="font-display text-xl font-bold text-[#351B38]">
            سجل المقاييس النفسية وحالة التراخيص والتقنين العربي
          </h2>
        </div>

        <p className="text-sm leading-relaxed text-[#5F4562]">
          تعتمد منصة زهرتي فقط على الأدوات المفتوحة في الملكية العامة أو المتاحة مجاناً للاستخدام
          التثقيفي بالإسناد الأصلي. المقاييس التجارية أو المحمية (مثل{' '}
          <span dir="ltr">PSS-10, TEIQue-SF, BFI-44, ECR-R</span>) لا تُنسخ بنودها بل تُوثّق
          في المكتبة لبيان متطلب الترخيص الرسمي وبديلها الحر المتاح.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-[#E9D8D1]">
          <table className="w-full text-right text-xs sm:text-sm">
            <thead className="bg-[#F9F3EC] text-[#351B38]">
              <tr>
                <th className="p-3 font-semibold">الرمز</th>
                <th className="p-3 font-semibold">الأداة والمؤلف</th>
                <th className="p-3 font-semibold">التصنيف العلمي</th>
                <th className="p-3 font-semibold">الترخيص وحالة التعريب</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9D8D1] text-[#5F4562]">
              <tr>
                <td className="p-3 font-semibold text-[#762D50]" dir="ltr">PHQ-9</td>
                <td className="p-3">Kroenke et al. (2001) — 9 فقرات (0–3)</td>
                <td className="p-3 font-semibold text-[#351B38]">مقنن مفتوح</td>
                <td className="p-3">Pfizer Open Access · دراسات عربية منشورة</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[#762D50]" dir="ltr">GAD-7</td>
                <td className="p-3">Spitzer et al. (2006) — 7 فقرات (0–3)</td>
                <td className="p-3 font-semibold text-[#351B38]">مقنن مفتوح</td>
                <td className="p-3">Pfizer Open Access · دراسات عربية منشورة</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[#762D50]" dir="ltr">DASS-21</td>
                <td className="p-3">Lovibond & Lovibond (1995) — 21 فقرة (×2)</td>
                <td className="p-3 font-semibold text-[#351B38]">مقنن مفتوح</td>
                <td className="p-3">UNSW Public Domain · دراسات عربية منشورة</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[#762D50]" dir="ltr">WHO-5</td>
                <td className="p-3">World Health Organization (1998) — 5 فقرات (×4)</td>
                <td className="p-3 font-semibold text-[#351B38]">مقنن مفتوح</td>
                <td className="p-3">CC BY-NC-SA 3.0 IGO · دراسات عربية منشورة</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[#762D50]" dir="ltr">RRS-10</td>
                <td className="p-3">Treynor, Gonzalez & Nolen-Hoeksema (2003) — 10 فقرات</td>
                <td className="p-3 font-semibold text-[#351B38]">مقنن بحثي</td>
                <td className="p-3">مجاني بالإسناد · تعريب مبدئي يحتاج تقنيناً</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[#762D50]" dir="ltr">IPIP-50</td>
                <td className="p-3">Goldberg IPIP Big-Five (1999) — 50 فقرة</td>
                <td className="p-3 font-semibold text-[#351B38]">مقنن مفتوح</td>
                <td className="p-3">Public Domain · تعريب مبدئي يحتاج تقنيناً</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[#762D50]" dir="ltr">RSES-10</td>
                <td className="p-3">Morris Rosenberg (1965) — 10 فقرات (0–30)</td>
                <td className="p-3 font-semibold text-[#351B38]">مقنن مفتوح</td>
                <td className="p-3">مجاني بالإسناد · دراسات عربية منشورة</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[#762D50]" dir="ltr">BRS-6</td>
                <td className="p-3">Smith et al. (2008) — 6 فقرات (متوسط 1–5)</td>
                <td className="p-3 font-semibold text-[#351B38]">مقنن بحثي</td>
                <td className="p-3">مجاني بالإسناد · تعريب مبدئي يحتاج تقنيناً</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[#762D50]" dir="ltr">IRI-28</td>
                <td className="p-3">Mark H. Davis (1980/1983) — 28 فقرة (4 أبعاد)</td>
                <td className="p-3 font-semibold text-[#351B38]">مقنن بحثي</td>
                <td className="p-3">مجاني بالإسناد · تعريب مبدئي يحتاج تقنيناً</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[#762D50]" dir="ltr">SWLS-5</td>
                <td className="p-3">Diener et al. (1985) — 5 فقرات سباعية (5–35)</td>
                <td className="p-3 font-semibold text-[#351B38]">مقنن بحثي</td>
                <td className="p-3">مجاني غير تجاري بالإسناد · دراسات عربية</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[#762D50]" dir="ltr">GSE-10</td>
                <td className="p-3">Schwarzer & Jerusalem (1995) — 10 فقرات (10–40)</td>
                <td className="p-3 font-semibold text-[#351B38]">مقنن بحثي</td>
                <td className="p-3">مجاني بالإسناد · دراسات عربية منشورة</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[#9F7E44]" dir="ltr">EXP-*</td>
                <td className="p-3">5 وحدات تأمل ذاتي أصلية (التفكير، المشاعر، الحدود، السلوك، الانتباه)</td>
                <td className="p-3 font-semibold text-[#9F7E44]">استكشافي غير مقنن</td>
                <td className="p-3">محتوى أصلي لزهرتي — للتأمل الذاتي فقط</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-3xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-[#762D50]">
          <FileCheck2 className="h-5 w-5" aria-hidden="true" />
          <h2 className="font-display text-xl font-bold text-[#351B38]">
            التحقق التقني من مقياس <span dir="ltr">O*NET® Mini-IP</span> (30 سؤالاً)
          </h2>
        </div>

        <div className="space-y-3 text-sm leading-relaxed text-[#5F4562]">
          <p>
            اعتمد مشروع زهرتي على قائمة الـ <strong>30 سؤالاً الرسمية</strong> لنسخة Mini-IP
            المستخرجة والتحقق منها من المرجع الرسمي (<span dir="ltr">onetinterestprofiler.org</span>{' '}
            و <span dir="ltr">services.onetcenter.org/reference/mpp/ip/ip_questions_30</span>)، بواقع 5
            فقرات لكل نمط من أنماط RIASEC الستة، وبمقياس استجابة خماسي (1 إلى 5).
          </p>
          <p>
            تُحسب الدرجة الأولية عبر مجموع <span dir="ltr">answer - 1</span> لكل نمط (من 0 إلى 20)
            مع حساب الانحرافات المعيارية <span dir="ltr">z-score</span> وكسر التعادل السداسي المعتمد
            في O*NET. أما نسبة التوافق في التخصصات فتُحسب رياضياً عبر تشابه جيب التمام{' '}
            <span dir="ltr">(Cosine Similarity)</span> بين متجه المستخدمة ومتجه كل تخصص.
          </p>
          <div className="rounded-2xl border border-[#E9D8D1] bg-[#F9F3EC] p-4 text-xs sm:text-sm">
            <strong>وضع التحليل الحالي:</strong>{' '}
            {onetConfigured === null
              ? 'جاري الفحص...'
              : onetConfigured
              ? 'مفعّل عبر خادم O*NET API v2.'
              : 'يعمل الموقع حالياً بالتحليل المحلي الموثق وفق معادلة Mini-IP (مثالي للاستضافة الساكنة على GitHub Pages دون أي اعتماد على خادم خارجي)، مع الإشارة بوضوح إلى أن التكييف العربي تجريبي ولم يخضع لدراسة تقنين بعد.'}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 sm:p-8 space-y-4">
        <h2 className="font-display text-xl font-bold text-[#351B38]">
          الترخيص والإسناد الرسمي لـ <span dir="ltr">O*NET</span>
        </h2>
        <p className="text-sm leading-relaxed text-[#5F4562]">{ONET_LICENSE_NOTICE_AR}</p>
        <blockquote
          dir="ltr"
          className="rounded-2xl border border-[#E9D8D1] bg-[#F9F3EC] p-4 text-xs sm:text-sm font-mono leading-relaxed text-[#351B38]"
        >
          {ONET_LICENSE_NOTICE_EN}
        </blockquote>
        <div className="pt-1">
          <button
            type="button"
            onClick={() => onNavigate('/terms')}
            className="text-sm font-semibold text-[#762D50] hover:underline cursor-pointer"
          >
            اقرئي الصفحة الكاملة: التعديلات وإخلاء المسؤولية
          </button>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-[#351B38]">
            مصادر <span dir="ltr">O*NET</span> الرسمية
          </h2>
          <ul className="space-y-3 text-sm">
            {OFFICIAL_ONET_SOURCES.map((src) => (
              <li key={src.url} className="border-b border-[#E9D8D1] pb-3 last:border-b-0 last:pb-0">
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-[#762D50] hover:underline"
                >
                  <span>{src.title}</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <p className="text-xs text-[#6F5472] mt-0.5">
                  {src.authority} · تاريخ التحقق: <span className="tabular-nums">{src.lastChecked}</span>
                </p>
                {src.note && <p className="text-xs text-[#5F4562] mt-1">{src.note}</p>}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-[#351B38]">
            المصادر العراقية للتخصصات والجامعات
          </h2>
          <ul className="space-y-3 text-sm">
            {OFFICIAL_IRAQI_SOURCES.map((src) => (
              <li key={src.url} className="border-b border-[#E9D8D1] pb-3 last:border-b-0 last:pb-0">
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-[#762D50] hover:underline"
                >
                  <span>{src.title}</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <p className="text-xs text-[#6F5472] mt-0.5">
                  {src.authority} · تاريخ التحقق: <span className="tabular-nums">{src.lastChecked}</span>
                </p>
                {src.note && <p className="text-xs text-[#5F4562] mt-1">{src.note}</p>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-3xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-[#762D50]" aria-hidden="true" />
            <h2 className="font-display text-lg font-bold text-[#351B38]">
              سجل مراجعة الأسئلة الثلاثين والتكييف العربي
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setShowQuestionsAudit((v) => !v)}
            aria-expanded={showQuestionsAudit}
            className="rounded-full border border-[#E9D8D1] bg-[#F9F3EC] px-4 py-1.5 text-xs font-medium text-[#351B38] hover:border-[#762D50] cursor-pointer"
          >
            {showQuestionsAudit ? 'إخفاء جدول المراجعة' : 'عرض جدول الأسئلة الثلاثين'}
          </button>
        </div>

        <p className="text-xs sm:text-sm text-[#5F4562]">
          يحتفظ ملف الأسئلة بالرقم الأصلي، النص الإنجليزي الأصلي، النص العربي المقترح، نمط RIASEC،
          وحالة المراجعة والتحقق لكل فقرة بصورة قابلة للتدقيق.
        </p>

        {showQuestionsAudit && (
          <div className="overflow-x-auto rounded-2xl border border-[#E9D8D1]">
            <table className="w-full text-right text-xs sm:text-sm">
              <thead className="bg-[#F9F3EC] text-[#351B38]">
                <tr>
                  <th className="p-3 font-semibold">#</th>
                  <th className="p-3 font-semibold">النمط</th>
                  <th className="p-3 font-semibold">النص العربي المقترح</th>
                  <th className="p-3 font-semibold" dir="ltr">
                    Original O*NET Item
                  </th>
                  <th className="p-3 font-semibold">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9D8D1]">
                {MINI_IP_QUESTIONS.map((q) => (
                  <tr key={q.id} className="hover:bg-[#F9F3EC]/50">
                    <td className="p-3 tabular-nums font-semibold">{q.originalIndex}</td>
                    <td className="p-3">{q.area}</td>
                    <td className="p-3 text-[#351B38]">{q.arabicText}</td>
                    <td className="p-3 text-[#5F4562]" dir="ltr">
                      {q.originalText}
                    </td>
                    <td className="p-3 text-xs text-[#6F5472]">بانتظار دراسة تقنين</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
