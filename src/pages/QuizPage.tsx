import React, { useEffect, useState } from 'react';
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
      <div className="rounded-[2rem] border border-[#E8CED5] bg-[#FFFDFB] p-5 sm:p-9 shadow-[0_10px_40px_-24px_rgba(169,80,108,0.18)] space-y-6">
        {/* Top bar inside quiz card: small logo + question counter */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[#381F2E]">
            <ZahrtiBlossomMark className="h-6 w-6" />
            <span className="font-display text-sm font-bold">ZAHRTI</span>
          </div>
          <div
            className="font-display text-sm font-semibold text-[#381F2E] tabular-nums"
            aria-live="polite"
          >
            السؤال {formattedNumber} من {total}
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div
            role="progressbar"
            aria-valuenow={answeredCount}
            aria-valuemin={0}
            aria-valuemax={total}
            aria-label={`تمت الإجابة على ${answeredCount} من أصل ${total} سؤالاً`}
            className="h-2.5 w-full overflow-hidden rounded-full bg-[#F4E3E8]"
          >
            <div
              className="h-full rounded-full bg-[#A9506C] transition-all duration-200"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-[#69495B] tabular-nums">
            <span>المُنجز: {answeredCount} من {total}</span>
            <span>{progressPercent}%</span>
          </div>
        </div>

        {/* Question card */}
        <section
          aria-labelledby="quiz-question-text"
          className="rounded-3xl border border-[#F0DDE2] bg-[#FDF9F6] px-5 py-7 text-center space-y-3"
        >
          <div className="flex justify-center">
            <RiasecBadgeGlyph area={currentQuestion.area} className="h-11 w-11" />
          </div>
          <p className="text-xs text-[#7A596C]">
            ما مدى رغبتكِ في القيام بهذا النشاط ضمن عملكِ المستقبلي؟
          </p>
          <h1
            id="quiz-question-text"
            className="font-display text-xl sm:text-2xl font-bold leading-relaxed text-[#381F2E]"
          >
            {currentQuestion.arabicText}
          </h1>
        </section>

        {/* 5-point Likert options */}
        <div
          role="radiogroup"
          aria-labelledby="quiz-question-text"
          className="space-y-2.5"
        >
          {LIKERT_OPTIONS.map((opt) => {
            const isSelected = selectedValue === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => handleSelect(opt.value)}
                className={`w-full min-h-[54px] flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-right transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A9506C] ${
                  isSelected
                    ? 'border-[#A9506C] bg-[#F7E7EB] text-[#381F2E] font-semibold'
                    : 'border-[#E8CED5] bg-[#FFFDFB] text-[#381F2E] hover:bg-[#FBF1F3]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold tabular-nums ${
                      isSelected
                        ? 'border-[#A9506C] bg-[#A9506C] text-white'
                        : 'border-[#DFC2CB] bg-[#FDF9F6] text-[#69495B]'
                    }`}
                  >
                    {opt.value}
                  </span>
                  <div className="text-right">
                    <span className="block text-sm sm:text-base">{opt.labelAr}</span>
                    <span className="block text-xs font-normal text-[#69495B]">
                      {opt.descriptionAr}
                    </span>
                  </div>
                </div>

                <span className="shrink-0">
                  {isSelected ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#A9506C]">
                      <Check className="h-4 w-4" aria-hidden="true" />
                      <span>مختار</span>
                    </span>
                  ) : (
                    <span className="h-4 w-4 block rounded-full border border-[#D8BBC4]" aria-hidden="true" />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Validation feedback (never silent) */}
        {validationMessage && (
          <div
            role="alert"
            className="flex items-center gap-2.5 rounded-2xl border border-[#DF99A9] bg-[#FDF0F3] px-4 py-3 text-sm font-medium text-[#8B2945]"
          >
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{validationMessage}</span>
          </div>
        )}

        {/* Gentle 5-question milestone companion card (appears ONLY every 5 completed questions) */}
        {activeMilestone && (
          <aside
            data-testid="quiz-milestone-companion"
            aria-live="polite"
            className="rounded-3xl border border-[#D8CBE7] bg-[#F8F4FB] p-4 flex items-center gap-3.5 shadow-xs"
          >
            <CharacterStage
              characterId={activeMilestone.characterId}
              variant="avatar"
              eager={true}
              customQuote={activeMilestone.messageAr}
              className="h-16 w-16 sm:h-20 sm:w-20 shrink-0"
            />
            <div className="flex-1 min-w-0 space-y-1">
              <p className="font-display text-sm font-bold text-[#381F2E]">
                {activeMilestone.titleAr}
              </p>
              <p className="text-xs sm:text-sm leading-relaxed text-[#573E4E]">
                {activeMilestone.messageAr}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setDismissedMilestone(answeredCount)}
              aria-label="إخفاء رسالة التشجيع"
              className="self-start rounded-full p-1.5 text-[#69495B] hover:bg-[#EAE0F3] hover:text-[#381F2E] cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </aside>
        )}

        {/* Prev / Next / Finish buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={isFirst}
            className={`inline-flex min-h-[44px] items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
              isFirst
                ? 'border-[#F0DDE2] bg-[#FAF5F6] text-[#B79BA8] cursor-not-allowed'
                : 'border-[#E8CED5] bg-[#FFFDFB] text-[#381F2E] hover:bg-[#FBF1F3] cursor-pointer'
            }`}
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
            <span>السابق</span>
          </button>

          {!isLast ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#A9506C] px-7 py-2.5 text-sm font-medium text-white shadow-xs hover:bg-[#913F59] transition-colors cursor-pointer"
            >
              <span>التالي</span>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleComplete}
              disabled={!isComplete}
              className={`inline-flex min-h-[44px] items-center gap-2 rounded-full px-7 py-2.5 text-sm font-medium shadow-xs transition-colors ${
                isComplete
                  ? 'bg-[#A9506C] text-white hover:bg-[#913F59] cursor-pointer'
                  : 'bg-[#DFC6CE] text-white cursor-not-allowed'
              }`}
            >
              <span>إنهاء وعرض النتيجة</span>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Finish shortcut when all 30 are already answered on any slide */}
        {isComplete && !isLast && (
          <div className="rounded-2xl border border-[#D8CBE7] bg-[#F4EFF8] p-3.5 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs sm:text-sm text-[#381F2E]">
              أتممتِ الإجابة على جميع الأسئلة الثلاثين! يمكنكِ مراجعة أي سؤال أو عرض نتيجتج الآن.
            </span>
            <button
              type="button"
              onClick={onFinish}
              className="rounded-full bg-[#8E74A8] px-4 py-1.5 text-xs font-medium text-white hover:bg-[#775E91] cursor-pointer"
            >
              عرض النتائج
            </button>
          </div>
        )}

        {/* Reset progress footer */}
        <div className="border-t border-[#F2E2E6] pt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#69495B]">
          <span>تُحفظ إجاباتج تلقائياً على هذا الجهاز فقط.</span>

          {!confirmReset ? (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="inline-flex items-center gap-1 text-[#69495B] hover:text-[#A9506C] cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>حذف الإجابات وإعادة البدء</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-[#8B2945] font-medium">هل تريدين مسح الإجابات؟</span>
              <button
                type="button"
                onClick={() => {
                  setConfirmReset(false);
                  onReset();
                }}
                className="rounded-full bg-[#A9506C] px-3 py-1 text-white hover:bg-[#913F59] cursor-pointer"
              >
                نعم، امسح
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="rounded-full border border-[#E8CED5] px-3 py-1 hover:bg-[#FBF1F3] cursor-pointer"
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
