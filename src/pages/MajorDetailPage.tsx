import React from 'react';
import {
  AlertCircle,
  ArrowRight,
  ExternalLink,
  GitCompare,
  HelpCircle,
} from 'lucide-react';
import { CharacterStage } from '@/src/components/characters/CharacterStage';
import { FloralDivider } from '@/src/components/ornaments/BotanicalArt';
import { DOMAIN_CHARACTER_MAP } from '@/src/data/characters/kawaiiCharacters';
import { MAJORS_CATALOG } from '@/src/data/majors/majorsCatalog';

interface MajorDetailPageProps {
  majorId: string;
  compareIds: string[];
  onToggleCompare: (majorId: string) => void;
  onNavigate: (to: string) => void;
}

export function MajorDetailPage({
  majorId,
  compareIds,
  onToggleCompare,
  onNavigate,
}: MajorDetailPageProps) {
  const major = MAJORS_CATALOG.find((m) => m.id === majorId);

  if (!major) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12 text-center space-y-4">
        <h1 className="font-display text-2xl font-bold text-[#381F2E]">
          لم يتم العثور على هذا التخصص
        </h1>
        <p className="text-sm text-[#69495B]">
          ربما تغيّر الرابط أو أن التخصص غير مدرج في قاعدة البيانات الحالية بعد.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('/majors')}
          className="rounded-full bg-[#A9506C] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#913F59] cursor-pointer"
        >
          العودة إلى دليل التخصصات
        </button>
      </div>
    );
  }

  const similarMajors = major.relatedMajorIds
    .map((id) => MAJORS_CATALOG.find((m) => m.id === id))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  const isInCompare = compareIds.includes(major.id);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onNavigate('/majors')}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#69495B] hover:text-[#A9506C] cursor-pointer"
        >
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
          <span>العودة إلى التخصصات</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onToggleCompare(major.id)}
            className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium cursor-pointer ${
              isInCompare
                ? 'border-[#8E74A8] bg-[#F4EFF8] text-[#381F2E]'
                : 'border-[#E8CED5] bg-white text-[#381F2E] hover:bg-[#FBF1F3]'
            }`}
          >
            <GitCompare className="h-4 w-4 text-[#8E74A8]" aria-hidden="true" />
            <span>{isInCompare ? 'مضاف للمقارنة ✓' : 'أضيفي للمقارنة'}</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/compare')}
            className="inline-flex min-h-[40px] items-center rounded-full bg-[#A9506C] px-4 py-2 text-xs font-medium text-white hover:bg-[#913F59] cursor-pointer"
          >
            الذهاب للمقارنة ({compareIds.length})
          </button>
        </div>
      </div>

      {/* 1. اسم التخصص و 2. وصفه */}
      <article className="rounded-[2rem] border border-[#E8CED5] bg-[#FFFDFB] p-6 sm:p-10 space-y-8">
        <header className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-[#F2E2E6]">
          <CharacterStage
            characterId={DOMAIN_CHARACTER_MAP[major.category]}
            variant="companion"
            eager={true}
            showCaption={true}
            className="w-full max-w-[180px] shrink-0 mx-auto sm:mx-0"
          />
          <div className="space-y-2">
            <p className="text-xs text-[#7A596C]">
              {major.categoryLabelAr} · {major.credentialLabelAr} ·{' '}
              <span dir="ltr">{major.nameEn}</span>
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#381F2E]">
              {major.nameAr}
            </h1>
            <p className="text-sm sm:text-base leading-relaxed text-[#573E4E]">
              {major.shortDescriptionAr}
            </p>
          </div>
        </header>

        {/* 3. ماذا ستدرسين؟ و 6. طبيعة الدراسة */}
        <section className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <h2 className="font-display text-lg font-bold text-[#381F2E]">
              ماذا ستدرسين في هذا التخصص؟
            </h2>
            <p className="text-sm leading-relaxed text-[#573E4E]">
              {major.whatYouStudyAr}
            </p>
            <p className="text-xs leading-relaxed text-[#7A596C] pt-1">
              {major.studyYearsNote}
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-display text-lg font-bold text-[#381F2E]">
              طبيعة الدراسة اليومية
            </h2>
            <p className="text-sm leading-relaxed text-[#573E4E]">
              {major.studyNatureAr}
            </p>
            <p className="text-xs leading-relaxed text-[#7A596C] pt-1">
              ملاحظات القبول: {major.admissionNotesAr}
            </p>
          </div>
        </section>

        {/* 4. أمثلة على المواد و 5. المهارات المفيدة */}
        <section className="grid gap-6 md:grid-cols-2 pt-2">
          <div className="rounded-2xl border border-[#F0DDE2] bg-[#FDF9F6] p-5 space-y-3">
            <h2 className="font-display text-base font-bold text-[#381F2E]">
              أمثلة على المواد الدراسية
            </h2>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-[#573E4E]">
              {major.sampleSubjectsAr.map((subj) => (
                <li key={subj}>{subj}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#F0DDE2] bg-[#FDF9F6] p-5 space-y-3">
            <h2 className="font-display text-base font-bold text-[#381F2E]">
              المهارات المفيدة لتطويرها
            </h2>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-[#573E4E]">
              {major.usefulSkillsAr.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* 7. تحديات التخصص و 8. مجالات العمل */}
        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-[#E6D3B8] bg-[#FAF4EA]/60 p-5 space-y-3">
            <div className="flex items-center gap-2 text-[#7B5A2C]">
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <h2 className="font-display text-base font-bold text-[#381F2E]">
                تحديات ينبغي معرفتها بواقعية
              </h2>
            </div>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-[#573E4E]">
              {major.challengesAr.map((ch) => (
                <li key={ch}>{ch}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#D8CBE7] bg-[#F8F4FB] p-5 space-y-3">
            <h2 className="font-display text-base font-bold text-[#381F2E]">
              مجالات العمل المحتملة
            </h2>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-[#573E4E]">
              {major.potentialCareersAr.map((job) => (
                <li key={job}>{job}</li>
              ))}
            </ul>
            <p className="text-xs text-[#69495B] pt-1">
              ملاحظة: لا يقدم الموقع أي وعود بالتعيين أو مستوى الدخل؛ تختلف الفرص حسب التوقيت والمهارة.
            </p>
          </div>
        </section>

        {/* 10. أسئلة ينبغي التفكير بها قبل الاختيار */}
        <section className="rounded-2xl border border-[#E8CED5] bg-[#FBF1F3]/70 p-5 space-y-3">
          <div className="flex items-center gap-2 text-[#A9506C]">
            <HelpCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <h2 className="font-display text-base font-bold text-[#381F2E]">
              أسئلة للتفكير قبل اختيار هذا التخصص
            </h2>
          </div>
          <ul className="space-y-1.5 text-sm text-[#381F2E]">
            {major.reflectionQuestionsAr.map((q) => (
              <li key={q}>• {q}</li>
            ))}
          </ul>
        </section>

        <FloralDivider className="my-4" />

        {/* 9. تخصصات مشابهة */}
        {similarMajors.length > 0 && (
          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-[#381F2E]">
              تخصصات مشابهة أو قريبة للمقارنة
            </h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {similarMajors.map((rel) => (
                <button
                  key={rel.id}
                  type="button"
                  onClick={() => onNavigate(`/majors/${rel.id}`)}
                  className="rounded-2xl border border-[#E8CED5] bg-[#FDF9F6] p-4 text-right hover:border-[#A9506C] hover:bg-[#FBF1F3] transition-colors cursor-pointer"
                >
                  <p className="text-xs text-[#7A596C]">{rel.categoryLabelAr}</p>
                  <p className="font-display text-sm font-bold text-[#381F2E] mt-0.5">
                    {rel.nameAr}
                  </p>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* 11. الجامعات الموثقة ومصادر المعلومات */}
        <section className="rounded-2xl border border-[#E8CED5] bg-[#FDF9F6] p-5 space-y-3 text-sm">
          <h2 className="font-display text-base font-bold text-[#381F2E]">
            التحقق الأكاديمي ومصادر المعلومات
          </h2>
          <div className="space-y-1">
            <p className="font-semibold text-[#381F2E]">أمثلة موثقة في جامعات عراقية:</p>
            <ul className="list-disc list-inside text-xs sm:text-sm text-[#573E4E]">
              {major.verifiedUniversitiesAr.map((uni) => (
                <li key={uni}>{uni}</li>
              ))}
            </ul>
            <p className="text-xs text-[#7A596C] pt-1">
              {major.universitiesVerificationNoteAr}
            </p>
          </div>

          <div className="pt-2 border-t border-[#F0DDE2] space-y-1.5">
            <p className="text-xs font-semibold text-[#381F2E]">
              المصادر الرسمية (تاريخ آخر تحقق: <span className="tabular-nums">{major.lastVerifiedDate}</span>):
            </p>
            <ul className="space-y-1 text-xs">
              {major.sources.map((src) => (
                <li key={src.url + src.title}>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#A9506C] hover:underline"
                  >
                    <span>{src.title} — {src.authority}</span>
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </article>
    </div>
  );
}
