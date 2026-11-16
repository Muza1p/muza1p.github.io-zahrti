import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Lock,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import { EditorialCrest, FloralDivider } from '@/src/components/ornaments/BotanicalArt';
import { RIASEC_PROFILES } from '@/src/data/interests/riasecProfiles';
import { AssessmentResult, CompatibilityReport, OurWorldState } from '@/src/types';

interface OurWorldPageProps {
  person1Name: string;
  person2Name: string;
  p1Result: AssessmentResult | null;
  p2Result: AssessmentResult | null;
  lockedReason: string | null;
  report: CompatibilityReport | null;
  ourWorld: OurWorldState;
  onUpdateNote: (note: string) => void;
  onNavigate: (to: string) => void;
}

export function OurWorldPage({
  person1Name,
  person2Name,
  p1Result,
  p2Result,
  lockedReason,
  report,
  ourWorld,
  onUpdateNote,
  onNavigate,
}: OurWorldPageProps) {
  const [noteDraft, setNoteDraft] = useState(ourWorld.sharedNote);
  const [savedFlag, setSavedFlag] = useState(false);
  const [recalculatedAt, setRecalculatedAt] = useState<string | null>(null);

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateNote(noteDraft);
    setSavedFlag(true);
    window.setTimeout(() => setSavedFlag(false), 3000);
  };

  if (lockedReason !== null || !report || !p1Result || !p2Result) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="rounded-3xl border border-[#E9D8D1] bg-[#FFFDF9] p-8 sm:p-12 text-center space-y-5">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#C6A56B]/45 bg-[#F9F3EC] text-[#762D50]">
            <Lock className="h-6 w-6" aria-hidden="true" />
          </div>
          <p className="text-xs font-semibold text-[#9F7E44]">عالمنا — مساحة التوثيق المشتركة</p>
          <h1 className="font-display text-3xl font-bold text-[#351B38]">
            تكتمل صفحة «عالمنا» عند انتهاء الطرفين
          </h1>
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-[#5F4562]">
            {lockedReason ||
              'بمجرد إكمال الطرفين لاختبارهما الشخصي، تجمع هذه المساحة خلاصة شخصيتيكما، ونقاط التوافق، ورسالة خاصة بكما.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('/intro')}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#762D50] px-6 py-2.5 text-sm font-medium text-[#F9F3EC] hover:bg-[#5D223E] cursor-pointer"
            >
              <span>الانتقال إلى صفحة البدء</span>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 space-y-10">
      {/* Keepsake Monograph Cover */}
      <header className="rounded-3xl bg-[#351B38] text-[#F9F3EC] p-8 sm:p-12 text-center space-y-4 border border-[#C6A56B]/30">
        <div className="flex justify-center">
          <EditorialCrest className="w-16 h-9" />
        </div>
        <p className="text-xs font-semibold tracking-widest text-[#C6A56B]">
          OUR WORLD · عالمنا
        </p>
        <h1 className="font-display text-3xl sm:text-5xl font-bold">
          {person1Name} <span className="text-[#C6A56B] mx-2">&amp;</span> {person2Name}
        </h1>
        <p className="mx-auto max-w-xl text-sm sm:text-base leading-relaxed text-[#E9D8D1]/90">
          مساحة هادئة تجمع خلاصة لقائكما الفكري والعملي ونقاط التوافق المستخرجة من اختبار زهرتي،
          بخصوصية كاملة ودون كشف تفاصيل الإجابات الفردية.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-6 text-xs text-[#E9D8D1]/80 tabular-nums">
          <span>
            تاريخ تقييم {person1Name}:{' '}
            {new Date(p1Result.calculatedAtIso).toLocaleDateString('ar-IQ')}
          </span>
          <span>
            تاريخ تقييم {person2Name}:{' '}
            {new Date(p2Result.calculatedAtIso).toLocaleDateString('ar-IQ')}
          </span>
        </div>
      </header>

      {/* Summary Harmony Ribbon */}
      <section className="rounded-2xl border border-[#C6A56B]/50 bg-[#FFFDF9] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-[#9F7E44]">خلاصة التلاقي</p>
          <h2 className="font-display text-2xl font-bold text-[#351B38]">
            مؤشر التوافق المحسوب: <span className="text-[#762D50] tabular-nums">{report.harmonyIndex}%</span>
          </h2>
          <p className="text-sm text-[#5F4562]">
            {recalculatedAt
              ? `تم تحديث القراءة وفق أحدث اختبارين (${recalculatedAt}).`
              : 'مبنية على أحدث نتائج مكتملة لكلا الطرفين.'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setRecalculatedAt(new Date().toLocaleTimeString('ar-IQ'))}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-[#E9D8D1] bg-[#F9F3EC] px-4 py-2 text-xs font-medium text-[#351B38] hover:border-[#762D50] cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5 text-[#762D50]" aria-hidden="true" />
            <span>تحديث قراءة التوافق</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/compatibility')}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-[#351B38] px-4 py-2 text-xs font-medium text-[#F9F3EC] hover:bg-[#4B2B4E] cursor-pointer"
          >
            <span>التفاصيل الرياضية الكاملة</span>
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* Dual Profiles Summary (Zero Raw Item Answers Exposed) */}
      <section className="grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 space-y-3">
          <div className="flex items-center justify-between border-b border-[#E9D8D1] pb-2.5">
            <h2 className="font-display text-xl font-bold text-[#351B38]">{person1Name}</h2>
            <span className="text-xs font-semibold text-[#762D50]" dir="ltr">
              {p1Result.hollandCode}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-[#5F4562]">
            {report.personalitySummaryPerson1Ar}
          </p>
          <p className="text-xs text-[#6F5472]">
            أبرز الميول:{' '}
            {p1Result.topThreeCodes.map((c) => RIASEC_PROFILES[c].nameAr.replace('النمط ', '')).join(' · ')}
          </p>
        </article>

        <article className="rounded-2xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 space-y-3">
          <div className="flex items-center justify-between border-b border-[#E9D8D1] pb-2.5">
            <h2 className="font-display text-xl font-bold text-[#351B38]">{person2Name}</h2>
            <span className="text-xs font-semibold text-[#762D50]" dir="ltr">
              {p2Result.hollandCode}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-[#5F4562]">
            {report.personalitySummaryPerson2Ar}
          </p>
          <p className="text-xs text-[#6F5472]">
            أبرز الميول:{' '}
            {p2Result.topThreeCodes.map((c) => RIASEC_PROFILES[c].nameAr.replace('النمط ', '')).join(' · ')}
          </p>
        </article>
      </section>

      {/* Shared Strengths & Distinct Contributions */}
      <section className="rounded-2xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 sm:p-8 grid gap-6 md:grid-cols-2 text-sm">
        <div className="space-y-2.5">
          <h3 className="font-display text-lg font-bold text-[#762D50]">ما يجمعكما بوضوح</h3>
          <ul className="space-y-2 text-[#5F4562]">
            {report.sharedStrengths.map((s) => (
              <li key={s.code}>
                <strong className="text-[#351B38]">{s.nameAr}:</strong> {s.noteAr}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-2.5">
          <h3 className="font-display text-lg font-bold text-[#351B38]">ما يضيفه كل منكما للآخر</h3>
          {report.complementaryDifferences.length > 0 ? (
            <ul className="space-y-2 text-[#5F4562]">
              {report.complementaryDifferences.map((d) => (
                <li key={d.code}>
                  <strong className="text-[#351B38]">{d.nameAr}:</strong> {d.noteAr}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[#5F4562]">
              اهتماماتكما متوازنة ومتقاربة في شدتها عبر أغلب المحاور.
            </p>
          )}
        </div>
      </section>

      <FloralDivider />

      {/* Shared Keepsake Note */}
      <section className="rounded-3xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 sm:p-8 space-y-4">
        <div className="space-y-1">
          <h2 className="font-display text-xl font-bold text-[#351B38]">
            ملاحظة أو رسالة مشتركة في عالمنا
          </h2>
          <p className="text-xs text-[#6F5472]">
            مساحة اختيارية لتدوين ذكرى، هدف مشترك، أو جملة تبقى محفوظة محلياً في هذا المتصفح فقط.
          </p>
        </div>

        <form onSubmit={handleSaveNote} className="space-y-3">
          <label htmlFor="our-world-note" className="sr-only">
            الرسالة المشتركة
          </label>
          <textarea
            id="our-world-note"
            rows={4}
            maxLength={1200}
            value={noteDraft}
            onChange={(e) => setNoteDraft(e.target.value)}
            placeholder="اكتبا هنا رسالة هادئة، هدفاً مستقبلياً، أو ملاحظة تخص رحلتكما..."
            className="w-full rounded-2xl border border-[#E9D8D1] bg-[#F9F3EC] p-4 text-sm leading-relaxed text-[#351B38] placeholder:text-[#6F5472]/60 focus:border-[#762D50] focus:outline-none"
          />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="submit"
              className="rounded-full bg-[#762D50] px-6 py-2.5 text-sm font-medium text-[#F9F3EC] hover:bg-[#5D223E] cursor-pointer"
            >
              حفظ الرسالة المشتركة
            </button>
            {savedFlag && (
              <span role="status" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#762D50]">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                <span>تم الحفظ في عالمنا</span>
              </span>
            )}
          </div>
        </form>
      </section>

      <footer className="flex items-center gap-2.5 text-xs text-[#6F5472] px-2">
        <ShieldCheck className="h-4 w-4 shrink-0 text-[#762D50]" aria-hidden="true" />
        <span>
          حماية الخصوصية: لا تعرض صفحة عالمنا إجابات الأسئلة الثلاثين التفصيلية لأي طرف، وتُحفظ البيانات محلياً في متصفحكِ فقط.
        </span>
      </footer>
    </div>
  );
}
