import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, RotateCcw, ShieldCheck } from 'lucide-react';
import { EditorialCrest } from '@/src/components/ornaments/BotanicalArt';
import { Zahrti3DStage } from '@/src/components/three/Zahrti3DStage';

interface IntroPageProps {
  onNavigate: (to: string) => void;
  personalName: string;
  answeredCount: number;
  isCompleted: boolean;
  onSavePersonalName: (name: string) => void;
  onStartNewAssessment: () => void;
}

export function IntroPage({
  onNavigate,
  personalName,
  answeredCount,
  isCompleted,
  onSavePersonalName,
  onStartNewAssessment,
}: IntroPageProps) {
  const [nameInput, setNameInput] = useState(personalName);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    onSavePersonalName(nameInput);
    setSavedNotice(true);
    window.setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleEnterQuiz = (startFresh: boolean) => {
    if (nameInput.trim() !== personalName.trim()) {
      onSavePersonalName(nameInput);
    }
    if (startFresh) {
      onStartNewAssessment();
    }
    onNavigate('/quiz');
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 space-y-10">
      <section className="rounded-3xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 sm:p-10 space-y-8">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-4">
            <EditorialCrest className="w-12 h-7" />
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#351B38]">
              مقياس الميول المهنية والتخصصات (<span dir="ltr">O*NET Mini-IP</span>)
            </h1>
            <p className="text-sm sm:text-base leading-relaxed text-[#5F4562]">
              استكشفي اهتماماتكِ المهنية وفق أنماط هولاند الستة (<span dir="ltr">RIASEC</span>) في
              30 عبارة، مع مطابقة حسابية شفافة مع 36 تخصصاً جامعياً موثقاً. يمكنكِ إضافة اسمكِ
              اختيارياً ليظهر في تقريركِ الشخصي.
            </p>

            <form onSubmit={handleSaveName} className="space-y-4 pt-2">
              <div className="max-w-sm space-y-1.5">
                <label
                  htmlFor="personal-name-input"
                  className="block text-xs font-semibold text-[#351B38]"
                >
                  اسمكِ المفضل (اختياري)
                </label>
                <input
                  id="personal-name-input"
                  type="text"
                  maxLength={40}
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="اكتبي اسمكِ ليظهر في التقارير"
                  className="w-full min-h-[44px] rounded-xl border border-[#E9D8D1] bg-[#F9F3EC] px-4 py-2.5 text-sm text-[#351B38] placeholder:text-[#6F5472]/60 focus:border-[#762D50] focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-[#351B38] bg-[#351B38] px-5 py-2 text-xs sm:text-sm font-medium text-[#F9F3EC] hover:bg-[#4B2B4E] cursor-pointer"
                >
                  <span>حفظ الاسم</span>
                </button>
                {savedNotice && (
                  <span role="status" className="inline-flex items-center gap-1 text-xs font-medium text-[#762D50]">
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    <span>تم حفظ الاسم محلياً</span>
                  </span>
                )}
              </div>
            </form>

            <div className="flex flex-wrap gap-3 pt-4 border-t border-[#E9D8D1]">
              <button
                type="button"
                onClick={() => handleEnterQuiz(false)}
                className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#762D50] px-7 py-2.5 text-sm sm:text-base font-medium text-[#F9F3EC] hover:bg-[#5D223E] cursor-pointer"
              >
                <span>
                  {answeredCount > 0 && answeredCount < 30
                    ? 'متابعة الجلسة المحفوظة'
                    : isCompleted
                    ? 'استعراض الأسئلة'
                    : 'بدء اختبار الميول المهنية'}
                </span>
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>

              {isCompleted && (
                <button
                  type="button"
                  onClick={() => onNavigate('/results')}
                  className="inline-flex min-h-[46px] items-center rounded-full border border-[#351B38] bg-[#FFFDF9] px-5 py-2.5 text-sm font-medium text-[#351B38] hover:bg-[#351B38] hover:text-[#F9F3EC] cursor-pointer"
                >
                  عرض نتيجتكِ والتخصصات
                </button>
              )}

              {(answeredCount > 0 || isCompleted) && (
                <button
                  type="button"
                  onClick={() => handleEnterQuiz(true)}
                  className="inline-flex min-h-[46px] items-center gap-1.5 rounded-full border border-[#E9D8D1] px-4 py-2.5 text-xs font-medium text-[#5F4562] hover:bg-[#F4EAE3] cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>جلسة جديدة (مع بقاء السجل)</span>
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
            <Zahrti3DStage
              mode="intro"
              bloomProgress={0.62}
              heightClass="h-[250px] sm:h-[290px]"
              hintText="مرحلة التحضير: تتهيأ بتلات الزهرة لاستقبال اختياراتكِ"
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 sm:p-8 grid gap-6 md:grid-cols-3 text-sm">
        <div className="space-y-1.5">
          <h3 className="font-display font-bold text-base text-[#351B38]">
            أجيبي عن شغفكِ لا عن الخبرة
          </h3>
          <p className="leading-relaxed text-[#5F4562]">
            اختاري بناءً على شعوركِ تجاه النشاط نفسه لو أُتيح لكِ تعلمه، ولا تقلقي من عدم امتلاك
            المهارة اليوم.
          </p>
        </div>
        <div className="space-y-1.5">
          <h3 className="font-display font-bold text-base text-[#351B38]">
            تجنبي حساب الراتب أو السهولة
          </h3>
          <p className="leading-relaxed text-[#5F4562]">
            مقياس الاهتمامات يقيس نوع الأنشطة التي تمنحكِ فضولاً وطاقة، لتظهر أنماطكِ الحقيقية
            بوضوح.
          </p>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 font-display font-bold text-base text-[#351B38]">
            <ShieldCheck className="h-4 w-4 text-[#762D50]" aria-hidden="true" />
            <span>خصوصية فردية كاملة</span>
          </div>
          <p className="leading-relaxed text-[#5F4562]">
            البيانات محفوظة حصراً في متصفح هذا الجهاز ولا تتم مشاركتها مع أي طرف خارجي.
          </p>
        </div>
      </section>
    </div>
  );
}
