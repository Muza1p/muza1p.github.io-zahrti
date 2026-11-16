import { RIASEC_ORDER, RIASEC_PROFILES } from '@/src/data/interests/riasecProfiles';
import {
  AssessmentResult,
  Major,
  MajorRecommendation,
  RiasecCode,
} from '@/src/types';

/**
 * Computes multi-dimensional cosine-weighted affinity between a user's 6-dimension
 * RIASEC profile and each major's multi-interest weights.
 * `affinityPercentage` is strictly derived from cosine similarity (0..100) representing
 * activity-interest overlap, never acceptance or career guarantee.
 */
export function computeMajorAffinity(
  result: AssessmentResult,
  major: Major
): { affinity: number; affinityPercentage: number; matchedInterests: RiasecCode[] } {
  const userVec = RIASEC_ORDER.map((code) => {
    const area = result.scores[code];
    const topBonus = result.topThreeCodes.includes(code) ? 0.15 : 0;
    return area.ratio + topBonus;
  });

  const majorVec = RIASEC_ORDER.map((code) => major.riasecWeights[code]);

  const dot = userVec.reduce((sum, u, idx) => sum + u * majorVec[idx], 0);
  const magUser = Math.sqrt(userVec.reduce((sum, u) => sum + u * u, 0));
  const magMajor = Math.sqrt(majorVec.reduce((sum, m) => sum + m * m, 0));

  const cosine = magUser > 0 && magMajor > 0 ? dot / (magUser * magMajor) : 0;
  const clampedCosine = Math.max(0, Math.min(1, cosine));

  const matchedInterests = RIASEC_ORDER.filter(
    (code) => major.riasecWeights[code] >= 0.45 && result.scores[code].score >= 8
  ).sort((a, b) => {
    const scoreA = major.riasecWeights[a] * result.scores[a].ratio;
    const scoreB = major.riasecWeights[b] * result.scores[b].ratio;
    return scoreB - scoreA;
  });

  const fallbackMatched =
    matchedInterests.length > 0
      ? matchedInterests.slice(0, 3)
      : RIASEC_ORDER.filter((c) => major.riasecWeights[c] >= 0.45)
          .sort((a, b) => major.riasecWeights[b] - major.riasecWeights[a])
          .slice(0, 2);

  return {
    affinity: Number(clampedCosine.toFixed(4)),
    affinityPercentage: Math.round(clampedCosine * 100),
    matchedInterests: fallbackMatched.slice(0, 3),
  };
}

function buildExploratoryReason(
  major: Major,
  matchedInterests: RiasecCode[],
  flatProfile: boolean
): string {
  if (flatProfile) {
    return `تظهر إجاباتج اهتمامات متقاربة عبر عدة مجالات؛ يستحق تخصص «${major.nameAr}» الاستكشاف للتعرف على طبيعة مواده وأنشطته اليومية.`;
  }
  const names = matchedInterests.map((c) => RIASEC_PROFILES[c].nameAr.replace('النمط ', ''));
  if (names.length >= 2) {
    return `تتقاطع أنشطة هذا التخصص بوضوح مع اهتماماتج في الجانب ${names[0]} و${names[1]}.`;
  }
  if (names.length === 1) {
    return `تتقاطع بعض المواد والأنشطة العملية في هذا التخصص مع ميولج في الجانب ${names[0]}.`;
  }
  return `يجمع هذا التخصص بين مهارات متنوعة تمنحج مساحة عملية لمقارنته مع أولوياتج.`;
}

export function recommendMajorsForResult(
  result: AssessmentResult,
  majors: Major[],
  options?: {
    primaryCount?: number;
    alternativesCount?: number;
    includeNonBachelor?: boolean;
  }
): {
  primaryRecommendations: MajorRecommendation[];
  closeAlternatives: MajorRecommendation[];
  allRanked: MajorRecommendation[];
} {
  const primaryCount = options?.primaryCount ?? 5;
  const alternativesCount = options?.alternativesCount ?? 3;
  const includeNonBachelor = options?.includeNonBachelor ?? true;

  const pool = includeNonBachelor
    ? majors
    : majors.filter((m) => m.credentialType === 'bachelor');

  const scored: MajorRecommendation[] = pool.map((major) => {
    const { affinity, affinityPercentage, matchedInterests } = computeMajorAffinity(result, major);
    return {
      major,
      affinityScore: affinity,
      affinityPercentage,
      matchedInterests,
      reasonAr: buildExploratoryReason(major, matchedInterests, result.flatProfile),
      isCloseAlternative: false,
    };
  });

  scored.sort((a, b) => b.affinityScore - a.affinityScore);

  const primaryRecommendations: MajorRecommendation[] = [];

  // Pick ordered matches while keeping category diversity (max 2 per category in primary top list)
  for (const item of scored) {
    if (primaryRecommendations.length >= primaryCount) break;
    const catCount = primaryRecommendations.filter(
      (r) => r.major.category === item.major.category
    ).length;
    if (catCount < 2) {
      primaryRecommendations.push(item);
    }
  }

  for (const item of scored) {
    if (primaryRecommendations.length >= primaryCount) break;
    if (!primaryRecommendations.some((r) => r.major.id === item.major.id)) {
      primaryRecommendations.push(item);
    }
  }

  const primaryIds = new Set(primaryRecommendations.map((r) => r.major.id));

  const relatedPoolIds = new Set<string>();
  for (const rec of primaryRecommendations) {
    for (const relId of rec.major.relatedMajorIds) {
      if (!primaryIds.has(relId)) relatedPoolIds.add(relId);
    }
  }

  const closeAlternatives: MajorRecommendation[] = scored
    .filter((item) => !primaryIds.has(item.major.id))
    .sort((a, b) => {
      const aRel = relatedPoolIds.has(a.major.id) ? 0.08 : 0;
      const bRel = relatedPoolIds.has(b.major.id) ? 0.08 : 0;
      return b.affinityScore + bRel - (a.affinityScore + aRel);
    })
    .slice(0, alternativesCount)
    .map((item) => ({
      ...item,
      isCloseAlternative: true,
    }));

  return {
    primaryRecommendations,
    closeAlternatives,
    allRanked: scored,
  };
}
