import assert from 'node:assert/strict';
import test from 'node:test';
import { CLINICAL_ITEMS_BY_ID } from '@/src/data/assessments/items/clinicalItems';
import { EXPLORATORY_ITEMS_BY_ID } from '@/src/data/assessments/items/exploratoryItems';
import { GROWTH_EMPATHY_ITEMS_BY_ID } from '@/src/data/assessments/items/growthEmpathyItems';
import { PERSONALITY_ITEMS_BY_ID } from '@/src/data/assessments/items/personalityItems';
import { getInstrumentById, PSYCH_INSTRUMENTS_REGISTRY } from '@/src/data/assessments/registry';
import { scorePsychAssessment } from './psychScoringEngine';

const ALL_ITEMS = {
  ...CLINICAL_ITEMS_BY_ID,
  ...PERSONALITY_ITEMS_BY_ID,
  ...GROWTH_EMPATHY_ITEMS_BY_ID,
  ...EXPLORATORY_ITEMS_BY_ID,
};

test('registry item counts and option lengths strictly match question banks', () => {
  for (const spec of PSYCH_INSTRUMENTS_REGISTRY) {
    if (spec.scientificStatus === 'requires_license_reference' || spec.isLegacyOnetRoute) {
      continue;
    }
    const questions = ALL_ITEMS[spec.id];
    assert.ok(questions, `Missing questions module for ${spec.id}`);
    assert.equal(
      questions.length,
      spec.questionCount,
      `${spec.id} expected ${spec.questionCount} items, got ${questions.length}`
    );
    assert.ok(spec.options.length >= 4, `${spec.id} must have >= 4 options`);
  }
});

test('PHQ-9 computes exact sum 0..27 and triggers safety flag on Item 9 > 0', () => {
  const spec = getInstrumentById('phq-9')!;
  const qs = ALL_ITEMS['phq-9'];
  const answers: Record<string, number> = {};
  for (const q of qs) answers[q.id] = 0;
  answers['phq9_9'] = 1; // Non-zero item 9 triggers safety alert even with total = 1
  const res = scorePsychAssessment(spec, qs, answers, 45);
  assert.equal(res.primaryScore, 1);
  assert.equal(res.primaryMaxScore, 27);
  assert.equal(res.safetyTriggered, true);
});

test('DASS-21 multiplies each 7-item subscale by 2 correctly', () => {
  const spec = getInstrumentById('dass-21')!;
  const qs = ALL_ITEMS['dass-21'];
  const answers: Record<string, number> = {};
  for (const q of qs) {
    answers[q.id] = q.subscaleId === 'anxiety' ? 2 : 1;
  }
  const res = scorePsychAssessment(spec, qs, answers, 90);
  const dep = res.subscales.find((s) => s.id === 'depression')!;
  const anx = res.subscales.find((s) => s.id === 'anxiety')!;
  const str = res.subscales.find((s) => s.id === 'stress')!;
  assert.equal(dep.scaledScore, 14);
  assert.equal(anx.scaledScore, 28);
  assert.equal(str.scaledScore, 14);
  assert.equal(res.severityLevel, 'severe'); // Anxiety 28 is extremely severe (+20)
  assert.equal(res.safetyTriggered, true);
});

test('WHO-5 multiplies sum of 5 items by 4 (0..100)', () => {
  const spec = getInstrumentById('who-5')!;
  const qs = ALL_ITEMS['who-5'];
  const answers: Record<string, number> = {};
  for (const q of qs) answers[q.id] = 4; // raw 20 -> 80/100
  const res = scorePsychAssessment(spec, qs, answers, 25);
  assert.equal(res.primaryScore, 80);
  assert.equal(res.safetyTriggered, false);

  for (const q of qs) answers[q.id] = 1; // raw 5 -> 20/100 <= 28
  const lowRes = scorePsychAssessment(spec, qs, answers, 25);
  assert.equal(lowRes.primaryScore, 20);
  assert.equal(lowRes.safetyTriggered, true);
});

test('RSES-10 reverse scores items 2, 5, 6, 8, 9 accurately', () => {
  const spec = getInstrumentById('rosenberg-rse-10')!;
  const qs = ALL_ITEMS['rosenberg-rse-10'];
  const answers: Record<string, number> = {};
  for (const q of qs) {
    // Give 3 to normal items, 0 to reverse items -> should yield max 30
    answers[q.id] = q.reverseScored ? 0 : 3;
  }
  const maxRes = scorePsychAssessment(spec, qs, answers, 40);
  assert.equal(maxRes.primaryScore, 30);
});

test('BRS-6 reverse scores items 2, 4, 6 and computes exact mean 1..5', () => {
  const spec = getInstrumentById('brs-6')!;
  const qs = ALL_ITEMS['brs-6'];
  const answers: Record<string, number> = {
    brs_1: 5,
    brs_2: 1, // rev -> 5
    brs_3: 5,
    brs_4: 1, // rev -> 5
    brs_5: 5,
    brs_6: 1, // rev -> 5
  };
  const res = scorePsychAssessment(spec, qs, answers, 30);
  assert.equal(res.primaryScore, 5);
});

test('IPIP Big Five 50 computes 5 independent 10..50 factors with 24 reverse keys', () => {
  const spec = getInstrumentById('ipip-big5-50')!;
  const qs = ALL_ITEMS['ipip-big5-50'];
  const reverseCount = qs.filter((q) => q.reverseScored).length;
  assert.equal(reverseCount, 24);
  const answers: Record<string, number> = {};
  for (const q of qs) {
    answers[q.id] = q.reverseScored ? 1 : 5; // all traits = 50
  }
  const res = scorePsychAssessment(spec, qs, answers, 200);
  assert.equal(res.subscales.length, 5);
  for (const s of res.subscales) {
    assert.equal(s.rawScore, 50);
  }
});

test('IRI-28 has 4 independent 7-item subscales and 9 reverse-coded items', () => {
  const spec = getInstrumentById('iri-28')!;
  const qs = ALL_ITEMS['iri-28'];
  assert.equal(qs.filter((q) => q.reverseScored).length, 9);
  const answers: Record<string, number> = {};
  for (const q of qs) answers[q.id] = q.reverseScored ? 0 : 4;
  const res = scorePsychAssessment(spec, qs, answers, 120);
  assert.equal(res.subscales.length, 4);
  for (const s of res.subscales) {
    assert.equal(s.rawScore, 28);
  }
});
