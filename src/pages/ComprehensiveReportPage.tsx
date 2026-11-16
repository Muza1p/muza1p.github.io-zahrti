import React, { useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Compass,
  Download,
  ExternalLink,
  Printer,
  Trash2,
} from 'lucide-react';
import { PsychScoreChart } from '@/src/components/charts/PsychScoreChart';
import { EditorialCrest, FloralDivider } from '@/src/components/ornaments/BotanicalArt';
import { CrisisSupportBanner } from '@/src/components/safety/CrisisSupportBanner';
import {
  getInstrumentById,
  PSYCH_DOMAIN_ORDER,
  PSYCH_DOMAINS,
} from '@/src/data/assessments/registry';
import { formatScientificBadgeLabel } from '@/src/pages/LibraryPage';
import { exportArabicDomToPdf } from '@/src/services/pdfReportExporter';
import { AssessmentResult } from '@/src/types';
import { PsychCompletedResult, PsychInstrumentSpec } from '@/src/types/psychology';

interface ComprehensiveReportPageProps {
  personalName: string;
  completedResults: PsychCompletedResult[];
  repeatedInstruments: Array<{
    instrumentId: string;
    spec: PsychInstrumentSpec;
    entries: PsychCompletedResult[];
  }>;
  careerResult: AssessmentResult | null;
  onDeleteResult: (resultId: string) => void;
  onExportJson: () => void;
  onNavigate: (to: string) => void;
}

