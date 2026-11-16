import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { EditorialCrest, RiasecBadgeGlyph } from '@/src/components/ornaments/BotanicalArt';
import { RIASEC_ORDER, RIASEC_PROFILES } from '@/src/data/interests/riasecProfiles';
import { AssessmentResult } from '@/src/types';

interface InterestsPageProps {
  activePersonName: string;
  result: AssessmentResult | null;
  onNavigate: (to: string) => void;
}

export function InterestsPage({ activePersonName, result, onNavigate }: InterestsPageProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 space-y-10">
      <header className="text-center space-y-3">
        <div className="flex justify-center">
          <EditorialCrest className="w-16 h-9" />
        </div>
        <p className="text-xs font-semibold text-[#762D50]">
          نموذج هولاند للاهتمامات المهنية (<span dir="ltr">RIASEC</span>)
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#351B38]">
          أنماط الاهتمامات الستة
        </h1>
        <p className="mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-[#5F4562]">
          يصنف مقياس <span dir="ltr">O*NET Interest Profiler</span> الاهتمامات بالأنشطة المهنية
          إلى ستة أنماط متكاملة. لكل شخص مزيج فريد من هذه الأنماط.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {RIASEC_ORDER.map((code) => {
          const info = RIASEC_PROFILES[code];
          const userAreaScore = result?.scores[code];
          return (
            <article
              key={code}
              className="rounded-2xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 sm:p-7 space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <RiasecBadgeGlyph area={code} className="h-12 w-12 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-[#762D50]" dir="ltr">
                      {info.letter} · {info.nameEn}
                    </p>
                    <h2 className="font-display text-xl font-bold text-[#351B38]">
                      {info.nameAr}
                    </h2>
                  </div>
                </div>
                {userAreaScore && (
                  <span className="text-xs font-bold text-[#762D50] tabular-nums">
                    {activePersonName}: {userAreaScore.score}/{userAreaScore.maxScore}
                  </span>
                )}
              </div>

              <p className="text-sm font-medium text-[#351B38]">{info.subtitleAr}</p>
              <p className="text-sm leading-relaxed text-[#5F4562]">{info.descriptionAr}</p>

              <div className="space-y-3 pt-2 border-t border-[#E9D8D1] text-xs sm:text-sm">
                <div>
                  <h3 className="font-display font-bold text-[#351B38] mb-1">
                    أنشطة مرتبطة بهذا النمط:
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-[#5F4562]">
                    {info.activitiesAr.map((act) => (
                      <li key={act}>{act}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-display font-bold text-[#351B38] mb-1">
                    أمثلة على بيئات العمل:
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-[#5F4562]">
                    {info.workEnvironmentsAr.map((env) => (
                      <li key={env}>{env}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-display font-bold text-[#351B38] mb-1">
                    مجالات يمكن استكشافها:
                  </h3>
                  <p className="text-[#5F4562]">{info.explorableFieldsAr.join(' · ')}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="text-center pt-2">
        <button
          type="button"
          onClick={() => onNavigate(result ? '/results' : '/intro')}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#762D50] px-7 py-2.5 text-sm font-medium text-[#F9F3EC] hover:bg-[#5D223E] cursor-pointer"
        >
          <span>{result ? 'العودة إلى النتيجة' : 'ابدئي الاختبار الآن'}</span>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
