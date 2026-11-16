import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { CharacterStage } from '@/src/components/characters/CharacterStage';
import { CoquetteRibbonBow } from '@/src/components/ornaments/BotanicalArt';
import { RIASEC_CHARACTER_MAP } from '@/src/data/characters/kawaiiCharacters';
import { RIASEC_ORDER, RIASEC_PROFILES } from '@/src/data/interests/riasecProfiles';
import { AssessmentResult } from '@/src/types';

interface InterestsPageProps {
  result: AssessmentResult | null;
  onNavigate: (to: string) => void;
}

export function InterestsPage({ result, onNavigate }: InterestsPageProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 space-y-10">
      <header className="text-center space-y-3">
        <div className="flex justify-center">
          <CoquetteRibbonBow className="w-16 h-9" />
        </div>
        <p className="text-xs font-semibold text-[#C04472]">
          نموذج هولاند للاهتمامات المهنية (RIASEC)
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#351B38]">
          ملف أنماط الاهتمامات الستة
        </h1>
        <p className="mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-[#5F4163]">
          يصنف مقياس O*NET Interest Profiler الاهتمامات بالأنشطة المهنية إلى ستة أنماط متكاملة.
          لكل طالبة مزيج فريد من هذه الأنماط، ولا تُختزل الشخصية في حرف واحد.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {RIASEC_ORDER.map((code, idx) => {
          const info = RIASEC_PROFILES[code];
          const userAreaScore = result?.scores[code];
          return (
            <motion.article
              key={code}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: idx * 0.04 }}
              className="rounded-3xl border bg-[#FFFCFA] p-6 sm:p-7 space-y-4 shadow-[0_10px_34px_-24px_rgba(53,27,56,0.22)]"
              style={{ borderColor: info.borderHex }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <CharacterStage
                    characterId={RIASEC_CHARACTER_MAP[code]}
                    variant="avatar"
                    className="h-16 w-16 shrink-0"
                  />
                  <div>
                    <p className="text-xs font-semibold" style={{ color: info.colorHex }} dir="ltr">
                      {info.letter} · {info.nameEn}
                    </p>
                    <h2 className="font-display text-xl font-bold text-[#351B38]">
                      {info.nameAr}
                    </h2>
                  </div>
                </div>
                {userAreaScore && (
                  <span
                    className="rounded-full px-3 py-1 text-xs font-bold tabular-nums"
                    style={{ backgroundColor: info.tintHex, color: info.colorHex }}
                  >
                    درجتج: {userAreaScore.score}/{userAreaScore.maxScore}
                  </span>
                )}
              </div>

              <p className="text-sm font-medium text-[#4F3553]">{info.subtitleAr}</p>
              <p className="text-sm leading-relaxed text-[#5F4163]">{info.descriptionAr}</p>

              <div className="space-y-3 pt-2 border-t border-[#F2E2EB] text-xs sm:text-sm">
                <div>
                  <h3 className="font-display font-bold text-[#351B38] mb-1">
                    أنشطة مرتبطة بهذا النمط:
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-[#5F4163]">
                    {info.activitiesAr.map((act) => (
                      <li key={act}>{act}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-display font-bold text-[#351B38] mb-1">
                    أمثلة على بيئات العمل:
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-[#5F4163]">
                    {info.workEnvironmentsAr.map((env) => (
                      <li key={env}>{env}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-display font-bold text-[#351B38] mb-1">
                    مجالات يمكن استكشافها:
                  </h3>
                  <p className="text-[#5F4163]">{info.explorableFieldsAr.join(' · ')}</p>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="text-center pt-2">
        <button
          type="button"
          onClick={() => onNavigate(result ? '/results' : '/intro')}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-gradient-to-l from-[#C04472] to-[#7651B8] px-7 py-2.5 text-sm font-medium text-white hover:opacity-95 cursor-pointer"
        >
          <span>{result ? 'العودة إلى ملف اهتماماتج' : 'ابدئي الاختبار لاكتشاف اهتماماتج'}</span>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
