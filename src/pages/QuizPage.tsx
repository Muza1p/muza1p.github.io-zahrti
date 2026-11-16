import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  RotateCcw,
  X,
} from 'lucide-react';
import { CharacterStage } from '@/src/components/characters/CharacterStage';
import {
  RiasecBadgeGlyph,
  ZahrtiBlossomMark,
} from '@/src/components/ornaments/BotanicalArt';
import { QUIZ_MILESTONES } from '@/src/data/characters/kawaiiCharacters';
import { LIKERT_OPTIONS, MINI_IP_QUESTIONS } from '@/src/data/questions/miniIpQuestions';
import { LikertValue } from '@/src/types';

interface QuizPageProps {
  answers: Record<number, LikertValue>;
  currentQuestionIndex: number;
  answeredCount: number;
  isComplete: boolean;
  onSelectAnswer: (questionIndex: number, value: LikertValue) => void;
  onChangeQuestionIndex: (index: number) => void;
  onFinish: () => void;
  onReset: () => void;
}

export function QuizPage({
  answers,
  currentQuestionIndex,
  answeredCount,
  isComplete,
  onSelectAnswer,
  onChangeQuestionIndex,
  onFinish,
  onReset,
}: QuizPageProps) {
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState<boolean>(false);
  const [dismissedMilestone, setDismissedMilestone] = useState<number | null>(null);

  const total = MINI_IP_QUESTIONS.length;
  const currentQuestion = MINI_IP_QUESTIONS[currentQuestionIndex] ?? MINI_IP_QUESTIONS[0];
  const selectedValue = answers[currentQuestion.originalIndex];
  const isFirst = currentQuestionIndex === 0;
  const isLast = currentQuestionIndex === total - 1;

  const progressPercent = Math.round((answeredCount / total) * 100);
  const formattedNumber = String(currentQuestion.originalIndex).padStart(2, '0');

  const activeMilestone =
    answeredCount > 0 &&
    answeredCount % 5 === 0 &&
    Boolean(selectedValue) &&
    dismissedMilestone !== answeredCount
      ? QUIZ_MILESTONES[answeredCount] ?? null
      : null;

  useEffect(() => {
    setValidationMessage(null);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (answeredCount % 5 !== 0) {
      setDismissedMilestone(null);
    }
  }, [answeredCount]);

  const handleSelect = (val: LikertValue) => {
    onSelectAnswer(currentQuestion.originalIndex, val);
    setValidationMessage(null);
  };

  const handleNext = () => {
    if (!selectedValue) {
      setValidationMessage('لطفاً اختاري إحدى الإجابات الخمس للمتابعة إلى السؤال التالي.');
      return;
    }
    if (!isLast) {
      onChangeQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      setValidationMessage(null);
      onChangeQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleComplete = () => {
    if (!selectedValue) {
      setValidationMessage('لطفاً اختاري إجابة لهذا السؤال أولاً.');
      return;
    }
    if (!isComplete) {
      const firstUnanswered = MINI_IP_QUESTIONS.findIndex(
        (q) => !answers[q.originalIndex]
      );
      setValidationMessage(
        `لا يزال هناك سؤال لم تجيبي عليه (السؤال رقم ${firstUnanswered + 1}). يمكنكِ الانتقال إليه الآن.`
      );
      if (firstUnanswered >= 0) {
        onChangeQuestionIndex(firstUnanswered);
      }
      return;
    }
    onFinish();
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 space-y-5">
      <div className="rounded-[2rem] border border-[#EAD3E0] bg-[#FFFCFA] p-5 sm:p-9 shadow-[0_14px_45px_-26px_rgba(118,81,184,0.22)] space-y-6">
        {/* Top bar inside quiz card: small logo + question counter */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[#351B38]">
            <ZahrtiBlossomMark className="h-6 w-6" />
            <span className="font-display text-sm font-bold">ZAHRTI</span>
          </div>
          <div
            className="font-display text-sm font-semibold text-[#351B38] tabular-nums"
            aria-live="polite"
          >
            السؤال {formattedNumber} من {total}
          </div>
        </div>

        {/* Smooth gradient progress bar (Berry Pink -> Royal Violet) */}
        <div className="space-y-1.5">
          <div
            role="progressbar"
            aria-valuenow={answeredCount}
            aria-valuemin={0}
            aria-valuemax={total}
            aria-label={`تمت الإجابة على ${answeredCount} من أصل ${total} سؤالاً`}
            className="h-3 w-full overflow-hidden rounded-full bg-[#F4E9F3]"
          >
            <motion.div
              className="h-full rounded-full bg-gradient-to-l from-[#C04472] to-[#7651B8]"
              initial={false}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-[#5F4163] tabular-nums">
            <span>المُنجز: {answeredCount} من {total}</span>
            <span className="font-semibold text-[#7651B8]">{progressPercent}%</span>
          </div>
        </div>

        {/* Question card with smooth AnimatePresence transition */}
        <AnimatePresence mode="wait">
          <motion.section
            key={currentQuestion.originalIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            aria-labelledby="quiz-question-text"
            className="rounded-3xl border border-[#EAD3E0] bg-gradient-to-br from-[#FFF8F3] to-[#F9F2FC] px-5 py-7 text-center space-y-3"
          >
            <div className="flex justify-center">
              <RiasecBadgeGlyph area={currentQuestion.area} className="h-11 w-11" />
            </div>
            <p className="text-xs text-[#6E5073]">
              ما مدى رغبتكِ في القيام بهذا النشاط ضمن عملكِ المستقبلي؟
            </p>
            <h1
              id="quiz-question-text"
              className="font-display text-xl sm:text-2xl font-bold leading-relaxed text-[#351B38]"
            >
              {currentQuestion.arabicText}
            </h1>
          </motion.section>
        </AnimatePresence>

        {/* 5-point Likert options with tactile spring micro-interactions */}
        <div
          role="radiogroup"
          aria-labelledby="quiz-question-text"
          className="space-y-2.5"
        >
          {LIKERT_OPTIONS.map((opt) => {
            const isSelected = selectedValue === opt.value;
            return (
              <motion.button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleSelect(opt.value)}
                className={`w-full min-h-[54px] flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-right transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C04472] ${
                  isSelected
                    ? 'border-[#C04472] bg-[#FDF0F5] text-[#351B38] font-semibold shadow-xs'
                    : 'border-[#EAD3E0] bg-[#FFFCFA] text-[#351B38] hover:bg-[#FDF0F5]/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold tabular-nums ${
                      isSelected
                        ? 'border-[#C04472] bg-gradient-to-br from-[#C04472] to-[#7651B8] text-white'
                        : 'border-[#DFC4D4] bg-[#FFF8F3] text-[#5F4163]'
                    }`}
                  >
                    {opt.value}
                  </span>
                  <div className="text-right">
                    <span className="block text-sm sm:text-base">{opt.labelAr}</span>
                    <span className="block text-xs font-normal text-[#5F4163]">
                      {opt.descriptionAr}
                    </span>
                  </div>
                </div>

                <span className="shrink-0">
                  {isSelected ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#C04472]">
                      <Check className="h-4 w-4" aria-hidden="true" />
                      <span>مختار</span>
                    </span>
                  ) : (
                    <span className="h-4 w-4 block rounded-full border border-[#D8BDD0]" aria-hidden="true" />
                  )}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Validation feedback (never silent) */}
        {validationMessage && (
          <div
            role="alert"
            className="flex items-center gap-2.5 rounded-2xl border border-[#DF99B2] bg-[#FDF0F5] px-4 py-3 text-sm font-medium text-[#9B2953]"
          >
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{validationMessage}</span>
          </div>
        )}

        {/* Gentle 5-question milestone companion card (appears ONLY every 5 completed questions) */}
        <AnimatePresence>
          {activeMilestone && (
            <motion.aside
              data-testid="quiz-milestone-companion"
              aria-live="polite"
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.28 }}
              className="rounded-3xl border border-[#D8C9F2] bg-[#F4EFFB] p-4 flex items-center gap-3.5 shadow-xs"
            >
              <CharacterStage
                characterId={activeMilestone.characterId}
                variant="avatar"
                eager={true}
                customQuote={activeMilestone.messageAr}
                className="h-16 w-16 sm:h-20 sm:w-20 shrink-0"
              />
              <div className="flex-1 min-w-0 space-y-1">
                <p className="font-display text-sm font-bold text-[#351B38]">
                  {activeMilestone.titleAr}
                </p>
                <p className="text-xs sm:text-sm leading-relaxed text-[#4F3553]">
                  {activeMilestone.messageAr}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDismissedMilestone(answeredCount)}
                aria-label="إخفاء رسالة التشجيع"
                className="self-start rounded-full p-1.5 text-[#5F4163] hover:bg-[#EAE0F8] hover:text-[#351B38] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Prev / Next / Finish buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={isFirst}
            className={`inline-flex min-h-[44px] items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
              isFirst
                ? 'border-[#F0DDE7] bg-[#FAF5F8] text-[#B79BA8] cursor-not-allowed'
                : 'border-[#EAD3E0] bg-[#FFFCFA] text-[#351B38] hover:bg-[#FDF0F5] cursor-pointer'
            }`}
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
            <span>السابق</span>
          </button>

          {!isLast ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-gradient-to-l from-[#C04472] to-[#7651B8] px-7 py-2.5 text-sm font-medium text-white shadow-xs hover:opacity-95 transition-opacity cursor-pointer"
            >
              <span>التالي</span>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleComplete}
              disabled={!isComplete}
              className={`inline-flex min-h-[44px] items-center gap-2 rounded-full px-7 py-2.5 text-sm font-medium shadow-xs transition-opacity ${
                isComplete
                  ? 'bg-gradient-to-l from-[#C04472] to-[#7651B8] text-white hover:opacity-95 cursor-pointer'
                  : 'bg-[#DFC6D4] text-white cursor-not-allowed'
              }`}
            >
              <span>إنهاء وعرض النتيجة</span>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Finish shortcut when all 30 are already answered on any slide */}
        {isComplete && !isLast && (
          <div className="rounded-2xl border border-[#D8C9F2] bg-[#F4EFFB] p-3.5 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs sm:text-sm text-[#351B38]">
              أتممتِ الإجابة على جميع الأسئلة الثلاثين! يمكنكِ مراجعة أي سؤال أو عرض نتيجتج الآن.
            </span>
            <button
              type="button"
              onClick={onFinish}
              className="rounded-full bg-[#7651B8] px-4 py-1.5 text-xs font-medium text-white hover:bg-[#613F9E] cursor-pointer"
            >
              عرض النتائج
            </button>
          </div>
        )}

        {/* Reset progress footer */}
        <div className="border-t border-[#F2E2EB] pt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#5F4163]">
          <span>تُحفظ إجاباتج تلقائياً على هذا الجهاز فقط.</span>

          {!confirmReset ? (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="inline-flex items-center gap-1 text-[#5F4163] hover:text-[#C04472] cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>حذف الإجابات وإعادة البدء</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-[#9B2953] font-medium">هل تريدين مسح الإجابات؟</span>
              <button
                type="button"
                onClick={() => {
                  setConfirmReset(false);
                  onReset();
                }}
                className="rounded-full bg-[#C04472] px-3 py-1 text-white hover:bg-[#A6345F] cursor-pointer"
              >
                نعم، امسح
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="rounded-full border border-[#EAD3E0] px-3 py-1 hover:bg-[#FDF0F5] cursor-pointer"
              >
                إلغاء
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
