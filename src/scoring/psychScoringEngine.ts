import {
  PsychCompletedResult,
  PsychInstrumentSpec,
  PsychQuestion,
  PsychSeverityLevel,
  PsychSubscaleResult,
} from '@/src/types/psychology';

interface SubscaleMeta {
  nameAr: string;
  nameEn: string;
  interpretationFn?: (scaled: number, min: number, max: number) => { band: string; note: string };
}

const SUBSCALE_METADATA: Record<string, SubscaleMeta> = {
  // IPIP-50
  extraversion: { nameAr: 'الانبساط والاجتماعية', nameEn: 'Extraversion' },
  agreeableness: { nameAr: 'التوافق واللطف الاجتماعي', nameEn: 'Agreeableness' },
  conscientiousness: { nameAr: 'الضمير والانضباط المنظم', nameEn: 'Conscientiousness' },
  emotional_stability: { nameAr: 'الاستقرار العاطفي والهدوء', nameEn: 'Emotional Stability' },
  openness: { nameAr: 'الانفتاح الفكري والخيال', nameEn: 'Openness / Intellect' },

  // DASS-21
  depression: { nameAr: 'أعراض المزاج المنخفض (DASS)', nameEn: 'Depression (×2)' },
  anxiety: { nameAr: 'الاستثارة القلَقية (DASS)', nameEn: 'Anxiety (×2)' },
  stress: { nameAr: 'التوتر والضغط العصبي (DASS)', nameEn: 'Stress (×2)' },

  // RRS-10
  reflection: { nameAr: 'التأمل التحليلي الهادئ', nameEn: 'Reflection' },
  brooding: { nameAr: 'الاجترار المثقل باللوم', nameEn: 'Brooding' },

  // IRI-28
  perspective_taking: { nameAr: 'تبنّي منظور الآخر', nameEn: 'Perspective-Taking' },
  fantasy: { nameAr: 'التقمص القصصي والخيال', nameEn: 'Fantasy' },
  empathic_concern: { nameAr: 'الاهتمام التعاطفي الدافئ', nameEn: 'Empathic Concern' },
  personal_distress: { nameAr: 'الحساسية للكرب في المواقف المتوترة', nameEn: 'Personal Distress' },

  // Exploratory Thinking & Decisions
  analytical_thinking: { nameAr: 'التفكير التحليلي المنظم', nameEn: 'Analytical Thinking' },
  needs_awareness: { nameAr: 'الوعي بالاحتياجات والقيم', nameEn: 'Needs Awareness' },
  decision_clarity: { nameAr: 'الوضوح وحسم القرار', nameEn: 'Decision Clarity' },

  // Exploratory Emotional Regulation
  emotional_awareness: { nameAr: 'تسمية المشاعر والوعي بها', nameEn: 'Emotional Awareness' },
  regulation_calm: { nameAr: 'تهدئة الانفعال وإدارة الغضب', nameEn: 'Emotion Regulation' },
  healthy_expression: { nameAr: 'التعبير المتزن عن المشاعر', nameEn: 'Healthy Expression' },
  stress_coping: { nameAr: 'التعامل اليومي مع الحزن والضغط', nameEn: 'Distress Coping' },

  // Exploratory Relationships
  boundaries: { nameAr: 'وضوح الحدود الشخصية', nameEn: 'Personal Boundaries' },
  trust_security: { nameAr: 'الأمان والثقة المتزنة', nameEn: 'Trust & Security' },
  rejection_sensitivity: { nameAr: 'الحساسية للرفض والغيرة (عكسي للراحة)', nameEn: 'Rejection Sensitivity' },
  conflict_dialogue: { nameAr: 'إدارة الخلاف والحوار', nameEn: 'Conflict Dialogue' },

  // Exploratory Behavior & Habits
  time_discipline: { nameAr: 'إدارة الوقت والأولويات', nameEn: 'Time Discipline' },
  anti_procrastination: { nameAr: 'القدرة على كسر التسويف', nameEn: 'Initiation / Anti-Procrastination' },
  responsibility: { nameAr: 'تحمل المسؤولية والتعامل مع الإخفاق', nameEn: 'Accountability' },
  habit_consistency: { nameAr: 'استدامة العادات والروتين', nameEn: 'Habit Consistency' },

  // Exploratory Cognitive Focus
  sustained_focus: { nameAr: 'التركيز العميق ومقاومة التشتت', nameEn: 'Sustained Attention' },
  memory_organization: { nameAr: 'التنظيم والتدوين الذاكري', nameEn: 'Organizational Memory' },
  cognitive_flexibility: { nameAr: 'المرونة المعرفية وحل المشكلات', nameEn: 'Cognitive Flexibility' },
};

function getScaleMinMax(spec: PsychInstrumentSpec): { minVal: number; maxVal: number } {
  const vals = spec.options.map((o) => o.value);
  return {
    minVal: Math.min(...vals),
    maxVal: Math.max(...vals),
  };
}

export function applyItemScore(
  rawValue: number,
  reverseScored: boolean | undefined,
  minVal: number,
  maxVal: number
): number {
  if (!reverseScored) return rawValue;
  return minVal + maxVal - rawValue;
}

function getBandByPercent(pct: number): string {
  if (pct >= 72) return 'مرتفع';
  if (pct >= 45) return 'متوازن / متوسط';
  return 'منخفض / يحتاج رعاية';
}

