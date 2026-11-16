import { useCallback, useEffect, useMemo, useState } from 'react';
import { getInstrumentById } from '@/src/data/assessments/registry';
import { scorePsychAssessment } from '@/src/scoring/psychScoringEngine';
import { localBrowserStorageAdapter } from '@/src/services/syncAdapter';
import {
  PsychCompletedResult,
  PsychInstrumentSpec,
  PsychPlatformExportBundle,
  PsychQuestion,
  PsychSessionState,
} from '@/src/types/psychology';

const PSYCH_KEYS = {
  profileName: 'zahrti_psych_v3_name',
  sessions: 'zahrti_psych_v3_sessions',
  results: 'zahrti_psych_v3_results',
} as const;

function isValidSessionsMap(raw: unknown): raw is Record<string, PsychSessionState> {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return false;
  for (const val of Object.values(raw)) {
    if (!val || typeof val !== 'object') return false;
    const rec = val as Record<string, unknown>;
    if (
      typeof rec.instrumentId !== 'string' ||
      typeof rec.currentIndex !== 'number' ||
      !rec.answers ||
      typeof rec.answers !== 'object'
    ) {
      return false;
    }
  }
  return true;
}

function isValidResultsArray(raw: unknown): raw is PsychCompletedResult[] {
  if (!Array.isArray(raw)) return false;
  return raw.every((item) => {
    if (!item || typeof item !== 'object') return false;
    const rec = item as Record<string, unknown>;
    return (
      typeof rec.id === 'string' &&
      typeof rec.instrumentId === 'string' &&
      typeof rec.completedAtIso === 'string' &&
      typeof rec.primaryScore === 'number' &&
      Array.isArray(rec.subscales)
    );
  });
}

function isValidString(raw: unknown): raw is string {
  return typeof raw === 'string';
}

