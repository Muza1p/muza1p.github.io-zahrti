import React, { useEffect, useRef } from 'react';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { Zahrti3DStage } from '@/src/components/three/Zahrti3DStage';
import { AssessmentResult } from '@/src/types';

interface AnalyzingPageProps {
  activePersonName: string;
  isComplete: boolean;
  missingQuestionIndices: number[];
  isAnalyzing: boolean;
  analysisError: string | null;
  onRunAnalysis: (forceLocalFallback?: boolean) => Promise<AssessmentResult | null>;
  onJumpToQuestion: (index: number) => void;
  onNavigate: (to: string) => void;
}

export function AnalyzingPage({
  activePersonName,
  isComplete,
  missingQuestionIndices,
  isAnalyzing,
  analysisError,
  onRunAnalysis,
  onJumpToQuestion,
  onNavigate,
}: AnalyzingPageProps) {
  const startedRef = useRef(false);

  useEffect(() => {
    if (!isComplete || startedRef.current) return;
    startedRef.current = true;
    const timer = window.setTimeout(async () => {
      const res = await onRunAnalysis(false);
      if (res) {
        onNavigate('/results');
      }
    }, 650);
    return () => window.clearTimeout(timer);
  }, [isComplete, onNavigate, onRunAnalysis]);

  if (!isComplete) {
    const firstMissing = missingQuestionIndices[0] ?? 1;
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <div className="rounded-3xl border border-[#E9D8D1] bg-[#FFFDF9] p-8 text-center space-y-5">
          <h1 className="font-display text-2xl font-bold text-[#351B38]">
            اختبار {activePersonName} غير مكتمل بعد
          </h1>
          <p className="text-sm leading-relaxed text-[#5F4562] tabular-nums">
            لا تزال هناك {missingQuestionIndices.length} فقرات بحاجة للإجابة قبل عرض الخريطة
            التخصصية.
          </p>
          <button
            type="button"
            onClick={() => {
              onJumpToQuestion(firstMissing - 1);
              onNavigate('/quiz');
            }}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#762D50] px-6 py-2.5 text-sm font-medium text-[#F9F3EC] hover:bg-[#5D223E] cursor-pointer"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
            <span>العودة للفقرة {firstMissing}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="rounded-3xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 sm:p-10 text-center space-y-6">
        <Zahrti3DStage
          mode="analyzing"
          darkSurface
          heightClass="h-[250px] sm:h-[290px]"
        />
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-wider text-[#9F7E44]">
            جاري الحساب وفق معادلة <span dir="ltr">Mini-IP</span>
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#351B38]">
            نرسم الآن خريطة اهتمامات {activePersonName}...
          </h1>
          <p className="text-sm text-[#5F4562]">
            {isAnalyzing
              ? 'نحسب توازن الأبعاد الستة ونرتب التخصصات الأقرب لاهتماماتكِ.'
              : 'لحظات وتظهر النتيجة التفصيلية.'}
          </p>
        </div>

        {analysisError && (
          <div className="rounded-2xl border border-[#762D50]/30 bg-[#F9F3EC] p-4 text-sm text-[#762D50] space-y-3">
            <div className="flex items-center justify-center gap-2 font-semibold">
              <AlertCircle className="h-4 w-4" aria-hidden="true" />
              <span>{analysisError}</span>
            </div>
            <button
              type="button"
              onClick={async () => {
                const res = await onRunAnalysis(true);
                if (res) onNavigate('/results');
              }}
              className="rounded-full bg-[#762D50] px-5 py-2 text-xs font-medium text-[#F9F3EC] cursor-pointer"
            >
              عرض النتيجة بالتحليل المحلي الموثق
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