export function ComprehensiveReportPage({
  personalName,
  completedResults,
  repeatedInstruments,
  careerResult,
  onDeleteResult,
  onExportJson,
  onNavigate,
}: ComprehensiveReportPageProps) {
  const reportContainerRef = useRef<HTMLDivElement>(null);
  const [exportingPdf, setExportingPdf] = useState(false);
  const [pdfFeedback, setPdfFeedback] = useState<string | null>(null);

  // Deduplicate latest result per instrument for clean synthesis (preserving archive in repeatedInstruments)
  const latestByInstrument = useMemo(() => {
    const map = new Map<string, PsychCompletedResult>();
    for (const res of completedResults) {
      if (!map.has(res.instrumentId)) {
        map.set(res.instrumentId, res);
      }
    }
    return map;
  }, [completedResults]);

  const safetyTriggeredResults = useMemo(
    () =>
      Array.from(latestByInstrument.values()).filter((r) => r.safetyTriggered),
    [latestByInstrument]
  );

  // Domain-grouped latest findings
  const domainSections = useMemo(() => {
    const sections: Array<{
      domainId: (typeof PSYCH_DOMAIN_ORDER)[number];
      domainTitleAr: string;
      items: Array<{ spec: PsychInstrumentSpec; result: PsychCompletedResult }>;
    }> = [];

    for (const dId of PSYCH_DOMAIN_ORDER) {
      const items: Array<{ spec: PsychInstrumentSpec; result: PsychCompletedResult }> = [];
      for (const [instId, result] of latestByInstrument.entries()) {
        const spec = getInstrumentById(instId);
        if (spec && spec.domain === dId) {
          items.push({ spec, result });
        }
      }
      if (items.length > 0) {
        sections.push({
          domainId: dId,
          domainTitleAr: PSYCH_DOMAINS[dId].nameAr,
          items,
        });
      }
    }
    return sections;
  }, [latestByInstrument]);

  // Evidence-backed cross-domain observations (ONLY generated from real completed results)
  const crossDomainObservations = useMemo(() => {
    const notes: string[] = [];
    const who5 = latestByInstrument.get('who-5');
    const phq9 = latestByInstrument.get('phq-9');
    const gad7 = latestByInstrument.get('gad-7');
    const rrs10 = latestByInstrument.get('rrs-10');
    const brs6 = latestByInstrument.get('brs-6');
    const rses = latestByInstrument.get('rosenberg-rse-10');
    const big5 = latestByInstrument.get('ipip-big5-50');
    const swls = latestByInstrument.get('swls-5');
    const gse = latestByInstrument.get('gse-10');

    if (gad7 && rrs10) {
      const brooding = rrs10.subscales.find((s) => s.id === 'brooding')?.rawScore ?? 0;
      if (gad7.primaryScore >= 10 && brooding >= 13) {
        notes.push(
          'تتقاطع نتيجة القلق العام (GAD-7) مع ارتفاع مؤشر الاجترار الذهني (RRS-10)، ما يشير إلى أن كسر دائرة التفكير الدائري قد يخفف بدوره من حدة التوتر اليومي.'
        );
      }
    }

    if (who5 && brs6) {
      if (who5.primaryScore > 50 && brs6.primaryScore >= 3.0) {
        notes.push(
          'يدعم تقاطع مؤشر الرفاه الجيد (WHO-5) مع المرونة النفسية (BRS-6) وجود قاعدة تعافٍ واستقرار يومية متماسكة.'
        );
      } else if (who5.primaryScore <= 50 && brs6.primaryScore < 3.0) {
        notes.push(
          'يشير تزامن انخفاض الرفاه اليومي (WHO-5) مع تباطؤ التعافي بعد الضغوط (BRS-6) إلى حاجة حقيقية للراحة المنظمة وتخفيف الأعباء دون لوم الذات.'
        );
      }
    }

    if (phq9 && rses && rses.primaryScore < 15 && phq9.primaryScore >= 10) {
      notes.push(
        'اجتماع انخفاض تقدير الذات (RSES) مع الثقل المزاجي في PHQ-9 يوضح أهمية التعامل مع الصوت الناقد الداخلي واستشارة مختص لدعم الرؤية المتزنة للذات.'
      );
    }

    if (swls && gse && swls.primaryScore >= 25 && gse.primaryScore >= 28) {
      notes.push(
        'الرضا العام عن مسار الحياة (SWLS) يتكامل مع الثقة بالكفاءة الذاتية (GSE-10)، ما يشجع على المبادرة نحو أهداف تطويرية ملموسة.'
      );
    }

    if (big5 && careerResult) {
      const openness = big5.subscales.find((s) => s.id === 'openness')?.rawScore ?? 0;
      if (openness >= 36 && ['artistic', 'investigative'].includes(careerResult.topThreeCodes[0])) {
        notes.push(
          `تنسجم سمة الانفتاح الفكري والخيال في مقياس الشخصية (IPIP-50: ${openness}/50) مع صدارة الميول البحثية أو الفنية في مقياس O*NET (${careerResult.hollandCode}).`
        );
      }
    }

    if (notes.length === 0 && (latestByInstrument.size >= 2 || (latestByInstrument.size >= 1 && careerResult))) {
      notes.push(
        'النتائج المكتملة حتى الآن تُقرأ كأبعاد مستقلة تمنح صورة متعددة الزوايا لشخصيتج وتجربتج؛ وكلما أضفتِ مقياساً جديداً من المكتبة اتضحت الروابط الواقعية بين المجالات بصورة أعمق.'
      );
    }
    return notes;
  }, [careerResult, latestByInstrument]);

  const handleDownloadPdf = async () => {
    if (!reportContainerRef.current || exportingPdf) return;
    setExportingPdf(true);
    setPdfFeedback(null);
    const outcome = await exportArabicDomToPdf(
      reportContainerRef.current,
      'zahrti-comprehensive-psychological-report.pdf'
    );
    setExportingPdf(false);
    if (!outcome.ok) {
      setPdfFeedback(outcome.error || 'تعذر تصدير PDF.');
    }
  };

  const hasAnyData = latestByInstrument.size > 0 || Boolean(careerResult);

  if (!hasAnyData) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center space-y-6">
        <EditorialCrest className="mx-auto w-16 h-9" />
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#351B38]">
          التقرير النفسي الشامل في انتظار خطوتكِ الأولى
        </h1>
        <p className="text-sm sm:text-base leading-relaxed text-[#5F4562] max-w-xl mx-auto">
          لا توجد نتائج مكتملة حتى الآن لجمعها في التقرير. ابدئي بأي مقياس من مكتبة الاختبارات
          النفسية أو بمقياس الميول المهنية، وسيُبنى تقريركِ الشخصي المتكامل هنا تلقائياً مع
          إمكانية حفظه كملف <span dir="ltr">PDF</span>.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onNavigate('/library')}
            className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#762D50] px-7 py-2.5 text-sm font-medium text-[#F9F3EC] hover:bg-[#5D223E] cursor-pointer"
          >
            <span>استكشاف مكتبة الاختبارات</span>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/intro')}
            className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-[#E9D8D1] bg-[#FFFDF9] px-6 py-2.5 text-sm font-medium text-[#351B38] hover:border-[#762D50] cursor-pointer"
          >
            <span>اختبار الميول المهنية</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 space-y-6">
      {/* Control Header */}
      <div className="no-print flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onNavigate('/library')}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#762D50] hover:underline cursor-pointer"
        >
          <span>إضافة مقاييس أخرى من المكتبة</span>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={exportingPdf}
            className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full bg-[#762D50] px-5 py-2 text-xs sm:text-sm font-medium text-[#F9F3EC] hover:bg-[#5D223E] disabled:opacity-60 cursor-pointer"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            <span>{exportingPdf ? 'جاري تجهيز ملف PDF...' : 'تحميل التقرير الشامل PDF'}</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full border border-[#E9D8D1] bg-[#FFFDF9] px-4 py-2 text-xs sm:text-sm font-medium text-[#351B38] hover:border-[#762D50] cursor-pointer"
          >
            <Printer className="h-4 w-4" aria-hidden="true" />
            <span>طباعة</span>
          </button>

          <button
            type="button"
            onClick={onExportJson}
            className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full border border-[#E9D8D1] bg-[#F9F3EC] px-4 py-2 text-xs font-medium text-[#351B38] hover:border-[#762D50] cursor-pointer"
          >
            <span>نسخة JSON</span>
          </button>
        </div>
      </div>

      {pdfFeedback && (
        <div role="alert" className="no-print rounded-2xl border border-[#762D50] bg-[#FAF0F3] p-4 text-xs sm:text-sm text-[#762D50]">
          {pdfFeedback}
        </div>
      )}

      {/* Printable & Exportable Holistic Report Area */}
      <div ref={reportContainerRef} className="space-y-6">
        {safetyTriggeredResults.length > 0 && (
          <CrisisSupportBanner
            reasonAr={safetyTriggeredResults.map((r) => r.safetyReasonAr).filter(Boolean).join(' · ')}
          />
        )}

        {/* Executive Summary Header */}
        <article className="rounded-3xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 sm:p-10 space-y-6">
          <header className="space-y-3 border-b border-[#E9D8D1] pb-6">
            <EditorialCrest className="w-14 h-8" />
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#6F5472]">
              <span>زهرتي — تقرير شخصي متكامل وموثق</span>
              <span className="tabular-nums">
                تاريخ التقرير:{' '}
                {new Intl.DateTimeFormat('ar-IQ', { dateStyle: 'long' }).format(new Date())}
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#351B38]">
              {personalName ? `التقرير النفسي الشامل — ${personalName}` : 'التقرير النفسي الشامل الخاص بكِ'}
            </h1>
            <p className="text-sm sm:text-base leading-relaxed text-[#5F4562]">
              يجمع هذا التقرير النتائج المكتملة التي أنجزتِها وحدكِ، مع الفصل الصريح بين المقاييس
              العلمية المقننة والأدوات الاستكشافية، وعدم دمج الأبعاد المختلفة في رقم مصطنع واحد.
            </p>
          </header>

          {/* Metrics Summary Strip (Real Completed Counts Only) */}
          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 rounded-2xl border border-[#E9D8D1] bg-[#F9F3EC]/70 p-5 text-xs sm:text-sm tabular-nums">
            <div>
              <dt className="text-[#6F5472]">المقاييس النفسية المكتملة</dt>
              <dd className="font-display text-xl font-bold text-[#351B38] mt-0.5">
                {latestByInstrument.size} مقاييس
              </dd>
            </div>
            <div>
              <dt className="text-[#6F5472]">الأدوات المقننة / المعيارية</dt>
              <dd className="font-display text-xl font-bold text-[#762D50] mt-0.5">
                {Array.from(latestByInstrument.keys()).filter((id) => {
                  const s = getInstrumentById(id);
                  return s && s.scientificStatus !== 'exploratory_unstandardized';
                }).length + (careerResult ? 1 : 0)}{' '}
                أدوات
              </dd>
            </div>
            <div>
              <dt className="text-[#6F5472]">ملف الميول المهنية</dt>
              <dd className="font-display text-xl font-bold text-[#351B38] mt-0.5">
                {careerResult ? careerResult.hollandCode : 'غير مكتمل بعد'}
              </dd>
            </div>
          </dl>

          {/* Evidence-Backed Cross-Domain Synthesis */}
          {crossDomainObservations.length > 0 && (
            <section className="space-y-3 pt-2 print-break-inside-avoid">
              <h2 className="font-display text-xl font-bold text-[#351B38]">
                ملاحظات وتقاطعات مستخلصة من نتائجكِ الفعلية
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base leading-relaxed text-[#5F4562]">
                {crossDomainObservations.map((obs, idx) => (
                  <li key={idx}>{obs}</li>
                ))}
              </ul>
            </section>
          )}
        </article>

        {/* Per-Domain Detailed Cards */}
        {domainSections.map((sec) => (
          <section
            key={sec.domainId}
            className="rounded-3xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 sm:p-8 space-y-6"
          >
            <h2 className="font-display text-2xl font-bold text-[#351B38] border-b border-[#E9D8D1] pb-3">
              {sec.domainTitleAr}
            </h2>

            <div className="space-y-8">
              {sec.items.map(({ spec, result }) => (
                <article key={result.id} className="space-y-4 print-break-inside-avoid">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#6F5472]">
                        <span dir="ltr" className="font-semibold text-[#762D50]">
                          {spec.shortCode}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{formatScientificBadgeLabel(spec)}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">
                          {new Intl.DateTimeFormat('ar-IQ', { dateStyle: 'medium' }).format(
                            new Date(result.completedAtIso)
                          )}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-bold text-[#351B38]">
                        {spec.titleAr}
                      </h3>
                      <p className="text-sm font-semibold text-[#762D50] tabular-nums">
                        {result.primaryLabelAr}
                      </p>
                    </div>

                    <div className="no-print flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onNavigate(`/assessment/${spec.id}/result`)}
                        className="rounded-full border border-[#E9D8D1] bg-[#F9F3EC] px-3.5 py-1.5 text-xs font-medium text-[#351B38] hover:border-[#762D50] cursor-pointer"
                      >
                        عرض التفاصيل
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteResult(result.id)}
                        title="حذف هذه القراءة من السجل"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#E9D8D1] text-[#6F5472] hover:text-[#762D50] hover:border-[#762D50] cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-[#5F4562]">
                    {result.scientificSummaryAr}
                  </p>

                  <div className="rounded-2xl border border-[#E9D8D1] bg-[#F9F3EC]/50 p-4">
                    <PsychScoreChart
                      chartType={spec.chartType}
                      subscales={result.subscales}
                      primaryScore={result.primaryScore}
                      primaryMaxScore={result.primaryMaxScore}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 text-xs sm:text-sm leading-relaxed text-[#5F4562]">
                    {result.strengthsAr.length > 0 && (
                      <div>
                        <p className="font-semibold text-[#351B38] mb-1">نقاط القوة:</p>
                        <ul className="list-disc list-inside space-y-1">
                          {result.strengthsAr.map((s, idx) => (
                            <li key={idx}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {result.practicalSuggestionsAr.length > 0 && (
                      <div>
                        <p className="font-semibold text-[#351B38] mb-1">خطوات عملية:</p>
                        <ul className="list-disc list-inside space-y-1">
                          {result.practicalSuggestionsAr.slice(0, 2).map((s, idx) => (
                            <li key={idx}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-[#6F5472]">
                    <strong>القيود:</strong> {result.limitationsAr}
                  </p>
                </article>
              ))}
            </div>
          </section>
        ))}

        {/* Preserved O*NET Career Profile Section */}
        {careerResult && (
          <section className="rounded-3xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 sm:p-8 space-y-4 print-break-inside-avoid">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E9D8D1] pb-3">
              <div className="flex items-center gap-2">
                <Compass className="h-5 w-5 text-[#762D50]" aria-hidden="true" />
                <h2 className="font-display text-2xl font-bold text-[#351B38]">
                  الميول المهنية والتخصصات (<span dir="ltr">O*NET Mini-IP · {careerResult.hollandCode}</span>)
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('/results')}
                className="no-print text-xs sm:text-sm font-semibold text-[#762D50] hover:underline cursor-pointer"
              >
                فتح نتائج التخصصات الكاملة
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 text-xs sm:text-sm">
              {careerResult.topThreeCodes.map((code, idx) => {
                const area = careerResult.scores[code];
                return (
                  <div
                    key={code}
                    className="rounded-2xl border border-[#E9D8D1] bg-[#F9F3EC]/60 p-4 space-y-1"
                  >
                    <p className="text-xs text-[#9F7E44] font-semibold">المرتبة {idx + 1}</p>
                    <p className="font-display text-base font-bold text-[#351B38]">
                      {area.nameAr} (<span dir="ltr">{area.letter}</span>)
                    </p>
                    <p className="text-xs text-[#5F4562] tabular-nums">
                      الدرجة المعيارية: {area.score} / 20
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Repeated Longitudinal Measurements (Strictly Same Tool Only) */}
        {repeatedInstruments.length > 0 && (
          <section className="rounded-3xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 sm:p-8 space-y-5 print-break-inside-avoid">
            <h2 className="font-display text-2xl font-bold text-[#351B38]">
              المتابعة الزمنية للقياسات المتكررة (نفس المقياس)
            </h2>
            <p className="text-xs sm:text-sm text-[#5F4562]">
              تُعرض التغيرات الزمنية للمقاييس التي أعدتِ تطبيقها في أكثر من وقت لمراقبة التطور
              الذاتي بأسلوب علمي سليم.
            </p>
            <div className="space-y-4">
              {repeatedInstruments.map((group) => (
                <div
                  key={group.instrumentId}
                  className="rounded-2xl border border-[#E9D8D1] bg-[#F9F3EC]/45 p-4 space-y-2"
                >
                  <h3 className="font-display text-base font-bold text-[#351B38]">
                    {group.spec.titleAr} (<span dir="ltr">{group.spec.shortCode}</span>)
                  </h3>
                  <div className="flex flex-wrap gap-3 text-xs tabular-nums">
                    {group.entries.map((entry, idx) => (
                      <div
                        key={entry.id}
                        className="rounded-xl border border-[#E9D8D1] bg-[#FFFDF9] px-3 py-2"
                      >
                        <span className="text-[#6F5472]">القراءة {idx + 1}: </span>
                        <strong dir="ltr" className="text-[#762D50]">
                          {entry.primaryScore} / {entry.primaryMaxScore}
                        </strong>
                        <span className="text-[#6F5472]">
                          {' '}
                          · {new Intl.DateTimeFormat('ar-IQ', { dateStyle: 'short' }).format(
                            new Date(entry.completedAtIso)
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Citations & Ethical Disclaimer */}
        <footer className="rounded-3xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 sm:p-8 space-y-4 print-break-inside-avoid">
          <div className="flex items-center gap-2 text-[#351B38] font-display text-lg font-bold">
            <BookOpen className="h-5 w-5 text-[#762D50]" aria-hidden="true" />
            <span>المراجع العلمية والشفافية</span>
          </div>
          <ul className="space-y-2 text-xs leading-relaxed text-[#5F4562]">
            {Array.from(latestByInstrument.keys()).map((id) => {
              const spec = getInstrumentById(id);
              if (!spec) return null;
              return (
                <li key={id}>
                  <strong>{spec.shortCode}:</strong> {spec.authorOrBody} ({spec.publicationYear}) —{' '}
                  {spec.sourceName} · {spec.licenseStatus}.{' '}
                  <a
                    href={spec.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 text-[#762D50] underline"
                  >
                    <span>المصدر</span>
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
          <FloralDivider />
          <p className="text-xs leading-relaxed text-[#6F5472]">
            إقرار علمي: هذا التقرير أداة وعي وتأمل وتوجيه ذاتي لصاحب الحساب الواحد فقط، ولا يمثل
            تشخيصاً طبياً أو تقريراً نفسياً سريرياً. جميع الحسابات والملفات محفوظة محلياً في جهازكِ.
          </p>
        </footer>
      </div>
    </div>
  );
}
