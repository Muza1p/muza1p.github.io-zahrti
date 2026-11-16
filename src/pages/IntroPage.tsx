import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, RotateCcw, ShieldCheck, UserCheck } from 'lucide-react';
import { EditorialCrest } from '@/src/components/ornaments/BotanicalArt';
import { Zahrti3DStage } from '@/src/components/three/Zahrti3DStage';
import { PersonId } from '@/src/types';

interface IntroPageProps {
  onNavigate: (to: string) => void;
  activePersonId: PersonId;
  rawPerson1Name: string;
  rawPerson2Name: string;
  person1Name: string;
  person2Name: string;
  person1AnsweredCount: number;
  person2AnsweredCount: number;
  person1Completed: boolean;
  person2Completed: boolean;
  onSaveNames: (p1Name: string, p2Name: string) => void;
  onSelectPerson: (personId: PersonId) => void;
  onStartNewAssessment: (personId: PersonId) => void;
}

export function IntroPage({
  onNavigate,
  activePersonId,
  rawPerson1Name,
  rawPerson2Name,
  person1Name,
  person2Name,
  person1AnsweredCount,
  person2AnsweredCount,
  person1Completed,
  person2Completed,
  onSaveNames,
  onSelectPerson,
  onStartNewAssessment,
}: IntroPageProps) {
  const [name1Input, setName1Input] = useState(rawPerson1Name);
  const [name2Input, setName2Input] = useState(rawPerson2Name);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSaveNames = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveNames(name1Input, name2Input);
    setSavedNotice(true);
    window.setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleEnterQuiz = (personId: PersonId, startFresh: boolean) => {
    onSaveNames(name1Input, name2Input);
    onSelectPerson(personId);
    if (startFresh) {
      onStartNewAssessment(personId);
    }
    onNavigate('/quiz');
  };

  const activeAnswered = activePersonId === 'person1' ? person1AnsweredCount : person2AnsweredCount;
  const activeCompleted = activePersonId === 'person1' ? person1Completed : person2Completed;
  const activeDisplayName = activePersonId === 'person1' ? person1Name : person2Name;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 space-y-10">
      {/* Header + Name Setup */}
      <section className="rounded-3xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 sm:p-10 space-y-8">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-4">
            <EditorialCrest className="w-12 h-7" />
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#351B38]">
              إعداد الأسماء وبدء رحلة اختبار زهرتي
            </h1>
            <p className="text-sm sm:text-base leading-relaxed text-[#5F4562]">
              يُحفظ ملف كل شخص بصورة مستقلة تماماً على هذا الجهاز. أدخلا الاسم الأول لكل طرف
              ليظهر بصورة لطيفة ومخصصة في الاختبار والنتائج والتوافق وعالمنا، دون فرض أسماء ثابتة.
            </p>

            {/* Dynamic Two-Person Name Form */}
            <form onSubmit={handleSaveNames} className="space-y-4 pt-2">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="person1-name-input"
                    className="block text-xs font-semibold text-[#351B38]"
                  >
                    الاسم الأول — الطرف الأول
                  </label>
                  <input
                    id="person1-name-input"
                    type="text"
                    maxLength={40}
                    value={name1Input}
                    onChange={(e) => setName1Input(e.target.value)}
                    placeholder="اكتبي الاسم الأول هنا"
                    className="w-full min-h-[44px] rounded-xl border border-[#E9D8D1] bg-[#F9F3EC] px-4 py-2.5 text-sm text-[#351B38] placeholder:text-[#6F5472]/60 focus:border-[#762D50] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="person2-name-input"
                    className="block text-xs font-semibold text-[#351B38]"
                  >
                    الاسم الأول — الطرف الثاني
                  </label>
                  <input
                    id="person2-name-input"
                    type="text"
                    maxLength={40}
                    value={name2Input}
                    onChange={(e) => setName2Input(e.target.value)}
                    placeholder="اكتب/اكتبي الاسم الأول هنا"
                    className="w-full min-h-[44px] rounded-xl border border-[#E9D8D1] bg-[#F9F3EC] px-4 py-2.5 text-sm text-[#351B38] placeholder:text-[#6F5472]/60 focus:border-[#762D50] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-[#351B38] bg-[#351B38] px-5 py-2 text-xs sm:text-sm font-medium text-[#F9F3EC] hover:bg-[#4B2B4E] cursor-pointer"
                >
                  <span>حفظ الأسماء</span>
                </button>
                {savedNotice && (
                  <span role="status" className="inline-flex items-center gap-1 text-xs font-medium text-[#762D50]">
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    <span>تم تحديث الأسماء محلياً</span>
                  </span>
                )}
              </div>
            </form>
          </div>

          <div className="lg:col-span-5">
            <Zahrti3DStage
              mode="intro"
              bloomProgress={0.62}
              heightClass="h-[250px] sm:h-[290px]"
              hintText="مرحلة التحضير: تتهيأ بتلات الزهرة لاستقبال اختياراتكما"
            />
          </div>
        </div>
      </section>

      {/* Choose Active Profile */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="font-display text-2xl font-bold text-[#351B38]">
            اختاري المسار الذي تودين فتحه الآن
          </h2>
          <p className="text-sm text-[#5F4562]">
            عند بدء اختبار جديد لأي طرف، تبقى نتائجه السابقة محفوظة في سجله الخاص ولا تُحذف تلقائياً.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Person 1 Card */}
          <div
            className={`rounded-2xl border p-6 space-y-4 transition-colors ${
              activePersonId === 'person1'
                ? 'border-[#762D50] bg-[#FFFDF9]'
                : 'border-[#E9D8D1] bg-[#F9F3EC]/60'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-[#762D50]" aria-hidden="true" />
                <h3 className="font-display text-xl font-bold text-[#351B38]">
                  {name1Input.trim() || 'الشخص الأول'}
                </h3>
              </div>
              <span className="text-xs font-semibold text-[#9F7E44] tabular-nums">
                {person1Completed
                  ? 'مكتمل ✓'
                  : person1AnsweredCount > 0
                  ? `${person1AnsweredCount}/30`
                  : 'جاهز للبدء'}
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => handleEnterQuiz('person1', false)}
                className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-[#762D50] px-5 py-2 text-sm font-medium text-[#F9F3EC] hover:bg-[#5D223E] cursor-pointer"
              >
                <span>
                  {person1AnsweredCount > 0 && person1AnsweredCount < 30
                    ? 'متابعة الاختبار غير المكتمل'
                    : person1Completed
                    ? 'استعراض الأسئلة'
                    : 'بدء الاختبار'}
                </span>
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>

              {person1Completed && (
                <button
                  type="button"
                  onClick={() => {
                    onSaveNames(name1Input, name2Input);
                    onSelectPerson('person1');
                    onNavigate('/results');
                  }}
                  className="inline-flex min-h-[42px] items-center rounded-full border border-[#E9D8D1] bg-[#F9F3EC] px-4 py-2 text-sm font-medium text-[#351B38] hover:bg-[#EFE2DC] cursor-pointer"
                >
                  عرض النتيجة
                </button>
              )}

              {(person1AnsweredCount > 0 || person1Completed) && (
                <button
                  type="button"
                  onClick={() => handleEnterQuiz('person1', true)}
                  className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full border border-[#E9D8D1] px-4 py-2 text-xs font-medium text-[#5F4562] hover:bg-[#F4EAE3] cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>اختبار جديد (مع حفظ السجل)</span>
                </button>
              )}
            </div>
          </div>

          {/* Person 2 Card */}
          <div
            className={`rounded-2xl border p-6 space-y-4 transition-colors ${
              activePersonId === 'person2'
                ? 'border-[#762D50] bg-[#FFFDF9]'
                : 'border-[#E9D8D1] bg-[#F9F3EC]/60'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-[#C47C91]" aria-hidden="true" />
                <h3 className="font-display text-xl font-bold text-[#351B38]">
                  {name2Input.trim() || 'الشخص الثاني'}
                </h3>
              </div>
              <span className="text-xs font-semibold text-[#9F7E44] tabular-nums">
                {person2Completed
                  ? 'مكتمل ✓'
                  : person2AnsweredCount > 0
                  ? `${person2AnsweredCount}/30`
                  : 'جاهز للبدء'}
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => handleEnterQuiz('person2', false)}
                className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-[#351B38] px-5 py-2 text-sm font-medium text-[#F9F3EC] hover:bg-[#4B2B4E] cursor-pointer"
              >
                <span>
                  {person2AnsweredCount > 0 && person2AnsweredCount < 30
                    ? 'متابعة الاختبار غير المكتمل'
                    : person2Completed
                    ? 'استعراض الأسئلة'
                    : 'بدء الاختبار'}
                </span>
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>

              {person2Completed && (
                <button
                  type="button"
                  onClick={() => {
                    onSaveNames(name1Input, name2Input);
                    onSelectPerson('person2');
                    onNavigate('/results');
                  }}
                  className="inline-flex min-h-[42px] items-center rounded-full border border-[#E9D8D1] bg-[#F9F3EC] px-4 py-2 text-sm font-medium text-[#351B38] hover:bg-[#EFE2DC] cursor-pointer"
                >
                  عرض النتيجة
                </button>
              )}

              {(person2AnsweredCount > 0 || person2Completed) && (
                <button
                  type="button"
                  onClick={() => handleEnterQuiz('person2', true)}
                  className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full border border-[#E9D8D1] px-4 py-2 text-xs font-medium text-[#5F4562] hover:bg-[#F4EAE3] cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>اختبار جديد (مع حفظ السجل)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Assessment Guidance */}
      <section className="rounded-2xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 sm:p-8 grid gap-6 md:grid-cols-3 text-sm">
        <div className="space-y-1.5">
          <h3 className="font-display font-bold text-base text-[#351B38]">
            أجبي عن شغفكِ لا عن الخبرة
          </h3>
          <p className="leading-relaxed text-[#5F4562]">
            اختاري بناءً على شعورج تجاه النشاط نفسه لو أتيح لكِ تعلمه، ولا تقلقي من عدم امتلاك المهارة اليوم.
          </p>
        </div>
        <div className="space-y-1.5">
          <h3 className="font-display font-bold text-base text-[#351B38]">
            تجنبي حساب الراتب أو السهولة
          </h3>
          <p className="leading-relaxed text-[#5F4562]">
            مقياس الاهتمامات يقيس نوع الأنشطة التي تمنحج فضولاً وطاقة، لتكشف أنماطكِ الحقيقية بوضوح.
          </p>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 font-display font-bold text-base text-[#351B38]">
            <ShieldCheck className="h-4 w-4 text-[#762D50]" aria-hidden="true" />
            <span>الخصوصية والفصل التام</span>
          </div>
          <p className="leading-relaxed text-[#5F4562]">
            الجلسة النشطة الآن لـ <strong>{activeDisplayName}</strong> ({activeAnswered}/30). لا تظهر إجابات أي طرف في شاشة الطرف الآخر.
          </p>
        </div>
      </section>
    </div>
  );
}
