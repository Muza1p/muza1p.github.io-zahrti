import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check, CheckCircle2, RotateCcw } from 'lucide-react';
import { ZahrtiBlossomMark } from '@/src/components/ornaments/BotanicalArt';
import { loadInstrumentQuestions } from '@/src/data/assessments/loader';
import {
  PsychInstrumentSpec,
  PsychQuestion,
  PsychSessionState,
} from '@/src/types/psychology';

interface PsychAssessmentRunnerPageProps {
  spec: PsychInstrumentSpec;
  session?: PsychSessionState;
  onSaveAnswer: (instrumentId: string, questionId: string, value: number, nextIndex?: number) => void;
  onChangeIndex: (instrumentId: string, index: number) => void;
  onResetSession: (instrumentId: string) => void;
  onSubmitAssessment: (spec: PsychInstrumentSpec, questions: PsychQuestion[]) => void;
  onNavigate: (to: string) => void;
}

/**
 * Qualitative progress cue ONLY — strict zero-question-number rule during active testing!
 */
function getQualitativeProgressStage(ratio: number): string {
  if (ratio <= 0.15) return 'بداية هادئة — خذي وقتكِ في كل عبارة';
  if (ratio <= 0.45) return 'تتقدّمين بخطوات متزنة في المقياس';
  if (ratio <= 0.75) return 'رحلتكِ مستمرة — إجاباتكِ تُحفظ تلقائياً';
  if (ratio < 1) return 'اقتربتِ من المحطة الأخيرة لهذا المقياس';
  return 'اكتملت جميع العبارات وجاهزة للمراجعة أو الإنهاء';
}

