import React, { useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Download,
  ExternalLink,
  Printer,
  RotateCcw,
} from 'lucide-react';
import { PsychScoreChart } from '@/src/components/charts/PsychScoreChart';
import { EditorialCrest, FloralDivider } from '@/src/components/ornaments/BotanicalArt';
import { CrisisSupportBanner } from '@/src/components/safety/CrisisSupportBanner';
import { formatScientificBadgeLabel } from '@/src/pages/LibraryPage';
import { exportArabicDomToPdf } from '@/src/services/pdfReportExporter';
import { PsychCompletedResult, PsychInstrumentSpec } from '@/src/types/psychology';

interface PsychResultPageProps {
  spec: PsychInstrumentSpec;
  result?: PsychCompletedResult;
  history: PsychCompletedResult[];
  personalName: string;
  onStartFresh: () => void;
  onNavigate: (to: string) => void;
}

export function PsychResultPage({
  spec,
  result,
  history,
  personalName,
  onStartFresh,
  onNavigate,
}: PsychResultPageProps) {
  const reportAreaRef = useRef<HTMLDivElement>(null);
  const [exportingPdf, setExportingPdf] = useState(false);
  const [pdfFeedback, setPdfFeedback] = useState<string | null>(null);

  if (!result) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center space-y-4">
        <EditorialCrest className="mx-auto w-14 h-8" />
        <h1 className="font-display text-2xl font-bold text-[#351B38]">
          لا توجد نتيجة محفوظة بعد لهذا المقياس
        </h1>
        <p className="text-sm text-[#5F4562]">
          أكملي فقرات <strong>{spec.titleAr}</strong> أولاً لتظهر لكِ النتيجة المفصلة.
        </p>
        <button
          type="button"
          onClick={() => onNavigate(`/assessment/${spec.id}`)}
          className="rounded-full bg-[#762D50] px-6 py-2.5 text-sm font-medium text-[#F9F3EC] hover:bg-[#5D223E] cursor-pointer"
        >
          الانتقال لتعريف المقياس والبدء
        </button>
      </div>
    );
  }

  const handleDownloadPdf = async () => {
    if (!reportAreaRef.current || exportingPdf) return;
    setExportingPdf(true);
    setPdfFeedback(null);
    const res = await exportArabicDomToPdf(
      reportAreaRef.current,
      `zahrti-${spec.id}-result.pdf`
    );
    setExportingPdf(false);
    if (!res.ok) {
      setPdfFeedback(res.error || 'تعذر تصدير PDF.');
    }
  };

  const formattedDate = new Intl.DateTimeFormat('ar-IQ', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(result.completedAtIso));

  const sortedHistory = [...history].sort(
    (a, b) => Date.parse(a.completedAtIso) - Date.parse(b.completedAtIso)
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 space-y-6">
      {/* Top Action Bar */}
      <div className="no-print flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onNavigate('/library')}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#5F4562] hover:text-[#351B38] cursor-pointer"
        >
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
          <span>العودة إلى المكتبة</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={exportingPdf}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-[#351B38] px-4 py-2 text-xs sm:text-sm font-medium text-[#F9F3EC] hover:bg-[#4B2B4E] disabled:opacity-60 cursor-pointer"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            <span>{exportingPdf ? 'جاري تجهيز ملف PDF...' : 'تحميل النتيجة PDF'}</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-[#E9D8D1] bg-[#FFFDF9] px-4 py-2 text-xs sm:text-sm font-medium text-[#351B38] hover:border-[#762D50] cursor-pointer"
          >
            <Printer className="h-4 w-4" aria-hidden="true" />
            <span>طباعة</span>
          </button>
        </div>
      </div>

      {pdfFeedback && (
        <div role="alert" className="no-print rounded-2xl border border-[#762D50] bg-[#FAF0F3] p-4 text-xs sm:text-sm text-[#762D50]">
          {pdfFeedback}
        </div>
      )}

      {/* Printable & PDF Target Region */}
      <div ref={reportAreaRef} className="space-y-6">
        {result.safetyTriggered && (
          <CrisisSupportBanner reasonAr={result.safetyReasonAr} />
        )}

        <article className="rounded-3xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 sm:p-10 space-y-7">
          <header className="space-y-3 border-b border-[#E9D8D1] pb-6">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#6F5472]">
              <div className="flex flex-wrap items-center gap-2">
                <span dir="ltr" className="font-semibold text-[#762D50]">
                  {spec.shortCode}
                </span>
                <span aria-hidden="true">·</span>
                <span>{spec.domainLabelAr}</span>
                <span aria-hidden="true">·</span>
                <span>{formatScientificBadgeLabel(spec)}</span>
              </div>
              <span className="tabular-nums">{formattedDate}</span>
            </div>

            <h1 className="font-display text-2xl sm:text-4xl font-bold text-[#351B38]">
              {personalName ? `ملخص ${personalName} في ` : 'نتيجتكِ في '}
              {spec.titleAr}
            </h1>
            <p className="text-base sm:text-lg font-semibold text-[#762D50] tabular-nums">
              {result.primaryLabelAr}
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-[#5F4562]">
              {result.scientificSummaryAr}
            </p>
          </header>

          {/* Chart Visualization */}
          <section className="rounded-2xl border border-[#E9D8D1] bg-[#F9F3EC]/50 p-5 sm:p-6 space-y-3">
            <h2 className="font-display text-lg font-bold text-[#351B38]">
              التمثيل البصري للأبعاد والدرجات
            </h2>
            <PsychScoreChart
              chartType={spec.chartType}
              subscales={result.subscales}
              primaryScore={result.primaryScore}
              primaryMaxScore={result.primaryMaxScore}
            />
          </section>

          {/* Subscales Numerical Breakdown */}
          <section className="space-y-3 print-break-inside-avoid">
            <h2 className="font-display text-lg font-bold text-[#351B38]">
              تفصيل الدرجات والمقاييس الفرعية
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {result.subscales.map((sub) => (
                <div
                  key={sub.id}
                  className="rounded-2xl border border-[#E9D8D1] bg-[#FFFDF9] p-4 space-y-1.5"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-semibold text-sm text-[#351B38]">{sub.nameAr}</h3>
                    <span dir="ltr" className="tabular-nums text-sm font-bold text-[#762D50]">
                      {sub.scaledScore} / {sub.maxScore}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-[#9F7E44]">{sub.bandLabelAr}</p>
                  <p className="text-xs leading-relaxed text-[#5F4562]">{sub.interpretationAr}</p>
                </div>
              ))}
            </div>
          </section>

          <FloralDivider />

          {/* Strengths, Care Areas & Practical Suggestions */}
          <section className="grid gap-6 md:grid-cols-2 print-break-inside-avoid">
            {result.strengthsAr.length > 0 && (
              <div className="space-y-2.5">
                <h2 className="font-display text-lg font-bold text-[#351B38]">
                  نقاط التماسك والقوة الملحوظة
                </h2>
                <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed text-[#5F4562]">
                  {result.strengthsAr.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.attentionAreasAr.length > 0 && (
              <div className="space-y-2.5">
                <h2 className="font-display text-lg font-bold text-[#351B38]">
                  جوانب تستحق الوعي والاهتمام اللطيف
                </h2>
                <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed text-[#5F4562]">
                  {result.attentionAreasAr.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {result.practicalSuggestionsAr.length > 0 && (
            <section className="rounded-2xl border border-[#E9D8D1] bg-[#F9F3EC]/60 p-5 space-y-2.5 print-break-inside-avoid">
              <h2 className="font-display text-lg font-bold text-[#351B38]">
                خطوات عملية واقعية وهادئة
              </h2>
              <ul className="list-disc list-inside space-y-1.5 text-sm leading-relaxed text-[#5F4562]">
                {result.practicalSuggestionsAr.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Longitudinal Same-Instrument Comparison */}
          {spec.supportsRepeatedComparison && sortedHistory.length >= 2 && (
            <section className="space-y-3 border-t border-[#E9D8D1] pt-5 print-break-inside-avoid">
              <h2 className="font-display text-lg font-bold text-[#351B38]">
                مقارنة قياساتكِ السابقة في هذا المقياس ({spec.shortCode})
              </h2>
              <p className="text-xs text-[#6F5472]">
                تُعرض القياسات المتكررة لنفس الأداة وحدها عبر الزمن لمتابعة التغيّر الذاتي دون دمج
                مقاييس مختلفة.
              </p>
              <div className="overflow-x-auto rounded-xl border border-[#E9D8D1]">
                <table className="w-full text-right text-xs sm:text-sm tabular-nums">
                  <thead className="bg-[#F9F3EC] text-[#351B38]">
                    <tr>
                      <th className="p-3 font-semibold">التاريخ</th>
                      <th className="p-3 font-semibold">الدرجة المحسوبة</th>
                      <th className="p-3 font-semibold">التوصيف</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E9D8D1]">
                    {sortedHistory.map((entry) => (
                      <tr key={entry.id}>
                        <td className="p-3 text-[#5F4562]">
                          {new Intl.DateTimeFormat('ar-IQ', { dateStyle: 'medium' }).format(
                            new Date(entry.completedAtIso)
                          )}
                        </td>
                        <td className="p-3 font-bold text-[#762D50]">
                          <span dir="ltr">
                            {entry.primaryScore} / {entry.primaryMaxScore}
                          </span>
                        </td>
                        <td className="p-3 text-[#351B38]">{entry.primaryLabelAr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Scientific Method, Limitations & Source */}
          <footer className="rounded-2xl border border-[#E9D8D1] bg-[#FFFDF9] p-5 space-y-2 text-xs leading-relaxed text-[#5F4562] print-break-inside-avoid">
            <div className="flex items-center gap-1.5 font-semibold text-[#351B38]">
              <BookOpen className="h-4 w-4 text-[#762D50]" aria-hidden="true" />
              <span>التوثيق العلمي، طريقة الحساب، وحدود التفسير</span>
            </div>
            <p>
              <strong>طريقة الحساب المعتمدة:</strong> {result.scoringFormulaUsedAr}
            </p>
            <p>
              <strong>المصدر والترخيص:</strong> {spec.authorOrBody} ({spec.publicationYear}) —{' '}
              {spec.licenseStatus}.{' '}
              <a
                href={spec.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#762D50] underline"
              >
                <span>المرجع الرسمي</span>
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            </p>
            <p>
              <strong>حالة التقنين العربي:</strong> {spec.arabicValidationNoteAr}
            </p>
            <p>
              <strong>قيود المقياس وعدم التشخيص:</strong> {result.limitationsAr}
            </p>
          </footer>
        </article>
      </div>

      {/* Bottom Actions */}
      <div className="no-print flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={() => {
            onStartFresh();
            onNavigate(`/assessment/${spec.id}/play`);
          }}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#E9D8D1] bg-[#FFFDF9] px-5 py-2.5 text-sm font-medium text-[#351B38] hover:border-[#762D50] cursor-pointer"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          <span>إعادة المقياس وحفظ قراءة جديدة</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('/report')}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#762D50] px-6 py-2.5 text-sm font-medium text-[#F9F3EC] hover:bg-[#5D223E] cursor-pointer"
        >
          <span>فتح التقرير النفسي الشامل</span>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
