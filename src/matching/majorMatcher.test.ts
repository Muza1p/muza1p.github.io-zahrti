import test from 'node:test';
import assert from 'node:assert/strict';
import { MAJORS_CATALOG } from '../data/majors/majorsCatalog';
import { MINI_IP_QUESTIONS } from '../data/questions/miniIpQuestions';
import { scoreMiniIpAnswers } from '../scoring/riasecScoring';
import { recommendMajorsForResult } from './majorMatcher';
import { LikertValue } from '../types';

test('MAJORS_CATALOG covers all 9 requested domains and separates credentials', () => {
  const categories = new Set(MAJORS_CATALOG.map((m) => m.category));
  assert.equal(categories.size, 9);
  const credentials = new Set(MAJORS_CATALOG.map((m) => m.credentialType));
  assert.equal(credentials.has('bachelor'), true);
  assert.equal(credentials.has('diploma_institute'), true);
  assert.equal(credentials.has('vocational_certificate'), true);
});

test('recommendMajorsForResult recommends 5 primary majors and 3 distinct close alternatives', () => {
  const answers: Record<number, LikertValue> = {};
  for (const q of MINI_IP_QUESTIONS) {
    if (q.area === 'investigative' || q.area === 'social') {
      answers[q.originalIndex] = 5;
    } else if (q.area === 'realistic') {
      answers[q.originalIndex] = 3;
    } else {
      answers[q.originalIndex] = 2;
    }
  }
  const scored = scoreMiniIpAnswers(answers);
  const { primaryRecommendations, closeAlternatives } = recommendMajorsForResult(
    scored,
    MAJORS_CATALOG
  );

  assert.equal(primaryRecommendations.length, 5);
  assert.equal(closeAlternatives.length, 3);

  const primaryIds = new Set(primaryRecommendations.map((r) => r.major.id));
  for (const alt of closeAlternatives) {
    assert.equal(primaryIds.has(alt.major.id), false);
    assert.equal(alt.isCloseAlternative, true);
  }

  // Investigative + Social profile should surface health/science/social majors
  const topIds = primaryRecommendations.map((r) => r.major.id);
  assert.equal(
    topIds.some((id) => ['general-medicine', 'nursing', 'psychology', 'pharmacy'].includes(id)),
    true
  );
  // Reasoning must never promise acceptance % or guarantee
  for (const rec of primaryRecommendations) {
    assert.equal(rec.reasonAr.includes('%'), false);
    assert.equal(rec.reasonAr.includes('بالتأكيد'), false);
  }
});
