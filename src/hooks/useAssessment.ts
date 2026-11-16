import { useCallback, useEffect, useMemo, useState } from 'react';
import { MINI_IP_QUESTIONS } from '@/src/data/questions/miniIpQuestions';
import { computeCompatibilityReport } from '@/src/scoring/compatibilityEngine';
import { findMissingQuestionIndices, scoreMiniIpAnswers } from '@/src/scoring/riasecScoring';
import {
  isValidNullableResult,
  isValidOurWorldState,
  isValidPersonExportBundle,
  isValidProfilesMeta,
  isValidSavedRecordsArray,
  isValidSessionState,
  isValidStringArray,
  localBrowserStorageAdapter,
  sanitizeAnswersMap,
  StoredProfilesMeta,
} from '@/src/services/syncAdapter';
import {
  AssessmentResult,
  AssessmentSessionState,
  LikertValue,
  OurWorldState,
  PersonExportBundle,
  PersonId,
  SavedResultRecord,
} from '@/src/types';

// Strictly isolated localStorage keys per profile & domain
const KEYS = {
  profilesMeta: 'zahrti_v2_profiles_meta',
  ourWorld: 'zahrti_v2_our_world',
  person1: {
    session: 'zahrti_v2_person1_session',
    latest: 'zahrti_v2_person1_latest',
    history: 'zahrti_v2_person1_history',
    favorites: 'zahrti_v2_person1_favorites',
    compare: 'zahrti_v2_person1_compare',
  },
  person2: {
    session: 'zahrti_v2_person2_session',
    latest: 'zahrti_v2_person2_latest',
    history: 'zahrti_v2_person2_history',
    favorites: 'zahrti_v2_person2_favorites',
    compare: 'zahrti_v2_person2_compare',
  },
} as const;

const INITIAL_SESSION: AssessmentSessionState = {
  answers: {},
  currentQuestionIndex: 0,
  startedAtMs: null,
  completedElapsedSeconds: null,
  lastUpdatedIso: null,
};

const INITIAL_PROFILES_META: StoredProfilesMeta = {
  person1: { id: 'person1', name: '', updatedAtIso: null },
  person2: { id: 'person2', name: '', updatedAtIso: null },
  activePersonId: 'person1',
  privacy: {
    person1IncludeInCompatibility: true,
    person2IncludeInCompatibility: true,
  },
};

const INITIAL_OUR_WORLD: OurWorldState = {
  sharedNote: '',
  updatedAtIso: null,
};

