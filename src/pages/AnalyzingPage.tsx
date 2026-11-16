import React, { useEffect, useRef } from 'react';
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';
import { CharacterStage } from '@/src/components/characters/CharacterStage';
import { AssessmentResult } from '@/src/types';

interface AnalyzingPageProps {
  isComplete: boolean;
  missingQuestionIndices: number[];
  isAnalyzing: boolean;
  analysisError: string | null;
  onRunAnalysis: (forceLocalFallback?: boolean) => Promise<AssessmentResult | null>;
  onJumpToQuestion: (indexZeroBased: number) => void;
  onNavigate: (to: string) => void;
}

export function AnalyzingPage({
  isComplete,
  missingQuestionIndices,
  isAnalyzing,
  analysisError,
  onRunAnalysis,
  onJumpToQuestion,
  onNavigate,
}: AnalyzingPageProps) {
  const triggeredRef = useRef(false);

  useEffect(() => {
    if (!isComplete || triggeredRef.current) return;
    triggeredRef.current = true;

    const timer = window.setTimeout(async () => {
      const res = await onRunAnalysis(false);
      if (res) {
        onNavigate('/results');
      }
    }, 550);

    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComplete]);

  // Guard: never display empty/incomplete analysis as success
  if (!isComplete) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12 sm:px-6">
        <div className="rounded-[2rem] border border-[#E8CED5] bg-[#FFFDFB] p-8 text-center space-y-5">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FDF0F3] text-[#A9506C]">
            <AlertTriangle className="h-6 w-6" aria-hidden="true" />
          </div>
          <h1 className="font-display text-2xl font-bold text-[#381F2E]">
            الاختبار غير مكتمل بعد
          </h1>
          <p className="text-sm leading-relaxed text-[#69495B]">
            للحصول على ملف اهتمامات دقيق، يجب الإجابة على جميع الأسئلة الثلاثين. تبقى لديكِ{' '}
            <strong className="tabular-nums">{missingQuestionIndices.length}</strong> أسئلة لم
            تكتمل (أولها السؤال رقم{' '}
            <strong className="tabular-nums">{missingQuestionIndices[0]}</strong>).
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                onJumpToQuestion((missingQuestionIndices[0] ?? 1) - 1);
                onNavigate('/quiz');
              }}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#A9506C] px-7 py-2.5 text-sm font-medium text-white hover:bg-[#913F59] cursor-pointer"
            >
              <span>الانتقال إلى السؤال الناقص</span>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:px-6">
      <div className="rounded-[2rem] border border-[#D8CBE7] bg-[#FFFDFB] p-7 sm:p-10 text-center space-y-6 shadow-[0_12px_40px_-24px_rgba(142,116,168,0.28)]">
        <div className="flex justify-center">
          <CharacterStage
            characterId="analyzing_fairy"
            variant="scene"
            eager={true}
            interactive={false}
            className="w-full max-w-[340px]"
          />
        </div>

        {!analysisError ? (
          <div className="space-y-4">
            <h1 className="font-display text-2xl font-bold text-[#381F2E]">
              جاري تحليل نتائجكِ...
            </h1>
            <p className="text-sm text-[#69495B]">
              تجمع جنية الزهور استجاباتكِ عبر الأنماط الستة (RIASEC) ونرتب التخصصات الأقرب لاهتماماتج.
            </p>
            <div
              className="mx-auto max-w-xs h-2.5 overflow-hidden rounded-full bg-[#EFE8F6]"
              role="status"
              aria-label="جاري التحليل"
            >
              <div
                className={`h-full rounded-full bg-[#8E74A8] transition-all duration-700 ${
                  isAnalyzing ? 'w-4/5' : 'w-2/3'
                }`}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4" role="alert">
            <h1 className="font-display text-xl font-bold text-[#381F2E]">
              تعذر التحليل عبر الخادم مؤقتاً
            </h1>
            <p className="text-sm leading-relaxed text-[#8B2945]">{analysisError}</p>
            <p className="text-xs text-[#69495B]">
              إجاباتج الثلاثون محفوظة بأمان على جهازج ولن تضيع.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={async () => {
                  const res = await onRunAnalysis(false);
                  if (res) onNavigate('/results');
                }}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#A9506C] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#913F59] cursor-pointer"
              >
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                <span>إعادة المحاولة</span>
              </button>
              <button
                type="button"
                onClick={async () => {
                  const res = await onRunAnalysis(true);
                  if (res) onNavigate('/results');
                }}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#E8CED5] bg-[#FBF1F3] px-6 py-2.5 text-sm font-medium text-[#381F2E] hover:bg-[#F4DCE2] cursor-pointer"
              >
                <span>عرض التحليل المحلي (تجريبي موثق)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
