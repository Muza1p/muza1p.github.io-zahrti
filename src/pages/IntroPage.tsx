import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, Info, RotateCcw } from 'lucide-react';
import { CoquetteRibbonBow } from '@/src/components/ornaments/BotanicalArt';
import { Zahrti3DStage } from '@/src/components/three/Zahrti3DStage';
import { MINI_IP_QUESTIONS } from '@/src/data/questions/miniIpQuestions';

interface IntroPageProps {
  onNavigate: (to: string) => void;
  answeredCount: number;
  onResetProgress: () => void;
}

const GUIDE_STEPS = [
  {
    id: 0,
    titleAr: '١. الاختبار يستكشف الاهتمامات فقط',
    shortAr: 'بلا نجاح أو رسوب',
    detailAr:
      'لا توجد إجابة صحيحة أو إجابة خاطئة. المهم هو شعوركِ الصادق تجاه كل نشاط كما لو كنتِ تجربينه للمرة الأولى.',
    accent: '#C04472',
  },
  {
    id: 1,
    titleAr: '٢. اختاري ما يعبر عن رغبتكِ الحقيقية',
    shortAr: 'بصوتكِ لا آراء الآخرين',
    detailAr:
      'لا تجيبي بناءً على رأي الآخرين أو المكانة الاجتماعية للتخصص أو صورته التقليدية؛ استمعي لفضولكِ الشخصي.',
    accent: '#7651B8',
  },
  {
    id: 2,
    titleAr: '٣. النتيجة دليل للاستكشاف وليست قراراً نهائياً',
    shortAr: 'نقطة بداية حوار',
    detailAr:
      'لا توجد نتيجة تحدد مستقبلكِ بشكل قطعي؛ استخدمي النتيجة كنقطة انطلاق لقراءة تفاصيل التخصصات والمقارنة بينها.',
    accent: '#C59F4E',
  },
];

export function IntroPage({
  onNavigate,
  answeredCount,
  onResetProgress,
}: IntroPageProps) {
  const hasSavedProgress = answeredCount > 0;
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="rounded-[2rem] border border-[#EAD3E0] bg-[#FFFCFA] p-6 sm:p-10 space-y-8 shadow-[0_14px_45px_-26px_rgba(118,81,184,0.22)]">
        <div className="grid items-center gap-8 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="md:col-span-6 text-center md:text-right space-y-3"
          >
            <div className="flex justify-center md:justify-start">
              <CoquetteRibbonBow className="w-16 h-9" />
            </div>
            <p className="text-xs font-semibold text-[#C04472]">
              قبل أن نبدأ الرحلة
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#351B38]">
              مقدمة تفاعلية قبل بدء الاختبار
            </h1>
            <p className="mx-auto max-w-xl text-sm sm:text-base leading-relaxed text-[#5F4163] md:mx-0">
              هذا الاختبار مساحة هادئة للتعرف على ما يثير فضولكِ المهني. تصفحي النقاط الثلاث أدناه
              لمعرفة كيف تجيبين بأريحية ووضوح.
            </p>
          </motion.div>

          <div className="md:col-span-6">
            <Zahrti3DStage
              mode="intro"
              heightClass="h-[240px] sm:h-[280px]"
              hintText="مجسم البوصلة والزهرة يرافق استعدادكِ للاختبار"
            />
          </div>
        </div>

        {/* Interactive 3-step guide explorer */}
        <section aria-label="نقاط أساسية قبل البدء" className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            {GUIDE_STEPS.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  aria-pressed={isSelected}
                  className={`rounded-2xl border p-4 text-right transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#C04472] bg-[#FDF0F5] shadow-xs'
                      : 'border-[#EAD3E0] bg-[#FFF8F3] hover:bg-[#FDF0F5]/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="text-xs font-bold"
                      style={{ color: step.accent }}
                    >
                      {step.shortAr}
                    </span>
                    <CheckCircle2
                      className="h-4 w-4 shrink-0"
                      style={{ color: isSelected ? '#C04472' : '#B49AE8' }}
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-1.5 font-display text-sm font-bold text-[#351B38]">
                    {step.titleAr}
                  </p>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              className="rounded-2xl border border-[#D8C9F2] bg-[#F4EFFB]/80 p-5 text-sm sm:text-base leading-relaxed text-[#351B38]"
            >
              {GUIDE_STEPS[activeStep].detailAr}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Honest scale & methodology notice */}
        <section className="rounded-2xl border border-[#EAD8AF] bg-[#FCF7EC] p-5 space-y-2.5 text-sm text-[#4F3553]">
          <div className="flex items-center gap-2 font-display font-bold text-[#351B38]">
            <Info className="h-4 w-4 text-[#C59F4E]" aria-hidden="true" />
            <span>تفاصيل المقياس والحفظ</span>
          </div>
          <p className="leading-relaxed">
            يتكون المقياس من <strong className="tabular-nums">{MINI_IP_QUESTIONS.length}</strong> سؤالاً
            مستنداً إلى قائمة <span dir="ltr">O*NET® Mini-IP</span> المترجمة والمكيفة للعربية.
            نحن لا نذكر مدة زمنية افتراضية غير مقاسة؛ تستغرق الإجابة ما يناسب وتيرتج الهادئة،
            ويمكنكِ الإيقاف والمتابعة لاحقاً لأن إجاباتج تُحفظ محلياً في متصفحكِ فقط.
          </p>
          <p className="text-xs text-[#5F4163]">
            ملاحظة شفافة: التعديلات والترجمة العربية مقدمة من مشروع زهرتي ولم تخضع بعد لدراسة تقنين
            علمي، ولم تعتمدها وزارة العمل الأمريكية.{' '}
            <a
              href="/terms"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/terms');
              }}
              className="font-semibold text-[#C04472] hover:underline"
            >
              التعديلات وإخلاء المسؤولية
            </a>
          </p>
        </section>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {hasSavedProgress ? (
            <>
              <button
                type="button"
                onClick={() => onNavigate('/quiz')}
                className="w-full sm:w-auto inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-gradient-to-l from-[#C04472] to-[#7651B8] px-8 py-3 text-base font-medium text-white shadow-sm hover:opacity-95 transition-opacity cursor-pointer"
              >
                <span>متابعة الاختبار ({answeredCount} من {MINI_IP_QUESTIONS.length})</span>
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => {
                  onResetProgress();
                  onNavigate('/quiz');
                }}
                className="w-full sm:w-auto inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full border border-[#EAD3E0] bg-[#FFFCFA] px-6 py-3 text-sm font-medium text-[#5F4163] hover:bg-[#FDF0F5] hover:text-[#351B38] transition-colors cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                <span>مسح التقدم والبدء من جديد</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => onNavigate('/quiz')}
              className="w-full sm:w-auto inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-gradient-to-l from-[#C04472] to-[#7651B8] px-10 py-3 text-base font-medium text-white shadow-sm hover:opacity-95 transition-opacity cursor-pointer"
            >
              <span>ابدئي الاختبار الآن</span>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
