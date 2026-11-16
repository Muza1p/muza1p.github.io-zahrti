import { MINI_IP_QUESTIONS } from '@/src/data/questions/miniIpQuestions';
import { RIASEC_ORDER, RIASEC_PROFILES } from '@/src/data/interests/riasecProfiles';
import {
  AssessmentResult,
  LikertValue,
  RiasecAreaScore,
  RiasecCode,
  ScoringSourceMode,
} from '@/src/types';

// Exact Holland hexagon tie-breaking order from official O*NET Mini-IP
const HEXAGON_TIE_ORDER: Record<'none' | RiasecCode, RiasecCode[]> = {
  none: ['realistic', 'investigative', 'artistic', 'social', 'enterprising', 'conventional'],
  realistic: ['conventional', 'investigative', 'enterprising', 'artistic', 'social'],
  investigative: ['realistic', 'artistic', 'conventional', 'social', 'enterprising'],
  artistic: ['investigative', 'social', 'realistic', 'enterprising', 'conventional'],
  social: ['artistic', 'enterprising', 'investigative', 'conventional', 'realistic'],
  enterprising: ['social', 'conventional', 'artistic', 'realistic', 'investigative'],
  conventional: ['enterprising', 'realistic', 'social', 'investigative', 'artistic'],
};

export function findMissingQuestionIndices(answers: Record<number, LikertValue>): number[] {
  const missing: number[] = [];
  for (const q of MINI_IP_QUESTIONS) {
    const val = answers[q.originalIndex];
    if (!val || ![1, 2, 3, 4, 5].includes(val)) {
      missing.push(q.originalIndex);
    }
  }
  return missing;
}

export function buildAnswersString(answers: Record<number, LikertValue>): string {
  const missing = findMissingQuestionIndices(answers);
  if (missing.length > 0) {
    throw new Error(`Incomplete assessment answers. Missing questions: ${missing.join(', ')}`);
  }
  return MINI_IP_QUESTIONS.map((q) => String(answers[q.originalIndex])).join('');
}

export function isValidMiniIpAnswersString(answersString: string): boolean {
  return /^[12345]{30}$/.test(answersString);
}

/**
 * Standardizes raw RIASEC scores into z-scores across the 6 interest areas,
 * matching O*NET Interest Profiler's Mv(scores) calculation.
 */
export function computeZScoreFactors(rawScores: Record<RiasecCode, number>): Record<RiasecCode, number> {
  const values = RIASEC_ORDER.map((code) => rawScores[code]);
  const mean = values.reduce((acc, v) => acc + v, 0) / values.length;
  const diffs: Record<RiasecCode, number> = {
    realistic: rawScores.realistic - mean,
    investigative: rawScores.investigative - mean,
    artistic: rawScores.artistic - mean,
    social: rawScores.social - mean,
    enterprising: rawScores.enterprising - mean,
    conventional: rawScores.conventional - mean,
  };
  const sumSq = RIASEC_ORDER.reduce((acc, code) => acc + diffs[code] * diffs[code], 0);
  const stdDev = Math.sqrt(sumSq / values.length);

  const factors: Record<RiasecCode, number> = {
    realistic: 0,
    investigative: 0,
    artistic: 0,
    social: 0,
    enterprising: 0,
    conventional: 0,
  };
  for (const code of RIASEC_ORDER) {
    factors[code] = stdDev > 0 ? diffs[code] / stdDev : 0;
  }
  return factors;
}

function pickNextTop(
  factors: Record<RiasecCode, number>,
  anchor: 'none' | RiasecCode,
  exclude: RiasecCode[]
): RiasecCode[] {
  const order = HEXAGON_TIE_ORDER[anchor];
  return RIASEC_ORDER.filter(
    (code) => code !== anchor && !exclude.includes(code) && factors[code] > 0
  ).sort((a, b) => {
    const diff = factors[b] - factors[a];
    if (Math.abs(diff) > 1e-9) return diff;
    return order.indexOf(a) - order.indexOf(b);
  });
}

