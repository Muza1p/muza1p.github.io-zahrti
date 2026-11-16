import React from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  RotateCcw,
} from 'lucide-react';
import { EditorialCrest } from '@/src/components/ornaments/BotanicalArt';
import { formatScientificBadgeLabel } from '@/src/pages/LibraryPage';
import { PsychCompletedResult, PsychInstrumentSpec, PsychSessionState } from '@/src/types/psychology';

interface PsychAssessmentIntroPageProps {
  spec: PsychInstrumentSpec;
  session?: PsychSessionState;
  latestResult?: PsychCompletedResult;
  onStartFresh: () => void;
  onNavigate: (to: string) => void;
}

export function PsychAssessmentIntroPage({
  spec,
  session,
  latestResult,
  onStartFresh,
  onNavigate,
}: PsychAssessmentIntroPageProps) {
  const isExploratory = spec.scientificStatus === 'exploratory_unstandardized';
  const answeredCount = session ? Object.keys(session.answers).length : 0;
  const hasSavedProgress = answeredCount > 0 && answeredCount < spec.questionCount;

  const handleStartNew = () => {
    onStartFresh();
    onNavigate(`/assessment/${spec.id}/play`);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 space-y-8">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => onNavigate('/library')}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#5F4562] hover:text-[#351B38] cursor-pointer"
        >
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
          <span>العودة إلى مكتبة الاختبارات</span>
        </button>

        <span dir="ltr" className="text-xs font-semibold text-[#762D50]">
          {spec.shortCode}
        </span>
      </div>

      <article className="rounded-3xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 sm:p-10 space-y-7">
        <header className="space-y-3 border-b border-[#E9D8D1] pb-6">
          <EditorialCrest className="w-12 h-7" />
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#6F5472]">
            <span className="font-semibold text-[#762D50]">{spec.domainLabelAr}</span>
            <span aria-hidden="true">·</span>
            <span className={isExploratory ? 'font-semibold text-[#9F7E44]' : 'font-semibold text-[#351B38]'}>
              {formatScientificBadgeLabel(spec)}
            </span>
          </div>

          <h1 className="font-display text-2xl sm:text-4xl font-bold text-[#351B38] leading-snug">
            {spec.titleAr}
          </h1>
          <p dir="ltr" className="text-xs sm:text-sm text-[#6F5472] text-right">
            {spec.titleEn}
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-[#5F4562] pt-1">
            {spec.detailedOverviewAr}
          </p>
        </header>

        {isExploratory && (
          <div className="rounded-2xl border border-[#C6A56B]/60 bg-[#FAF6F1] p-4 flex items-start gap-3 text-xs sm:text-sm leading-relaxed text-[#351B38]">
            <AlertCircle className="h-5 w-5 text-[#9F7E44] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-bold">تنبيه علمي واضح: أداة استكشافية غير مقننة</p>
              <p className="text-[#5F4562] mt-0.5">
                أُعدت هذه الوحدة للتأمل الشخصي وتنظيم الملاحظات اليومية فقط؛ ولا تمثل مقياساً
                سيكومترياً منشوراً ولا يُقارن رقمها بأي معيار إكلينيكي.
              </p>
            </div>
          </div>
        )}

        {/* Key Overview Baseline */}
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-2xl border border-[#E9D8D1] bg-[#F9F3EC]/70 p-5 text-xs sm:text-sm tabular-nums">
          <div>
            <dt className="text-[#6F5472]">عدد العبارات</dt>
            <dd className="font-display text-lg font-bold text-[#351B38] mt-0.5">
              {spec.questionCount} فقرة
            </dd>
          </div>
          <div>
            <dt className="text-[#6F5472]">المدة المتوقعة</dt>
            <dd className="font-display text-lg font-bold text-[#351B38] mt-0.5">
              ~{spec.estimatedMinutes} دقائق
            </dd>
          </div>
          <div>
            <dt className="text-[#6F5472]">سلم الاستجابة</dt>
            <dd className="font-semibold text-[#351B38] mt-1">{spec.scaleTypeLabelAr}</dd>
          </div>
          <div>
            <dt className="text-[#6F5472]">حالة النسخة العربية</dt>
            <dd className="font-semibold text-[#762D50] mt-1">
              {spec.arabicValidationStatus === 'published_arabic_studies'
                ? 'دراسات عربية منشورة'
                : 'صياغة أولية تحتاج تقنيناً'}
            </dd>
          </div>
        </dl>

        {/* Rating Guide & Instructions */}
        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-[#351B38]">
            إرشادات الإجابة قبل البدء
          </h2>
          <p className="text-sm leading-relaxed text-[#5F4562]">{spec.instructionsAr}</p>
          <p className="text-xs text-[#6F5472]">
            أثناء التقديم ستظهر لكِ عبارة واحدة في كل شاشة بدون عدادات أرقام مشتّتة، ويمكنكِ الرجوع
            لتعديل أي إجابة في كل لحظة.
          </p>

          <div className="grid gap-2 sm:grid-cols-2 pt-2">
            {spec.options.map((opt) => (
              <div
                key={opt.value}
                className="rounded-xl border border-[#E9D8D1] bg-[#F9F3EC]/50 px-3.5 py-2.5 text-xs sm:text-sm flex items-center justify-between gap-2"
              >
                <span className="font-semibold text-[#351B38]">{opt.labelAr}</span>
                {opt.descriptionAr && (
                  <span className="text-xs text-[#6F5472]">{opt.descriptionAr}</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-3 border-t border-[#E9D8D1] pt-6">
          {hasSavedProgress ? (
            <>
              <button
                type="button"
                onClick={() => onNavigate(`/assessment/${spec.id}/play`)}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#762D50] px-7 py-3 text-sm sm:text-base font-medium text-[#F9F3EC] hover:bg-[#5D223E] transition-colors cursor-pointer"
              >
                <span>متابعة الجلسة المحفوظة</span>
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleStartNew}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[#E9D8D1] bg-[#FFFDF9] px-5 py-3 text-sm font-medium text-[#351B38] hover:border-[#762D50] cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                <span>البدء من جديد</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleStartNew}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#762D50] px-7 py-3 text-sm sm:text-base font-medium text-[#F9F3EC] hover:bg-[#5D223E] transition-colors cursor-pointer"
            >
              <span>{latestResult ? 'إعادة خوض المقياس (جلسة جديدة)' : 'بدء المقياس الآن'}</span>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
          )}

          {latestResult && (
            <button
              type="button"
              onClick={() => onNavigate(`/assessment/${spec.id}/result`)}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[#351B38] px-5 py-3 text-sm font-medium text-[#351B38] hover:bg-[#351B38] hover:text-[#F9F3EC] transition-colors cursor-pointer"
            >
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              <span>عرض نتيجتكِ الأخيرة</span>
            </button>
          )}
        </div>

        {/* Scientific Source, License & Limitations Transparency Box */}
        <section className="rounded-2xl border border-[#E9D8D1] bg-[#F9F3EC]/60 p-5 space-y-3 text-xs sm:text-sm leading-relaxed text-[#5F4562]">
          <div className="flex items-center gap-2 font-display text-base font-bold text-[#351B38]">
            <BookOpen className="h-4 w-4 text-[#762D50]" aria-hidden="true" />
            <span>المرجع العلمي والترخيص والقيود</span>
          </div>
          <p>
            <strong>المؤلف / المرجع:</strong> {spec.authorOrBody} ({spec.publicationYear}) ·{' '}
            {spec.sourceName}
          </p>
          <p>
            <strong>الترخيص القانوني:</strong> {spec.licenseStatus} — {spec.licenseTermsAr}
          </p>
          <p>
            <strong>الدليل السيكومتري:</strong> {spec.psychometricEvidenceAr}
          </p>
          <p>
            <strong>حدود الأداة:</strong> {spec.limitationsAr}
          </p>
          <a
            href={spec.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-[#762D50] hover:underline pt-1"
          >
            <span>زيارة صفحة المصدر الرسمي</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </section>
      </article>
    </div>
  );
}