function scoreDassSubscale(subId: string, doubled: number): {
  bandAr: string;
  severity: PsychSeverityLevel;
  noteAr: string;
} {
  if (subId === 'depression') {
    if (doubled <= 9) return { bandAr: 'ضمن المعدل الطبيعي', severity: 'minimal', noteAr: 'مؤشر مزاجي مستقر خلال الأسبوع الماضي.' };
    if (doubled <= 13) return { bandAr: 'خفيف', severity: 'mild', noteAr: 'انخفاض طفيف عابر في الحيوية والمزاج.' };
    if (doubled <= 20) return { bandAr: 'متوسط', severity: 'moderate', noteAr: 'إرهاق مزاجي يستفيد من راحة منظمة ومراجعة داعم مختص.' };
    if (doubled <= 27) return { bandAr: 'شديد', severity: 'moderately_severe', noteAr: 'ثقل نفسي واضح يستحق استشارة مختص صحي.' };
    return { bandAr: 'شديد جداً', severity: 'severe', noteAr: 'مستوى مرتفع يستدعي تواصلاً قريباً مع مختص صحة نفسية.' };
  }
  if (subId === 'anxiety') {
    if (doubled <= 7) return { bandAr: 'ضمن المعدل الطبيعي', severity: 'minimal', noteAr: 'استثارة جسدية وقلقية هادئة.' };
    if (doubled <= 9) return { bandAr: 'خفيف', severity: 'mild', noteAr: 'توتر جسدي أو ترقب خفيف.' };
    if (doubled <= 14) return { bandAr: 'متوسط', severity: 'moderate', noteAr: 'أعراض قلق ملحوظة تستحق متابعة وتهدئة منظمة.' };
    if (doubled <= 19) return { bandAr: 'شديد', severity: 'moderately_severe', noteAr: 'استثارة قلقية مرتفعة يوصى بمناقشتها مع مختص.' };
    return { bandAr: 'شديد جداً', severity: 'severe', noteAr: 'مؤشر قلق مرتفع جداً يستدعي دعماً مهنياً مباشراً.' };
  }
  // stress
  if (doubled <= 14) return { bandAr: 'ضمن المعدل الطبيعي', severity: 'minimal', noteAr: 'مستوى ضغط عصبي محتمل ومستقر.' };
  if (doubled <= 18) return { bandAr: 'خفيف', severity: 'mild', noteAr: 'بعض الإرهاق أو سرعة الانزعاج المؤقتة.' };
  if (doubled <= 25) return { bandAr: 'متوسط', severity: 'moderate', noteAr: 'ضغط عصبي يستدعي تخفيف الأعباء وإعطاء مساحة استشفاء.' };
  if (doubled <= 33) return { bandAr: 'شديد', severity: 'moderately_severe', noteAr: 'إجهاد توتري مرتفع يوصى فيه بطلب المساندة المهنية.' };
  return { bandAr: 'شديد جداً', severity: 'severe', noteAr: 'توتر مرتفع جداً يستدعي رعاية مختص واستراحة عاجلة.' };
}

function highestSeverity(a: PsychSeverityLevel, b: PsychSeverityLevel): PsychSeverityLevel {
  const rank: Record<PsychSeverityLevel, number> = {
    informational: 0,
    minimal: 1,
    mild: 2,
    moderate: 3,
    moderately_severe: 4,
    severe: 5,
  };
  return rank[a] >= rank[b] ? a : b;
}