/**
 * Computes top interest codes (up to 3) using positive standardized z-scores
 * and Holland hexagon tie-breaking, matching official O*NET Mini-IP logic.
 */
export function determineTopInterestCodes(factors: Record<RiasecCode, number>): RiasecCode[] {
  const top: RiasecCode[] = [];
  const firstPool = pickNextTop(factors, 'none', []);
  if (firstPool.length > 0) {
    top.push(firstPool[0]);
    const secondPool = pickNextTop(factors, top[0], top);
    if (secondPool.length > 0) {
      top.push(secondPool[0]);
      const thirdPool = pickNextTop(factors, top[1], top);
      if (thirdPool.length > 0) {
        top.push(thirdPool[0]);
      }
    }
  }
  return top;
}

export function scoreMiniIpAnswers(
  answers: Record<number, LikertValue>,
  options?: {
    scoringMode?: ScoringSourceMode;
    officialApiScores?: Partial<Record<RiasecCode, number>>;
    elapsedSeconds?: number | null;
  }
): AssessmentResult {
  const answersString = buildAnswersString(answers);
  const rawScores: Record<RiasecCode, number> = {
    realistic: 0,
    investigative: 0,
    artistic: 0,
    social: 0,
    enterprising: 0,
    conventional: 0,
  };

  if (options?.officialApiScores) {
    for (const code of RIASEC_ORDER) {
      const apiScore = options.officialApiScores[code];
      if (typeof apiScore !== 'number' || Number.isNaN(apiScore)) {
        throw new Error(`Missing official API score for area: ${code}`);
      }
      rawScores[code] = apiScore;
    }
  } else {
    // Official Mini-IP raw score: 5 items per area, each rated 1..5 -> sum(answer - 1), range 0..20
    for (const q of MINI_IP_QUESTIONS) {
      const val = answers[q.originalIndex];
      rawScores[q.area] += Math.max(val - 1, 0);
    }
  }

  const maxPerArea = 20;
  const factors = computeZScoreFactors(rawScores);
  const topCodes = determineTopInterestCodes(factors);
  const flatProfile = topCodes.length === 0;

  const firstAnswer = answers[1];
  const allSame = MINI_IP_QUESTIONS.every((q) => answers[q.originalIndex] === firstAnswer);

  const areaScores: Record<RiasecCode, RiasecAreaScore> = {} as Record<RiasecCode, RiasecAreaScore>;

  for (const code of RIASEC_ORDER) {
    const profile = RIASEC_PROFILES[code];
    const score = rawScores[code];
    const rank =
      1 + RIASEC_ORDER.filter((other) => rawScores[other] > score).length;
    areaScores[code] = {
      code,
      letter: profile.letter,
      nameAr: profile.nameAr,
      nameEn: profile.nameEn,
      score,
      maxScore: maxPerArea,
      ratio: Number((score / maxPerArea).toFixed(4)),
      factor: Number(factors[code].toFixed(4)),
      rank,
      isTop: topCodes.includes(code),
    };
  }

  const orderedAreas = [...RIASEC_ORDER]
    .sort((a, b) => {
      const scoreDiff = areaScores[b].score - areaScores[a].score;
      if (scoreDiff !== 0) return scoreDiff;
      return RIASEC_ORDER.indexOf(a) - RIASEC_ORDER.indexOf(b);
    })
    .map((code) => areaScores[code]);

  const topThreeCodes = topCodes.length > 0
    ? topCodes
    : orderedAreas.slice(0, 3).map((a) => a.code);

  const hollandCode = topThreeCodes
    .map((c) => RIASEC_PROFILES[c].letter)
    .join('');

  return {
    answersString,
    scores: areaScores,
    orderedAreas,
    topThreeCodes,
    hollandCode,
    flatProfile,
    allOneAnswer: allSame ? firstAnswer : null,
    scoringMode: options?.scoringMode ?? 'local_mini_ip_formula',
    isScientificallyValidatedArabic: false,
    calculatedAtIso: new Date().toISOString(),
    elapsedSeconds: options?.elapsedSeconds ?? null,
  };
}
