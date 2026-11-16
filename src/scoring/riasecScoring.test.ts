import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildAnswersString,
  computeZScoreFactors,
  determineTopInterestCodes,
  findMissingQuestionIndices,
  isValidMiniIpAnswersString,
  scoreMiniIpAnswers,
} from './riasecScoring';
import { MINI_IP_QUESTIONS } from '../data/questions/miniIpQuestions';
import { LikertValue } from '../types';

function makeUniformAnswers(value: LikertValue): Record<number, LikertValue> {
  const answers: Record<number, LikertValue> = {};
  for (let i = 1; i <= 30; i++) {
    answers[i] = value;
  }
  return answers;
}

test('MINI_IP_QUESTIONS contains exactly 30 items with 5 per RIASEC category', () => {
  assert.equal(MINI_IP_QUESTIONS.length, 30);
  const counts: Record<string, number> = {};
  for (const q of MINI_IP_QUESTIONS) {
    counts[q.area] = (counts[q.area] || 0) + 1;
  }
  assert.deepEqual(counts, {
    realistic: 5,
    investigative: 5,
    artistic: 5,
    social: 5,
    enterprising: 5,
    conventional: 5,
  });
});

test('findMissingQuestionIndices identifies missing answers accurately', () => {
  const partial: Record<number, LikertValue> = { 1: 4, 2: 5 };
  const missing = findMissingQuestionIndices(partial);
  assert.equal(missing.length, 28);
  assert.equal(missing[0], 3);
  assert.throws(() => buildAnswersString(partial));
});

test('buildAnswersString produces a valid 30-character string matching O*NET OpenAPI pattern', () => {
  const answers = makeUniformAnswers(3);
  answers[1] = 5;
  answers[30] = 1;
  const str = buildAnswersString(answers);
  assert.equal(str.length, 30);
  assert.equal(isValidMiniIpAnswersString(str), true);
  assert.equal(str[0], '5');
  assert.equal(str[29], '1');
  assert.equal(isValidMiniIpAnswersString('12345'), false);
});

test('scoreMiniIpAnswers scores 0..20 per RIASEC area using sum(answer - 1)', () => {
  const answers = makeUniformAnswers(1); // minimum 0 for every area
  // Set all 5 investigative items (2, 8, 14, 20, 26) to 5 -> score 20
  for (const idx of [2, 8, 14, 20, 26]) {
    answers[idx] = 5;
  }
  // Set 3 artistic items (3, 9, 15) to 4 -> 3 * 3 = 9
  for (const idx of [3, 9, 15]) {
    answers[idx] = 4;
  }
  const result = scoreMiniIpAnswers(answers);
  assert.equal(result.scores.investigative.score, 20);
  assert.equal(result.scores.artistic.score, 9);
  assert.equal(result.scores.realistic.score, 0);
  assert.equal(result.topThreeCodes[0], 'investigative');
  assert.equal(result.topThreeCodes[1], 'artistic');
  assert.equal(result.flatProfile, false);
  assert.equal(result.allOneAnswer, null);
  assert.equal(result.isScientificallyValidatedArabic, false);
});

test('uniform answers produce a flatProfile and record allOneAnswer', () => {
  const answers = makeUniformAnswers(4);
  const result = scoreMiniIpAnswers(answers);
  assert.equal(result.scores.realistic.score, 15);
  assert.equal(result.scores.social.score, 15);
  assert.equal(result.flatProfile, true);
  assert.equal(result.allOneAnswer, 4);
  const factors = computeZScoreFactors({
    realistic: 15,
    investigative: 15,
    artistic: 15,
    social: 15,
    enterprising: 15,
    conventional: 15,
  });
  assert.deepEqual(determineTopInterestCodes(factors), []);
});
