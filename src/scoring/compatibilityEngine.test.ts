import test from 'node:test';
import assert from 'node:assert/strict';
import { computeCompatibilityReport } from './compatibilityEngine';
import { scoreMiniIpAnswers } from './riasecScoring';
import { isValidPersonExportBundle, isValidSessionState } from '../services/syncAdapter';
import { LikertValue } from '../types';

function makeAnswers(pattern: Partial<Record<number, LikertValue>>, def: LikertValue = 2): Record<number, LikertValue> {
  const out: Record<number, LikertValue> = {};
  for (let i = 1; i <= 30; i++) {
    out[i] = pattern[i] ?? def;
  }
  return out;
}

test('computeCompatibilityReport returns null if either person has not completed the test', () => {
  const res1 = scoreMiniIpAnswers(makeAnswers({ 1: 5, 2: 5 }));
  assert.equal(computeCompatibilityReport('أحمد', 'سارة', res1, null), null);
  assert.equal(computeCompatibilityReport('أحمد', 'سارة', null, res1), null);
  assert.equal(computeCompatibilityReport('أحمد', 'سارة', null, null), null);
});

test('identical RIASEC profiles yield 100% compatibility and valid breakdown', () => {
  const res1 = scoreMiniIpAnswers(
    makeAnswers({ 2: 5, 8: 5, 14: 5, 20: 5, 26: 5, 3: 5, 9: 5, 15: 5 })
  );
  const report = computeCompatibilityReport('نور', 'ليلى', res1, res1);
  assert.ok(report);
  assert.equal(report.harmonyIndex, 100);
  assert.equal(report.cosineSimilarityPct, 100);
  assert.equal(report.proximityAlignmentPct, 100);
  assert.equal(report.complementaryDifferences.length, 0);
  assert.ok(report.personalitySummaryPerson1Ar.includes('نور'));
  assert.ok(report.personalitySummaryPerson2Ar.includes('ليلى'));
});

test('complementary opposite profiles yield realistic separation and highlights differences', () => {
  const p1 = scoreMiniIpAnswers(
    makeAnswers({ 2: 5, 8: 5, 14: 5, 20: 5, 26: 5 }, 1) // Pure Investigative
  );
  const p2 = scoreMiniIpAnswers(
    makeAnswers({ 4: 5, 10: 5, 16: 5, 22: 5, 28: 5 }, 1) // Pure Social
  );
  const report = computeCompatibilityReport('ريم', 'دانة', p1, p2);
  assert.ok(report);
  assert.ok(report.harmonyIndex < 65);
  assert.ok(report.complementaryDifferences.length >= 2);
});

test('schema validators reject corrupted session and export bundles', () => {
  assert.equal(isValidSessionState({ answers: { 99: 5 }, currentQuestionIndex: 0 }), false);
  assert.equal(isValidSessionState({ answers: { 1: 4 }, currentQuestionIndex: 0 }), true);
  assert.equal(isValidPersonExportBundle({ schemaVersion: 1 }), false);
});