export function useAssessment() {
  // Profiles identity & privacy settings (no hardcoded personal names!)
  const [profilesMeta, setProfilesMeta] = useState<StoredProfilesMeta>(() =>
    localBrowserStorageAdapter.readJson(
      KEYS.profilesMeta,
      isValidProfilesMeta,
      INITIAL_PROFILES_META
    )
  );

  // Separate sessions
  const [p1Session, setP1Session] = useState<AssessmentSessionState>(() =>
    localBrowserStorageAdapter.readJson(KEYS.person1.session, isValidSessionState, INITIAL_SESSION)
  );
  const [p2Session, setP2Session] = useState<AssessmentSessionState>(() =>
    localBrowserStorageAdapter.readJson(KEYS.person2.session, isValidSessionState, INITIAL_SESSION)
  );

  // Separate latest results
  const [p1Latest, setP1Latest] = useState<AssessmentResult | null>(() =>
    localBrowserStorageAdapter.readJson(KEYS.person1.latest, isValidNullableResult, null)
  );
  const [p2Latest, setP2Latest] = useState<AssessmentResult | null>(() =>
    localBrowserStorageAdapter.readJson(KEYS.person2.latest, isValidNullableResult, null)
  );

  // Separate historical records
  const [p1History, setP1History] = useState<SavedResultRecord[]>(() =>
    localBrowserStorageAdapter.readJson(KEYS.person1.history, isValidSavedRecordsArray, [])
  );
  const [p2History, setP2History] = useState<SavedResultRecord[]>(() =>
    localBrowserStorageAdapter.readJson(KEYS.person2.history, isValidSavedRecordsArray, [])
  );

  // Separate favorite majors
  const [p1Favorites, setP1Favorites] = useState<string[]>(() =>
    localBrowserStorageAdapter.readJson(KEYS.person1.favorites, isValidStringArray, [])
  );
  const [p2Favorites, setP2Favorites] = useState<string[]>(() =>
    localBrowserStorageAdapter.readJson(KEYS.person2.favorites, isValidStringArray, [])
  );

  // Separate compare selections
  const [p1Compare, setP1Compare] = useState<string[]>(() =>
    localBrowserStorageAdapter.readJson(KEYS.person1.compare, isValidStringArray, [
      'general-medicine',
      'computer-science',
    ])
  );
  const [p2Compare, setP2Compare] = useState<string[]>(() =>
    localBrowserStorageAdapter.readJson(KEYS.person2.compare, isValidStringArray, [
      'graphic-design',
      'business-administration',
    ])
  );

  // Shared Our World keepsake note
  const [ourWorld, setOurWorld] = useState<OurWorldState>(() =>
    localBrowserStorageAdapter.readJson(KEYS.ourWorld, isValidOurWorldState, INITIAL_OUR_WORLD)
  );

  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Persist changes to isolated keys
  useEffect(() => {
    localBrowserStorageAdapter.writeJson(KEYS.profilesMeta, profilesMeta);
  }, [profilesMeta]);

  useEffect(() => {
    localBrowserStorageAdapter.writeJson(KEYS.person1.session, p1Session);
  }, [p1Session]);
  useEffect(() => {
    localBrowserStorageAdapter.writeJson(KEYS.person2.session, p2Session);
  }, [p2Session]);

  useEffect(() => {
    localBrowserStorageAdapter.writeJson(KEYS.person1.latest, p1Latest);
  }, [p1Latest]);
  useEffect(() => {
    localBrowserStorageAdapter.writeJson(KEYS.person2.latest, p2Latest);
  }, [p2Latest]);

  useEffect(() => {
    localBrowserStorageAdapter.writeJson(KEYS.person1.history, p1History);
  }, [p1History]);
  useEffect(() => {
    localBrowserStorageAdapter.writeJson(KEYS.person2.history, p2History);
  }, [p2History]);

  useEffect(() => {
    localBrowserStorageAdapter.writeJson(KEYS.person1.favorites, p1Favorites);
  }, [p1Favorites]);
  useEffect(() => {
    localBrowserStorageAdapter.writeJson(KEYS.person2.favorites, p2Favorites);
  }, [p2Favorites]);

  useEffect(() => {
    localBrowserStorageAdapter.writeJson(KEYS.person1.compare, p1Compare);
  }, [p1Compare]);
  useEffect(() => {
    localBrowserStorageAdapter.writeJson(KEYS.person2.compare, p2Compare);
  }, [p2Compare]);

  useEffect(() => {
    localBrowserStorageAdapter.writeJson(KEYS.ourWorld, ourWorld);
  }, [ourWorld]);

  const activePersonId = profilesMeta.activePersonId;

  const getDisplayName = useCallback(
    (personId: PersonId): string => {
      const raw = personId === 'person1' ? profilesMeta.person1.name : profilesMeta.person2.name;
      const trimmed = raw.trim();
      if (trimmed.length > 0) return trimmed;
      return personId === 'person1' ? 'الشخص الأول' : 'الشخص الثاني';
    },
    [profilesMeta.person1.name, profilesMeta.person2.name]
  );

  const hasCustomNames = useMemo(
    () =>
      profilesMeta.person1.name.trim().length > 0 &&
      profilesMeta.person2.name.trim().length > 0,
    [profilesMeta.person1.name, profilesMeta.person2.name]
  );

  const setProfileNames = useCallback((person1Name: string, person2Name: string) => {
    const nowIso = new Date().toISOString();
    setProfilesMeta((prev) => ({
      ...prev,
      person1: { id: 'person1', name: person1Name.trim().slice(0, 40), updatedAtIso: nowIso },
      person2: { id: 'person2', name: person2Name.trim().slice(0, 40), updatedAtIso: nowIso },
    }));
  }, []);

  const setActivePersonId = useCallback((personId: PersonId) => {
    setProfilesMeta((prev) => ({ ...prev, activePersonId: personId }));
    setAnalysisError(null);
  }, []);

  const setCompatibilityConsent = useCallback((personId: PersonId, allowed: boolean) => {
    setProfilesMeta((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        person1IncludeInCompatibility:
          personId === 'person1' ? allowed : prev.privacy.person1IncludeInCompatibility,
        person2IncludeInCompatibility:
          personId === 'person2' ? allowed : prev.privacy.person2IncludeInCompatibility,
      },
    }));
  }, []);

  // Active person bindings (strictly isolated — zero bleed from the other person)
  const session = activePersonId === 'person1' ? p1Session : p2Session;
  const setActiveSession = activePersonId === 'person1' ? setP1Session : setP2Session;

  const latestResult = activePersonId === 'person1' ? p1Latest : p2Latest;
  const setActiveLatest = activePersonId === 'person1' ? setP1Latest : setP2Latest;

  const savedRecords = activePersonId === 'person1' ? p1History : p2History;
  const setActiveHistory = activePersonId === 'person1' ? setP1History : setP2History;

  const favoriteMajorIds = activePersonId === 'person1' ? p1Favorites : p2Favorites;
  const setActiveFavorites = activePersonId === 'person1' ? setP1Favorites : setP2Favorites;

  const compareIds = activePersonId === 'person1' ? p1Compare : p2Compare;
  const setActiveCompare = activePersonId === 'person1' ? setP1Compare : setP2Compare;

  const countAnswered = (s: AssessmentSessionState) =>
    Object.keys(s.answers).filter((k) => [1, 2, 3, 4, 5].includes(s.answers[Number(k)])).length;

  const person1AnsweredCount = useMemo(() => countAnswered(p1Session), [p1Session]);
  const person2AnsweredCount = useMemo(() => countAnswered(p2Session), [p2Session]);

  const answeredCount =
    activePersonId === 'person1' ? person1AnsweredCount : person2AnsweredCount;

  const missingQuestionIndices = useMemo(
    () => findMissingQuestionIndices(session.answers),
    [session.answers]
  );

  const isComplete = missingQuestionIndices.length === 0;

  const setAnswer = useCallback(
    (questionIndex: number, value: LikertValue) => {
      setActiveSession((prev) => ({
        ...prev,
        startedAtMs: prev.startedAtMs ?? Date.now(),
        answers: {
          ...prev.answers,
          [questionIndex]: value,
        },
        lastUpdatedIso: new Date().toISOString(),
      }));
    },
    [setActiveSession]
  );

  const setCurrentQuestionIndex = useCallback(
    (index: number) => {
      const bounded = Math.max(0, Math.min(MINI_IP_QUESTIONS.length - 1, index));
      setActiveSession((prev) => ({
        ...prev,
        startedAtMs: prev.startedAtMs ?? Date.now(),
        currentQuestionIndex: bounded,
      }));
    },
    [setActiveSession]
  );

  /**
   * Starts a fresh quiz session for the specified person WITHOUT deleting their saved history.
   */
  const startNewAssessment = useCallback(
    (personId: PersonId = activePersonId) => {
      const targetSessionSetter = personId === 'person1' ? setP1Session : setP2Session;
      const currentLatest = personId === 'person1' ? p1Latest : p2Latest;
      const targetHistorySetter = personId === 'person1' ? setP1History : setP2History;

      if (currentLatest) {
        const archiveRecord: SavedResultRecord = {
          id: `res_${personId}_${Date.now()}`,
          savedAtIso: currentLatest.calculatedAtIso || new Date().toISOString(),
          hollandCode: currentLatest.hollandCode,
          topAreaNamesAr: currentLatest.topThreeCodes.map(
            (code) => currentLatest.scores[code].nameAr
          ),
          answersString: currentLatest.answersString,
          scoringMode: currentLatest.scoringMode,
          result: currentLatest,
        };
        targetHistorySetter((prev) => {
          const alreadyArchived = prev.some(
            (r) =>
              r.answersString === archiveRecord.answersString &&
              r.savedAtIso === archiveRecord.savedAtIso
          );
          return alreadyArchived ? prev : [archiveRecord, ...prev.slice(0, 14)];
        });
      }

      targetSessionSetter(INITIAL_SESSION);
      setAnalysisError(null);
    },
    [activePersonId, p1Latest, p2Latest]
  );

  /**
   * Completely clears one person's data (answers, latest result, history, favorites).
   */
  const clearPersonData = useCallback((personId: PersonId) => {
    if (personId === 'person1') {
      setP1Session(INITIAL_SESSION);
      setP1Latest(null);
      setP1History([]);
      setP1Favorites([]);
    } else {
      setP2Session(INITIAL_SESSION);
      setP2Latest(null);
      setP2History([]);
      setP2Favorites([]);
    }
    setAnalysisError(null);
  }, []);

  /**
   * Analyzes the active person's 30 answers.
   * Automatically uses verified local Mini-IP calculation on static hosts (GitHub Pages)
   * or if `/api/assessment/score` returns 404/non-JSON.
   */
  const analyzeResults = useCallback(
    async (forceLocalFallback = false): Promise<AssessmentResult | null> => {
      const cleanAnswers = sanitizeAnswersMap(session.answers);
      const missing = findMissingQuestionIndices(cleanAnswers);
      if (missing.length > 0) {
        setAnalysisError(`لا يزال هناك ${missing.length} سؤالاً لم تتم الإجابة عنه.`);
        return null;
      }

      setIsAnalyzing(true);
      setAnalysisError(null);

      const elapsedSeconds = session.startedAtMs
        ? Math.max(1, Math.round((Date.now() - session.startedAtMs) / 1000))
        : session.completedElapsedSeconds;

      const archiveAndStoreResult = (res: AssessmentResult) => {
        setActiveLatest(res);
        setActiveSession((prev) => ({ ...prev, completedElapsedSeconds: elapsedSeconds }));
        const autoRecord: SavedResultRecord = {
          id: `res_${activePersonId}_${Date.now()}`,
          savedAtIso: res.calculatedAtIso,
          hollandCode: res.hollandCode,
          topAreaNamesAr: res.topThreeCodes.map((code) => res.scores[code].nameAr),
          answersString: res.answersString,
          scoringMode: res.scoringMode,
          result: res,
        };
        setActiveHistory((prev) => [autoRecord, ...prev.slice(0, 14)]);
      };

      try {
        const isStaticHost =
          typeof window !== 'undefined' &&
          (window.location.hostname.endsWith('github.io') ||
            window.location.protocol === 'file:');

        if (forceLocalFallback || isStaticHost) {
          const local = scoreMiniIpAnswers(cleanAnswers, {
            scoringMode: 'local_mini_ip_formula',
            elapsedSeconds,
          });
          archiveAndStoreResult(local);
          return local;
        }

        const response = await fetch('/api/assessment/score', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            answers: cleanAnswers,
            elapsedSeconds,
          }),
        });

        const contentType = response.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          // Static fallback (e.g., nginx/vite preview/GitHub Pages returned HTML 404)
          const local = scoreMiniIpAnswers(cleanAnswers, {
            scoringMode: 'local_mini_ip_formula',
            elapsedSeconds,
          });
          archiveAndStoreResult(local);
          return local;
        }

        const data = (await response.json()) as {
          result?: AssessmentResult;
          error?: string;
        };

        if (!response.ok || !data.result) {
          // Transparently compute locally if server returned 502/404 upstream failure
          const local = scoreMiniIpAnswers(cleanAnswers, {
            scoringMode: 'local_mini_ip_formula',
            elapsedSeconds,
          });
          archiveAndStoreResult(local);
          return local;
        }

        archiveAndStoreResult(data.result);
        return data.result;
      } catch {
        const local = scoreMiniIpAnswers(cleanAnswers, {
          scoringMode: 'local_mini_ip_formula',
          elapsedSeconds,
        });
        archiveAndStoreResult(local);
        return local;
      } finally {
        setIsAnalyzing(false);
      }
    },
    [
      activePersonId,
      session.answers,
      session.completedElapsedSeconds,
      session.startedAtMs,
      setActiveHistory,
      setActiveLatest,
      setActiveSession,
    ]
  );

  const saveCurrentResult = useCallback(() => {
    if (!latestResult) return false;
    const record: SavedResultRecord = {
      id: `res_${activePersonId}_${Date.now()}`,
      savedAtIso: new Date().toISOString(),
      hollandCode: latestResult.hollandCode,
      topAreaNamesAr: latestResult.topThreeCodes.map((code) => latestResult.scores[code].nameAr),
      answersString: latestResult.answersString,
      scoringMode: latestResult.scoringMode,
      result: latestResult,
    };
    setActiveHistory((prev) => [record, ...prev.slice(0, 14)]);
    return true;
  }, [activePersonId, latestResult, setActiveHistory]);

  const restoreSavedRecord = useCallback(
    (recordId: string) => {
      const target = savedRecords.find((r) => r.id === recordId);
      if (!target) return false;
      if (target.result) {
        setActiveLatest(target.result);
        return true;
      }
      if (/^[12345]{30}$/.test(target.answersString)) {
        const rebuilt: Record<number, LikertValue> = {};
        for (let i = 0; i < 30; i++) {
          rebuilt[i + 1] = Number(target.answersString[i]) as LikertValue;
        }
        const computed = scoreMiniIpAnswers(rebuilt, { scoringMode: target.scoringMode });
        setActiveLatest(computed);
        return true;
      }
      return false;
    },
    [savedRecords, setActiveLatest]
  );

  const deleteSavedRecord = useCallback(
    (id: string) => {
      setActiveHistory((prev) => prev.filter((r) => r.id !== id));
    },
    [setActiveHistory]
  );

  const toggleFavoriteMajor = useCallback(
    (majorId: string) => {
      setActiveFavorites((prev) =>
        prev.includes(majorId) ? prev.filter((id) => id !== majorId) : [majorId, ...prev]
      );
    },
    [setActiveFavorites]
  );

  const toggleCompareMajor = useCallback(
    (majorId: string) => {
      setActiveCompare((prev) => {
        if (prev.includes(majorId)) {
          return prev.filter((id) => id !== majorId);
        }
        if (prev.length >= 3) {
          return [...prev.slice(1), majorId];
        }
        return [...prev, majorId];
      });
    },
    [setActiveCompare]
  );

  const updateOurWorldNote = useCallback((note: string) => {
    setOurWorld({
      sharedNote: note.slice(0, 1200),
      updatedAtIso: new Date().toISOString(),
    });
  }, []);

  const exportPersonBundle = useCallback(
    (personId: PersonId): PersonExportBundle => {
      const isP1 = personId === 'person1';
      return {
        schemaVersion: 2,
        personId,
        name: (isP1 ? profilesMeta.person1.name : profilesMeta.person2.name).trim(),
        exportedAtIso: new Date().toISOString(),
        session: isP1 ? p1Session : p2Session,
        latestResult: isP1 ? p1Latest : p2Latest,
        savedRecords: isP1 ? p1History : p2History,
        favoriteMajorIds: isP1 ? p1Favorites : p2Favorites,
        compareIds: isP1 ? p1Compare : p2Compare,
      };
    },
    [
      p1Compare,
      p1Favorites,
      p1History,
      p1Latest,
      p1Session,
      p2Compare,
      p2Favorites,
      p2History,
      p2Latest,
      p2Session,
      profilesMeta.person1.name,
      profilesMeta.person2.name,
    ]
  );

  const importPersonBundle = useCallback(
    (rawJson: string, targetPersonId: PersonId): { ok: boolean; error?: string } => {
      try {
        const parsed: unknown = JSON.parse(rawJson);
        if (!isValidPersonExportBundle(parsed)) {
          return { ok: false, error: 'صيغة الملف غير صالحة أو لا تطابق بنية بيانات زهرتي.' };
        }
        if (targetPersonId === 'person1') {
          setP1Session(parsed.session);
          setP1Latest(parsed.latestResult);
          setP1History(parsed.savedRecords);
          setP1Favorites(parsed.favoriteMajorIds);
          setP1Compare(parsed.compareIds);
        } else {
          setP2Session(parsed.session);
          setP2Latest(parsed.latestResult);
          setP2History(parsed.savedRecords);
          setP2Favorites(parsed.favoriteMajorIds);
          setP2Compare(parsed.compareIds);
        }
        if (parsed.name.trim()) {
          setProfilesMeta((prev) => ({
            ...prev,
            [targetPersonId]: {
              id: targetPersonId,
              name: parsed.name.trim().slice(0, 40),
              updatedAtIso: new Date().toISOString(),
            },
          }));
        }
        return { ok: true };
      } catch {
        return { ok: false, error: 'تعذر قراءة ملف JSON. تأكدي من أنه ملف نصي سليم.' };
      }
    },
    []
  );

  // Compatibility gating: strictly requires BOTH Person 1 and Person 2 completed results & consent
  const compatibilityLockedReason = useMemo(() => {
    if (!p1Latest && !p2Latest) {
      return 'يلزم إكمال الاختبار من قِبل الطرفين أولاً لحساب التوافق الحقيقي.';
    }
    if (!p1Latest) {
      return `لم يُكمل ${getDisplayName('person1')} الاختبار بعد.`;
    }
    if (!p2Latest) {
      return `لم يُكمل ${getDisplayName('person2')} الاختبار بعد.`;
    }
    if (
      !profilesMeta.privacy.person1IncludeInCompatibility ||
      !profilesMeta.privacy.person2IncludeInCompatibility
    ) {
      return 'أحد الطرفين اختار إيقاف مشاركة نتيجته في حساب التوافق من الإعدادات.';
    }
    return null;
  }, [
    getDisplayName,
    p1Latest,
    p2Latest,
    profilesMeta.privacy.person1IncludeInCompatibility,
    profilesMeta.privacy.person2IncludeInCompatibility,
  ]);

  const compatibilityReport = useMemo(() => {
    if (compatibilityLockedReason !== null) return null;
    return computeCompatibilityReport(
      getDisplayName('person1'),
      getDisplayName('person2'),
      p1Latest,
      p2Latest
    );
  }, [compatibilityLockedReason, getDisplayName, p1Latest, p2Latest]);

  return {
    // Profiles & Identity
    profilesMeta,
    activePersonId,
    activePersonName: getDisplayName(activePersonId),
    person1Name: getDisplayName('person1'),
    person2Name: getDisplayName('person2'),
    hasCustomNames,
    getDisplayName,
    setProfileNames,
    setActivePersonId,
    setCompatibilityConsent,

    // Active Person Assessment State
    session,
    answeredCount,
    missingQuestionIndices,
    isComplete,
    latestResult,
    savedRecords,
    favoriteMajorIds,
    compareIds,
    isAnalyzing,
    analysisError,

    // Completion summaries (privacy-safe: only boolean & count, never answers/results)
    person1Completed: Boolean(p1Latest),
    person2Completed: Boolean(p2Latest),
    person1AnsweredCount,
    person2AnsweredCount,

    // Assessment Actions
    setAnswer,
    setCurrentQuestionIndex,
    startNewAssessment,
    resetProgress: () => startNewAssessment(activePersonId),
    clearPersonData,
    analyzeResults,
    saveCurrentResult,
    restoreSavedRecord,
    deleteSavedRecord,
    toggleFavoriteMajor,
    toggleCompareMajor,
    setCompareIds: setActiveCompare,

    // Compatibility & Our World
    compatibilityLockedReason,
    compatibilityReport,
    ourWorld,
    updateOurWorldNote,

    // Backup & Sync
    exportPersonBundle,
    importPersonBundle,
  };
}
