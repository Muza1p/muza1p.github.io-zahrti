import { PsychQuestion } from '@/src/types/psychology';

export async function loadInstrumentQuestions(instrumentId: string): Promise<PsychQuestion[]> {
  if (['phq-9', 'gad-7', 'dass-21', 'who-5', 'rrs-10'].includes(instrumentId)) {
    const mod = await import('./items/clinicalItems');
    return mod.CLINICAL_ITEMS_BY_ID[instrumentId] ?? [];
  }

  if (['ipip-big5-50', 'rosenberg-rse-10'].includes(instrumentId)) {
    const mod = await import('./items/personalityItems');
    return mod.PERSONALITY_ITEMS_BY_ID[instrumentId] ?? [];
  }

  if (['brs-6', 'swls-5', 'gse-10', 'iri-28'].includes(instrumentId)) {
    const mod = await import('./items/growthEmpathyItems');
    return mod.GROWTH_EMPATHY_ITEMS_BY_ID[instrumentId] ?? [];
  }

  if (instrumentId.startsWith('explore-')) {
    const mod = await import('./items/exploratoryItems');
    return mod.EXPLORATORY_ITEMS_BY_ID[instrumentId] ?? [];
  }

  return [];
}
