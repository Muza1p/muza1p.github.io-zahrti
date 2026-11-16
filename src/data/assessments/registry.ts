import { PsychDomainId, PsychDomainInfo, PsychInstrumentSpec, PsychScaleOption } from '@/src/types/psychology';

export const PSYCH_DOMAINS: Record<PsychDomainId, PsychDomainInfo> = {
  personality: {
    id: 'personality',
    nameAr: 'الشخصية وفهم الذات',
    nameEn: 'Personality & Self-Concept',
    shortDescAr: 'استكشاف السمات الخمس الكبرى، تقدير الذات، وأسلوب التفكير واتخاذ القرار.',
    accentHex: '#762D50',
  },
  emotions: {
    id: 'emotions',
    nameAr: 'المشاعر والمرونة العاطفية',
    nameEn: 'Emotions & Resilience',
    shortDescAr: 'الوعي بالمشاعر، تنظيم الانفعال، المرونة في مواجهة الشدائد، وإدارة التوتر.',
    accentHex: '#C47C91',
  },
  relationships: {
    id: 'relationships',
    nameAr: 'العلاقات والحدود والتعلّق',
    nameEn: 'Relationships & Boundaries',
    shortDescAr: 'الحدود الشخصية، التواصل العاطفي، الثقة، وأنماط التعامل داخل العلاقات دون أحكام قطعية.',
    accentHex: '#9F7E44',
  },
  anxiety_stress: {
    id: 'anxiety_stress',
    nameAr: 'القلق والضغط النفسي والفحص الأولي',
    nameEn: 'Anxiety, Mood Screening & Stress',
    shortDescAr: 'أدوات فحص أولية معروفة للقلق العام، أعراض الاكتئاب، التوتر، والرفاه النفسي والاجترار.',
    accentHex: '#5D223E',
  },
  behavior_habits: {
    id: 'behavior_habits',
    nameAr: 'السلوك والعادات والانضباط',
    nameEn: 'Behavior, Habits & Self-Discipline',
    shortDescAr: 'استكشاف التسويف، إدارة الوقت، الدافعية، وتحمل المسؤولية وبناء العادات.',
    accentHex: '#4B2B4E',
  },
  cognitive_social: {
    id: 'cognitive_social',
    nameAr: 'القدرات المعرفية والتعاطف الاجتماعي',
    nameEn: 'Cognitive Habits & Social Empathy',
    shortDescAr: 'أبعاد التعاطف والوعي الاجتماعي، بالإضافة إلى تمارين تأملية للتركيز والمرونة المعرفية.',
    accentHex: '#762D50',
  },
  personal_growth: {
    id: 'personal_growth',
    nameAr: 'النمو الشخصي والمعنى والرضا',
    nameEn: 'Personal Growth & Meaning',
    shortDescAr: 'الرضا عن الحياة، الكفاءة الذاتية، القيم الشخصية، والأهداف والنمو الذاتي.',
    accentHex: '#C6A56B',
  },
  career_riasec: {
    id: 'career_riasec',
    nameAr: 'الميول المهنية والتخصصات',
    nameEn: 'Career Interests (RIASEC)',
    shortDescAr: 'مقياس الاهتمامات المهنية O*NET Mini-IP وربطه بدليل التخصصات الجامعية.',
    accentHex: '#351B38',
  },
};

export const PSYCH_DOMAIN_ORDER: PsychDomainId[] = [
  'anxiety_stress',
  'personality',
  'emotions',
  'relationships',
  'behavior_habits',
  'cognitive_social',
  'personal_growth',
  'career_riasec',
];

export const FOUR_POINT_CLINICAL_FREQUENCY: PsychScaleOption[] = [
  { value: 0, labelAr: 'أبداً', descriptionAr: 'لم يحدث خلال الفترة المحددة' },
  { value: 1, labelAr: 'عدة أيام', descriptionAr: 'حدث أحياناً على نحو متقطع' },
  { value: 2, labelAr: 'أكثر من نصف الأيام', descriptionAr: 'تكرر في أغلب أيام الفترة' },
  { value: 3, labelAr: 'تقريباً كل يوم', descriptionAr: 'استمر بصورة شبه يومية' },
];

export const FOUR_POINT_DASS_OPTIONS: PsychScaleOption[] = [
  { value: 0, labelAr: 'لم ينطبق عليّ مطلقاً', descriptionAr: 'خلال الأسبوع الماضي' },
  { value: 1, labelAr: 'انطبق عليّ بدرجة قليلة أو أحياناً', descriptionAr: 'خلال الأسبوع الماضي' },
  { value: 2, labelAr: 'انطبق عليّ بدرجة ملحوظة', descriptionAr: 'أو في جزء كبير من الوقت' },
  { value: 3, labelAr: 'انطبق عليّ جداً أو معظم الوقت', descriptionAr: 'بصورة متكررة طوال الأسبوع' },
];

export const FOUR_POINT_LIKERT_AGREEMENT_0_3: PsychScaleOption[] = [
  { value: 3, labelAr: 'أوافق بشدة' },
  { value: 2, labelAr: 'أوافق' },
  { value: 1, labelAr: 'لا أوافق' },
  { value: 0, labelAr: 'لا أوافق بشدة' },
];

export const FOUR_POINT_TRUTH_1_4: PsychScaleOption[] = [
  { value: 1, labelAr: 'غير صحيح أبداً' },
  { value: 2, labelAr: 'صحيح نادراً' },
  { value: 3, labelAr: 'صحيح إلى حد كبير' },
  { value: 4, labelAr: 'صحيح تماماً' },
];

export const FOUR_POINT_FREQUENCY_1_4: PsychScaleOption[] = [
  { value: 1, labelAr: 'نادراً جداً' },
  { value: 2, labelAr: 'أحياناً' },
  { value: 3, labelAr: 'غالباً' },
  { value: 4, labelAr: 'دائماً تقريباً' },
];

export const FIVE_POINT_ACCURACY_1_5: PsychScaleOption[] = [
  { value: 1, labelAr: 'غير دقيق إطلاقاً' },
  { value: 2, labelAr: 'غير دقيق غالباً' },
  { value: 3, labelAr: 'محايد / بين ذلك' },
  { value: 4, labelAr: 'دقيق إلى حد ما' },
  { value: 5, labelAr: 'دقيق جداً' },
];

export const FIVE_POINT_AGREEMENT_1_5: PsychScaleOption[] = [
  { value: 1, labelAr: 'أعارض بشدة' },
  { value: 2, labelAr: 'أعارض' },
  { value: 3, labelAr: 'محايدة' },
  { value: 4, labelAr: 'أوافق' },
  { value: 5, labelAr: 'أوافق بشدة' },
];

export const FIVE_POINT_IRI_0_4: PsychScaleOption[] = [
  { value: 0, labelAr: 'لا يصفني جيداً مطلقاً' },
  { value: 1, labelAr: 'يصفني قليلاً فقط' },
  { value: 2, labelAr: 'يصفني إلى حد متوسط' },
  { value: 3, labelAr: 'يصفني جيداً' },
  { value: 4, labelAr: 'يصفني بدقة عالية جداً' },
];

export const SIX_POINT_WHO5_0_5: PsychScaleOption[] = [
  { value: 5, labelAr: 'كل الوقت' },
  { value: 4, labelAr: 'معظم الوقت' },
  { value: 3, labelAr: 'أكثر من نصف الوقت' },
  { value: 2, labelAr: 'أقل من نصف الوقت' },
  { value: 1, labelAr: 'بعض الوقت' },
  { value: 0, labelAr: 'ولا مرة' },
];

export const SEVEN_POINT_SWLS_1_7: PsychScaleOption[] = [
  { value: 1, labelAr: 'أعارض بشدة' },
  { value: 2, labelAr: 'أعارض' },
  { value: 3, labelAr: 'أعارض قليلاً' },
  { value: 4, labelAr: 'محايدة (لا أوافق ولا أعارض)' },
  { value: 5, labelAr: 'أوافق قليلاً' },
  { value: 6, labelAr: 'أوافق' },
  { value: 7, labelAr: 'أوافق بشدة' },
];

