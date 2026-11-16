import React, { useEffect, useState } from 'react';
import { ExternalLink, FileCheck2, Info } from 'lucide-react';
import { CoquetteRibbonBow } from '@/src/components/ornaments/BotanicalArt';
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
    fetch('/api/health')
      .then((r) => r.json())
      .then((d: { onetApiConfigured?: boolean }) =>
        setOnetConfigured(Boolean(d.onetApiConfigured))
      )
      .catch(() => setOnetConfigured(false));
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 space-y-8">
      <header className="space-y-2">
        <CoquetteRibbonBow className="w-12 h-7" />
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#351B38]">
          المصادر والمنهجية العلمية
        </h1>
        <p className="max-w-3xl text-sm sm:text-base text-[#5F4163]">
          توثيق شفاف للأساس العلمي للمقياس، التحقق التقني من واجهة O*NET API v2، حالة
          التكييف العربي، والمصادر العراقية الرسمية المستخدمة في قاعدة التخصصات.
        </p>
      </header>

      {/* O*NET Mini-IP 30 vs 60 verification note */}
      <section className="rounded-3xl border border-[#EAD3E0] bg-[#FFFCFA] p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-[#C04472]">
          <FileCheck2 className="h-5 w-5" aria-hidden="true" />
          <h2 className="font-display text-xl font-bold text-[#351B38]">
            التحقق التقني من مقياس O*NET® Mini-IP (30 سؤالاً)
          </h2>
        </div>

        <div className="space-y-3 text-sm leading-relaxed text-[#4F3553]">
          <p>
            اعتمد مشروع زهرتي على قائمة الـ <strong>30 سؤالاً الرسمية</strong> لنسخة Mini-IP
            المستخرجة والتحقق منها من المرجع الرسمي (<span dir="ltr">onetinterestprofiler.org</span>{' '}
            و <span dir="ltr">services.onetcenter.org/reference/mpp/ip/ip_questions_30</span>)، بواقع 5
            فقرات لكل نمط من أنماط RIASEC الستة، وبمقياس استجابة خماسي (1 إلى 5).
          </p>
          <p>
            <strong>حل التعارض الظاهري بين 30 سؤالاً و60 حرفاً في الوثائق:</strong> تذكر الفقرة
            النصية في دليل API v2 عبارة «build a string of 60 characters»، إلا أن الفحص المباشر
            لمخطط <strong>OpenAPI 3.1 الرسمي</strong> (<span dir="ltr">/reference/openapi.json</span>)
            ونقطة النهاية <span dir="ltr">/mnm/interestprofiler/results</span> أظهر أن التعبير
            النمطي المعتمد لقيمة <code className="px-1.5 py-0.5 rounded bg-[#FDF0F5]" dir="ltr">answers</code>{' '}
            هو <code className="px-1.5 py-0.5 rounded bg-[#FDF0F5]" dir="ltr">^[12345]&#123;30&#125;([12345]&#123;30&#125;)?$</code>،
            أي أن الخادم الرسمي يقبل سلسلة من 30 خانة للـ Mini-IP أو 60 خانة للنسخة القصيرة، دون
            مضاعفة الإجابات. كما تم التحقق من معادلة الدرجة الأولية في تطبيق O*NET الرسمي (0 إلى 20 لكل
            نمط عبر مجموع <span dir="ltr">answer - 1</span>، مع توحيد z-score).
          </p>
          <div className="rounded-2xl border border-[#D8C9F2] bg-[#F4EFFB] p-4 text-xs sm:text-sm">
            <strong>حالة الاتصال بـ O*NET API على الخادم:</strong>{' '}
            {onetConfigured === null
              ? 'جاري الفحص...'
              : onetConfigured
              ? 'مفعّل عبر الخادم (ONET_API_KEY مضبوط في الخادم ولا يظهر للمتصفح).'
              : 'غير مفعّل حالياً (مفتاح ONET_API_KEY غير مضبوط في الخادم). يعمل الموقع حالياً بالتحليل المحلي الموثق وفق معادلة Mini-IP مع وضع علامة صريحة بأن التكييف العربي تجريبي غير مقنن بعد.'}
          </div>
        </div>
      </section>

      {/* O*NET Attribution Notice */}
      <section className="rounded-3xl border border-[#EAD3E0] bg-[#FFFCFA] p-6 sm:p-8 space-y-4">
        <h2 className="font-display text-xl font-bold text-[#351B38]">
          الترخيص والإسناد الرسمي لـ O*NET
        </h2>
        <p className="text-sm leading-relaxed text-[#4F3553]">{ONET_LICENSE_NOTICE_AR}</p>
        <blockquote
          dir="ltr"
          className="rounded-2xl border border-[#F0DDE7] bg-[#FFF8F3] p-4 text-xs sm:text-sm font-mono leading-relaxed text-[#351B38]"
        >
          {ONET_LICENSE_NOTICE_EN}
        </blockquote>
        <div className="pt-1">
          <button
            type="button"
            onClick={() => onNavigate('/terms')}
            className="text-sm font-semibold text-[#C04472] hover:underline cursor-pointer"
          >
            اقرئي الصفحة الكاملة: التعديلات وإخلاء المسؤولية
          </button>
        </div>
      </section>

      {/* Official Sources Lists */}
      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-[#EAD3E0] bg-[#FFFCFA] p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-[#351B38]">
            مصادر O*NET الرسمية
          </h2>
          <ul className="space-y-3 text-sm">
            {OFFICIAL_ONET_SOURCES.map((src) => (
              <li key={src.url} className="border-b border-[#F2E2EB] pb-3 last:border-b-0 last:pb-0">
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-[#C04472] hover:underline"
                >
                  <span>{src.title}</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <p className="text-xs text-[#5F4163] mt-0.5">
                  {src.authority} · تاريخ التحقق: <span className="tabular-nums">{src.lastChecked}</span>
                </p>
                {src.note && <p className="text-xs text-[#4F3553] mt-1">{src.note}</p>}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-[#EAD3E0] bg-[#FFFCFA] p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-[#351B38]">
            المصادر العراقية للتخصصات والجامعات
          </h2>
          <ul className="space-y-3 text-sm">
            {OFFICIAL_IRAQI_SOURCES.map((src) => (
              <li key={src.url} className="border-b border-[#F2E2EB] pb-3 last:border-b-0 last:pb-0">
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-[#C04472] hover:underline"
                >
                  <span>{src.title}</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <p className="text-xs text-[#5F4163] mt-0.5">
                  {src.authority} · تاريخ التحقق: <span className="tabular-nums">{src.lastChecked}</span>
                </p>
                {src.note && <p className="text-xs text-[#4F3553] mt-1">{src.note}</p>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Expandable 30-item Adaptation Audit Table */}
      <section className="rounded-3xl border border-[#EAD3E0] bg-[#FFFCFA] p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-[#7651B8]" aria-hidden="true" />
            <h2 className="font-display text-lg font-bold text-[#351B38]">
              سجل مراجعة الأسئلة الثلاثين والتكييف العربي
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setShowQuestionsAudit((v) => !v)}
            aria-expanded={showQuestionsAudit}
            className="rounded-full border border-[#F2C6D8] bg-[#FDF0F5] px-4 py-1.5 text-xs font-medium text-[#351B38] hover:bg-[#FADCE8] cursor-pointer"
          >
            {showQuestionsAudit ? 'إخفاء جدول المراجعة' : 'عرض جدول الأسئلة الثلاثين'}
          </button>
        </div>

        <p className="text-xs sm:text-sm text-[#5F4163]">
          يحتفظ ملف الأسئلة بالرقم الأصلي، النص الإنجليزي الأصلي، النص العربي المقترح، نمط RIASEC،
          ملاحظات التكييف، وحالة المراجعة والتحقق لكل فقرة بصورة قابلة للتدقيق والتحديث.
        </p>

        {showQuestionsAudit && (
          <div className="overflow-x-auto rounded-2xl border border-[#F0DDE7]">
            <table className="w-full text-right text-xs sm:text-sm">
              <thead className="bg-[#FDF0F5] text-[#351B38]">
                <tr>
                  <th className="p-3 font-semibold">#</th>
                  <th className="p-3 font-semibold">النمط</th>
                  <th className="p-3 font-semibold">النص العربي المقترح</th>
                  <th className="p-3 font-semibold" dir="ltr">Original O*NET Item</th>
                  <th className="p-3 font-semibold">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2E2EB]">
                {MINI_IP_QUESTIONS.map((q) => (
                  <tr key={q.id} className="hover:bg-[#FFF8F3]">
                    <td className="p-3 tabular-nums font-semibold">{q.originalIndex}</td>
                    <td className="p-3">{q.area}</td>
                    <td className="p-3 text-[#351B38]">{q.arabicText}</td>
                    <td className="p-3 text-[#5F4163]" dir="ltr">{q.originalText}</td>
                    <td className="p-3 text-xs text-[#6E5073]">
                      بانتظار مراجعة مختصين ودراسة تقنين
                    </td>
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
