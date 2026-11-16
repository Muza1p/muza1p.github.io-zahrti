import React from 'react';
import { ArrowLeft, CheckCircle2, Info, RotateCcw } from 'lucide-react';
import { CharacterStage } from '@/src/components/characters/CharacterStage';
import { CoquetteRibbonBow } from '@/src/components/ornaments/BotanicalArt';
import { MINI_IP_QUESTIONS } from '@/src/data/questions/miniIpQuestions';

interface IntroPageProps {
  onNavigate: (to: string) => void;
  answeredCount: number;
  onResetProgress: () => void;
}

export function IntroPage({
  onNavigate,
  answeredCount,
  onResetProgress,
}: IntroPageProps) {
  const hasSavedProgress = answeredCount > 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="rounded-[2rem] border border-[#E8CED5] bg-[#FFFDFB] p-6 sm:p-10 space-y-8 shadow-[0_10px_40px_-24px_rgba(169,80,108,0.18)]">
        <div className="grid items-center gap-6 md:grid-cols-12">
          <div className="md:col-span-7 text-center md:text-right space-y-3">
            <div className="flex justify-center md:justify-start">
              <CoquetteRibbonBow className="w-16 h-9" />
            </div>
            <p className="text-xs font-medium text-[#A9506C]">
              قبل أن نبدأ الرحلة
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#381F2E]">
              إرشادات مهمة قبل بدء الاختبار
            </h1>
            <p className="mx-auto max-w-xl text-sm sm:text-base leading-relaxed text-[#69495B] md:mx-0">
              هذا الاختبار مساحة هادئة للتعرف على ما يثير فضولكِ المهني، بدون درجات نجاح أو رسوب.
              أرنوبتنا المُرشدة جهّزت الدفتر لمرافقتج بالخطوات.
            </p>
          </div>

          <div className="md:col-span-5 flex justify-center">
            <CharacterStage
              characterId="intro_bunny"
              variant="companion"
              eager={true}
              showCaption={true}
              className="w-full max-w-[260px]"
            />
          </div>
        </div>

        {/* Key guidance points */}
        <section aria-label="نقاط أساسية قبل البدء" className="space-y-4">
          <h2 className="font-display text-lg font-bold text-[#381F2E]">
            كيف تجيبين بأفضل صورة؟
          </h2>
          <ul className="space-y-3 text-sm sm:text-base text-[#381F2E]">
            <li className="flex items-start gap-3 rounded-2xl border border-[#F0DDE2] bg-[#FDF9F6] p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#A9506C]" aria-hidden="true" />
              <div>
                <p className="font-semibold">الاختبار يستكشف الاهتمامات فقط</p>
                <p className="text-sm text-[#69495B]">
                  لا توجد إجابة صحيحة أو إجابة خاطئة. المهم هو شعوركِ الصادق تجاه كل نشاط.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-[#F0DDE2] bg-[#FDF9F6] p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#A9506C]" aria-hidden="true" />
              <div>
                <p className="font-semibold">اختاري ما يعبر عن رغبتكِ الحقيقية</p>
                <p className="text-sm text-[#69495B]">
                  لا تجيبي بناءً على رأي الآخرين، ولا بناءً على المكانة الاجتماعية للتخصص أو صورته التقليدية.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-[#F0DDE2] bg-[#FDF9F6] p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#A9506C]" aria-hidden="true" />
              <div>
                <p className="font-semibold">النتيجة دليل للاستكشاف وليست قراراً نهائياً</p>
                <p className="text-sm text-[#69495B]">
                  لا توجد نتيجة تحدد مستقبلكِ بشكل قطعي؛ استخدمي النتيجة كنقطة انطلاق لقراءة التخصصات والمقارنة بينها.
                </p>
              </div>
            </li>
          </ul>
        </section>

        {/* Honest scale & methodology notice */}
        <section className="rounded-2xl border border-[#D8CBE7] bg-[#F8F4FB] p-5 space-y-2.5 text-sm text-[#573E4E]">
          <div className="flex items-center gap-2 font-display font-bold text-[#381F2E]">
            <Info className="h-4 w-4 text-[#8E74A8]" aria-hidden="true" />
            <span>تفاصيل المقياس والحفظ</span>
          </div>
          <p className="leading-relaxed">
            يتكون المقياس من <strong className="tabular-nums">{MINI_IP_QUESTIONS.length}</strong> سؤالاً
            مستنداً إلى قائمة <span dir="ltr">O*NET® Mini-IP</span> المترجمة والمكيفة للعربية.
            نحن لا نذكر مدة زمنية افتراضية غير مقاسة؛ تستغرق الإجابة ما يناسب وتيرتج الهادئة،
            ويمكنكِ الإيقاف والمتابعة لاحقاً لأن إجاباتج تُحفظ محلياً في متصفحكِ فقط.
          </p>
          <p className="text-xs text-[#69495B]">
            ملاحظة شفافة: التعديلات والترجمة العربية مقدمة من مشروع زهرتي ولم تخضع بعد لدراسة تقنين
            علمي، ولم تعتمدها وزارة العمل الأمريكية.{' '}
            <a
              href="/terms"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/terms');
              }}
              className="font-semibold text-[#A9506C] hover:underline"
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
                className="w-full sm:w-auto inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-[#A9506C] px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-[#913F59] transition-colors cursor-pointer"
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
                className="w-full sm:w-auto inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full border border-[#E8CED5] bg-[#FFFDFB] px-6 py-3 text-sm font-medium text-[#69495B] hover:bg-[#FBF1F3] hover:text-[#381F2E] transition-colors cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                <span>مسح التقدم والبدء من جديد</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => onNavigate('/quiz')}
              className="w-full sm:w-auto inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-[#A9506C] px-10 py-3 text-base font-medium text-white shadow-sm hover:bg-[#913F59] transition-colors cursor-pointer"
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
