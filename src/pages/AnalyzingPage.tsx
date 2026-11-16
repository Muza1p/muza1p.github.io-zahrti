import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';
import { Zahrti3DStage } from '@/src/components/three/Zahrti3DStage';
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
    }, 950);

    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComplete]);

  // Guard: never display empty/incomplete analysis as success
  if (!isComplete) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12 sm:px-6">
        <div className="rounded-[2rem] border border-[#EAD3E0] bg-[#FFFCFA] p-8 text-center space-y-5">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FDF0F5] text-[#C04472]">
            <AlertTriangle className="h-6 w-6" aria-hidden="true" />
          </div>
          <h1 className="font-display text-2xl font-bold text-[#351B38]">
            الاختبار غير مكتمل بعد
          </h1>
          <p className="text-sm leading-relaxed text-[#5F4163]">
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
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-gradient-to-l from-[#C04472] to-[#7651B8] px-7 py-2.5 text-sm font-medium text-white hover:opacity-95 cursor-pointer"
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
      <div className="rounded-[2rem] border border-[#D8C9F2] bg-[#FFFCFA] p-7 sm:p-10 text-center space-y-6 shadow-[0_16px_48px_-24px_rgba(118,81,184,0.28)]">
        <Zahrti3DStage
          mode="analyzing"
          heightClass="h-[260px] sm:h-[300px]"
          hintText="تتجمع الإجابات عبر الأنماط الستة لتشكيل خريطتكِ"
        />

        {!analysisError ? (
          <div className="space-y-4">
            <h1 className="font-display text-2xl font-bold text-[#351B38]">
              جاري تحليل نتائجكِ...
            </h1>
            <p className="text-sm text-[#5F4163]">
              نرتب الآن درجاتكِ الفعلية عبر أنماط الاهتمام الستة (RIASEC) ونطابقها مع التخصصات دون
              أي نتائج افتراضية.
            </p>
            <div
              className="mx-auto max-w-xs h-2.5 overflow-hidden rounded-full bg-[#EFE8FA]"
              role="status"
              aria-label="جاري التحليل"
            >
              <motion.div
                initial={{ width: '25%' }}
                animate={{ width: isAnalyzing ? '88%' : '68%' }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full bg-gradient-to-l from-[#C04472] to-[#7651B8]"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4" role="alert">
            <h1 className="font-display text-xl font-bold text-[#351B38]">
              تعذر التحليل عبر الخادم مؤقتاً
            </h1>
            <p className="text-sm leading-relaxed text-[#9B2953]">{analysisError}</p>
            <p className="text-xs text-[#5F4163]">
              إجاباتج الثلاثون محفوظة بأمان على جهازج ولن تضيع.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={async () => {
                  const res = await onRunAnalysis(false);
                  if (res) onNavigate('/results');
                }}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#C04472] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#A6345F] cursor-pointer"
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
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#EAD3E0] bg-[#FDF0F5] px-6 py-2.5 text-sm font-medium text-[#351B38] hover:bg-[#FADCE8] cursor-pointer"
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
