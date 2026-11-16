import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Check, RotateCcw } from 'lucide-react';
import { LIKERT_OPTIONS, MINI_IP_QUESTIONS } from '@/src/data/questions/miniIpQuestions';
import { LikertValue } from '@/src/types';

interface QuizPageProps {
  activePersonName: string;
  answers: Record<number, LikertValue>;
  currentQuestionIndex: number;
  answeredCount: number;
  isComplete: boolean;
  onSelectAnswer: (questionNumber: number, value: LikertValue) => void;
  onChangeQuestionIndex: (index: number) => void;
  onFinish: () => void;
  onReset: () => void;
  onSwitchProfile: () => void;
}

const CALM_MILESTONE_NOTES: Record<number, string> = {
  5: 'خطوة هادئة موفقة — أجبتم على أول ٥ فقرات.',
  10: 'ثلث الطريق مكتمل؛ اختاري ما يشبه فضولج الحقيقي.',
  15: 'منتصف الرحلة — خذي نفساً وتاملي كل نشاط بهدوء.',
  20: 'بقي ثلث أخير لتتضح خريطة اهتماماتج.',
  25: 'خطوات قليلة وتكتمل الصورة كاملة.',
};

export function QuizPage({
  activePersonName,
  answers,
  currentQuestionIndex,
  answeredCount,
  isComplete,
  onSelectAnswer,
  onChangeQuestionIndex,
  onFinish,
  onReset,
  onSwitchProfile,
}: QuizPageProps) {
  const question = MINI_IP_QUESTIONS[currentQuestionIndex] ?? MINI_IP_QUESTIONS[0];
  const selectedValue = answers[question.originalIndex];
  const progressPct = Math.round((answeredCount / MINI_IP_QUESTIONS.length) * 100);

  const handleChoose = (val: LikertValue) => {
    onSelectAnswer(question.originalIndex, val);
    window.setTimeout(() => {
      if (currentQuestionIndex < MINI_IP_QUESTIONS.length - 1) {
        onChangeQuestionIndex(currentQuestionIndex + 1);
      }
    }, 180);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        const val = Number(e.key) as LikertValue;
        onSelectAnswer(question.originalIndex, val);
      } else if (e.key === 'ArrowLeft' && currentQuestionIndex < MINI_IP_QUESTIONS.length - 1) {
        onChangeQuestionIndex(currentQuestionIndex + 1);
      } else if (e.key === 'ArrowRight' && currentQuestionIndex > 0) {
        onChangeQuestionIndex(currentQuestionIndex - 1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentQuestionIndex, onChangeQuestionIndex, onSelectAnswer, question.originalIndex]);

  const milestoneNote = CALM_MILESTONE_NOTES[answeredCount];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 space-y-6">
      {/* Top Focus Header: Active Person + Clean Progress */}
      <div className="space-y-3 border-b border-[#E9D8D1] pb-5">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-[#5F4562]">
            <span>الاختبار الشخصي لـ</span>
            <strong className="text-[#351B38] font-bold">{activePersonName}</strong>
            <button
              type="button"
              onClick={onSwitchProfile}
              className="text-xs font-medium text-[#762D50] hover:underline cursor-pointer"
            >
              (تغيير الشخص)
            </button>
          </div>
          <div className="font-semibold text-[#351B38] tabular-nums">
            السؤال {question.originalIndex} من {MINI_IP_QUESTIONS.length} · المُنجز {answeredCount}/30
          </div>
        </div>

        {/* Hairline Editorial Progress Bar */}
        <div
          role="progressbar"
          aria-valuenow={progressPct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="نسبة التقدم في الاختبار"
          className="h-2 w-full overflow-hidden rounded-full bg-[#E9D8D1]"
        >
          <div
            className="h-full rounded-full bg-[#762D50] transition-all duration-300"
            style={{ width: `${Math.max(3, progressPct)}%` }}
          />
        </div>

        {milestoneNote && (
          <p className="text-xs text-[#762D50] font-medium pt-0.5">{milestoneNote}</p>
        )}
      </div>

      {/* Main Question Focus Surface */}
      <article className="rounded-3xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 sm:p-10 space-y-8">
        <header className="space-y-3 text-center">
          <p className="text-xs font-semibold tracking-wider text-[#9F7E44]">
            فقرة {String(question.originalIndex).padStart(2, '0')} · عبّري عن شعوركِ تجاه هذا النشاط
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold leading-snug text-[#351B38]">
            {question.arabicText}
          </h1>
        </header>

        {/* 5-Point Likert Scale */}
        <div role="radiogroup" aria-label={question.arabicText} className="space-y-3">
          {LIKERT_OPTIONS.map((opt) => {
            const isSelected = selectedValue === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => handleChoose(opt.value)}
                className={`w-full min-h-[54px] rounded-2xl border px-5 py-3.5 text-right flex items-center justify-between gap-4 transition-colors cursor-pointer ${
                  isSelected
                    ? 'border-[#762D50] bg-[#762D50] text-[#F9F3EC]'
                    : 'border-[#E9D8D1] bg-[#F9F3EC]/55 text-[#351B38] hover:border-[#C47C91] hover:bg-[#F9F3EC]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold tabular-nums ${
                      isSelected
                        ? 'border-[#C6A56B] bg-[#C6A56B] text-[#351B38]'
                        : 'border-[#E9D8D1] bg-[#FFFDF9] text-[#5F4562]'
                    }`}
                  >
                    {opt.value}
                  </span>
                  <div className="space-y-0.5">
                    <div className="text-sm sm:text-base font-bold">{opt.labelAr}</div>
                    <div
                      className={`text-xs ${
                        isSelected ? 'text-[#E9D8D1]' : 'text-[#5F4562]'
                      }`}
                    >
                      {opt.descriptionAr}
                    </div>
                  </div>
                </div>
                {isSelected && <Check className="h-4 w-4 shrink-0 text-[#C6A56B]" aria-hidden="true" />}
              </button>
            );
          })}
        </div>

        {/* Navigation Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E9D8D1] pt-6">
          <button
            type="button"
            disabled={currentQuestionIndex === 0}
            onClick={() => onChangeQuestionIndex(currentQuestionIndex - 1)}
            className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full border border-[#E9D8D1] bg-[#FFFDF9] px-5 py-2 text-sm font-medium text-[#351B38] hover:bg-[#F9F3EC] disabled:opacity-40 cursor-pointer"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
            <span>السابق</span>
          </button>

          <div className="flex flex-wrap items-center gap-2.5">
            {currentQuestionIndex < MINI_IP_QUESTIONS.length - 1 ? (
              <button
                type="button"
                onClick={() => onChangeQuestionIndex(currentQuestionIndex + 1)}
                className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full border border-[#351B38] bg-[#351B38] px-6 py-2 text-sm font-medium text-[#F9F3EC] hover:bg-[#4B2B4E] cursor-pointer"
              >
                <span>التالي</span>
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : null}

            {isComplete && (
              <button
                type="button"
                onClick={onFinish}
                className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-[#762D50] px-6 py-2 text-sm font-medium text-[#F9F3EC] hover:bg-[#5D223E] cursor-pointer"
              >
                <span>تحليل النتيجة</span>
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </article>

      {/* Compact Question Jump Index */}
      <section className="rounded-2xl border border-[#E9D8D1] bg-[#FFFDF9] p-5 space-y-3">
        <div className="flex items-center justify-between text-xs text-[#5F4562]">
          <span>الانتقال السريع بين الفقرات</span>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 text-[#762D50] hover:underline cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>بدء محاولة جديدة (مع حفظ السجل)</span>
          </button>
        </div>

        <div className="grid grid-cols-10 gap-1.5 sm:grid-cols-15">
          {MINI_IP_QUESTIONS.map((q, idx) => {
            const answered = Boolean(answers[q.originalIndex]);
            const current = idx === currentQuestionIndex;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => onChangeQuestionIndex(idx)}
                aria-label={`الانتقال إلى الفقرة ${q.originalIndex}`}
                className={`h-8 rounded-lg text-xs font-semibold tabular-nums transition-colors cursor-pointer ${
                  current
                    ? 'bg-[#351B38] text-[#F9F3EC]'
                    : answered
                    ? 'bg-[#762D50]/15 text-[#762D50] border border-[#762D50]/30'
                    : 'bg-[#F9F3EC] text-[#6F5472] border border-[#E9D8D1]'
                }`}
              >
                {q.originalIndex}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
