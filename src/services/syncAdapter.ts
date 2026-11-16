import {
  AssessmentResult,
  AssessmentSessionState,
  LikertValue,
  OurWorldState,
  PersonExportBundle,
  PersonId,
  ProfileIdentity,
  ProfilePrivacySettings,
  SavedResultRecord,
} from '@/src/types';

/**
 * Storage & Sync Adapter Abstraction.
 *
 * Current implementation (`LocalBrowserStorageAdapter`) stores each person's data
 * separately inside browser `localStorage` on this device only.
 * On GitHub Pages static hosting, data does NOT sync automatically between two
 * separate phones/devices without a dedicated authenticated backend (e.g. Firebase
 * Auth + Firestore or Supabase). Future remote providers can implement this
 * `StorageSyncAdapter` interface cleanly without rewriting UI components.
 */
export interface StorageSyncAdapter {
  readonly mode: 'local_browser_only';
  readJson<T>(key: string, validator: (v: unknown) => v is T, fallback: T): T;
  writeJson<T>(key: string, value: T): boolean;
  removeKey(key: string): void;
}

export const localBrowserStorageAdapter: StorageSyncAdapter = {
  mode: 'local_browser_only',
  readJson<T>(key: string, validator: (v: unknown) => v is T, fallback: T): T {
    if (typeof window === 'undefined') return fallback;
    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) return fallback;
      const parsed: unknown = JSON.parse(raw);
      return validator(parsed) ? parsed : fallback;
    } catch {
      return fallback;
    }
  },
  writeJson<T>(key: string, value: T): boolean {
    if (typeof window === 'undefined') return false;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
  removeKey(key: string): void {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Ignore storage removal errors
    }
  },
};

export function isRecordObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

export function isValidPersonId(v: unknown): v is PersonId {
  return v === 'person1' || v === 'person2';
}

export function isValidSessionState(v: unknown): v is AssessmentSessionState {
  if (!isRecordObject(v)) return false;
  if (!isRecordObject(v.answers)) return false;
  for (const [k, val] of Object.entries(v.answers)) {
    const idx = Number(k);
    if (!Number.isInteger(idx) || idx < 1 || idx > 30) return false;
    if (![1, 2, 3, 4, 5].includes(Number(val))) return false;
  }
  return (
    typeof v.currentQuestionIndex === 'number' &&
    v.currentQuestionIndex >= 0 &&
    v.currentQuestionIndex <= 29
  );
}

export function isValidAssessmentResult(v: unknown): v is AssessmentResult {
  if (!isRecordObject(v)) return false;
  return (
    typeof v.answersString === 'string' &&
    /^[12345]{30}$/.test(v.answersString) &&
    isRecordObject(v.scores) &&
    Array.isArray(v.orderedAreas) &&
    v.orderedAreas.length === 6 &&
    Array.isArray(v.topThreeCodes) &&
    typeof v.hollandCode === 'string' &&
    typeof v.calculatedAtIso === 'string'
  );
}

export function isValidNullableResult(v: unknown): v is AssessmentResult | null {
  return v === null || isValidAssessmentResult(v);
}

export function isValidSavedRecordsArray(v: unknown): v is SavedResultRecord[] {
  if (!Array.isArray(v)) return false;
  return v.every(
    (item) =>
      isRecordObject(item) &&
      typeof item.id === 'string' &&
      typeof item.savedAtIso === 'string' &&
      typeof item.hollandCode === 'string' &&
      Array.isArray(item.topAreaNamesAr) &&
      typeof item.answersString === 'string'
  );
}

export function isValidStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((item) => typeof item === 'string');
}

export interface StoredProfilesMeta {
  person1: ProfileIdentity;
  person2: ProfileIdentity;
  activePersonId: PersonId;
  privacy: ProfilePrivacySettings;
}

export function isValidProfilesMeta(v: unknown): v is StoredProfilesMeta {
  if (!isRecordObject(v)) return false;
  return (
    isRecordObject(v.person1) &&
    typeof v.person1.name === 'string' &&
    isRecordObject(v.person2) &&
    typeof v.person2.name === 'string' &&
    isValidPersonId(v.activePersonId) &&
    isRecordObject(v.privacy) &&
    typeof v.privacy.person1IncludeInCompatibility === 'boolean' &&
    typeof v.privacy.person2IncludeInCompatibility === 'boolean'
  );
}

export function isValidOurWorldState(v: unknown): v is OurWorldState {
  if (!isRecordObject(v)) return false;
  return (
    typeof v.sharedNote === 'string' &&
    (v.updatedAtIso === null || typeof v.updatedAtIso === 'string')
  );
}

export function isValidPersonExportBundle(v: unknown): v is PersonExportBundle {
  if (!isRecordObject(v)) return false;
  return (
    v.schemaVersion === 2 &&
    isValidPersonId(v.personId) &&
    typeof v.name === 'string' &&
    typeof v.exportedAtIso === 'string' &&
    isValidSessionState(v.session) &&
    isValidNullableResult(v.latestResult) &&
    isValidSavedRecordsArray(v.savedRecords) &&
    isValidStringArray(v.favoriteMajorIds) &&
    isValidStringArray(v.compareIds)
  );
}

export function sanitizeAnswersMap(
  answers: Record<number, LikertValue>
): Record<number, LikertValue> {
  const clean: Record<number, LikertValue> = {};
  for (let i = 1; i <= 30; i++) {
    const val = answers[i];
    if ([1, 2, 3, 4, 5].includes(Number(val))) {
      clean[i] = Number(val) as LikertValue;
    }
  }
  return clean;
}