export function PsychAssessmentRunnerPage({
  spec,
  session,
  onSaveAnswer,
  onChangeIndex,
  onResetSession,
  onSubmitAssessment,
  onNavigate,
}: PsychAssessmentRunnerPageProps) {
  const [questions, setQuestions] = useState<PsychQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Guard against rapid double-click / double-tap accidentally skipping adjacent questions
  const lockRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setLoadError(null);
    loadInstrumentQuestions(spec.id)
      .then((list) => {
        if (!active) return;
        if (!list.length) {
          setLoadError('تعذر تحميل فقرات هذا المقياس حالياً.');
        } else {
          setQuestions(list);
        }
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setLoadError('حدث خطأ غير متوقع أثناء تهيئة العبارات.');
        setLoading(false);
      });
    return () => {
      active = false;
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [spec.id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center space-y-4">
        <ZahrtiBlossomMark className="mx-auto h-10 w-10 text-[#762D50]" />
        <p className="font-display text-lg text-[#351B38]">نُهيّئ مساحة الاختبار الهادئة...</p>
      </div>
    );
  }

  if (loadError || questions.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center space-y-4">
        <p className="text-sm text-[#762D50]">{loadError || 'لم يتم العثور على فقرات.'}</p>
        <button
          type="button"
          onClick={() => onNavigate(`/assessment/${spec.id}`)}
          className="rounded-full bg-[#351B38] px-6 py-2.5 text-sm font-medium text-[#F9F3EC] cursor-pointer"
        >
          العودة لتعريف المقياس
        </button>
      </div>
    );
  }

  const answers = session?.answers ?? {};
  const currentIndex = Math.min(Math.max(0, session?.currentIndex ?? 0), questions.length - 1);
  const currentQuestion = questions[currentIndex];
  const currentSelectedValue = answers[currentQuestion.id];

  const answeredCountInternal = questions.filter((q) => typeof answers[q.id] === 'number').length;
  const allAnswered = answeredCountInternal === questions.length;
  const progressRatio = answeredCountInternal / questions.length;
  const progressBarPct = Math.max(4, Math.round(((currentIndex + (currentSelectedValue !== undefined ? 1 : 0.25)) / questions.length) * 100));

  const handleSelectOption = (val: number) => {
    if (lockRef.current) return;
    lockRef.current = true;

    const isLast = currentIndex >= questions.length - 1;
    const nextIdx = isLast ? currentIndex : currentIndex + 1;
    onSaveAnswer(spec.id, currentQuestion.id, val, currentIndex);

    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      if (isLast) {
        setShowConfirmModal(true);
      } else {
        onChangeIndex(spec.id, nextIdx);
      }
      window.setTimeout(() => {
        lockRef.current = false;
      }, 120);
    }, 240);
  };

  const handlePrev = () => {
    if (lockRef.current || currentIndex <= 0) return;
    onChangeIndex(spec.id, currentIndex - 1);
  };

  const handleConfirmFinish = () => {
    const firstMissingIdx = questions.findIndex((q) => typeof answers[q.id] !== 'number');
    if (firstMissingIdx !== -1) {
      setShowConfirmModal(false);
      onChangeIndex(spec.id, firstMissingIdx);
      return;
    }
    onSubmitAssessment(spec, questions);
    onNavigate(`/assessment/${spec.id}/result`);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12 sm:px-6 space-y-6">
      {/* Quiet Top Bar — Strictly Zero Question Numbers */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onNavigate(`/assessment/${spec.id}`)}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#5F4562] hover:text-[#351B38] cursor-pointer"
        >
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
          <span>التعريف والإرشادات</span>
        </button>

        <div className="text-xs font-medium text-[#762D50]">
          {spec.titleAr}
        </div>
      </div>

      {/* Qualitative Calm Progress Indicator (NO Numbers / Fractions) */}
      <div className="space-y-2">
        <div
          className="h-2 w-full overflow-hidden rounded-full bg-[#EFE4DC]"
          role="progressbar"
          aria-label="مستوى التقدم العام في المقياس"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progressBarPct}
        >
          <div
            className="h-full rounded-full bg-gradient-to-l from-[#762D50] to-[#C47C91] transition-all duration-300"
            style={{ width: `${progressBarPct}%` }}
          />
        </div>
        <p className="text-xs text-[#6F5472] text-center">
          {getQualitativeProgressStage(progressRatio)}
        </p>
      </div>

      {/* Centered Focused Single-Question Card */}
      <section className="rounded-3xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 sm:p-10 shadow-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="space-y-7"
          >
            <div className="space-y-3 text-center">
              <p className="text-xs font-semibold text-[#9F7E44]">
                {spec.instructionsAr}
              </p>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#351B38] leading-[1.6]">
                {currentQuestion.textAr}
              </h1>
            </div>

            {/* Authentic Options (4, 5, 6, or 7 Choices Preserved Faithfully) */}
            <div className="space-y-2.5 pt-2" role="radiogroup" aria-label={currentQuestion.textAr}>
              {spec.options.map((opt) => {
                const isSelected = currentSelectedValue === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => handleSelectOption(opt.value)}
                    className={`w-full min-h-[52px] rounded-2xl border px-5 py-3.5 text-right flex items-center justify-between gap-3 transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#762D50] ${
                      isSelected
                        ? 'border-[#762D50] bg-[#FAF0F3] text-[#351B38] shadow-xs'
                        : 'border-[#E9D8D1] bg-[#F9F3EC]/45 text-[#351B38] hover:border-[#C47C91] hover:bg-[#FFFDF9]'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <span className="block text-sm sm:text-base font-medium">{opt.labelAr}</span>
                      {opt.descriptionAr && (
                        <span className="block text-xs text-[#6F5472]">{opt.descriptionAr}</span>
                      )}
                    </div>

                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
                        isSelected
                          ? 'border-[#762D50] bg-[#762D50] text-[#F9F3EC]'
                          : 'border-[#C6A56B]/60 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer Controls: Back / Edit / Finish */}
        <div className="mt-8 border-t border-[#E9D8D1] pt-5 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full border border-[#E9D8D1] px-4 py-2 text-xs sm:text-sm font-medium text-[#351B38] hover:bg-[#F9F3EC] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
            <span>السؤال السابق وتعديل الإجابة</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onResetSession(spec.id);
                onChangeIndex(spec.id, 0);
              }}
              className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full px-3.5 py-2 text-xs text-[#6F5472] hover:text-[#762D50] cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>إعادة البدء</span>
            </button>

            {allAnswered && (
              <button
                type="button"
                onClick={() => setShowConfirmModal(true)}
                className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full bg-[#351B38] px-5 py-2 text-xs sm:text-sm font-medium text-[#F9F3EC] hover:bg-[#4B2B4E] cursor-pointer"
              >
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                <span>إنهاء وعرض النتيجة</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Final Confirmation Modal */}
      {showConfirmModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#351B38]/45 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-finish-title"
        >
          <div className="w-full max-w-md rounded-3xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 sm:p-8 space-y-5 shadow-xl">
            <div className="space-y-2 text-center">
              <ZahrtiBlossomMark className="mx-auto h-8 w-8 text-[#762D50]" />
              <h2 id="confirm-finish-title" className="font-display text-2xl font-bold text-[#351B38]">
                هل أنتِ مستعدة لاعتماد الإجابات؟
              </h2>
              <p className="text-sm leading-relaxed text-[#5F4562]">
                تمت الإجابة على جميع عبارات هذا المقياس. يمكنكِ الآن حساب نتيجتكِ العلمية المفصلة
                أو العودة خطوة للخلف لمراجعة أي إجابة قبل الاعتماد.
              </p>
            </div>

            <div className="flex flex-col gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleConfirmFinish}
                className="w-full min-h-[46px] rounded-full bg-[#762D50] px-6 py-2.5 text-sm font-medium text-[#F9F3EC] hover:bg-[#5D223E] cursor-pointer"
              >
                اعتماد الإجابات وعرض النتيجة
              </button>
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="w-full min-h-[44px] rounded-full border border-[#E9D8D1] bg-[#F9F3EC] px-6 py-2 text-sm font-medium text-[#351B38] hover:bg-[#EFE2DC] cursor-pointer"
              >
                العودة لمراجعة الإجابات
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
