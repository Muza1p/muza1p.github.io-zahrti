import { useCallback, useEffect, useMemo, useState } from 'react';
import { MINI_IP_QUESTIONS } from '@/src/data/questions/miniIpQuestions';
import { findMissingQuestionIndices, scoreMiniIpAnswers } from '@/src/scoring/riasecScoring';
import {
  AssessmentResult,
  AssessmentSessionState,
  LikertValue,
  SavedResultRecord,
} from '@/src/types';

const STORAGE_SESSION_KEY = 'zahrti_assessment_session_v1';
const STORAGE_RESULT_KEY = 'zahrti_latest_result_v1';
const STORAGE_SAVED_LIST_KEY = 'zahrti_saved_results_v1';
const STORAGE_COMPARE_KEY = 'zahrti_compare_majors_v1';

const INITIAL_SESSION: AssessmentSessionState = {
  answers: {},
  currentQuestionIndex: 0,
  startedAtMs: null,
  completedElapsedSeconds: null,
  lastUpdatedIso: null,
};

function safeReadJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeWriteJson<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota errors gracefully
  }
}

export function useAssessment() {
  const [session, setSession] = useState<AssessmentSessionState>(() =>
    safeReadJson<AssessmentSessionState>(STORAGE_SESSION_KEY, INITIAL_SESSION)
  );

  const [latestResult, setLatestResult] = useState<AssessmentResult | null>(() =>
    safeReadJson<AssessmentResult | null>(STORAGE_RESULT_KEY, null)
  );

  const [savedRecords, setSavedRecords] = useState<SavedResultRecord[]>(() =>
    safeReadJson<SavedResultRecord[]>(STORAGE_SAVED_LIST_KEY, [])
  );

  const [compareIds, setCompareIds] = useState<string[]>(() =>
    safeReadJson<string[]>(STORAGE_COMPARE_KEY, ['general-medicine', 'computer-science'])
  );

  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  useEffect(() => {
    safeWriteJson(STORAGE_SESSION_KEY, session);
  }, [session]);

  useEffect(() => {
    if (latestResult) {
      safeWriteJson(STORAGE_RESULT_KEY, latestResult);
    }
  }, [latestResult]);

  useEffect(() => {
    safeWriteJson(STORAGE_SAVED_LIST_KEY, savedRecords);
  }, [savedRecords]);

  useEffect(() => {
    safeWriteJson(STORAGE_COMPARE_KEY, compareIds);
  }, [compareIds]);

  const answeredCount = useMemo(
    () => Object.keys(session.answers).filter((k) => [1, 2, 3, 4, 5].includes(session.answers[Number(k)])).length,
    [session.answers]
  );

  const missingQuestionIndices = useMemo(
    () => findMissingQuestionIndices(session.answers),
    [session.answers]
  );

  const isComplete = missingQuestionIndices.length === 0;

  const setAnswer = useCallback((questionIndex: number, value: LikertValue) => {
    setSession((prev) => ({
      ...prev,
      startedAtMs: prev.startedAtMs ?? Date.now(),
      answers: {
        ...prev.answers,
        [questionIndex]: value,
      },
      lastUpdatedIso: new Date().toISOString(),
    }));
  }, []);

  const setCurrentQuestionIndex = useCallback((index: number) => {
    const bounded = Math.max(0, Math.min(MINI_IP_QUESTIONS.length - 1, index));
    setSession((prev) => ({
      ...prev,
      startedAtMs: prev.startedAtMs ?? Date.now(),
      currentQuestionIndex: bounded,
    }));
  }, []);

  const resetProgress = useCallback(() => {
    setSession(INITIAL_SESSION);
    setLatestResult(null);
    setAnalysisError(null);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(STORAGE_SESSION_KEY);
        window.localStorage.removeItem(STORAGE_RESULT_KEY);
      } catch {
        // Ignore
      }
    }
  }, []);

  const analyzeResults = useCallback(async (forceLocalFallback = false): Promise<AssessmentResult | null> => {
    const missing = findMissingQuestionIndices(session.answers);
    if (missing.length > 0) {
      setAnalysisError(`لا يزال هناك ${missing.length} سؤالاً لم تتم الإجابة عنه.`);
      return null;
    }

    setIsAnalyzing(true);
    setAnalysisError(null);

    const elapsedSeconds = session.startedAtMs
      ? Math.max(1, Math.round((Date.now() - session.startedAtMs) / 1000))
      : session.completedElapsedSeconds;

    try {
      if (forceLocalFallback) {
        const local = scoreMiniIpAnswers(session.answers, {
          scoringMode: 'local_mini_ip_formula',
          elapsedSeconds,
        });
        setLatestResult(local);
        setSession((prev) => ({ ...prev, completedElapsedSeconds: elapsedSeconds }));
        return local;
      }

      const response = await fetch('/api/assessment/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: session.answers,
          elapsedSeconds,
        }),
      });

      const data = (await response.json()) as {
        result?: AssessmentResult;
        error?: string;
        fallbackAvailable?: boolean;
      };

      if (!response.ok || !data.result) {
        setAnalysisError(
          data.error || 'تعذر إتمام التحليل عبر الخادم. إجاباتج محفوظة بأمان ويمكنكِ المحاولة مجدداً.'
        );
        return null;
      }

      setLatestResult(data.result);
      setSession((prev) => ({ ...prev, completedElapsedSeconds: elapsedSeconds }));
      return data.result;
    } catch {
      // Network unreachable: still do not fake official API; compute verified local Mini-IP formula transparently
      const local = scoreMiniIpAnswers(session.answers, {
        scoringMode: 'local_mini_ip_formula',
        elapsedSeconds,
      });
      setLatestResult(local);
      setSession((prev) => ({ ...prev, completedElapsedSeconds: elapsedSeconds }));
      return local;
    } finally {
      setIsAnalyzing(false);
    }
  }, [session.answers, session.startedAtMs, session.completedElapsedSeconds]);

  const saveCurrentResult = useCallback(() => {
    if (!latestResult) return false;
    const record: SavedResultRecord = {
      id: `res_${Date.now()}`,
      savedAtIso: new Date().toISOString(),
      hollandCode: latestResult.hollandCode,
      topAreaNamesAr: latestResult.topThreeCodes.map(
        (code) => latestResult.scores[code].nameAr
      ),
      answersString: latestResult.answersString,
      scoringMode: latestResult.scoringMode,
    };
    setSavedRecords((prev) => [record, ...prev.slice(0, 9)]);
    return true;
  }, [latestResult]);

  const deleteSavedRecord = useCallback((id: string) => {
    setSavedRecords((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const toggleCompareMajor = useCallback((majorId: string) => {
    setCompareIds((prev) => {
      if (prev.includes(majorId)) {
        return prev.filter((id) => id !== majorId);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), majorId];
      }
      return [...prev, majorId];
    });
  }, []);

  return {
    session,
    answeredCount,
    missingQuestionIndices,
    isComplete,
    latestResult,
    savedRecords,
    compareIds,
    isAnalyzing,
    analysisError,
    setAnswer,
    setCurrentQuestionIndex,
    resetProgress,
    analyzeResults,
    saveCurrentResult,
    deleteSavedRecord,
    toggleCompareMajor,
    setCompareIds,
  };
}
