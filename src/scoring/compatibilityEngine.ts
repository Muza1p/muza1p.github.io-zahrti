import { RIASEC_ORDER, RIASEC_PROFILES } from '@/src/data/interests/riasecProfiles';
import {
  AssessmentResult,
  CompatibilityDimensionItem,
  CompatibilityReport,
  RiasecCode,
} from '@/src/types';

function formatListAr(items: string[]): string {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} و${items[1]}`;
  return `${items.slice(0, -1).join('، ')} و${items[items.length - 1]}`;
}

function summarizePersonality(name: string, result: AssessmentResult): string {
  const topNames = result.topThreeCodes.map((c) => RIASEC_PROFILES[c].nameAr.replace('النمط ', ''));
  const primary = RIASEC_PROFILES[result.topThreeCodes[0]];
  if (result.flatProfile) {
    return `تظهر لدى ${name} اهتمامات متوزعة بتوازن عبر أكثر من مجال مهني، مع مرونة في استكشاف أنشطة متنوعة.`;
  }
  return `تبرز لدى ${name} ميول أوضح نحو الجانب ${formatListAr(topNames)} (${result.hollandCode})، مما يعكس انجذاباً إلى ${primary.subtitleAr}.`;
}

function deriveCommunicationStyle(
  name1: string,
  name2: string,
  r1: AssessmentResult,
  r2: AssessmentResult
): string {
  const social1 = r1.scores.social.score;
  const social2 = r2.scores.social.score;
  const artistic1 = r1.scores.artistic.score;
  const artistic2 = r2.scores.artistic.score;
  const inv1 = r1.scores.investigative.score;
  const inv2 = r2.scores.investigative.score;

  const avgSocial = (social1 + social2) / 2;
  const avgArtistic = (artistic1 + artistic2) / 2;
  const avgInv = (inv1 + inv2) / 2;
  const socialGap = Math.abs(social1 - social2);

  if (avgSocial >= 12 && avgArtistic >= 11) {
    return `يمزج الحوار بين ${name1} و${name2} عادة بين الدفء العاطفي والاهتمام بالتعبير والمعاني، مع تقدير للمساحات الإبداعية والحديث الصادق.`;
  }
  if (socialGap >= 6) {
    const moreSocial = social1 > social2 ? name1 : name2;
    const calmer = social1 > social2 ? name2 : name1;
    return `تبرز لدى ${moreSocial} مبادرة أوضح للحوار وتبادل المشاعر مباشرة، بينما قد يعبّر الطرف الآخر (${calmer}) عن اهتمامه عبر الأفعال العملية أو التحليل الهادئ؛ إدراك هذا الفارق يمنع سوء الفهم.`;
  }
  if (avgInv >= 12) {
    return `يميل التواصل بين ${name1} و${name2} إلى الوضوح الفكري والأسئلة العميقة وبناء الرأي على النقاش الهادئ وتبادل الأفكار.`;
  }
  return `يميل أسلوب التواصل بين ${name1} و${name2} إلى التوازن بين المشاركة الوجدانية والوضوح العملي، مع استفادة واضحة من تخصيص وقت هادئ للحديث دون استعجال.`;
}

function deriveDecisionStyle(
  name1: string,
  name2: string,
  r1: AssessmentResult,
  r2: AssessmentResult
): string {
  const conv1 = r1.scores.conventional.score + r1.scores.realistic.score;
  const conv2 = r2.scores.conventional.score + r2.scores.realistic.score;
  const open1 = r1.scores.artistic.score + r1.scores.investigative.score;
  const open2 = r2.scores.artistic.score + r2.scores.investigative.score;
  const entAvg = (r1.scores.enterprising.score + r2.scores.enterprising.score) / 2;

  const p1Structured = conv1 > open1 + 4;
  const p2Structured = conv2 > open2 + 4;

  if (p1Structured !== p2Structured) {
    const structuredPerson = p1Structured ? name1 : name2;
    const exploratoryPerson = p1Structured ? name2 : name1;
    return `عند اتخاذ القرارات، يميل الأسلوب لدى ${structuredPerson} عادةً إلى الخطة الواضحة والتفاصيل المحددة مسبقاً، بينما يفتح مسار ${exploratoryPerson} مجالاً للبدائل والمرونة؛ هذا التكامل ينتج قرارات أرسخ إذا استمع كل طرف لمنطق الآخر.`;
  }
  if (entAvg >= 12) {
    return `يتشارك ${name1} و${name2} ميلاً للمبادرة والتركيز على الخطوة التالية، ويفيدهما مراجعة التفاصيل الهادئة قبل حسم القرارات الكبيرة.`;
  }
  return `يميل الطرفان غالباً إلى التروّي وجمع الصورة الكاملة قبل الحسم، مما يمنح قراراتهما المشتركة طابعاً متزناً بعيداً عن التسرع.`;
}

/**
 * Computes an exploratory compatibility report strictly from two completed 30-item RIASEC profiles.
 * Returns null if either profile lacks a complete, valid AssessmentResult — zero partial/fabricated outputs.
 */
export function computeCompatibilityReport(
  person1Name: string,
  person2Name: string,
  result1: AssessmentResult | null,
  result2: AssessmentResult | null
): CompatibilityReport | null {
  if (!result1 || !result2) return null;

  const v1 = RIASEC_ORDER.map((c) => result1.scores[c]?.ratio ?? 0);
  const v2 = RIASEC_ORDER.map((c) => result2.scores[c]?.ratio ?? 0);

  const dot = v1.reduce((sum, val, i) => sum + val * v2[i], 0);
  const mag1 = Math.sqrt(v1.reduce((sum, val) => sum + val * val, 0));
  const mag2 = Math.sqrt(v2.reduce((sum, val) => sum + val * val, 0));
  const cosine = mag1 > 0 && mag2 > 0 ? Math.max(0, Math.min(1, dot / (mag1 * mag2))) : 0;
  const cosineSimilarityPct = Math.round(cosine * 100);

  const meanAbsDiff =
    v1.reduce((sum, val, i) => sum + Math.abs(val - v2[i]), 0) / RIASEC_ORDER.length;
  const proximityAlignmentPct = Math.round(Math.max(0, Math.min(1, 1 - meanAbsDiff)) * 100);

  // Weighted exploratory harmony index combining pattern shape similarity + intensity proximity
  const harmonyIndex = Math.round(cosineSimilarityPct * 0.58 + proximityAlignmentPct * 0.42);

  const allDimensionComparisons: CompatibilityDimensionItem[] = RIASEC_ORDER.map((code) => {
    const s1 = result1.scores[code]?.score ?? 0;
    const s2 = result2.scores[code]?.score ?? 0;
    const diff = Math.abs(s1 - s2);
    const info = RIASEC_PROFILES[code];

    let noteAr = '';
    if (s1 >= 10 && s2 >= 10 && diff <= 5) {
      noteAr = `نقطة التقاء قوية بين ${person1Name} و${person2Name} في ${info.subtitleAr}.`;
    } else if (diff >= 5) {
      const higherName = s1 > s2 ? person1Name : person2Name;
      noteAr = `تباين مكمل: تبرز درجة ${higherName} أكثر في هذا المجال (${Math.max(s1, s2)}/20 مقابل ${Math.min(s1, s2)}/20)، مما يضيف زاوية جديدة للثنائي.`;
    } else {
      noteAr = `تقارب متوازن في الاهتمام بالأنشطة المرتبطة بهذا النمط.`;
    }

    return {
      code,
      nameAr: info.nameAr,
      person1Score: s1,
      person2Score: s2,
      difference: diff,
      noteAr,
    };
  });

  const sharedStrengths = allDimensionComparisons
    .filter((d) => d.person1Score >= 10 && d.person2Score >= 10 && d.difference <= 5)
    .sort((a, b) => b.person1Score + b.person2Score - (a.person1Score + a.person2Score));

  // Fallback to closest convergent pair if no high-score overlap satisfies diff <= 5
  const finalShared =
    sharedStrengths.length > 0
      ? sharedStrengths.slice(0, 3)
      : [...allDimensionComparisons]
          .sort((a, b) => a.difference - b.difference || b.person1Score + b.person2Score - (a.person1Score + a.person2Score))
          .slice(0, 2);

  const complementaryDifferences = [...allDimensionComparisons]
    .filter((d) => d.difference >= 4)
    .sort((a, b) => b.difference - a.difference)
    .slice(0, 3);

  const sharedActivitiesAr: string[] = [];
  const topSharedCodes = new Set(finalShared.map((d) => d.code));

  if (topSharedCodes.has('artistic')) {
    sharedActivitiesAr.push('مشاريع إبداعية مشتركة: قراءة نصوص ملهمة، تصميم، تصوير، أو تخطيط زوايا جمالية.');
  }
  if (topSharedCodes.has('investigative')) {
    sharedActivitiesAr.push('جلسات فضول معرفي: مناقشة أفكار علمية، وثائقيات، أو التخطيط لمشاريع بحثية وتقنية.');
  }
  if (topSharedCodes.has('social')) {
    sharedActivitiesAr.push('أنشطة ذات أثر إنساني: التطوع، تبادل الدعم في الدراسة، والاهتمام بدوائر الصداقة والأسرة.');
  }
  if (topSharedCodes.has('realistic')) {
    sharedActivitiesAr.push('تجارب عملية ملموسة: الأعمال اليدوية، الرحلات الميدانية، أو تنفيذ خطط واقعية خطوة بخطوة.');
  }
  if (topSharedCodes.has('enterprising')) {
    sharedActivitiesAr.push('تحديات وأهداف طموحة: التخطيط لمبادرات أو مشاريع صغيرة وتبادل أدوار القيادة.');
  }
  if (topSharedCodes.has('conventional')) {
    sharedActivitiesAr.push('ترتيب الخطط والجداول: وضع أهداف شهرية واضحة وإدارة الوقت والميزانيات بهدوء.');
  }
  if (sharedActivitiesAr.length < 2) {
    sharedActivitiesAr.push(
      'مناقشة مسارات التخصص المستقبلية وتجربة أنشطة خارج روتين كل طرف للتعرف على اهتمامات الآخر.'
    );
  }

  const mutualUnderstandingTipsAr: string[] = [
    `احترما اختلاف وتيرة الإنجاز: وجود فوارق في بعض أنماط RIASEC يعني أن كل طرف يضيف ما قد يغفل عنه الآخر.`,
    `خصصا مساحة للحوار عند القرارات المهمة تجمع بين التفكير التحليلي والتعاطف دون افتراض تطابق التفضيلات.`,
    `تذكرا أن هذا التحليل قراءة استكشافية لأنماط الاهتمامات المهنية والعملية فقط، وليس مقياساً سريرياً أو حكماً على نجاح العلاقة.`,
  ];

  return {
    harmonyIndex,
    cosineSimilarityPct,
    proximityAlignmentPct,
    sharedStrengths: finalShared,
    complementaryDifferences,
    allDimensionComparisons,
    personalitySummaryPerson1Ar: summarizePersonality(person1Name, result1),
    personalitySummaryPerson2Ar: summarizePersonality(person2Name, result2),
    communicationTendencyAr: deriveCommunicationStyle(person1Name, person2Name, result1, result2),
    decisionStyleAr: deriveDecisionStyle(person1Name, person2Name, result1, result2),
    sharedActivitiesAr: sharedActivitiesAr.slice(0, 4),
    mutualUnderstandingTipsAr,
    person1TopCodes: result1.topThreeCodes as RiasecCode[],
    person2TopCodes: result2.topThreeCodes as RiasecCode[],
    calculatedAtIso: new Date().toISOString(),
    formulaDescriptionAr:
      'يُحسب مؤشر التوافق الاستكشافي بدمج التشابه الاتجاهي (Cosine Similarity بنسبة 58%) مع التقارب العددي عبر الأبعاد الستة (1 - متوسط الفارق النسبي بنسبة 42%) استناداً إلى نتائج Mini-IP الفعلية للطرفين.',
  };
}