export const PSYCH_INSTRUMENTS_REGISTRY: PsychInstrumentSpec[] = [
  // ======================== ANXIETY, MOOD SCREENING & STRESS ========================
  {
    id: 'phq-9',
    shortCode: 'PHQ-9',
    titleAr: 'استبيان صحة المريض — فحص أعراض المزاج والاكتئاب',
    titleEn: 'Patient Health Questionnaire-9 (PHQ-9)',
    domain: 'anxiety_stress',
    domainLabelAr: PSYCH_DOMAINS.anxiety_stress.nameAr,
    shortDescriptionAr:
      'أداة فحص أولية معروفة عالمياً تقيس تكرار الأعراض المزاجية والطاقية خلال الأسبوعين الماضيين، وليست أداة تشخيص طبي.',
    detailedOverviewAr:
      'يتكون مقياس PHQ-9 من 9 فقرات تعكس المعايير التسعة للأعراض الاكتئابية خلال آخر 14 يوماً. يُستخدم عالمياً في الرعاية الأولية والبحث العلمي كأداة فحص ومتابعة لشدة الأعراض، مع تضمين فقرة تاسعة حساسة تُفعّل تلقائياً إرشادات السلامة وطلب الدعم المختص عند الحاجة.',
    instructionsAr:
      'فكّري في الأسبوعين الماضيين: كم مرة أزعجتج أو تكررت معج أيّ من الحالات التالية؟ اختاري الخيار الأقرب لصدق تجربتج الحالية.',
    estimatedMinutes: 3,
    questionCount: 9,
    scaleTypeLabelAr: 'مقياس رباعي التكرار (0 إلى 3)',
    options: FOUR_POINT_CLINICAL_FREQUENCY,
    scoringRuleDescriptionAr:
      'تُجمع الدرجات التسع مباشرة (0 إلى 27 نقطة). العتبات المعتمدة: 0–4 أدنى مستوى، 5–9 خفيف، 10–14 متوسط، 15–19 متوسط إلى شديد، 20–27 شديد.',
    interpretationGuidelinesAr:
      'الدرجات ≥ 10 في الأدبيات البحثية والسريرية تشير إلى أهمية استشارة مختص صحي لإجراء تقييم متكامل. أي إجابة غير صفرية على الفقرة التاسعة تستدعي التواصل المباشر مع مختص بشري أو خدمة طوارئ.',
    psychometricEvidenceAr:
      'أظهر حساسية 88% ونوعية 88% لاكتشاف نوبات الاكتئاب الشديدة عند عتبة ≥ 10 في دراسة Kroenke et al. (2001) بموثوقية ألفا كرونباخ ~0.89.',
    authorOrBody: 'Kurt Kroenke, Robert L. Spitzer & Janet B.W. Williams',
    publicationYear: '2001',
    sourceName: 'Journal of General Internal Medicine / PubMed (PMID: 11556941) & PHQ Screeners (Pfizer)',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/11556941/',
    licenseStatus: 'مجاني ومتاح للنسخ والترجمة دون إذن مسبق (Pfizer Open Access)',
    licenseTermsAr:
      'أعلنت Pfizer صراحةً عدم اشتراط إذن لإعادة النسخ أو الترجمة أو العرض أو التوزيع لأغراض الرعاية والبحث والتعليم (No permission required to reproduce, translate, display or distribute).',
    arabicValidationStatus: 'published_arabic_studies',
    arabicValidationNoteAr:
      'توجد دراسات عربية منشورة تُظهر ثباتاً جيداً للنسخة العربية من PHQ-9، وتُعرض الصياغة هنا لأغراض الاستكشاف والفحص الأولي غير التشخيصي.',
    limitationsAr:
      'هذه النتيجة مؤشر فحص أولي فقط ولا تُغني عن التقييم الإكلينيكي المباشر ولا تُعدّ تشخيصاً طبياً للاكتئاب.',
    lastReviewedDate: '2026-11-16',
    scientificStatus: 'standardized_open',
    chartType: 'gauge',
    supportsRepeatedComparison: true,
    isScreeningTool: true,
  },
  {
    id: 'gad-7',
    shortCode: 'GAD-7',
    titleAr: 'مقياس القلق العام — الفحص الأولي للأعراض',
    titleEn: 'Generalized Anxiety Disorder-7 (GAD-7)',
    domain: 'anxiety_stress',
    domainLabelAr: PSYCH_DOMAINS.anxiety_stress.nameAr,
    shortDescriptionAr:
      'أداة فحص عالمية موجزة تقيس تكرار التوتر والقلق وصعوبة الاسترخاء خلال الأسبوعين الأخيرين.',
    detailedOverviewAr:
      'طوّر Spitzer وزملاؤه مقياس GAD-7 لرصد شدة أعراض القلق المعمم على 7 بنود خلال الأسبوعين الماضيين. يفيد في التمييز الأولي بين القلق العابر والمستويات التي تستحق عناية مهنية أو تهدئة منظمة.',
    instructionsAr:
      'خلال الأسبوعين الماضيين، كم مرة عانيتِ من الحالات التالية؟ أجبي بتلقائية بناءً على تجربتج الواقعية.',
    estimatedMinutes: 2,
    questionCount: 7,
    scaleTypeLabelAr: 'مقياس رباعي التكرار (0 إلى 3)',
    options: FOUR_POINT_CLINICAL_FREQUENCY,
    scoringRuleDescriptionAr:
      'مجموع الدرجات السبع من 0 إلى 21. العتبات المعتمدة: 0–4 قلق طفيف/طبيعي، 5–9 قلق خفيف، 10–14 قلق متوسط، 15–21 قلق شديد.',
    interpretationGuidelinesAr:
      'تشير الدرجة ≥ 10 في الأدبيات إلى نقطة فصل شائعة تستحق مناقشتها مع طبيب أو مختص نفسي للاستيضاح والتوجيه المهني.',
    psychometricEvidenceAr:
      'ثبات داخلي مرتفع (ألفا كرونباخ 0.92) وموثوقية إعادة اختبار 0.83 في دراسة Spitzer et al. (2006) على 2,740 مشاركاً.',
    authorOrBody: 'Robert L. Spitzer, Kurt Kroenke, Janet B.W. Williams & Bernd Löwe',
    publicationYear: '2006',
    sourceName: 'Archives of Internal Medicine / PubMed (PMID: 16717171)',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/16717171/',
    licenseStatus: 'مجاني ومتاح للنسخ والترجمة دون إذن مسبق (Pfizer Open Access)',
    licenseTermsAr:
      'أتاحت Pfizer المقياس للجمهور والمختصين مجاناً دون قيود ترخيص أو الحاجة لطلب موافقة مسبقة.',
    arabicValidationStatus: 'published_arabic_studies',
    arabicValidationNoteAr:
      'تتوفر أبحاث عربية محكّمة حول صدق وثبات النسخة العربية لـ GAD-7، ومع ذلك يبقى استخدامه هنا لأغراض التثقيف والفحص الأولي فقط.',
    limitationsAr:
      'لا يشخّص المقياس اضطراب القلق العام ولا يحدد أسبابه العضوية أو الحياتية؛ قد ترتفع الدرجة مؤقتاً أثناء الأزمات أو قلة النوم.',
    lastReviewedDate: '2026-11-16',
    scientificStatus: 'standardized_open',
    chartType: 'gauge',
    supportsRepeatedComparison: true,
    isScreeningTool: true,
  },
  {
    id: 'dass-21',
    shortCode: 'DASS-21',
    titleAr: 'مقياس الاكتئاب والقلق والتوتر المختصر',
    titleEn: 'Depression Anxiety Stress Scales (DASS-21)',
    domain: 'anxiety_stress',
    domainLabelAr: PSYCH_DOMAINS.anxiety_stress.nameAr,
    shortDescriptionAr:
      'أداة ثلاثية الأبعاد تفرق بين أعراض المزاج المنخفض، الاستثارة القلَقية الجسدية، والتوتر العصبي المزمن.',
    detailedOverviewAr:
      'صُمم مقياس DASS-21 في جامعة نيو ساوث ويلز (UNSW) لقياس ثلاثة مسارات نفسية متمايزة (7 فقرات لكل بُعد): انخفاض الدافعية والمزاج، الأعراض الجسدية والهلع المرتبط بالقلق، والانفعال والتوتر وصعوبة التهدئة.',
    instructionsAr:
      'اقرئي كل عبارة وحددي مقدار انطباقها عليج خلال الأسبوع الماضي فقط، دون إطالة التفكير.',
    estimatedMinutes: 5,
    questionCount: 21,
    scaleTypeLabelAr: 'مقياس رباعي الانطباق (0 إلى 3)',
    options: FOUR_POINT_DASS_OPTIONS,
    scoringRuleDescriptionAr:
      'تُجمع الفقرات السبع الخاصة بكل بُعد فرعي ثم يُضرب المجموع في 2 (للمطابقة مع معيار DASS-42 من 0 إلى 42 لكل بُعد) ولا تُجمع الأبعاد الثلاثة في رقم واحد غير معياري عند التفسير.',
    interpretationGuidelinesAr:
      'الاكتئاب: طبيعي 0–9، خفيف 10–13، متوسط 14–20، شديد 21–27، شديد جداً +28. القلق: طبيعي 0–7، خفيف 8–9، متوسط 10–14، شديد 15–19، شديد جداً +20. التوتر: طبيعي 0–14، خفيف 15–18، متوسط 19–25، شديد 26–33، شديد جداً +34.',
    psychometricEvidenceAr:
      'تؤكد دراسات Henry & Crawford (2005) وغيرها بنية العوامل الثلاثة المميزة وموثوقية عالية للأبعاد الثلاثة (>0.82).',
    authorOrBody: 'S.H. Lovibond & P.F. Lovibond (UNSW Psychology)',
    publicationYear: '1995',
    sourceName: 'UNSW School of Psychology DASS Portal',
    sourceUrl: 'https://www.psy.unsw.edu.au/dass',
    licenseStatus: 'ملكية عامة (Public Domain)',
    licenseTermsAr:
      'موضوع في الملكية العامة؛ يُشترط الإسناد للمؤلفين، عدم الاستخدام التجاري لبيع المقياس، وإتاحة أي ترجمة مجاناً للعموم.',
    arabicValidationStatus: 'published_arabic_studies',
    arabicValidationNoteAr:
      'توجد صياغات عربية مدروسة في الأدبيات، وتُقدَّم هذه الصياغة مع تنبيه عدم التشخيص الطبي.',
    limitationsAr:
      'يرصد DASS-21 شدة الحالات الانفعالية خلال أسبوع واحد فقط ولا يُعتبر أداة تشخيصية لمرض نفسي.',
    lastReviewedDate: '2026-11-16',
    scientificStatus: 'standardized_open',
    chartType: 'bars',
    supportsRepeatedComparison: true,
    isScreeningTool: true,
  },
  {
    id: 'who-5',
    shortCode: 'WHO-5',
    titleAr: 'مؤشر منظمة الصحة العالمية للرفاه النفسي',
    titleEn: 'WHO-5 Well-Being Index',
    domain: 'anxiety_stress',
    domainLabelAr: PSYCH_DOMAINS.anxiety_stress.nameAr,
    shortDescriptionAr:
      'خمس عبارات إيجابية موجزة تقيس الحيوية والهدوء وجودة المزاج والراحة اليومية خلال أسبوعين.',
    detailedOverviewAr:
      'على عكس مقاييس الأعراض السلبية، يركز WHO-5 على الجوانب الإيجابية للرفاه الذاتي (البشاشة، الاسترخاء، النشاط، النوم المنعش، والشغف اليومي). ويُعد من أكثر الأدوات استخداماً دولياً في أبحاث الصحة العامة.',
    instructionsAr:
      'حددي الخيار الأقرب لوصف مشاعرج خلال الأسبوعين الماضيين في كل عبارة من العبارات الخمس.',
    estimatedMinutes: 1,
    questionCount: 5,
    scaleTypeLabelAr: 'مقياس سداسي (0 ولا مرة إلى 5 كل الوقت)',
    options: SIX_POINT_WHO5_0_5,
    scoringRuleDescriptionAr:
      'الدرجة الخام هي مجموع الإجابات (0 إلى 25)، وتُضرب × 4 لتحويلها إلى مقياس معياري من 0 إلى 100.',
    interpretationGuidelinesAr:
      'كلما اقتربت النتيجة من 100 ارتفع الرفاه الذاتي. تُشير الأدبيات (Topp et al., 2015) إلى أن الدرجة ≤ 50 (أو الخام < 13) تعد مؤشراً لانخفاض الرفاه ويُستحب معها إجراء فحص إضافي أو مراجعة مختص، وأن الدرجة ≤ 28 تستدعي تقييماً مهيناً أعمق.',
    psychometricEvidenceAr:
      'مراجعة منهجية في Psychotherapy and Psychosomatics (Topp et al., 2015, PubMed 25831963) أكدت صدقه البنائي وتغطيته للرفاه في عشرات اللغات.',
    authorOrBody: 'World Health Organization (WHO) / Psychiatric Research Unit',
    publicationYear: '1998',
    sourceName: 'World Health Organization / Region Hovedstaden WHO-5 Portal',
    sourceUrl: 'https://www.psykiatri-regionh.dk/who-5/',
    licenseStatus: 'رخصة المشاع الإبداعي CC BY-NC-SA 3.0 IGO',
    licenseTermsAr:
      'مفتوح الاستخدام غير التجاري مع إسناد الملكية إلى منظمة الصحة العالمية (WHO) والتوضيح بأن المنظمة لا تصادق على الموقع أو التكييف غير الرسمي.',
    arabicValidationStatus: 'published_arabic_studies',
    arabicValidationNoteAr:
      'تم تكييف الترجمة العربية بعناية دون مصادقة رسمية مباشرة من منظمة الصحة العالمية على هذا العرض.',
    limitationsAr:
      'يقيس الرفاه العام في فترة قصيرة (أسبوعان) ولا يحدد نوع الاضطراب إن وجد.',
    lastReviewedDate: '2026-11-16',
    scientificStatus: 'standardized_open',
    chartType: 'gauge',
    supportsRepeatedComparison: true,
    isScreeningTool: true,
  },
  {
    id: 'rrs-10',
    shortCode: 'RRS-10',
    titleAr: 'مقياس الاجترار والتفكير المتكرر المختصر',
    titleEn: 'Ruminative Responses Scale — Short Form (RRS-10)',
    domain: 'anxiety_stress',
    domainLabelAr: PSYCH_DOMAINS.anxiety_stress.nameAr,
    shortDescriptionAr:
      'يميز بين «التأمل التحليلي الهادئ» لفهم المشاعر وبين «الاجترار المُرهق» الذي يكرر اللوم دون حل.',
    detailedOverviewAr:
      'يعتمد المقياس على تنقيح Treynor وNolen-Hoeksema (2003) لعشر فقرات تفصل بوضوح بين بعدين: التأمل (Reflection) الساعي للفهم الهادئ، والتفكير الدائري المثقل باللوم (Brooding) المرتبط بالتعب النفسي.',
    instructionsAr:
      'عندما تشعرين بالحزن أو الضيق أو الإحباط، كم مرة تقومين بما تصفه كل عبارة؟',
    estimatedMinutes: 3,
    questionCount: 10,
    scaleTypeLabelAr: 'مقياس رباعي التكرار (1 إلى 4)',
    options: FOUR_POINT_FREQUENCY_1_4,
    scoringRuleDescriptionAr:
      'ينقسم إلى مقياسين فرعيين منفصلين من 5 فقرات لكل منهما (نطاق 5 إلى 20 لكل بُعد): بُعد التأمل التحليلي وبُعد الاجترار المُرهق.',
    interpretationGuidelinesAr:
      'ارتفاع بُعد الاجترار (Brooding) يدعو لتطوير مهارات كسر الحلقة الفكرية والانتقال إلى فعل عملي لطيف، بينما يعكس التأمل (Reflection) محاولة استيعاب الذات عند توازنه.',
    psychometricEvidenceAr:
      'دعمت دراسة Treynor, Gonzalez & Nolen-Hoeksema (2003) ثنائية العاملين وفصلت أثرهما عن البنود الاكتئابية المباشرة.',
    authorOrBody: 'Wendy Treynor, Richard Gonzalez & Susan Nolen-Hoeksema',
    publicationYear: '2003',
    sourceName: 'Cognitive Therapy and Research (2003, 27: 247–259)',
    sourceUrl: 'https://link.springer.com/article/10.1023/A:1023910315561',
    licenseStatus: 'متاح للاستخدام البحثي والتثقيفي غير التجاري مع الاقتباس العلمي',
    licenseTermsAr:
      'يُستخدم للأغراض التثقيفية والبحثية غير التجارية مع توثيق الورقة المرجعية لـ Treynor et al. (2003).',
    arabicValidationStatus: 'preliminary_translation_needs_validation',
    arabicValidationNoteAr:
      'النسخة العربية في زهرتي تكييف لغوي دقيق يحتاج لدراسة تقنين سيكومترية مستقلة قبل الاعتماد البحثي الرسمي.',
    limitationsAr:
      'يصف نمط الاستجابة الذهنية للضيق فقط ولا يقيس اضطراباً ذهنياً بعينه.',
    lastReviewedDate: '2026-11-16',
    scientificStatus: 'standardized_free_attribution',
    chartType: 'bars',
    supportsRepeatedComparison: true,
  },

  // ======================== PERSONALITY & SELF-CONCEPT ========================
  {
    id: 'ipip-big5-50',
    shortCode: 'IPIP-50',
    titleAr: 'مقياس العوامل الخمسة الكبرى للشخصية',
    titleEn: 'IPIP Big-Five Factor Markers (50-Item Version)',
    domain: 'personality',
    domainLabelAr: PSYCH_DOMAINS.personality.nameAr,
    shortDescriptionAr:
      'تقييم شامل مفتوح المصدر للسمات الخمس الكبرى: الانبساط، التوافق، الضمير/الانضباط، الاستقرار العاطفي، والانفتاح الفكري.',
    detailedOverviewAr:
      'طوّر Lewis Goldberg مجموعة البنود الدولية للشخصية (IPIP) لتكون مرجعاً علمياً مفتوحاً بالكامل لقياس الأبعاد الخمسة للشخصية بواقع 10 فقرات لكل سمة (مع موازنة الفقرات الإيجابية والمعكوسة). تم اختيار IPIP-50 التزاماً بالملكية العامة بدلاً من المقاييس التجارية المقيدة.',
    instructionsAr:
      'اقرئي كل عبارة وحددي مدى دقتها في وصف طبيعتج العامة كما هي الآن، لا كما تتمنين أن تكون في المستقبل.',
    estimatedMinutes: 7,
    questionCount: 50,
    scaleTypeLabelAr: 'مقياس خماسي للدقة (1 إلى 5)',
    options: FIVE_POINT_ACCURACY_1_5,
    scoringRuleDescriptionAr:
      'يُحسب كل بُعد بشكل مستقل عبر مجموع 10 فقرات (10 إلى 50، أو متوسط 1.0 إلى 5.0) بعد عكس الفقرات السالبة (6 - الدرجة). لا تُجمع الأبعاد الخمسة في رقم واحد لأنها أبعاد مستقلة.',
    interpretationGuidelinesAr:
      'لا توجد «نتيجة صائبة أو خاطئة» في السمات الخمس؛ كل مستوى يمثل تفضيلاً وسياقاً له مزاياه وتحدياته في الحياة والعمل.',
    psychometricEvidenceAr:
      'أثبتت دراسات Goldberg (1992, 1999) ومئات الأبحاث الجامعية الموثقة على ipip.ori.org اتساقاً داخلياً بين 0.79 و0.87 عبر الأبعاد الخمسة.',
    authorOrBody: 'Lewis R. Goldberg / International Personality Item Pool (IPIP)',
    publicationYear: '1999',
    sourceName: 'IPIP Official Repository (ipip.ori.org)',
    sourceUrl: 'https://ipip.ori.org/newBigFive5broadKey.htm',
    licenseStatus: 'ملكية عامة (Public Domain بالكامل)',
    licenseTermsAr:
      'بنود IPIP موضوعة صراحةً في الملكية العامة بلا أي قيود استخدام أو ترخيص.',
    arabicValidationStatus: 'preliminary_translation_needs_validation',
    arabicValidationNoteAr:
      'الترجمة العربية مصاغة بعناية للحفاظ على المعنى وتحتاج إلى دراسة معيارية عربية عند الاستخدام الأكاديمي.',
    limitationsAr:
      'السمات الشخصية أوصاف متدرجة ومرنة عبر السياقات وليست قوالب ثابتة تحكم المصير أو تقيّد النمو.',
    lastReviewedDate: '2026-11-16',
    scientificStatus: 'standardized_open',
    chartType: 'radar',
    supportsRepeatedComparison: true,
  },
  {
    id: 'rosenberg-rse-10',
    shortCode: 'RSES-10',
    titleAr: 'مقياس روزنبرغ لتقدير الذات',
    titleEn: 'Rosenberg Self-Esteem Scale (RSES)',
    domain: 'personality',
    domainLabelAr: PSYCH_DOMAINS.personality.nameAr,
    shortDescriptionAr:
      'أشهر مقياس علمي مفتوح المصدر لتقييم نظرتكِ العامة إلى قيمتكِ الذاتية وتقبلكِ لنفسكِ.',
    detailedOverviewAr:
      'يتكون مقياس Morris Rosenberg (1965) من 10 عبارات متوازنة (5 صياغات إيجابية و5 صياغات معكوسة) لقياس التقدير العام للذات بوضوح وبساطة علمية معتمدة منذ عقود.',
    instructionsAr:
      'أمامج عشر عبارات تتعلق بمشاعرج العامة تجاه نفسج. اختاري درجة موافقتج على كل عبارة بعفوية وصدق.',
    estimatedMinutes: 2,
    questionCount: 10,
    scaleTypeLabelAr: 'مقياس رباعي الموافقة (0 إلى 3)',
    options: FOUR_POINT_LIKERT_AGREEMENT_0_3,
    scoringRuleDescriptionAr:
      'الفقرات الإيجابية (1، 3، 4، 7، 10) تُحسب كما هي (3=أوافق بشدة ... 0=لا أوافق بشدة)، والفقرات المعكوسة (2، 5، 6، 8، 9) تُعكس درجتها (3-الدرجة)، ليكون المجموع من 0 إلى 30.',
    interpretationGuidelinesAr:
      'النطاق 15–25 يقع ضمن المعدل الاعتيادي لتقدير الذات؛ أقل من 15 يشير إلى انخفاض تقدير الذات ويستحق رعاية ولطفاً ذاتياً أو دعماً استشارياً؛ فوق 25 يعكس تقديراً مرتفعاً للذات.',
    psychometricEvidenceAr:
      'يعد المقياس الأكثر استشهاداً لتقدير الذات في APA/PubMed بمعاملات ثبات إجمالية بين 0.77 و0.88.',
    authorOrBody: 'Morris Rosenberg (University of Maryland)',
    publicationYear: '1965',
    sourceName: 'Society and the Adolescent Self-Image / University of Maryland',
    sourceUrl: 'https://fetzer.org/sites/default/files/images/stories/pdf/selfmeasures/Self_Measures_for_Self-Esteem_ROSENBERG_SELF-ESTEEM.pdf',
    licenseStatus: 'ملكية عامة / مجاني للاستخدام التعليمي والبحثي مع الاقتباس',
    licenseTermsAr:
      'يتاح مجاناً دون رسوم مع وجوب نسبته إلى Morris Rosenberg (1965).',
    arabicValidationStatus: 'published_arabic_studies',
    arabicValidationNoteAr:
      'حظي المقياس بدراسات تعريب متعددة في الجامعات العربية؛ والنتائج استكشافية وليست حكماً نهائياً.',
    limitationsAr:
      'يتأثر تقدير الذات المؤقت بالحالة المزاجية الأخيرة أو النقد القريب، ولا يغني عن فهم السياق الحياتي الأوسع.',
    lastReviewedDate: '2026-11-16',
    scientificStatus: 'standardized_open',
    chartType: 'gauge',
    supportsRepeatedComparison: true,
  },
  {
    id: 'explore-thinking-decisions',
    shortCode: 'EXP-TD',
    titleAr: 'استكشاف أسلوب التفكير واتخاذ القرارات والوعي الذاتي',
    titleEn: 'Exploratory Reflection: Thinking Style, Decision-Making & Self-Awareness',
    domain: 'personality',
    domainLabelAr: PSYCH_DOMAINS.personality.nameAr,
    shortDescriptionAr:
      'تمرين استكشافي غير مقنن يساعدكِ على ملاحظة توازنكِ بين التحليل، الحدس، والوعي باحتياجاتكِ عند اتخاذ القرار.',
    detailedOverviewAr:
      'صُممت هذه الأداة كمساحة تأمل منظمة في ثلاث زوايا: الاعتماد على البنية والتحليل في التفكير، قراءة الاحتياجات والقيم قبل القرار، ومراقبة التردد أو الاندفاع.',
    instructionsAr:
      'اختاري درجة انطباق كل عبارة عليج في مواقف اتخاذ القرارات الحياتية واليومية.',
    estimatedMinutes: 3,
    questionCount: 12,
    scaleTypeLabelAr: 'مقياس خماسي (1 إلى 5)',
    options: FIVE_POINT_AGREEMENT_1_5,
    scoringRuleDescriptionAr:
      'حساب متوسط ونسبة كل محور استكشافي (التفكير التحليلي، الثقة بالقرار، والوعي بالاحتياجات) دون تحويله إلى درجة تشخيصية.',
    interpretationGuidelinesAr:
      'يُظهر الميول التأملية لتيسير فهم عاداتكِ الذهنية اليومية وبناء وعي أعمق بطريقتكِ في الحسم.',
    psychometricEvidenceAr:
      'أداة استكشافية تطويرية غير مقننة — لا تملك معاملات صدق وثبات قياسية ولا تُقارن بأدوات منشورة محكّمة.',
    authorOrBody: 'مشروع زهرتي — وحدة الاستكشاف الذاتي (غير مقنن)',
    publicationYear: '2026',
    sourceName: 'منصة زهرتي — أدوات تأمل غير مقننة',
    sourceUrl: 'https://www.apa.org/topics/personality',
    licenseStatus: 'محتوى أصلي مفتوح لمشروع زهرتي (غير مقنن)',
    licenseTermsAr: 'مُنشأ محلياً في زهرتي دون ادعاء التقنين الإكلينيكي أو الإلزام التشخيصي.',
    arabicValidationStatus: 'preliminary_translation_needs_validation',
    arabicValidationNoteAr: 'تمرين استكشافي لغوي غير مقنن — مخصص للتأمل الذاتي فقط.',
    limitationsAr:
      'لا يقيس القدرة المعرفية أو الذكاء العقلي ولا يعد اختباراً سيكومترياً معتمداً.',
    lastReviewedDate: '2026-11-16',
    scientificStatus: 'exploratory_unstandardized',
    chartType: 'bars',
    supportsRepeatedComparison: false,
  },

  // ======================== EMOTIONS & RESILIENCE ========================
  {
    id: 'brs-6',
    shortCode: 'BRS-6',
    titleAr: 'مقياس المرونة النفسية المختصر (القدرة على التعافي)',
    titleEn: 'Brief Resilience Scale (BRS)',
    domain: 'emotions',
    domainLabelAr: PSYCH_DOMAINS.emotions.nameAr,
    shortDescriptionAr:
      'أداة علمية موجزة ومعتمدة تقيس القدرة الفعلية على استعادة التوازن بعد الضغوط والأيام الصعبة.',
    detailedOverviewAr:
      'صُمم BRS على يد Smith وزملائه (2008) للتركيز على جوهر المرونة النفسية: سرعة وقدرة التعافي والنهوض بعد الشدائد (عبر 3 بنود إيجابية و3 بنود معكوسة)، ويُستخدم كبديل بحثي مجاني لمقياس CD-RISC التجاري.',
    instructionsAr:
      'حددي مدى موافقتج على العبارات التالية حول تعافيج من الأوقات العصيبة.',
    estimatedMinutes: 2,
    questionCount: 6,
    scaleTypeLabelAr: 'مقياس خماسي (1 إلى 5)',
    options: FIVE_POINT_AGREEMENT_1_5,
    scoringRuleDescriptionAr:
      'تُعكس الفقرات 2 و4 و6 (6 - الدرجة)، ثم يُحسب المتوسط الحسابي للفقرات الست (من 1.00 إلى 5.00).',
    interpretationGuidelinesAr:
      'وفق المعايير المنشورة لـ Smith et al.: متوسط 1.00–2.99 يشير إلى مرونة منخفضة تستحق دعماً ومهارات تهدئة، 3.00–4.30 مرونة متوسطة/جيدة، و4.31–5.00 مرونة مرتفعة.',
    psychometricEvidenceAr:
      'حقّق ثباتاً داخلياً (0.80–0.91) عبر 4 عينات في دراسة Smith et al. (2008) في International Journal of Behavioral Medicine.',
    authorOrBody: 'Bruce W. Smith, Jeanne Dalen, Kathryn Wiggins et al.',
    publicationYear: '2008',
    sourceName: 'International Journal of Behavioral Medicine / PubMed (PMID: 18696313)',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/18696313/',
    licenseStatus: 'مجاني للاستخدام الأكاديمي والتثقيفي غير التجاري مع الاقتباس',
    licenseTermsAr:
      'لا يتطلب رسوم ترخيص للاستخدام البحثي والتوعوي مع ذكر المرجع الأصلي لـ Smith et al. (2008).',
    arabicValidationStatus: 'preliminary_translation_needs_validation',
    arabicValidationNoteAr:
      'ترجمة عربية دقيقة لمعاني البنود الستة؛ تُعرض نتائجها كمؤشر استكشافي لتعزيز الرعاية الذاتية.',
    limitationsAr:
      'يقيس المقياس الإدراك الذاتي للقدرة على التعافي لا مستوى الدعم الاجتماعي أو الموارد المادية المحيطة.',
    lastReviewedDate: '2026-11-16',
    scientificStatus: 'standardized_free_attribution',
    chartType: 'gauge',
    supportsRepeatedComparison: true,
  },
  {
    id: 'explore-emotional-regulation',
    shortCode: 'EXP-ER',
    titleAr: 'استكشاف الوعي بالمشاعر وتنظيم الانفعالات والتوتر',
    titleEn: 'Exploratory Reflection: Emotional Awareness & Regulation',
    domain: 'emotions',
    domainLabelAr: PSYCH_DOMAINS.emotions.nameAr,
    shortDescriptionAr:
      'استكشاف تأملي غير مقنن لفهم تعاملكِ مع الحزن والغضب والخوف، وقدرتكِ على تسمية المشاعر والتعبير عنها بهدوء.',
    detailedOverviewAr:
      'يركّز هذا التمرين على أربعة مسارات يومية: التمييز الواعي للمشاعر وقت حدوثها، تهدئة الانفعال عند الغضب أو الخوف، التعبير السليم دون كبت، وإدارة التوتر العاطفي. (ملاحظة شفافة: أدوات الذكاء العاطفي المقننة مثل TEIQue-SF وWLEIS تتطلب تراخيص مكتوبة لذلك لا ننسخ بنودها دون إذن).',
    instructionsAr:
      'اختاري مدى انطباق كل موقف عليج غالباً عندما تمرين بمشاعر قوية.',
    estimatedMinutes: 3,
    questionCount: 12,
    scaleTypeLabelAr: 'مقياس رباعي التكرار (1 إلى 4)',
    options: FOUR_POINT_FREQUENCY_1_4,
    scoringRuleDescriptionAr:
      'يعرض مؤشرات وصفية لكل محور انفعالي (الوعي بالمشاعر، التنظيم والتهدئة، التعبير الصحي، التعامل مع الحزن والغضب) دون رقم ذكاء عاطفي مصطنع.',
    interpretationGuidelinesAr:
      'يساعدج على ملاحظة النمط العاطفي الذي يتطلب تدريباً أهدأ (ككتابة المشاعر أو إرجاء رد الفعل وقت الغضب).',
    psychometricEvidenceAr:
      'وحدة استكشافية غير مقننة — للتفكّر والوعي الذاتي فقط ولا تعوض عن المقاييس المقننة.',
    authorOrBody: 'مشروع زهرتي — استكشاف عاطفي غير مقنن',
    publicationYear: '2026',
    sourceName: 'مفاهيم تنظيم الانفعال (APA Emotions Framework)',
    sourceUrl: 'https://www.apa.org/topics/emotions',
    licenseStatus: 'محتوى أصلي لزهرتي (غير مقنن)',
    licenseTermsAr: 'موسوم صراحةً كأداة تأمل استكشافية غير مقننة.',
    arabicValidationStatus: 'preliminary_translation_needs_validation',
    arabicValidationNoteAr: 'تمرين استكشافي عربي مصمم للتأمل اليومي.',
    limitationsAr:
      'لا يشكّل قياساً معتمداً للذكاء العاطفي (EQ) ولا يحكم على سلامة شخصيتكِ العاطفية.',
    lastReviewedDate: '2026-11-16',
    scientificStatus: 'exploratory_unstandardized',
    chartType: 'bars',
    supportsRepeatedComparison: false,
  },

  // ======================== RELATIONSHIPS & BOUNDARIES ========================
  {
    id: 'explore-relationships-boundaries',
    shortCode: 'EXP-RB',
    titleAr: 'استكشاف الحدود الشخصية والتواصل والأمان في العلاقات',
    titleEn: 'Exploratory Reflection: Personal Boundaries, Trust & Relational Dynamics',
    domain: 'relationships',
    domainLabelAr: PSYCH_DOMAINS.relationships.nameAr,
    shortDescriptionAr:
      'مساحة تأمل غير مقننة لفهم أسلوبكِ في وضع الحدود، الثقة، حساسية الرفض، وإدارة الخلافات دون إصدار أحكام قطعية.',
    detailedOverviewAr:
      'تتناول هذه الوحدة الجوانب الأربعة الأهم في جودة العلاقات: وضوح الحدود الشخصية (القدرة على قول لا بلطف)، الأمان والثقة مقابل الخوف من الرفض أو الهجر، التواصل أثناء الخلاف، والتوازن بين القرب والاستقلالية.',
    instructionsAr:
      'تأمّلي علاقاتكِ القريبة أو الاجتماعية واختاري مدى موافقتكِ على كل عبارة — وتذكّري أن أنماط التعلّق والتعامل تتطور وليست قدراً ثابتاً.',
    estimatedMinutes: 3,
    questionCount: 12,
    scaleTypeLabelAr: 'مقياس خماسي (1 إلى 5)',
    options: FIVE_POINT_AGREEMENT_1_5,
    scoringRuleDescriptionAr:
      'يعرض أربعة أبعاد تأملية بنسبة مئوية وصفية: وضوح الحدود، الأمان والثقة، حساسية الرفض/الغيرة، ومهارة الحوار عند الخلاف.',
    interpretationGuidelinesAr:
      'لا يُصنّف الشخص تحت «لقب نهائي»؛ بل يُظهر أين تمنحينه ثقة صحية وأين قد ينفعج وضع حدود أوضح أو حوار أهدأ.',
    psychometricEvidenceAr:
      'أداة استكشافية غير مقننة؛ تم إعداد بنودها من الصفر احتراماً لحقوق نشر مقاييس التعلّق المحمية (مثل ECR-S).',
    authorOrBody: 'مشروع زهرتي — التأمل في العلاقات والحدود',
    publicationYear: '2026',
    sourceName: 'مفاهيم التعلّق والحدود السليمة (APA Relationships)',
    sourceUrl: 'https://www.apa.org/topics/relationships',
    licenseStatus: 'محتوى أصلي مفتوح لزهرتي (غير مقنن)',
    licenseTermsAr: 'موسوم صراحةً كاستكشاف ذاتي غير تشخيصي.',
    arabicValidationStatus: 'preliminary_translation_needs_validation',
    arabicValidationNoteAr: 'صياغة تأملية غير مقننة للاستكشاف الشخصي الواعي.',
    limitationsAr:
      'لا يقيس مقياساً إكلينيكياً للتعلّق ولا يصدر حكماً على نجاح علاقاتج أو استمرارها.',
    lastReviewedDate: '2026-11-16',
    scientificStatus: 'exploratory_unstandardized',
    chartType: 'bars',
    supportsRepeatedComparison: false,
  },

  // ======================== BEHAVIOR & HABITS ========================
  {
    id: 'explore-habits-discipline',
    shortCode: 'EXP-HB',
    titleAr: 'استكشاف السلوك والعادات والتسويف والانضباط الذاتي',
    titleEn: 'Exploratory Reflection: Procrastination, Self-Discipline & Daily Habits',
    domain: 'behavior_habits',
    domainLabelAr: PSYCH_DOMAINS.behavior_habits.nameAr,
    shortDescriptionAr:
      'تمرين استكشافي غير مقنن يرصد أنماط التسويف، الالتزام بالأهداف، إدارة الوقت، والتعامل العملي مع الإخفاق.',
    detailedOverviewAr:
      'يعينج هذا الفحص السلوكي على التفريق بين الكسل الظاهري وبين التسويف الناتج عن الكمال المفرط أو غياب تجزئة المهام، عبر أربعة محاور: الانضباط وإدارة الوقت، مقاومة التسويف، التعامل مع الفشل والمسؤولية، وثبات العادات اليومية.',
    instructionsAr:
      'اختاري العبارة التي تصف عاداتج العملية الأسبوعية على أرض الواقع بصدق.',
    estimatedMinutes: 3,
    questionCount: 12,
    scaleTypeLabelAr: 'مقياس رباعي التكرار (1 إلى 4)',
    options: FOUR_POINT_FREQUENCY_1_4,
    scoringRuleDescriptionAr:
      'يحسب النقاط عبر أربعة مسارات سلوكية مع عكس فقرات التسويف لعرض صورة متوازنة لنقاط القوة والفرص التنظيمية.',
    interpretationGuidelinesAr:
      'يبرز أي جزء من دورة العمل يحتاج لتعديل بسيط: بدء المهمة، تجزئة الأهداف، أو التعافي بعد التعثر.',
    psychometricEvidenceAr:
      'وحدة استكشافية غير مقننة — مخصصة لتطوير العادات الشخصية.',
    authorOrBody: 'مشروع زهرتي — السلوك والعادات',
    publicationYear: '2026',
    sourceName: 'APA Behavioral Science & Self-Regulation Principles',
    sourceUrl: 'https://www.apa.org/topics/personality',
    licenseStatus: 'محتوى أصلي لزهرتي (غير مقنن)',
    licenseTermsAr: 'موسوم صراحةً كأداة تأمل سلوكية غير مقننة.',
    arabicValidationStatus: 'preliminary_translation_needs_validation',
    arabicValidationNoteAr: 'تمرين استكشافي عربي للعادات اليومية.',
    limitationsAr:
      'لا يشخّص تشتت الانتباه أو الاضطرابات التنفيذية الإكلينيكية.',
    lastReviewedDate: '2026-11-16',
    scientificStatus: 'exploratory_unstandardized',
    chartType: 'bars',
    supportsRepeatedComparison: false,
  },

  // ======================== COGNITIVE & SOCIAL EMPATHY ========================
  {
    id: 'iri-28',
    shortCode: 'IRI-28',
    titleAr: 'مؤشر التفاعل بين الأشخاص — التعاطف والوعي الاجتماعي',
    titleEn: 'Interpersonal Reactivity Index (IRI)',
    domain: 'cognitive_social',
    domainLabelAr: PSYCH_DOMAINS.cognitive_social.nameAr,
    shortDescriptionAr:
      'مقياس علمي متعدد الأبعاد لقياس جوانب التعاطف المعرفي (تبنّي منظور الآخر) والوجداني والخيال والحساسية للكرب.',
    detailedOverviewAr:
      'طوّر Mark Davis مؤشر IRI لقياس أربعة أبعاد متمايزة في 28 فقرة (7 فقرات لكل بُعد): تبني المنظور (Perspective Taking)، الخيال والتقمص القصصي (Fantasy)، الاهتمام التعاطفي الدافئ (Empathic Concern)، والكرب الشخصي عند توتر الآخرين (Personal Distress).',
    instructionsAr:
      'تصف العبارات التالية أفكارج ومشاعرج في مواقف اجتماعية وإنسانية مختلفة. اختاري درجة انطباقها عليج.',
    estimatedMinutes: 5,
    questionCount: 28,
    scaleTypeLabelAr: 'مقياس خماسي الوصف (0 إلى 4)',
    options: FIVE_POINT_IRI_0_4,
    scoringRuleDescriptionAr:
      'يُجمع كل بُعد من الأبعاد الأربعة منفرداً من 0 إلى 28 بعد عكس الفقرات المحددة في مفتاح Davis (9 فقرات معكوسة: 4 - الدرجة). ولا يُنصح بجمع الأبعاد الأربعة في درجة واحدة لأنها أبعاد مستقلة.',
    interpretationGuidelinesAr:
      'ارتفاع تبني المنظور والاهتمام التعاطفي يدعم التفاهم الاجتماعي، بينما ارتفاع الكرب الشخصي يعني أنج تتأثرين عاطفياً بسرعة في المواقف الضاغطة وتحتاجين لحماية حدودج الطاقية.',
    psychometricEvidenceAr:
      'نُشر في JSAS (1980) وJournal of Personality and Social Psychology (1983) بموثوقية 0.70–0.78 لكل مقياس فرعي وبنية عاملية رباعية مؤكدة.',
    authorOrBody: 'Mark H. Davis',
    publicationYear: '1980 / 1983',
    sourceName: 'Journal of Personality and Social Psychology / Eckerd College',
    sourceUrl: 'https://psycnet.apa.org/record/1983-22418-001',
    licenseStatus: 'مجاني للاستخدام الأكاديمي والبحثي غير التجاري مع الاقتباس',
    licenseTermsAr:
      'أتاح المؤلف Mark H. Davis الأداة مجاناً للبحث العلمي والتثقيف غير التجاري مع نسبتها إليه.',
    arabicValidationStatus: 'preliminary_translation_needs_validation',
    arabicValidationNoteAr:
      'توجد ترجمات بحثية متفرقة لـ IRI؛ تُقدم هذه النسخة مع تنبيه الحاجة لمراجعة تقنينية قبل أي اعتماد سريري.',
    limitationsAr:
      'يقيس الوعي الذاتي بكيفية استجابتكِ للآخرين وليس قدرة الذكاء المنطقي أو التقييم الاجتماعي الخارجي.',
    lastReviewedDate: '2026-11-16',
    scientificStatus: 'standardized_free_attribution',
    chartType: 'radar',
    supportsRepeatedComparison: true,
  },
  {
    id: 'explore-cognitive-focus',
    shortCode: 'EXP-CF',
    titleAr: 'تمرين استكشاف التركيز والانتباه والمرونة المعرفية',
    titleEn: 'Exploratory Check: Attention, Mental Flexibility & Problem-Solving Style',
    domain: 'cognitive_social',
    domainLabelAr: PSYCH_DOMAINS.cognitive_social.nameAr,
    shortDescriptionAr:
      'مراجعة ذاتية غير مقننة لعادات التركيز العميق، التشتت الرقمي، والتفكير المرن أمام المشكلات اليومية.',
    detailedOverviewAr:
      'يفرّق هذا التمرين الاستكشافي بين عادات الانتباه المستمر (تجنب المشتتات)، الذاكرة التنظيمية اليومية (التدوين والاسترجاع)، والمرونة المعرفية عند تبدل الخطط. (تنبيه: الاختبارات الحقيقية للذاكرة والذكاء المنطقي تتطلب مهام أداء موقوتة لا استبيانات ذاتية فقط).',
    instructionsAr:
      'أجيبي بناءً على ما تلاحظينه في دراستكِ أو عملكِ خلال الشهر الأخير.',
    estimatedMinutes: 3,
    questionCount: 10,
    scaleTypeLabelAr: 'مقياس رباعي التكرار (1 إلى 4)',
    options: FOUR_POINT_FREQUENCY_1_4,
    scoringRuleDescriptionAr:
      'حساب نسب وصفية لثلاثة جوانب إدراكية يومية (التركيز، التنظيم الذاكري، المرونة وحل المشكلات) كمرجع للتأمل فقط.',
    interpretationGuidelinesAr:
      'يوضح البيئات التي تقلل تشتتج أو تساعدج على التفكير المنظم، ولا يقيس معدل الذكاء IQ.',
    psychometricEvidenceAr:
      'تمرين استكشافي غير مقنن — لا يعوض عن الاختبارات المعرفية الأدائية المقننة.',
    authorOrBody: 'مشروع زهرتي — الوعي المعرفي',
    publicationYear: '2026',
    sourceName: 'مفاهيم الوظائف التنفيذية والمرونة المعرفية',
    sourceUrl: 'https://www.apa.org/topics/cognition',
    licenseStatus: 'محتوى أصلي لزهرتي (غير مقنن)',
    licenseTermsAr: 'موسوم صراحةً كأداة غير مقننة للتأمل في عادات التركيز.',
    arabicValidationStatus: 'preliminary_translation_needs_validation',
    arabicValidationNoteAr: 'تمرين استكشافي عربي مخصص للملاحظة الذاتية.',
    limitationsAr:
      'استبيان انطباع ذاتي وليس اختباراً أدائياً لسرعة المعالجة أو الذاكرة العاملة.',
    lastReviewedDate: '2026-11-16',
    scientificStatus: 'exploratory_unstandardized',
    chartType: 'bars',
    supportsRepeatedComparison: false,
  },

  // ======================== PERSONAL GROWTH & MEANING ========================
  {
    id: 'swls-5',
    shortCode: 'SWLS-5',
    titleAr: 'مقياس الرضا عن الحياة (Diener)',
    titleEn: 'Satisfaction With Life Scale (SWLS)',
    domain: 'personal_growth',
    domainLabelAr: PSYCH_DOMAINS.personal_growth.nameAr,
    shortDescriptionAr:
      'أكثر مقاييس علم النفس الإيجابي اعتماداً لقياس تقييمج المعرفي الشامل لمسيرة حياتج ورضاج عنها.',
    detailedOverviewAr:
      'يتكون من 5 عبارات مركزة طوّرها Ed Diener وزملاؤه (1985) دون ربط الشخص بقيم محددة مسبقاً، بل يدع الفرد يقيّم جودة حياته وفق معاييره الخاصة على سلم سباعي دقيق.',
    instructionsAr:
      'اقرئي كل عبارة وعبّري عن درجة موافقتكِ عليها وفق المقياس السباعي الكامل.',
    estimatedMinutes: 2,
    questionCount: 5,
    scaleTypeLabelAr: 'مقياس سباعي أصلي (1 إلى 7)',
    options: SEVEN_POINT_SWLS_1_7,
    scoringRuleDescriptionAr:
      'مجموع الدرجات الخمس من 5 إلى 35 (دون عكس فقرات). العتبات: 31–35 راضٍ جداً، 26–30 راضٍ، 21–25 راضٍ قليلاً، 20 محايد، 15–19 غير راضٍ قليلاً، 10–14 غير راضٍ، 5–9 غير راضٍ بشدة.',
    interpretationGuidelinesAr:
      'الدرجات المنخفضة عن 15 تدعو للتأمل في مجالات الرضا غير المشبعة وخطوات التغيير الهادئة أو الحوار الداعم.',
    psychometricEvidenceAr:
      'ثبات داخلي 0.87 وثبات إعادة اختبار 0.82 خلال شهرين في دراسة Diener et al. (1985).',
    authorOrBody: 'Ed Diener, Robert A. Emmons, Randy J. Larsen & Sharon Griffin',
    publicationYear: '1985',
    sourceName: 'Journal of Personality Assessment (1985, 49: 71–75) / Ed Diener Portal',
    sourceUrl: 'https://labs.psychology.illinois.edu/~ediener/SWLS.html',
    licenseStatus: 'مجاني للاستخدام غير التجاري وفق سياسة Ed Diener الرسمية',
    licenseTermsAr:
      'أعلن المؤلفون عدم الحاجة لطلب إذن خاص بشرط الاستخدام غير التجاري وذكر الاقتباس العلمي الكامل.',
    arabicValidationStatus: 'published_arabic_studies',
    arabicValidationNoteAr:
      'مقياس مختبر في عدة بحوث عربية للرضا عن الحياة، مع عرض المعايير الأصلية للمرجعية.',
    limitationsAr:
      'يقيس الحكم العام على الحياة لا الحالة الانفعالية الآنية ولا يحدد مصادر الإحباط التفصيلية.',
    lastReviewedDate: '2026-11-16',
    scientificStatus: 'standardized_free_attribution',
    chartType: 'gauge',
    supportsRepeatedComparison: true,
  },
  {
    id: 'gse-10',
    shortCode: 'GSE-10',
    titleAr: 'مقياس الكفاءة الذاتية العامة والثقة بالقدرة',
    titleEn: 'General Self-Efficacy Scale (GSE)',
    domain: 'personal_growth',
    domainLabelAr: PSYCH_DOMAINS.personal_growth.nameAr,
    shortDescriptionAr:
      'مقياس علمي من 10 فقرات يقيس قناعتكِ بقدرتكِ على التعامل مع المواقف الصعبة والمستجدة والاعتماد على مهاراتكِ.',
    detailedOverviewAr:
      'طوّره Ralf Schwarzer وMatthias Jerusalem (1995) وتُرجم إلى أكثر من 30 لغة. يركز على الشعور بالفاعلية الشخصية (Agency) وتوليد الحلول وقت الأزمات.',
    instructionsAr:
      'اقرئي كل جملة وقيّمي مدى صدقها في وصف طريقتكِ المعتادة أمام التحديات.',
    estimatedMinutes: 3,
    questionCount: 10,
    scaleTypeLabelAr: 'مقياس رباعي (1 إلى 4)',
    options: FOUR_POINT_TRUTH_1_4,
    scoringRuleDescriptionAr:
      'مجموع الدرجات العشر مباشرة من 10 إلى 40 دون عكس فقرات؛ يشير ارتفاع الدرجة إلى ثقة أكبر بالكفاءة الشخصية في المواجهة.',
    interpretationGuidelinesAr:
      'متوسط العينات المرجعية يقع حول 29؛ الدرجات المرتفعة تعزز المثابرة والتخطيط، والمنخفضة تستفيد من أهداف صغيرة متدرجة لتراكم النجاحات.',
    psychometricEvidenceAr:
      'تم التحقق منه في عينات عبر 23 دولة (Schwarzer et al.) بمعاملات ألفا كرونباخ بين 0.76 و0.90.',
    authorOrBody: 'Ralf Schwarzer & Matthias Jerusalem',
    publicationYear: '1995',
    sourceName: 'Freie Universität Berlin — GSE Repository',
    sourceUrl: 'https://userpage.fu-berlin.de/~health/selfscal.htm',
    licenseStatus: 'مجاني للاستخدام التثقيفي والبحثي غير التجاري مع الاقتباس',
    licenseTermsAr:
      'مفتوح للباحثين والممارسين وفق بيان المؤلفين على موقع جامعة برلين الحرة مع ذكر المصدر.',
    arabicValidationStatus: 'published_arabic_studies',
    arabicValidationNoteAr:
      'النسخة العربية للـ GSE مستخدمة في أبحاث تربوية ونفسية عربية، وتُعرض هنا لأغراض الاستكشاف الذاتي.',
    limitationsAr:
      'يقيس الكفاءة الذاتية العامة (التصور العام لقدرتج) ولا يغني عن تقييم الكفاءة في مهارة مهنية محددة.',
    lastReviewedDate: '2026-11-16',
    scientificStatus: 'standardized_free_attribution',
    chartType: 'gauge',
    supportsRepeatedComparison: true,
  },

  // ======================== EXISTING O*NET CAREER INSTRUMENT ========================
  {
    id: 'onet-mini-ip',
    shortCode: 'O*NET Mini-IP',
    titleAr: 'مقياس الميول المهنية والتخصصات (RIASEC)',
    titleEn: 'O*NET Interest Profiler Mini-IP (30-Item Version)',
    domain: 'career_riasec',
    domainLabelAr: PSYCH_DOMAINS.career_riasec.nameAr,
    shortDescriptionAr:
      'اختبار زهرتي الأصلي (30 فقرة) لاكتشاف اهتماماتكِ المهنية وفق سداسي هولاند وربطها بـ 36 تخصصاً جامعياً.',
    detailedOverviewAr:
      'يعتمد على أداة O*NET Mini-IP الصادرة عن وزارة العمل الأمريكية عبر 6 أنماط (العملي R، البحثي I، الفني A، الاجتماعي S، الريادي E، والتقليدي C)، ويربط درجاتكِ بدليل التخصصات الجامعية والمسارات الدراسية مع إمكانية المقارنة وحفظ المفضلة.',
    instructionsAr:
      'فكّري في مدى استمتاعكِ بكل نشاط لو أُتيح لكِ تجربته مستقبلاً، بغض النظر عن الراتب أو المهارة الحالية.',
    estimatedMinutes: 4,
    questionCount: 30,
    scaleTypeLabelAr: 'مقياس خماسي أصلي (1 إلى 5)',
    options: [
      { value: 1, labelAr: 'لا أحبه أبداً' },
      { value: 2, labelAr: 'لا أحبه' },
      { value: 3, labelAr: 'غير متأكدة / محايدة' },
      { value: 4, labelAr: 'أحبه' },
      { value: 5, labelAr: 'أحبه جداً' },
    ],
    scoringRuleDescriptionAr:
      'تُحسب الدرجة الأولية لكل نمط عبر sum(answer - 1) من 0 إلى 20 مع z-score وكسر التعادل وفق سداسي هولاند ومطابقة cosine للتخصصات.',
    interpretationGuidelinesAr:
      'يبرز أعلى ثلاثة أنماط (الرمز الثلاثي لهولاند) ويقترح قائمة تخصصات مرتبة من الأعلى توافقاً دون قيد في مسار واحد.',
    psychometricEvidenceAr:
      'أداة معيارية صادرة عن USDOL/ETA ومحكّمة بالإنجليزية؛ النسخة العربية الحالية قيد التكييف وتحتاج Validation Study.',
    authorOrBody: 'U.S. Department of Labor (USDOL/ETA)',
    publicationYear: '2016 / API v2',
    sourceName: 'O*NET Center / Services API v2',
    sourceUrl: 'https://services.onetcenter.org/ip',
    licenseStatus: 'رخصة مطوري أدوات O*NET (O*NET Tools Developer License)',
    licenseTermsAr:
      'مستخدم بموجب رخصة O*NET مع إشعار تعديل المحتوى وعدم مصادقة USDOL على الترجمة العربية.',
    arabicValidationStatus: 'preliminary_translation_needs_validation',
    arabicValidationNoteAr:
      'الترجمة العربية تكييف أولي مشروع زهرتي ولم تخضع بعد لدراسة تقنين عربية.',
    limitationsAr:
      'يقيس الاهتمامات المهنية فقط ولا يقيس القدرات التحصيلية أو شروط القبول الجامعي الرسمية.',
    lastReviewedDate: '2026-11-16',
    scientificStatus: 'standardized_open',
    chartType: 'radar',
    supportsRepeatedComparison: true,
    isLegacyOnetRoute: true,
  },

  // ======================== LICENSED / REVIEW-REQUIRED REFERENCES (CATALOG TRANSPARENCY) ========================
  {
    id: 'ref-pss-10',
    shortCode: 'PSS-10 (مرجع)',
    titleAr: 'مقياس الضغط النفسي المُدرك (PSS-10) — يتطلب موافقة نشر',
    titleEn: 'Perceived Stress Scale (PSS-10)',
    domain: 'anxiety_stress',
    domainLabelAr: PSYCH_DOMAINS.anxiety_stress.nameAr,
    shortDescriptionAr:
      'مدرج في المكتبة للشفافية العلمية؛ يتطلب تقديم طلب موافقة رسمي عبر Mapi Research Trust (ePROVIDE) قبل تضمين بنوده.',
    detailedOverviewAr:
      'طوّر Sheldon Cohen وزملاؤه مقياس PSS-10 لقياس مدى إدراك الفرد لضغوط الحياة خلال الشهر الماضي. التزاماً بحقوق الملكية لـ © Sheldon Cohen، لا ننسخ بنوده قبل تسجيل طلب الموافقة الرسمي، ويُتاح DASS-21 (بُعد التوتر) كبديل عام مفتوح فوراً.',
    instructionsAr: 'أداة مرجعية في قائمة المراجعة والترخيص — غير مفعّلة بالأسئلة المحمية.',
    estimatedMinutes: 3,
    questionCount: 10,
    scaleTypeLabelAr: 'مقياس خماسي (0 إلى 4)',
    options: [],
    scoringRuleDescriptionAr: 'مجموع 10 بنود مع عكس الفقرات 4 و5 و7 و8 (نطاق 0–40).',
    interpretationGuidelinesAr: '0–13 منخفض، 14–26 متوسط، 27–40 مرتفع (إرشادي فقط).',
    psychometricEvidenceAr: 'Cohen, Kamarck & Mermelstein (1983), Journal of Health and Social Behavior.',
    authorOrBody: 'Sheldon Cohen (Carnegie Mellon University)',
    publicationYear: '1983 / 1988',
    sourceName: 'CMU / Mapi Research Trust ePROVIDE',
    sourceUrl: 'https://eprovide.mapi-trust.org/',
    licenseStatus: 'يتطلب تقديم طلب ترخيص (مجاني للبحث غير التجاري عبر ePROVIDE)',
    licenseTermsAr: 'تُدار حقوق التوزيع عبر ePROVIDE؛ يجب إتمام طلب الترخيص قبل نشر نص البنود رقمياً.',
    arabicValidationStatus: 'published_arabic_studies',
    arabicValidationNoteAr: 'توجد دراسات عربية منشورة له عند الحصول على الترخيص الأكاديمي.',
    limitationsAr: 'مرجع توثيقي في المكتبة لحماية حقوق المؤلف.',
    lastReviewedDate: '2026-11-16',
    scientificStatus: 'requires_license_reference',
    chartType: 'none',
    supportsRepeatedComparison: false,
  },
  {
    id: 'ref-teique-sf',
    shortCode: 'TEIQue-SF (مرجع)',
    titleAr: 'استبيان الذكاء العاطفي السماتي المختصر — يتطلب إذناً خطياً',
    titleEn: 'Trait Emotional Intelligence Questionnaire (TEIQue-SF)',
    domain: 'emotions',
    domainLabelAr: PSYCH_DOMAINS.emotions.nameAr,
    shortDescriptionAr:
      'مدرج للشفافية العلمية؛ يتطلب إذناً خطياً من London Psychometric Laboratory لنشر بنوده على الويب.',
    detailedOverviewAr:
      'من أكثر أدوات الذكاء العاطفي السماتي بحثاً، إلا أن شروطه تحظر نشر بنوده كاملة عبر الإنترنت دون موافقة مكتوبة مسبقة من المختبر المالك.',
    instructionsAr: 'مرجع علمي يتطلب ترخيصاً قبل الإتاحة الإلكترونية.',
    estimatedMinutes: 6,
    questionCount: 30,
    scaleTypeLabelAr: 'مقياس سباعي (1 إلى 7)',
    options: [],
    scoringRuleDescriptionAr: 'متوسطات 4 أبعاد فرعية ودرجة شاملة بعد عكس 15 فقرة.',
    interpretationGuidelinesAr: 'يتطلب دليل المختبر الرسمي.',
    psychometricEvidenceAr: 'Petrides (2009), London Psychometric Laboratory.',
    authorOrBody: 'K. V. Petrides (UCL / London Psychometric Lab)',
    publicationYear: '2009',
    sourceName: 'London Psychometric Laboratory (psychometriclab.com)',
    sourceUrl: 'https://psychometriclab.com/',
    licenseStatus: 'محمي بحقوق مختبر قياس النفس — يتطلب إذناً خطياً لنشر البنود على الإنترنت',
    licenseTermsAr: 'يُمنع نسخ بنوده رقمياً على تطبيقات عامة دون ترخيص رسمي.',
    arabicValidationStatus: 'preliminary_translation_needs_validation',
    arabicValidationNoteAr: 'يخضع لاستيفاء موافقة المختبر أولاً.',
    limitationsAr: 'غير مفعّل في الاختبار التفاعلي احتراماً لحقوق النشر.',
    lastReviewedDate: '2026-11-16',
    scientificStatus: 'requires_license_reference',
    chartType: 'none',
    supportsRepeatedComparison: false,
  },
  {
    id: 'ref-ecr-r',
    shortCode: 'ECR-R (مرجع)',
    titleAr: 'مقياس الخبرات في العلاقات الوثيقة المنقح — قيد المراجعة العربية',
    titleEn: 'Experiences in Close Relationships-Revised (ECR-R)',
    domain: 'relationships',
    domainLabelAr: PSYCH_DOMAINS.relationships.nameAr,
    shortDescriptionAr:
      'مقياس بحثي من 36 فقرة (Fraley et al., 2000) لقلق التعلّق وتجنّب التعلّق؛ قيد التحقق العربي قبل الاعتماد.',
    detailedOverviewAr:
      'أتاح الباحث R. Chris Fraley المقياس مجاناً للاستخدام البحثي غير التجاري، إلا أن الصياغة العربية تحتاج تقنيناً ومراجعة متخصصة تجنباً للتفسير القاسي لأنماط العلاقات. تتوفر حالياً وحدة استكشاف الحدود والأمان المفتوحة في المكتبة.',
    instructionsAr: 'مدرج تحت قائمة تحتاج مراجعة وتقنيناً عربياً.',
    estimatedMinutes: 8,
    questionCount: 36,
    scaleTypeLabelAr: 'مقياس سباعي (1 إلى 7)',
    options: [],
    scoringRuleDescriptionAr: 'متوسطان منفصلان: قلق التعلّق (18 فقرة) وتجنّب التعلّق (18 فقرة).',
    interpretationGuidelinesAr: 'تمثيل متدرج ثنائي المحور وليس تصنيفاً قطعياً.',
    psychometricEvidenceAr: 'Fraley, Waller & Brennan (2000), Journal of Personality and Social Psychology.',
    authorOrBody: 'R. Chris Fraley, Niels G. Waller & Kelly A. Brennan',
    publicationYear: '2000',
    sourceName: 'University of Illinois Attachment Lab',
    sourceUrl: 'https://labs.psychology.illinois.edu/~rcfraley/measures/ecrr.htm',
    licenseStatus: 'مجاني للبحث غير التجاري — في انتظار المراجعة العربية والاعتماد',
    licenseTermsAr: 'يتطلب توثيق المصدر ومراجعة صلاحية الترجمة العربية.',
    arabicValidationStatus: 'preliminary_translation_needs_validation',
    arabicValidationNoteAr: 'موضوع تحت حالة «يحتاج لمراجعة علمية» التزاماً بالشفافية.',
    limitationsAr: 'غير مفعل للاختبار قبل استكمال مراجعة التعريب.',
    lastReviewedDate: '2026-11-16',
    scientificStatus: 'requires_license_reference',
    chartType: 'none',
    supportsRepeatedComparison: false,
  },
  {
    id: 'ref-bfi-44',
    shortCode: 'BFI-44 (مرجع)',
    titleAr: 'مخزون السمات الخمس الكبرى (BFI-44) — محمي (البديل الحر: IPIP-50)',
    titleEn: 'Big Five Inventory (BFI-44)',
    domain: 'personality',
    domainLabelAr: PSYCH_DOMAINS.personality.nameAr,
    shortDescriptionAr:
      'محمي لحقوق John & Srivastava (UC Berkeley) للتطبيقات العامة؛ يتوفر البديل المفتوح المكافئ IPIP-50 مباشرة في المكتبة.',
    detailedOverviewAr:
      'أوضح معهد IPSR في بيركلي أن BFI محمي بحقوق المؤلفين ويتطلب إذناً في المنصات غير الأكاديمية، لذلك اعتمدت زهرتي مقياس IPIP-50 الموضوع في الملكية العامة.',
    instructionsAr: 'البديل العلمي المتاح مباشرة في المكتبة هو IPIP Big Five 50.',
    estimatedMinutes: 6,
    questionCount: 44,
    scaleTypeLabelAr: 'مقياس خماسي (1 إلى 5)',
    options: [],
    scoringRuleDescriptionAr: 'متوسطات الخمس سمات بعد عكس 16 فقرة.',
    interpretationGuidelinesAr: 'غير منشور بنوده هنا احتراماً لحقوق UC Berkeley.',
    psychometricEvidenceAr: 'John & Srivastava (1999), Handbook of Personality.',
    authorOrBody: 'Oliver P. John & Sanjay Srivastava',
    publicationYear: '1999',
    sourceName: 'Berkeley Personality Lab',
    sourceUrl: 'https://www.ocf.berkeley.edu/~johnlab/bfi.htm',
    licenseStatus: 'محمي بحقوق المؤلفين — استُبدل في التطبيق بـ IPIP-50 المفتوح',
    licenseTermsAr: 'لا تُنسخ بنود BFI المحمية بدون موافقة كتابية.',
    arabicValidationStatus: 'published_arabic_studies',
    arabicValidationNoteAr: 'مدرج كمرجع فقط لتوضيح سبب اختيار IPIP-50.',
    limitationsAr: 'مرجع توثيقي في المكتبة.',
    lastReviewedDate: '2026-11-16',
    scientificStatus: 'requires_license_reference',
    chartType: 'none',
    supportsRepeatedComparison: false,
  },
];

export function getInstrumentById(id: string): PsychInstrumentSpec | undefined {
  return PSYCH_INSTRUMENTS_REGISTRY.find((item) => item.id === id);
}