export function usePsychPlatform() {
  const [personalName, setPersonalNameState] = useState<string>(() =>
    localBrowserStorageAdapter.readJson(PSYCH_KEYS.profileName, isValidString, '')
  );

  const [sessions, setSessions] = useState<Record<string, PsychSessionState>>(() =>
    localBrowserStorageAdapter.readJson(PSYCH_KEYS.sessions, isValidSessionsMap, {})
  );

  const [completedResults, setCompletedResults] = useState<PsychCompletedResult[]>(() =>
    localBrowserStorageAdapter.readJson(PSYCH_KEYS.results, isValidResultsArray, [])
  );

  useEffect(() => {
    localBrowserStorageAdapter.writeJson(PSYCH_KEYS.profileName, personalName);
  }, [personalName]);

  useEffect(() => {
    localBrowserStorageAdapter.writeJson(PSYCH_KEYS.sessions, sessions);
  }, [sessions]);

  useEffect(() => {
    localBrowserStorageAdapter.writeJson(PSYCH_KEYS.results, completedResults);
  }, [completedResults]);

  const setPersonalName = useCallback((name: string) => {
    setPersonalNameState(name.trim().slice(0, 40));
  }, []);

  const getSession = useCallback(
    (instrumentId: string): PsychSessionState | undefined => sessions[instrumentId],
    [sessions]
  );

  const saveAnswer = useCallback(
    (instrumentId: string, questionId: string, value: number, nextIndex?: number) => {
      const nowIso = new Date().toISOString();
      setSessions((prev) => {
        const existing = prev[instrumentId] ?? {
          instrumentId,
          answers: {},
          currentIndex: 0,
          startedAtIso: nowIso,
          lastUpdatedIso: nowIso,
        };
        return {
          ...prev,
          [instrumentId]: {
            ...existing,
            answers: {
              ...existing.answers,
              [questionId]: value,
            },
            currentIndex: typeof nextIndex === 'number' ? nextIndex : existing.currentIndex,
            lastUpdatedIso: nowIso,
          },
        };
      });
    },
    []
  );

  const setCurrentIndex = useCallback((instrumentId: string, index: number) => {
    const nowIso = new Date().toISOString();
    setSessions((prev) => {
      const existing = prev[instrumentId] ?? {
        instrumentId,
        answers: {},
        currentIndex: 0,
        startedAtIso: nowIso,
        lastUpdatedIso: nowIso,
      };
      return {
        ...prev,
        [instrumentId]: {
          ...existing,
          currentIndex: Math.max(0, index),
          lastUpdatedIso: nowIso,
        },
      };
    });
  }, []);

  const resetSession = useCallback((instrumentId: string) => {
    setSessions((prev) => {
      const next = { ...prev };
      delete next[instrumentId];
      return next;
    });
  }, []);

  const submitAssessment = useCallback(
    (spec: PsychInstrumentSpec, questions: PsychQuestion[]): PsychCompletedResult => {
      const activeSession = sessions[spec.id];
      const answers = activeSession?.answers ?? {};
      const startedMs = activeSession?.startedAtIso ? Date.parse(activeSession.startedAtIso) : Date.now();
      const elapsedSeconds = Number.isNaN(startedMs)
        ? 60
        : Math.max(5, Math.round((Date.now() - startedMs) / 1000));

      const result = scorePsychAssessment(spec, questions, answers, elapsedSeconds);

      setCompletedResults((prev) => {
        const recent = prev[0];
        if (
          recent &&
          recent.instrumentId === result.instrumentId &&
          Math.abs(Date.parse(result.completedAtIso) - Date.parse(recent.completedAtIso)) < 2500 &&
          JSON.stringify(recent.answers) === JSON.stringify(result.answers)
        ) {
          return prev;
        }
        return [result, ...prev.slice(0, 79)];
      });

      resetSession(spec.id);
      return result;
    },
    [resetSession, sessions]
  );

  const getLatestResult = useCallback(
    (instrumentId: string): PsychCompletedResult | undefined =>
      completedResults.find((r) => r.instrumentId === instrumentId),
    [completedResults]
  );

  const getHistoryForInstrument = useCallback(
    (instrumentId: string): PsychCompletedResult[] =>
      completedResults.filter((r) => r.instrumentId === instrumentId),
    [completedResults]
  );

  const deleteResult = useCallback((resultId: string) => {
    setCompletedResults((prev) => prev.filter((r) => r.id !== resultId));
  }, []);

  const clearAllPsychData = useCallback(() => {
    setPersonalNameState('');
    setSessions({});
    setCompletedResults([]);
  }, []);

  const exportFullBundle = useCallback(
    (
      careerResult: unknown,
      careerHistory: unknown[],
      favoriteMajorIds: string[],
      compareMajorIds: string[]
    ): PsychPlatformExportBundle => ({
      schemaVersion: 3,
      platform: 'zahrti_single_user_psych',
      exportedAtIso: new Date().toISOString(),
      sessions,
      completedResults,
      careerResult,
      careerHistory,
      favoriteMajorIds,
      compareMajorIds,
    }),
    [completedResults, sessions]
  );

  const importPsychBundle = useCallback((rawJson: string): { ok: boolean; error?: string } => {
    try {
      const parsed: unknown = JSON.parse(rawJson);
      if (!parsed || typeof parsed !== 'object') {
        return { ok: false, error: 'صيغة الملف غير صالحة.' };
      }
      const obj = parsed as Record<string, unknown>;
      if (obj.platform !== 'zahrti_single_user_psych' || obj.schemaVersion !== 3) {
        return { ok: false, error: 'هذا الملف لا يطابق صيغة تقرير/نسخة زهرتي الشاملة.' };
      }
      if (!isValidSessionsMap(obj.sessions) || !isValidResultsArray(obj.completedResults)) {
        return { ok: false, error: 'تحتوي النسخة على سجلات تالفة أو غير مكتملة.' };
      }
      setSessions(obj.sessions);
      setCompletedResults(obj.completedResults);
      return { ok: true };
    } catch {
      return { ok: false, error: 'تعذر قراءة الملف. تأكدي من أنه بصيغة JSON سليمة.' };
    }
  }, []);

  const completedInstrumentIds = useMemo(() => {
    const set = new Set<string>();
    for (const r of completedResults) set.add(r.instrumentId);
    return Array.from(set);
  }, [completedResults]);

  const anySafetyFlag = useMemo(
    () => completedResults.some((r) => r.safetyTriggered),
    [completedResults]
  );

  const repeatedInstruments = useMemo(() => {
    const counts: Record<string, PsychCompletedResult[]> = {};
    for (const r of completedResults) {
      const spec = getInstrumentById(r.instrumentId);
      if (!spec?.supportsRepeatedComparison) continue;
      if (!counts[r.instrumentId]) counts[r.instrumentId] = [];
      counts[r.instrumentId].push(r);
    }
    return Object.entries(counts)
      .filter(([, list]) => list.length >= 2)
      .map(([instrumentId, entries]) => ({
        instrumentId,
        spec: getInstrumentById(instrumentId)!,
        entries: [...entries].sort(
          (a, b) => Date.parse(a.completedAtIso) - Date.parse(b.completedAtIso)
        ),
      }));
  }, [completedResults]);

  return {
    personalName,
    setPersonalName,
    sessions,
    completedResults,
    completedInstrumentIds,
    anySafetyFlag,
    repeatedInstruments,
    getSession,
    saveAnswer,
    setCurrentIndex,
    resetSession,
    submitAssessment,
    getLatestResult,
    getHistoryForInstrument,
    deleteResult,
    clearAllPsychData,
    exportFullBundle,
    importPsychBundle,
  };
}
