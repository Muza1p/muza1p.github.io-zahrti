export type PsychDomainId =
  | 'personality'
  | 'emotions'
  | 'relationships'
  | 'anxiety_stress'
  | 'behavior_habits'
  | 'cognitive_social'
  | 'personal_growth'
  | 'career_riasec';

export type ScientificStatus =
  | 'standardized_open'
  | 'standardized_free_attribution'
  | 'exploratory_unstandardized'
  | 'requires_license_reference';

export type ArabicValidationStatus =
  | 'published_arabic_studies'
  | 'preliminary_translation_needs_validation';

export type PsychSeverityLevel =
  | 'minimal'
  | 'mild'
  | 'moderate'
  | 'moderately_severe'
  | 'severe'
  | 'informational';

export type PsychChartType = 'radar' | 'bars' | 'gauge' | 'none';

export interface PsychScaleOption {
  value: number;
  labelAr: string;
  descriptionAr?: string;
}

export interface PsychQuestion {
  id: string;
  /** Internal sequence index only; NEVER displayed to the user during the assessment. */
  orderIndex: number;
  textAr: string;
  textEn?: string;
  subscaleId: string;
  reverseScored?: boolean;
  /** Trigger responsible human-support crisis alert when scored > 0 (e.g., PHQ-9 Item 9). */
  isSafetyFlagItem?: boolean;
}

export interface PsychSubscaleResult {
  id: string;
  nameAr: string;
  nameEn: string;
  rawScore: number;
  scaledScore: number;
  minScore: number;
  maxScore: number;
  percentage: number;
  bandLabelAr: string;
  interpretationAr: string;
}

export interface PsychDomainInfo {
  id: PsychDomainId;
  nameAr: string;
  nameEn: string;
  shortDescAr: string;
  accentHex: string;
}

export interface PsychInstrumentSpec {
  id: string;
  titleAr: string;
  titleEn: string;
  shortCode: string;
  domain: PsychDomainId;
  domainLabelAr: string;
  shortDescriptionAr: string;
  detailedOverviewAr: string;
  instructionsAr: string;
  estimatedMinutes: number;
  questionCount: number;
  scaleTypeLabelAr: string;
  options: PsychScaleOption[];
  scoringRuleDescriptionAr: string;
  interpretationGuidelinesAr: string;
  psychometricEvidenceAr: string;
  authorOrBody: string;
  publicationYear: string;
  sourceName: string;
  sourceUrl: string;
  licenseStatus: string;
  licenseTermsAr: string;
  arabicValidationStatus: ArabicValidationStatus;
  arabicValidationNoteAr: string;
  limitationsAr: string;
  lastReviewedDate: string;
  scientificStatus: ScientificStatus;
  chartType: PsychChartType;
  supportsRepeatedComparison: boolean;
  isScreeningTool?: boolean;
  /** True when the tool is routed to the dedicated O*NET RIASEC runner (/quiz & /results). */
  isLegacyOnetRoute?: boolean;
}

export interface PsychSessionState {
  instrumentId: string;
  answers: Record<string, number>;
  currentIndex: number;
  startedAtIso: string;
  lastUpdatedIso: string;
}

export interface PsychCompletedResult {
  id: string;
  instrumentId: string;
  completedAtIso: string;
  elapsedSeconds: number;
  answers: Record<string, number>;
  primaryScore: number;
  primaryMaxScore: number;
  primaryLabelAr: string;
  severityLevel: PsychSeverityLevel;
  safetyTriggered: boolean;
  safetyReasonAr?: string;
  subscales: PsychSubscaleResult[];
  scientificSummaryAr: string;
  strengthsAr: string[];
  attentionAreasAr: string[];
  practicalSuggestionsAr: string[];
  limitationsAr: string;
  scoringFormulaUsedAr: string;
}

export interface PsychPlatformExportBundle {
  schemaVersion: 3;
  platform: 'zahrti_single_user_psych';
  exportedAtIso: string;
  sessions: Record<string, PsychSessionState>;
  completedResults: PsychCompletedResult[];
  /** Legacy O*NET career snapshots preserved safely for single-user continuity */
  careerResult: unknown;
  careerHistory: unknown[];
  favoriteMajorIds: string[];
  compareMajorIds: string[];
}