export function scorePsychAssessment(
  spec: PsychInstrumentSpec,
  questions: PsychQuestion[],
  answers: Record<string, number>,
  elapsedSeconds: number
): PsychCompletedResult {
  const { minVal, maxVal } = getScaleMinMax(spec);

  const scoredBySubscale: Record<string, { raw: number; count: number; items: PsychQuestion[] }> = {};
  for (const q of questions) {
    const raw = answers[q.id];
    if (typeof raw !== 'number' || Number.isNaN(raw)) {
      throw new Error(`Missing answer for item ${q.id}`);
    }
    const effective = applyItemScore(raw, q.reverseScored, minVal, maxVal);
    if (!scoredBySubscale[q.subscaleId]) {
      scoredBySubscale[q.subscaleId] = { raw: 0, count: 0, items: [] };
    }
    scoredBySubscale[q.subscaleId].raw += effective;
    scoredBySubscale[q.subscaleId].count += 1;
    scoredBySubscale[q.subscaleId].items.push(q);
  }

  const totalRaw = Object.values(scoredBySubscale).reduce((acc, s) => acc + s.raw, 0);
  let primaryScore = totalRaw;
  let primaryMaxScore = questions.length * maxVal;
  let primaryLabelAr = '';
  let severityLevel: PsychSeverityLevel = 'informational';
  let safetyTriggered = false;
  let safetyReasonAr: string | undefined;
  let scientificSummaryAr = '';
  let scoringFormulaUsedAr = spec.scoringRuleDescriptionAr;
  const subscales: PsychSubscaleResult[] = [];
  const strengthsAr: string[] = [];
  const attentionAreasAr: string[] = [];
  const practicalSuggestionsAr: string[] = [];

  // Instrument-specific standardized math
  switch (spec.id) {
    case 'phq-9': {
      primaryScore = totalRaw;
      primaryMaxScore = 27;
      const item9Val = answers['phq9_9'] ?? 0;

      if (primaryScore <= 4) {
        primaryLabelAr = 'أدنى مستوى من الأعراض (0–4)';
        severityLevel = 'minimal';
        scientificSummaryAr =
          'تشير إجاباتج خلال الأسبوعين الماضيين إلى مؤشرات مزاجية ضمن الحد الأدنى. يستحسن الاستمرار في العناية بالنوم والروتين الداعم.';
      } else if (primaryScore <= 9) {
        primaryLabelAr = 'مؤشرات خفيفة تستحق المراقبة (5–9)';
        severityLevel = 'mild';
        scientificSummaryAr =
          'تظهر بعض علامات الإرهاق أو انخفاض الحيوية بدرجة خفيفة. متابعة الراحة الذاتية وإعادة الفحص بعد أسبوعين خطوة مفيدة.';
      } else if (primaryScore <= 14) {
        primaryLabelAr = 'مؤشرات متوسطة (10–14)';
        severityLevel = 'moderate';
        scientificSummaryAr =
          'تتجاوز هذه النتيجة عتبة المتابعة العلمية (≥ 10)، ما يعني أن استشارة طبيب أو أخصائي نفسي ستكون خطوة إيجابية لفهم الأسباب ووضع خطة دعم.';
      } else if (primaryScore <= 19) {
        primaryLabelAr = 'مؤشرات متوسطة إلى شديدة (15–19)';
        severityLevel = 'moderately_severe';
        scientificSummaryAr =
          'تشير الإجابات إلى عبء مزاجي وطاقي مرتفع خلال الأسبوعين الماضيين. يوصى بشدة بمراجعة مختص صحة نفسية للتقييم والمساندة.';
      } else {
        primaryLabelAr = 'مؤشرات شديدة تتطلب دعماً مختصاً (20–27)';
        severityLevel = 'severe';
        scientificSummaryAr =
          'تعكس النتيجة شدة مرتفعة من الأعراض خلال الأسبوعين الماضيين. التواصل المباشر مع طبيب أو أخصائي نفسي مهم جداً في هذه المرحلة.';
      }

      if (item9Val > 0) {
        safetyTriggered = true;
        safetyReasonAr =
          'أشرتِ في الفقرة التاسعة إلى وجود أفكار متعلقة بالموت أو إيذاء النفس؛ نرجو أن تطلبي مساندة بشرية فورية ومختصة.';
      } else if (primaryScore >= 15) {
        safetyTriggered = true;
        safetyReasonAr =
          'النتيجة المرتفعة تشير إلى ضغط نفسي ثقيل يستحق التحدث مباشرة مع مختص موثوق أو طبيب.';
      }

      subscales.push({
        id: 'phq9_total',
        nameAr: 'المؤشر الكلي لـ PHQ-9',
        nameEn: 'PHQ-9 Total Score',
        rawScore: primaryScore,
        scaledScore: primaryScore,
        minScore: 0,
        maxScore: 27,
        percentage: Math.round((primaryScore / 27) * 100),
        bandLabelAr: primaryLabelAr,
        interpretationAr: scientificSummaryAr,
      });

      if (primaryScore <= 9) {
        strengthsAr.push('الحفاظ على قدر واضح من التماسك المزاجي والقدرة على متابعة الأنشطة اليومية.');
      } else {
        attentionAreasAr.push('الانتباه إلى تغيرات النوم أو فقدان الطاقة أو الثقل المزاجي المستمر لأكثر من أسبوعين.');
      }
      practicalSuggestionsAr.push(
        'حافظي على مواعيد نوم ثابتة وتعرّض يومي لضوء النهار الطبيعي.',
        'إذا استمر الانخفاض المزاجي أو أثّر على دراستج أو حياتج اليومية، تحدثي مع طبيب أسرة أو أخصائي نفسي.',
        'دوّني الأنشطة البسيطة التي تخفف الثقل ولو بدرجة صغيرة كالمشي الهادئ أو الحديث مع قريبة موثوقة.'
      );
      break;
    }

    case 'gad-7': {
      primaryScore = totalRaw;
      primaryMaxScore = 21;
      if (primaryScore <= 4) {
        primaryLabelAr = 'قلق طفيف / ضمن الحد الأدنى (0–4)';
        severityLevel = 'minimal';
        scientificSummaryAr =
          'مستوى القلق والتوتر المسجّل خلال الأسبوعين الأخيرين ضمن الحدود الهادئة الطبيعية.';
      } else if (primaryScore <= 9) {
        primaryLabelAr = 'قلق خفيف (5–9)';
        severityLevel = 'mild';
        scientificSummaryAr =
          'يظهر قلق خفيف قابل للإدارة عبر تهدئة الإيقاع اليومي وتنظيم النوم وتقليل المنبهات.';
      } else if (primaryScore <= 14) {
        primaryLabelAr = 'قلق متوسط (10–14)';
        severityLevel = 'moderate';
        scientificSummaryAr =
          'تشير الدرجة (≥ 10) إلى قلق متكرر يؤثر على الراحة أو الاسترخاء، ويُستحسن مناقشته مع مختص داعم.';
      } else {
        primaryLabelAr = 'قلق شديد يستحق مساندة مختصة (15–21)';
        severityLevel = 'severe';
        scientificSummaryAr =
          'تشير الإجابات إلى حدة مرتفعة في التوتر وصعوبة إيقاف القلق؛ استشارة أخصائي صحة نفسية ستساعدج كثيراً.';
        safetyTriggered = true;
        safetyReasonAr = 'الدرجة في نطاق القلق الشديد (≥ 15)، ويستحسن التواصل مع مختص للمتابعة.';
      }

      subscales.push({
        id: 'gad7_total',
        nameAr: 'المؤشر الكلي للقلق (GAD-7)',
        nameEn: 'GAD-7 Total Score',
        rawScore: primaryScore,
        scaledScore: primaryScore,
        minScore: 0,
        maxScore: 21,
        percentage: Math.round((primaryScore / 21) * 100),
        bandLabelAr: primaryLabelAr,
        interpretationAr: scientificSummaryAr,
      });

      if (primaryScore <= 9) {
        strengthsAr.push('قدرة جيدة نسبياً على احتواء التوتر اليومي دون سيطرته الكاملة.');
      } else {
        attentionAreasAr.push('تكرار صعوبة الاسترخاء وتزاحم الأفكار المقلقة خلال الأسبوعين الماضيين.');
      }
      practicalSuggestionsAr.push(
        'جرّبي تمرين التنفس البطني البطيء (4 ثوانٍ شهيق، 6 ثوانٍ زفير) عند تصاعد التوتر.',
        'خفّفي الكافيين وأخبار التوتر قبل النوم بساعتين على الأقل.',
        'اطلبي تقييماً هادئاً من مختص إذا استمرت الدرجة ≥ 10 أو تعارضت مع راحتكِ اليومية.'
      );
      break;
    }

    case 'dass-21': {
      // DASS-21: Multiply each subscale raw sum (0..21) by 2 -> (0..42).
      // Primary score reported strictly as highest subscale normalized /42 rather than raw non-standardized sum
      let worstSub: PsychSubscaleResult | null = null;
      let maxSeverity: PsychSeverityLevel = 'minimal';
      const order: Array<'depression' | 'anxiety' | 'stress'> = ['depression', 'anxiety', 'stress'];

      for (const subId of order) {
        const raw = scoredBySubscale[subId]?.raw ?? 0;
        const doubled = raw * 2;
        const evalRes = scoreDassSubscale(subId, doubled);
        maxSeverity = highestSeverity(maxSeverity, evalRes.severity);
        const entry: PsychSubscaleResult = {
          id: subId,
          nameAr: SUBSCALE_METADATA[subId].nameAr,
          nameEn: SUBSCALE_METADATA[subId].nameEn,
          rawScore: raw,
          scaledScore: doubled,
          minScore: 0,
          maxScore: 42,
          percentage: Math.round((doubled / 42) * 100),
          bandLabelAr: `${evalRes.bandAr} (${doubled}/42)`,
          interpretationAr: evalRes.noteAr,
        };
        subscales.push(entry);
        if (!worstSub || entry.scaledScore > worstSub.scaledScore) {
          worstSub = entry;
        }
      }

      severityLevel = maxSeverity;
      primaryScore = worstSub ? worstSub.scaledScore : 0;
      primaryMaxScore = 42;
      primaryLabelAr = `أعلى بُعد: ${worstSub?.nameAr} (${worstSub?.bandLabelAr})`;
      scientificSummaryAr =
        'يعرض مقياس DASS-21 ثلاثة مؤشرات منفصلة (الاكتئاب، القلق الجسدي، والتوتر العصبي) مضاعفة × 2 لمطابقة المقياس الكامل (0–42) دون دمجها قسرياً في رقم واحد.';

      if (maxSeverity === 'severe' || maxSeverity === 'moderately_severe') {
        safetyTriggered = true;
        safetyReasonAr =
          'أظهر أحد الأبعاد الثلاثة في DASS-21 مستوى شديداً يستحسن معه التحدث مع طبيب أو أخصائي نفسي.';
      }

      for (const s of subscales) {
        if (s.percentage <= 30) {
          strengthsAr.push(`استقرار واضح في بُعد ${s.nameAr}.`);
        } else {
          attentionAreasAr.push(`يظهر بُعد ${s.nameAr} ارتفاعاً نسبياً (${s.bandLabelAr}) يستحق رعاية لطيفة.`);
        }
      }
      practicalSuggestionsAr.push(
        'ميّزي بين التوتر الناتج عن ضغط المهام وبين الإرهاق العاطفي لأن كل مسار يحتاج استجابة مختلفة.',
        'أدرجي فترات راحة قصيرة منتظمة خلال اليوم لتفريغ الشد الجسدي والعصبي.',
        'شاركي هذه المؤشرات مع مختص إذا استمرت في النطاق المتوسط أو الشديد.'
      );
      break;
    }

    case 'who-5': {
      const scaled100 = totalRaw * 4;
      primaryScore = scaled100;
      primaryMaxScore = 100;

      if (scaled100 > 50) {
        primaryLabelAr = `رفاه نفسي جيد (${scaled100}/100)`;
        severityLevel = 'minimal';
        scientificSummaryAr =
          'تشير الدرجة (> 50) إلى مستوى جيد من البشاشة والحيوية وجودة الراحة خلال الأسبوعين الماضيين.';
      } else if (scaled100 > 28) {
        primaryLabelAr = `انخفاض ملحوظ في الرفاه (${scaled100}/100)`;
        severityLevel = 'mild';
        scientificSummaryAr =
          'الدرجة ≤ 50 هي عتبة الفحص الموصى بها لمراجعة الرفاه النفسي، وغالباً ما تدل على إرهاق عام يستحق إبطاء الإيقاع أو إجراء فحص PHQ-9.';
      } else {
        primaryLabelAr = `انخفاض شديد في الرفاه اليومي (${scaled100}/100)`;
        severityLevel = 'moderate';
        scientificSummaryAr =
          'تشير الدرجة ≤ 28 إلى تدنٍ واضح في الحيوية والانتعاش والراحة اليومية؛ يُنصح بمراجعة مختص صحي للاستكشاف الآمن.';
        safetyTriggered = true;
        safetyReasonAr =
          'سجّل مؤشر الرفاه WHO-5 أقل من 28/100، ما يشير إلى استنزاف شديد يستحق الدعم الصحي أو النفسي.';
      }

      subscales.push({
        id: 'who5_total',
        nameAr: 'مؤشر الرفاه القياسي (× 4)',
        nameEn: 'WHO-5 Percentage Index',
        rawScore: totalRaw,
        scaledScore: scaled100,
        minScore: 0,
        maxScore: 100,
        percentage: scaled100,
        bandLabelAr: primaryLabelAr,
        interpretationAr: scientificSummaryAr,
      });

      if (scaled100 > 50) {
        strengthsAr.push('حيوية يومية متماسكة وتوازن مريح بين النوم والاهتمامات.');
      } else {
        attentionAreasAr.push('انخفاض الحيوية والانتعاش الصباحي خلال الأسبوعين الماضيين.');
      }
      practicalSuggestionsAr.push(
        'راجعي جودة النوم والروتين المسائي فهما أول ما يرفع مؤشر WHO-5.',
        'خصّصي وقتاً يومياً قصيراً لنشاط يثير شغفكِ الحقيقي بعيداً عن الشاشات والالتزامات.'
      );
      break;
    }

    case 'rrs-10': {
      const reflectionRaw = scoredBySubscale['reflection']?.raw ?? 5;
      const broodingRaw = scoredBySubscale['brooding']?.raw ?? 5;
      primaryScore = broodingRaw;
      primaryMaxScore = 20;
      severityLevel = broodingRaw >= 15 ? 'moderate' : broodingRaw >= 11 ? 'mild' : 'minimal';
      primaryLabelAr = `الاجترار المُرهق ${broodingRaw}/20 · التأمل التحليلي ${reflectionRaw}/20`;
      scientificSummaryAr =
        'يفصل المقياس بين التأمل التحليلي الهادئ لفهم المشكلة، وبين الاجترار المثقل باللوم الذي يكرر التساؤلات المرهقة دون مخرج عملي.';

      subscales.push(
        {
          id: 'reflection',
          nameAr: SUBSCALE_METADATA.reflection.nameAr,
          nameEn: SUBSCALE_METADATA.reflection.nameEn,
          rawScore: reflectionRaw,
          scaledScore: reflectionRaw,
          minScore: 5,
          maxScore: 20,
          percentage: Math.round(((reflectionRaw - 5) / 15) * 100),
          bandLabelAr: reflectionRaw >= 14 ? 'تأمل تحليلي نشط' : 'تأمل معتدل',
          interpretationAr: 'يمثل محاولة الفهم والتحليل الذاتي عند الحزن أو الانزعاج.',
        },
        {
          id: 'brooding',
          nameAr: SUBSCALE_METADATA.brooding.nameAr,
          nameEn: SUBSCALE_METADATA.brooding.nameEn,
          rawScore: broodingRaw,
          scaledScore: broodingRaw,
          minScore: 5,
          maxScore: 20,
          percentage: Math.round(((broodingRaw - 5) / 15) * 100),
          bandLabelAr: broodingRaw >= 15 ? 'اجترار مرتفع' : broodingRaw >= 11 ? 'اجترار متوسط' : 'اجترار منخفض',
          interpretationAr: 'يقيس إعادة اجترار اللوم والمقارنة السلبية؛ انخفاضه يرتبط بصفاء ذهني أكبر.',
        }
      );

      if (broodingRaw <= 10) {
        strengthsAr.push('قدرة جيدة على تجاوز الموقف الصعب دون الانزلاق في دائرة لوم النفس.');
      } else {
        attentionAreasAr.push('ميل لتكرار الأسئلة الذهنية «لماذا حدث هذا لي؟» عند الشعور بالضيق.');
      }
      if (reflectionRaw >= 12) {
        strengthsAr.push('حضور لافت للتأمل الواعي والتدوين لفهم الذات.');
      }
      practicalSuggestionsAr.push(
        'عند ملاحظة تكرار نفس الفكرة في ذهنكِ لأكثر من 10 دقائق، اسألي: «ما هي أصغر خطوة عملية متاحة الآن؟»',
        'انقلي الأفكار الدائرية من الرأس إلى ورقة خلال خمس دقائق ثم أغلقي الدفتر وغيّري النشاط الحركي.'
      );
      break;
    }

    case 'ipip-big5-50': {
      const factors: Array<
        'extraversion' | 'agreeableness' | 'conscientiousness' | 'emotional_stability' | 'openness'
      > = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'emotional_stability'];

      let highestSub: PsychSubscaleResult | null = null;
      for (const f of factors) {
        const raw = scoredBySubscale[f]?.raw ?? 10; // 10..50
        const pct = Math.round(((raw - 10) / 40) * 100);
        const band = pct >= 70 ? 'بروز واضح' : pct >= 40 ? 'توازن معتدل' : 'ميل هادئ للطرف المقابل';
        const subResult: PsychSubscaleResult = {
          id: f,
          nameAr: SUBSCALE_METADATA[f].nameAr,
          nameEn: SUBSCALE_METADATA[f].nameEn,
          rawScore: raw,
          scaledScore: raw,
          minScore: 10,
          maxScore: 50,
          percentage: pct,
          bandLabelAr: band,
          interpretationAr: `الدرجة ${raw} من 50 (${band}) — لا تمثل حكماً أفضل أو أسوأ، بل تفضيلاً شخصياً.`,
        };
        subscales.push(subResult);
        if (!highestSub || subResult.rawScore > highestSub.rawScore) {
          highestSub = subResult;
        }
      }

      primaryScore = highestSub ? highestSub.rawScore : 30;
      primaryMaxScore = 50;
      severityLevel = 'informational';
      primaryLabelAr = `أبرز سمة حالياً: ${highestSub?.nameAr} (${highestSub?.rawScore}/50)`;
      scientificSummaryAr =
        'يُظهر مقياس IPIP-50 بصمتكِ الشخصية عبر العوامل الخمسة الكبرى بصورة متدرجة، ولا تُختزل الأبعاد الخمسة في درجة كلية واحدة لأن كل بُعد مستقل علمياً.';

      const sortedDesc = [...subscales].sort((a, b) => b.rawScore - a.rawScore);
      strengthsAr.push(
        `بروز واضح في بُعد ${sortedDesc[0].nameAr} وبُعد ${sortedDesc[1].nameAr}.`,
        'وجود توازن خاص يجمع بين سماتكِ دون قوالب جامدة.'
      );
      const lowest = sortedDesc[sortedDesc.length - 1];
      attentionAreasAr.push(
        `بُعد ${lowest.nameAr} سجّل درجة أهدأ (${lowest.rawScore}/50)، ما يعني أن البيئات المتطلبة له قد تحتاج طاقة إضافية أو تخطيطاً داعماً.`
      );
      practicalSuggestionsAr.push(
        'استفيدي من أبرز سماتكِ في اختيار بيئة الدراسة والعمل والعلاقات المناسبة لطبيعتج.',
        'تذكّري أن السمات الخمس تتصف بالمرونة وتنمو بالتدريب الواعي عند الحاجة.'
      );
      break;
    }

    case 'rosenberg-rse-10': {
      primaryScore = totalRaw;
      primaryMaxScore = 30;
      if (primaryScore < 15) {
        primaryLabelAr = `تقدير ذات منخفض (${primaryScore}/30)`;
        severityLevel = 'moderate';
        scientificSummaryAr =
          'تشير الدرجة (< 15) وفق معايير Rosenberg إلى قسوة أو تشكّك ملموس في تقييم الذات حالياً؛ تعزيز اللطف الذاتي والمساندة سيصنع فرقاً حقيقياً.';
      } else if (primaryScore <= 25) {
        primaryLabelAr = `تقدير ذات طبيعي ومتزن (${primaryScore}/30)`;
        severityLevel = 'minimal';
        scientificSummaryAr =
          'تقع الدرجة ضمن النطاق الطبيعي المعتمد (15–25)، ما يعكس نظرة متوازنة وصحية تجاه قيمتج وقدراتج.';
      } else {
        primaryLabelAr = `تقدير ذات مرتفع (${primaryScore}/30)`;
        severityLevel = 'minimal';
        scientificSummaryAr =
          'تُظهر الإجابات تقديراً مرتفعاً للذات وإيماناً قوياً بقيمتج الشخصية (> 25).';
      }

      subscales.push({
        id: 'rses_total',
        nameAr: 'مقياس روزنبرغ لتقدير الذات',
        nameEn: 'RSES Total (0–30)',
        rawScore: primaryScore,
        scaledScore: primaryScore,
        minScore: 0,
        maxScore: 30,
        percentage: Math.round((primaryScore / 30) * 100),
        bandLabelAr: primaryLabelAr,
        interpretationAr: scientificSummaryAr,
      });

      if (primaryScore >= 15) {
        strengthsAr.push('قبول متزن للذات وعدم الانسياق الكامل وراء الانتقاد القاسي للذات.');
      } else {
        attentionAreasAr.push('ظهور ميل لنقد الذات بقسوة أو التقليل من الإنجازات والصفات الطيبة.');
      }
      practicalSuggestionsAr.push(
        'راقبي الحديث الداخلي عند التعثّر: خاطبي نفسج باللطف الذي تخاطبين به صديقة عزيزة.',
        'دوّني أسبوعياً ثلاثة مواقف أظهرَت صبرج أو إجادتج أو قيمتج الإنسانية.'
      );
      break;
    }

    case 'brs-6': {
      const mean = Number((totalRaw / 6).toFixed(2));
      primaryScore = mean;
      primaryMaxScore = 5;
      if (mean < 3.0) {
        primaryLabelAr = `مرونة نفسية منخفضة (${mean.toFixed(2)} / 5.00)`;
        severityLevel = 'mild';
        scientificSummaryAr =
          'تشير الدرجة (< 3.00 في BRS) إلى أن الأزمات تستغرق منج وقتاً أطول لاستعادة التوازن؛ بناء استراتيجيات تعافٍ هادئة سيسندج كثيراً.';
      } else if (mean <= 4.3) {
        primaryLabelAr = `مرونة نفسية جيدة ومتوازنة (${mean.toFixed(2)} / 5.00)`;
        severityLevel = 'minimal';
        scientificSummaryAr =
          'متوسطج ضمن النطاق المرجعي الجيد (3.00–4.30)، ما يدل على قدرة طيبة على استعادة توازنج بعد الضغوط.';
      } else {
        primaryLabelAr = `مرونة نفسية مرتفعة (${mean.toFixed(2)} / 5.00)`;
        severityLevel = 'minimal';
        scientificSummaryAr =
          'متوسط مرتفع (> 4.30) يعكس سرعة وثباتاً لافتين في النهوض والتكيف بعد الشدائد.';
      }

      subscales.push({
        id: 'brs_total',
        nameAr: 'متوسط المرونة النفسية (BRS)',
        nameEn: 'BRS Mean Score (1.0–5.0)',
        rawScore: totalRaw,
        scaledScore: mean,
        minScore: 1,
        maxScore: 5,
        percentage: Math.round(((mean - 1) / 4) * 100),
        bandLabelAr: primaryLabelAr,
        interpretationAr: scientificSummaryAr,
      });

      if (mean >= 3.0) {
        strengthsAr.push('قدرة ملحوظة على العودة للتوازن بعد المواقف العصيبة.');
      } else {
        attentionAreasAr.push('إحساس بأن التبعات النفسية للمواقف الصعبة تبقى لفترة ممتدة.');
      }
      practicalSuggestionsAr.push(
        'احرصي على وجود دائرة دعم صغيرة وموثوقة تلجئين إليها وقت الأزمات بدلاً من حمل الضغط وحدج.',
        'قسّمي فترة التعافي إلى روتين نوم وغذاء ومشي بسيط لمدة 48 ساعة بعد كل حدث صعب.'
      );
      break;
    }

    case 'swls-5': {
      primaryScore = totalRaw;
      primaryMaxScore = 35;
      if (primaryScore >= 31) primaryLabelAr = 'راضية جداً عن حياتكِ (31–35)';
      else if (primaryScore >= 26) primaryLabelAr = 'راضية عن حياتكِ (26–30)';
      else if (primaryScore >= 21) primaryLabelAr = 'راضية قليلاً (21–25)';
      else if (primaryScore === 20) primaryLabelAr = 'نقطة محايدة (20)';
      else if (primaryScore >= 15) primaryLabelAr = 'غير راضية قليلاً (15–19)';
      else if (primaryScore >= 10) primaryLabelAr = 'غير راضية (10–14)';
      else primaryLabelAr = 'عدم رضا شديد يستحق الاهتمام (5–9)';

      severityLevel = primaryScore < 15 ? 'moderate' : primaryScore < 20 ? 'mild' : 'minimal';
      scientificSummaryAr =
        'يقيس SWLS حكمكِ المعرفي العام على مسار حياتكِ وفق معاييرج الذاتية الخاصة عبر السلم السباعي الدقيق لـ Ed Diener.';

      subscales.push({
        id: 'swls_total',
        nameAr: 'مجموع الرضا عن الحياة (SWLS)',
        nameEn: 'SWLS Total (5–35)',
        rawScore: primaryScore,
        scaledScore: primaryScore,
        minScore: 5,
        maxScore: 35,
        percentage: Math.round(((primaryScore - 5) / 30) * 100),
        bandLabelAr: primaryLabelAr,
        interpretationAr: scientificSummaryAr,
      });

      if (primaryScore >= 21) {
        strengthsAr.push('تقدير إيجابي متماسك لجودة الحياة العامة وإنجازاتها حتى الآن.');
      } else {
        attentionAreasAr.push('وجود فجوة بين واقع الحياة الحالي وبين ما تطمحين إليه في واحد أو أكثر من مجالات حياتج.');
      }
      practicalSuggestionsAr.push(
        'حدّدي مجالاً واحداً فقط (الدراسة/العمل، العلاقات، الصحة، أو المعنى الشخصي) يرفع رضاج بنسبة 10% خلال الشهر القادم.',
        'قارني خطواتج بمسارج الشخصي السابق بدلاً من المقارنة القاسية بالصور المثالية.'
      );
      break;
    }

    case 'gse-10': {
      primaryScore = totalRaw;
      primaryMaxScore = 40;
      if (primaryScore >= 32) {
        primaryLabelAr = `كفاءة ذاتية مرتفعة (${primaryScore}/40)`;
        severityLevel = 'minimal';
      } else if (primaryScore >= 24) {
        primaryLabelAr = `كفاءة ذاتية جيدة ومتوازنة (${primaryScore}/40)`;
        severityLevel = 'minimal';
      } else {
        primaryLabelAr = `كفاءة ذاتية تحتاج تعزيزاً تدريجياً (${primaryScore}/40)`;
        severityLevel = 'mild';
      }

      scientificSummaryAr =
        'يعكس مقياس Schwarzer قناعتج الذاتية بقدرتج على توليد الحلول والتعامل مع المفاجآت والتمسك بالأهداف (المتوسط البحثي الشائع يقارب 29/40).';

      subscales.push({
        id: 'gse_total',
        nameAr: 'الكفاءة الذاتية العامة (GSE)',
        nameEn: 'GSE Total (10–40)',
        rawScore: primaryScore,
        scaledScore: primaryScore,
        minScore: 10,
        maxScore: 40,
        percentage: Math.round(((primaryScore - 10) / 30) * 100),
        bandLabelAr: primaryLabelAr,
        interpretationAr: scientificSummaryAr,
      });

      if (primaryScore >= 28) {
        strengthsAr.push('ثقة متماسكة بالقدرة على التفكير في حلول عملية عند العقبات.');
      } else {
        attentionAreasAr.push('ميل للتشكك في القدرة الذاتية عند مواجهة مواقف غير متوقعة أو معارضة.');
      }
      practicalSuggestionsAr.push(
        'تُبنى الكفاءة الذاتية عبر «انتصارات صغيرة متراكمة»؛ اختاري مهمة مؤجلة قصيرة وأنهيها اليوم.',
        'استحضري 3 أزمات سابقة تجاوزتِها بالفعل لتذكير ذهنكِ بمواردكِ الواقعية.'
      );
      break;
    }

    case 'iri-28': {
      const order: Array<'perspective_taking' | 'empathic_concern' | 'fantasy' | 'personal_distress'> = [
        'perspective_taking',
        'empathic_concern',
        'fantasy',
        'personal_distress',
      ];
      let highest: PsychSubscaleResult | null = null;
      for (const sId of order) {
        const raw = scoredBySubscale[sId]?.raw ?? 0; // 0..28
        const pct = Math.round((raw / 28) * 100);
        const band = pct >= 68 ? 'حضور قوي' : pct >= 40 ? 'معتدل ومتزن' : 'منخفض نسبياً';
        const sub: PsychSubscaleResult = {
          id: sId,
          nameAr: SUBSCALE_METADATA[sId].nameAr,
          nameEn: SUBSCALE_METADATA[sId].nameEn,
          rawScore: raw,
          scaledScore: raw,
          minScore: 0,
          maxScore: 28,
          percentage: pct,
          bandLabelAr: `${band} (${raw}/28)`,
          interpretationAr:
            sId === 'personal_distress'
              ? 'ارتفاع هذا البُعد يدل على تأثركِ وتوتركِ السريع عند رؤية ضيق الآخرين، وليس عيباً في الأخلاق بل حاجة لحماية توازنج.'
              : 'مؤشر وصفي لأحد جوانب التعاطف الاجتماعي المستقلة وفق نموذج Davis.',
        };
        subscales.push(sub);
        if (!highest || sub.rawScore > highest.rawScore) highest = sub;
      }

      primaryScore = highest ? highest.rawScore : 0;
      primaryMaxScore = 28;
      severityLevel = 'informational';
      primaryLabelAr = `أبرز بُعد تعاطفي: ${highest?.nameAr}`;
      scientificSummaryAr =
        'وفق إرشادات Mark Davis، تُقرأ الأبعاد الأربعة للتعاطف منفردة دون دمجها في رقم واحد لأن التعاطف المعرفي يختلف عن القلق أو التقمص العاطفي.';

      const pt = subscales.find((s) => s.id === 'perspective_taking');
      const ec = subscales.find((s) => s.id === 'empathic_concern');
      const pd = subscales.find((s) => s.id === 'personal_distress');
      if (pt && pt.rawScore >= 18) strengthsAr.push('قدرة مميزة على رؤية الخلافات من زوايا متعددة قبل الحكم.');
      if (ec && ec.rawScore >= 18) strengthsAr.push('دفء إنساني وحسّ تعاطفي صادق مع ظروف الآخرين.');
      if (pd && pd.rawScore >= 17) {
        attentionAreasAr.push('تستنزف المواقف الطارئة المتوترة طاقتكِ العاطفية بسرعة؛ تحتاجين لحدود عاطفية تحميج من الاحتراق.');
      }
      practicalSuggestionsAr.push(
        'الفرق بين التعاطف الصحي وبين الكرب هو قدرتكِ على احتواء ألم الآخر دون الغرق فيه.',
        'تدربي على طرح سؤال استيضاحي واحد قبل تفسير نية الطرف المقابل في الخلافات.'
      );
      break;
    }

    default: {
      // Exploratory Unstandardized Modules (explore-*)
      severityLevel = 'informational';
      const subEntries = Object.entries(scoredBySubscale);
      let pctSum = 0;
      for (const [subId, group] of subEntries) {
        const minSub = group.count * minVal;
        const maxSub = group.count * maxVal;
        const pct = maxSub > minSub ? Math.round(((group.raw - minSub) / (maxSub - minSub)) * 100) : 0;
        pctSum += pct;
        const meta = SUBSCALE_METADATA[subId] ?? { nameAr: subId, nameEn: subId };
        const band = getBandByPercent(pct);
        subscales.push({
          id: subId,
          nameAr: meta.nameAr,
          nameEn: meta.nameEn,
          rawScore: group.raw,
          scaledScore: pct,
          minScore: minSub,
          maxScore: maxSub,
          percentage: pct,
          bandLabelAr: `${band} (${pct}%)`,
          interpretationAr: 'مؤشر تأملي غير مقنن لمساعدتج على الملاحظة الشخصية.',
        });
      }

      const avgPct = subEntries.length > 0 ? Math.round(pctSum / subEntries.length) : 0;
      primaryScore = avgPct;
      primaryMaxScore = 100;
      primaryLabelAr = `المؤشر التأملي الاستكشافي: ${avgPct}% (أداة غير مقننة)`;
      scientificSummaryAr =
        'تنبيه علمي: هذه الوحدة أداة استكشافية غير مقننة لتنظيم تأملكِ الشخصي فقط، وليست اختباراً سيكومترياً معتمداً أو حكماً على قدراتج.';

      const sorted = [...subscales].sort((a, b) => b.percentage - a.percentage);
      if (sorted[0]) strengthsAr.push(`يمثل محور «${sorted[0].nameAr}» أبرز نقطة ارتكاز وصفية في تأملكِ الحالي.`);
      const weakest = sorted[sorted.length - 1];
      if (weakest) {
        attentionAreasAr.push(
          `محور «${weakest.nameAr}» أظهر المساحة الأوضح للتحسين العملي الهادئ في روتينكِ القادم.`
        );
      }
      practicalSuggestionsAr.push(
        'اختاري سلوكاً واحداً فقط من المحور الأقل درجة وطبّقيه لمدة أسبوع واحد دون مبالغة.',
        'تذكري أن هذه الملاحظات وصف لحظي قابل للتغيير تماماً بالتجربة والتعلّم.'
      );
      break;
    }
  }

  return {
    id: `res_${spec.id}_${Date.now()}`,
    instrumentId: spec.id,
    completedAtIso: new Date().toISOString(),
    elapsedSeconds,
    answers,
    primaryScore,
    primaryMaxScore,
    primaryLabelAr,
    severityLevel,
    safetyTriggered,
    safetyReasonAr,
    subscales,
    scientificSummaryAr,
    strengthsAr,
    attentionAreasAr,
    practicalSuggestionsAr,
    limitationsAr: spec.limitationsAr,
    scoringFormulaUsedAr,
  };
}
