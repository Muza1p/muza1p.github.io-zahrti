import React from 'react';
import {
  AlertCircle,
  ArrowRight,
  Bookmark,
  ExternalLink,
  GitCompare,
  HelpCircle,
} from 'lucide-react';
import { CategoryIllustration, FloralDivider } from '@/src/components/ornaments/BotanicalArt';
import { RIASEC_ORDER, RIASEC_PROFILES } from '@/src/data/interests/riasecProfiles';
import { MAJORS_CATALOG } from '@/src/data/majors/majorsCatalog';

interface MajorDetailPageProps {
  majorId: string;
  favoriteMajorIds: string[];
  compareIds: string[];
  onToggleFavorite: (majorId: string) => void;
  onToggleCompare: (majorId: string) => void;
  onNavigate: (to: string) => void;
}

export function MajorDetailPage({
  majorId,
  favoriteMajorIds,
  compareIds,
  onToggleFavorite,
  onToggleCompare,
  onNavigate,
}: MajorDetailPageProps) {
  const major = MAJORS_CATALOG.find((m) => m.id === majorId);

  if (!major) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12 text-center space-y-4">
        <h1 className="font-display text-2xl font-bold text-[#351B38]">
          لم يتم العثور على هذا التخصص
        </h1>
        <p className="text-sm text-[#5F4562]">
          ربما تغيّر الرابط أو أن التخصص غير مدرج في قاعدة البيانات الحالية بعد.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('/majors')}
          className="rounded-full bg-[#762D50] px-6 py-2.5 text-sm font-medium text-[#F9F3EC] hover:bg-[#5D223E] cursor-pointer"
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
  const isFav = favoriteMajorIds.includes(major.id);

  const topTraits = [...RIASEC_ORDER]
    .sort((a, b) => (major.riasecWeights[b] ?? 0) - (major.riasecWeights[a] ?? 0))
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onNavigate('/majors')}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#5F4562] hover:text-[#762D50] cursor-pointer"
        >
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
          <span>العودة إلى التخصصات</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onToggleFavorite(major.id)}
            className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium cursor-pointer ${
              isFav
                ? 'border-[#762D50] bg-[#762D50] text-[#F9F3EC]'
                : 'border-[#E9D8D1] bg-[#F9F3EC] text-[#351B38] hover:border-[#762D50]'
            }`}
          >
            <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{isFav ? 'محفوظ في المفضلة' : 'حفظ للمفضلة'}</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleCompare(major.id)}
            className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium cursor-pointer ${
              isInCompare
                ? 'border-[#351B38] bg-[#351B38] text-[#F9F3EC]'
                : 'border-[#E9D8D1] bg-white text-[#351B38] hover:bg-[#F9F3EC]'
            }`}
          >
            <GitCompare className="h-4 w-4" aria-hidden="true" />
            <span>{isInCompare ? 'مضاف للمقارنة ✓' : 'أضيفي للمقارنة'}</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/compare')}
            className="inline-flex min-h-[40px] items-center rounded-full bg-[#351B38] px-4 py-2 text-xs font-medium text-[#F9F3EC] hover:bg-[#4B2B4E] cursor-pointer"
          >
            المقارنة ({compareIds.length})
          </button>
        </div>
      </div>

      <article className="rounded-3xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 sm:p-10 space-y-8">
        <header className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-[#E9D8D1]">
          <CategoryIllustration
            category={major.category}
            className="h-20 w-20 shrink-0 mx-auto sm:mx-0"
          />
          <div className="space-y-2.5">
            <p className="text-xs text-[#6F5472]">
              {major.categoryLabelAr} ·{' '}
              <span className="font-semibold text-[#762D50]">{major.credentialLabelAr}</span> ·{' '}
              <span dir="ltr">{major.nameEn}</span>
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#351B38]">
              {major.nameAr}
            </h1>
            <p className="text-sm sm:text-base leading-relaxed text-[#5F4562]">
              {major.shortDescriptionAr}
            </p>
            <div className="flex flex-wrap gap-2 pt-1 text-xs font-semibold text-[#762D50]">
              {topTraits.map((code, i) => (
                <span key={code}>
                  {RIASEC_PROFILES[code].nameAr}
                  {i < topTraits.length - 1 ? ' ·' : ''}
                </span>
              ))}
            </div>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <h2 className="font-display text-lg font-bold text-[#351B38]">
              ماذا ستدرسين في هذا التخصص؟
            </h2>
            <p className="text-sm leading-relaxed text-[#5F4562]">{major.whatYouStudyAr}</p>
            <p className="text-xs leading-relaxed text-[#6F5472] pt-1">{major.studyYearsNote}</p>
          </div>

          <div className="space-y-2">
            <h2 className="font-display text-lg font-bold text-[#351B38]">
              طبيعة الدراسة اليومية
            </h2>
            <p className="text-sm leading-relaxed text-[#5F4562]">{major.studyNatureAr}</p>
            <p className="text-xs leading-relaxed text-[#6F5472] pt-1">
              ملاحظات القبول: {major.admissionNotesAr}
            </p>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2 pt-2">
          <div className="rounded-2xl border border-[#E9D8D1] bg-[#F9F3EC] p-5 space-y-3">
            <h2 className="font-display text-base font-bold text-[#351B38]">
              أمثلة على المواد الدراسية
            </h2>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-[#5F4562]">
              {major.sampleSubjectsAr.map((subj) => (
                <li key={subj}>{subj}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E9D8D1] bg-[#F9F3EC] p-5 space-y-3">
            <h2 className="font-display text-base font-bold text-[#351B38]">
              المهارات المفيدة لتطويرها
            </h2>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-[#5F4562]">
              {major.usefulSkillsAr.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-[#C6A56B]/50 bg-[#F9F3EC]/70 p-5 space-y-3">
            <div className="flex items-center gap-2 text-[#9F7E44]">
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <h2 className="font-display text-base font-bold text-[#351B38]">
                تحديات ينبغي معرفتها بواقعية
              </h2>
            </div>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-[#5F4562]">
              {major.challengesAr.map((ch) => (
                <li key={ch}>{ch}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E9D8D1] bg-[#F9F3EC]/70 p-5 space-y-3">
            <h2 className="font-display text-base font-bold text-[#351B38]">
              مجالات العمل المحتملة
            </h2>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-[#5F4562]">
              {major.potentialCareersAr.map((job) => (
                <li key={job}>{job}</li>
              ))}
            </ul>
            <p className="text-xs text-[#6F5472] pt-1">
              ملاحظة: لا يقدم الموقع أي وعود بالتعيين أو مستوى الدخل؛ تختلف الفرص حسب التوقيت والمهارة.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-[#E9D8D1] bg-[#F9F3EC] p-5 space-y-3">
          <div className="flex items-center gap-2 text-[#762D50]">
            <HelpCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <h2 className="font-display text-base font-bold text-[#351B38]">
              أسئلة للتفكير قبل اختيار هذا التخصص
            </h2>
          </div>
          <ul className="space-y-1.5 text-sm text-[#5F4562]">
            {major.reflectionQuestionsAr.map((q) => (
              <li key={q}>• {q}</li>
            ))}
          </ul>
        </section>

        <FloralDivider className="my-4" />

        {similarMajors.length > 0 && (
          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-[#351B38]">
              تخصصات مشابهة أو قريبة للمقارنة
            </h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {similarMajors.map((rel) => (
                <button
                  key={rel.id}
                  type="button"
                  onClick={() => onNavigate(`/majors/${rel.id}`)}
                  className="rounded-2xl border border-[#E9D8D1] bg-[#F9F3EC] p-4 text-right hover:border-[#762D50] transition-colors cursor-pointer"
                >
                  <p className="text-xs text-[#6F5472]">{rel.categoryLabelAr}</p>
                  <p className="font-display text-sm font-bold text-[#351B38] mt-0.5">
                    {rel.nameAr}
                  </p>
                </button>
              ))}
            </div>
          </section>
        )}

        <section className="rounded-2xl border border-[#E9D8D1] bg-[#F9F3EC] p-5 space-y-3 text-sm">
          <h2 className="font-display text-base font-bold text-[#351B38]">
            التحقق الأكاديمي ومصادر المعلومات
          </h2>
          <div className="space-y-1">
            <p className="font-semibold text-[#351B38]">أمثلة موثقة في جامعات عراقية:</p>
            <ul className="list-disc list-inside text-xs sm:text-sm text-[#5F4562]">
              {major.verifiedUniversitiesAr.map((uni) => (
                <li key={uni}>{uni}</li>
              ))}
            </ul>
            <p className="text-xs text-[#6F5472] pt-1">{major.universitiesVerificationNoteAr}</p>
          </div>

          <div className="pt-2 border-t border-[#E9D8D1] space-y-1.5">
            <p className="text-xs font-semibold text-[#351B38]">
              المصادر الرسمية (تاريخ آخر تحقق: <span className="tabular-nums">{major.lastVerifiedDate}</span>):
            </p>
            <ul className="space-y-1 text-xs">
              {major.sources.map((src) => (
                <li key={src.url + src.title}>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#762D50] hover:underline"
                  >
                    <span>
                      {src.title} — {src.authority}
                    </span>
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
