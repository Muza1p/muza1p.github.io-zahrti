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
 * This never reduces the student to a single interest type and never outputs
 * misleading acceptance or success percentages.
 */
export function computeMajorAffinity(
  result: AssessmentResult,
  major: Major
): { affinity: number; matchedInterests: RiasecCode[] } {
  // Use normalized scores (0..1) plus small boost for top-ranked dimensions
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

  // Identify up to 3 overlapping interests where both user and major show meaningful alignment
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
    affinity: Number(cosine.toFixed(4)),
    matchedInterests: fallbackMatched.slice(0, 3),
  };
}

function buildExploratoryReason(
  major: Major,
  matchedInterests: RiasecCode[],
  flatProfile: boolean
): string {
  if (flatProfile) {
    return `تظهر إجاباتج اهتمامات متقاربة عبر عدة مجالات؛ قد يستحق «${major.nameAr}» الاستكشاف للتعرف على طبيعة مواده وأنشطته اليومية.`;
  }
  const names = matchedInterests.map((c) => RIASEC_PROFILES[c].nameAr.replace('النمط ', ''));
  if (names.length >= 2) {
    return `قد يكون هذا التخصص خياراً يستحق الاستكشاف لأن أنشطته تتقاطع مع اهتماماتج في الجانب ${names[0]} و${names[1]}.`;
  }
  if (names.length === 1) {
    return `قد يكون هذا التخصص خياراً يستحق الاستكشاف لأن بعض أنشطته الدراسية تتقاطع مع ميولج في الجانب ${names[0]}.`;
  }
  return `يجمع هذا التخصص بين مهارات متعددة قد تمنحج زاوية واضحة عند مقارنته مع اهتماماتج.`;
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
} {
  const primaryCount = options?.primaryCount ?? 5;
  const alternativesCount = options?.alternativesCount ?? 3;
  const includeNonBachelor = options?.includeNonBachelor ?? true;

  const pool = includeNonBachelor
    ? majors
    : majors.filter((m) => m.credentialType === 'bachelor');

  const scored: MajorRecommendation[] = pool.map((major) => {
    const { affinity, matchedInterests } = computeMajorAffinity(result, major);
    return {
      major,
      affinityScore: affinity,
      matchedInterests,
      reasonAr: buildExploratoryReason(major, matchedInterests, result.flatProfile),
      isCloseAlternative: false,
    };
  });

  // Sort by affinity, encouraging category diversity in the top 5 so the user doesn't see 5 clones
  scored.sort((a, b) => b.affinityScore - a.affinityScore);

  const primaryRecommendations: MajorRecommendation[] = [];
  const usedCategories = new Set<string>();

  // First pass: pick top scoring majors while preferring diverse categories (at most 2 per category in top 5)
  for (const item of scored) {
    if (primaryRecommendations.length >= primaryCount) break;
    const catCount = primaryRecommendations.filter(
      (r) => r.major.category === item.major.category
    ).length;
    if (catCount < 2) {
      primaryRecommendations.push(item);
      usedCategories.add(item.major.category);
    }
  }

  // Fill if still short
  for (const item of scored) {
    if (primaryRecommendations.length >= primaryCount) break;
    if (!primaryRecommendations.some((r) => r.major.id === item.major.id)) {
      primaryRecommendations.push(item);
    }
  }

  const primaryIds = new Set(primaryRecommendations.map((r) => r.major.id));

  // Close alternatives: prioritize majors listed in relatedMajorIds of primary picks or next highest affinity
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
  };
}
