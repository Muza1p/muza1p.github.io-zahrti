export type RiasecCode = 'realistic' | 'investigative' | 'artistic' | 'social' | 'enterprising' | 'conventional';

export type RiasecLetter = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';

export type LikertValue = 1 | 2 | 3 | 4 | 5;

export type PersonId = 'person1' | 'person2';

export interface ProfileIdentity {
  id: PersonId;
  name: string;
  updatedAtIso: string | null;
}

export interface ProfilePrivacySettings {
  person1IncludeInCompatibility: boolean;
  person2IncludeInCompatibility: boolean;
}

export interface LikertOption {
  value: LikertValue;
  labelAr: string;
  shortLabelAr: string;
  originalLabelEn: string;
  descriptionAr: string;
}

export interface MiniIpQuestion {
  id: string;
  originalIndex: number;
  originalText: string;
  arabicText: string;
  area: RiasecCode;
  source: string;
  adaptationNotes: string;
  reviewStatus: 'draft_arabic_translation' | 'pending_expert_review' | 'reviewed';
  validationStatus: 'requires_validation_study' | 'validated';
}

export interface RiasecProfileInfo {
  code: RiasecCode;
  letter: RiasecLetter;
  nameAr: string;
  nameEn: string;
  subtitleAr: string;
  colorHex: string;
  tintHex: string;
  borderHex: string;
  descriptionAr: string;
  activitiesAr: string[];
  workEnvironmentsAr: string[];
  explorableFieldsAr: string[];
}

export interface RiasecAreaScore {
  code: RiasecCode;
  letter: RiasecLetter;
  nameAr: string;
  nameEn: string;
  score: number; // 0 to 20 for 30-item Mini-IP
  maxScore: number; // 20
  ratio: number; // score / 20
  factor: number; // standardized z-score across the 6 areas
  rank: number; // 1 = highest
  isTop: boolean;
}

export type ScoringSourceMode = 'onet_official_api' | 'local_mini_ip_formula';

export interface AssessmentResult {
  answersString: string;
  scores: Record<RiasecCode, RiasecAreaScore>;
  orderedAreas: RiasecAreaScore[];
  topThreeCodes: RiasecCode[];
  hollandCode: string;
  flatProfile: boolean;
  allOneAnswer: LikertValue | null;
  scoringMode: ScoringSourceMode;
  isScientificallyValidatedArabic: boolean;
  calculatedAtIso: string;
  elapsedSeconds: number | null;
}

export type MajorCategory =
  | 'health_medicine'
  | 'engineering'
  | 'computing_tech'
  | 'sciences'
  | 'education'
  | 'law_management_econ'
  | 'arts_media'
  | 'humanities_social'
  | 'agriculture_env';

export type CredentialType =
  | 'bachelor'
  | 'diploma_institute'
  | 'vocational_certificate';

export type VerificationStatus = 'verified_official' | 'partially_verified' | 'unverified';

export interface SourceReference {
  title: string;
  url: string;
  authority: string;
  lastChecked: string;
  note?: string;
}

export interface Major {
  id: string;
  nameAr: string;
  nameEn: string;
  category: MajorCategory;
  categoryLabelAr: string;
  credentialType: CredentialType;
  credentialLabelAr: string;
  studyYearsNote: string;
  shortDescriptionAr: string;
  whatYouStudyAr: string;
  usefulSkillsAr: string[];
  studyNatureAr: string;
  sampleSubjectsAr: string[];
  challengesAr: string[];
  potentialCareersAr: string[];
  relatedMajorIds: string[];
  admissionNotesAr: string;
  verifiedUniversitiesAr: string[];
  universitiesVerificationNoteAr: string;
  riasecWeights: Record<RiasecCode, number>; // 0..1 alignment per dimension
  appealingActivitiesAr: string[];
  reflectionQuestionsAr: string[];
  sources: SourceReference[];
  lastVerifiedDate: string;
  verificationStatus: VerificationStatus;
}

export interface MajorRecommendation {
  major: Major;
  affinityScore: number; // Cosine alignment scalar 0..1
  affinityPercentage: number; // Computed percentage 0..100 derived transparently from cosine affinity
  matchedInterests: RiasecCode[];
  reasonAr: string;
  isCloseAlternative: boolean;
}

export interface SavedResultRecord {
  id: string;
  savedAtIso: string;
  hollandCode: string;
  topAreaNamesAr: string[];
  answersString: string;
  scoringMode: ScoringSourceMode;
  result?: AssessmentResult;
}

export interface AssessmentSessionState {
  answers: Record<number, LikertValue>; // 1..30 -> 1..5
  currentQuestionIndex: number; // 0..29
  startedAtMs: number | null;
  completedElapsedSeconds: number | null;
  lastUpdatedIso: string | null;
}

export interface CompatibilityDimensionItem {
  code: RiasecCode;
  nameAr: string;
  person1Score: number;
  person2Score: number;
  difference: number;
  noteAr: string;
}

export interface CompatibilityReport {
  harmonyIndex: number; // 0..100 weighted cosine + proximity score
  cosineSimilarityPct: number; // 0..100 directional profile similarity
  proximityAlignmentPct: number; // 0..100 intensity proximity across dimensions
  sharedStrengths: CompatibilityDimensionItem[];
  complementaryDifferences: CompatibilityDimensionItem[];
  allDimensionComparisons: CompatibilityDimensionItem[];
  personalitySummaryPerson1Ar: string;
  personalitySummaryPerson2Ar: string;
  communicationTendencyAr: string;
  decisionStyleAr: string;
  sharedActivitiesAr: string[];
  mutualUnderstandingTipsAr: string[];
  person1TopCodes: RiasecCode[];
  person2TopCodes: RiasecCode[];
  calculatedAtIso: string;
  formulaDescriptionAr: string;
}

export interface OurWorldState {
  sharedNote: string;
  updatedAtIso: string | null;
}

export interface PersonExportBundle {
  schemaVersion: 2;
  personId: PersonId;
  name: string;
  exportedAtIso: string;
  session: AssessmentSessionState;
  latestResult: AssessmentResult | null;
  savedRecords: SavedResultRecord[];
  favoriteMajorIds: string[];
  compareIds: string[];
}
