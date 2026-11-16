import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  BookOpenCheck,
  CheckCircle2,
  Clock,
  FileSearch,
  Lock,
  Search,
} from 'lucide-react';
import { EditorialCrest } from '@/src/components/ornaments/BotanicalArt';
import {
  PSYCH_DOMAIN_ORDER,
  PSYCH_DOMAINS,
  PSYCH_INSTRUMENTS_REGISTRY,
} from '@/src/data/assessments/registry';
import {
  PsychCompletedResult,
  PsychDomainId,
  PsychInstrumentSpec,
  PsychSessionState,
} from '@/src/types/psychology';

interface LibraryPageProps {
  onNavigate: (to: string) => void;
  sessions: Record<string, PsychSessionState>;
  completedResults: PsychCompletedResult[];
  hasCareerResult: boolean;
  careerAnsweredCount: number;
}

type StatusFilter = 'all' | 'playable' | 'completed' | 'in_progress' | 'exploratory_or_licensed';

export function formatScientificBadgeLabel(spec: PsychInstrumentSpec): string {
  switch (spec.scientificStatus) {
    case 'standardized_open':
      return 'مقنن علمياً · مفتوح المصدر';
    case 'standardized_free_attribution':
      return 'مقنن علمياً · مجاني بالإسناد';
    case 'exploratory_unstandardized':
      return 'أداة استكشافية غير مقننة — للتأمل فقط';
    case 'requires_license_reference':
      return 'مرجع توثيقي · يتطلب ترخيصاً قبل التفعيل';
  }
}

export function LibraryPage({
  onNavigate,
  sessions,
  completedResults,
  hasCareerResult,
  careerAnsweredCount,
}: LibraryPageProps) {
  const [selectedDomain, setSelectedDomain] = useState<PsychDomainId | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const completedIds = useMemo(() => {
    const set = new Set<string>(completedResults.map((r) => r.instrumentId));
    if (hasCareerResult) set.add('onet-mini-ip');
    return set;
  }, [completedResults, hasCareerResult]);

  const isInstrumentInProgress = (spec: PsychInstrumentSpec): boolean => {
    if (spec.isLegacyOnetRoute) {
      return careerAnsweredCount > 0 && careerAnsweredCount < 30;
    }
    const sess = sessions[spec.id];
    return Boolean(sess && Object.keys(sess.answers).length > 0);
  };

  const getAnsweredCount = (spec: PsychInstrumentSpec): number => {
    if (spec.isLegacyOnetRoute) return careerAnsweredCount;
    const sess = sessions[spec.id];
    return sess ? Object.keys(sess.answers).length : 0;
  };

  const filteredInstruments = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PSYCH_INSTRUMENTS_REGISTRY.filter((spec) => {
      if (selectedDomain !== 'all' && spec.domain !== selectedDomain) return false;

      if (statusFilter === 'playable' && spec.scientificStatus === 'requires_license_reference') {
        return false;
      }
      if (statusFilter === 'completed' && !completedIds.has(spec.id)) {
        return false;
      }
      if (statusFilter === 'in_progress' && !isInstrumentInProgress(spec)) {
        return false;
      }
      if (
        statusFilter === 'exploratory_or_licensed' &&
        spec.scientificStatus !== 'exploratory_unstandardized' &&
        spec.scientificStatus !== 'requires_license_reference'
      ) {
        return false;
      }

      if (q) {
        const haystack =
          `${spec.titleAr} ${spec.titleEn} ${spec.shortCode} ${spec.shortDescriptionAr} ${spec.domainLabelAr}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [completedIds, searchQuery, selectedDomain, sessions, statusFilter, careerAnsweredCount]);

  const playableCount = PSYCH_INSTRUMENTS_REGISTRY.filter(
    (s) => s.scientificStatus !== 'requires_license_reference'
  ).length;
  const completedCount = completedIds.size;

  const handleOpenInstrument = (spec: PsychInstrumentSpec) => {
    if (spec.isLegacyOnetRoute) {
      onNavigate('/intro');
      return;
    }
    onNavigate(`/assessment/${spec.id}`);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 space-y-8">
      {/* Header & Honest Scientific Summary */}
      <header className="space-y-4 border-b border-[#E9D8D1] pb-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <EditorialCrest className="w-12 h-7" />
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#351B38]">
              مكتبة المقاييس النفسية وفهم الذات
            </h1>
            <p className="text-sm sm:text-base leading-relaxed text-[#5F4562]">
              مساحتكِ الشخصية الهادئة لاكتشاف الشخصية والمشاعر والعلاقات والسلوك والنمو الذاتي.
              نميّز بوضوح تام بين المقاييس العلمية المفتوحة المعتمدة وبين وحدات التأمل الاستكشافية
              غير المقننة، دون تشخيص طبي أو دمج عشوائي للدرجات.
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-1.5 text-xs sm:text-sm text-[#5F4562] tabular-nums">
            <span>
              المقاييس المتاحة للتطبيق: <strong className="text-[#351B38]">{playableCount}</strong>
            </span>
            <span>
              المكتملة في ملفكِ:{' '}
              <strong className="text-[#762D50]">
                {completedCount} / {playableCount}
              </strong>
            </span>
            {completedCount > 0 && (
              <button
                type="button"
                onClick={() => onNavigate('/report')}
                className="inline-flex items-center gap-1.5 font-semibold text-[#762D50] hover:underline cursor-pointer pt-1"
              >
                <span>فتح التقرير النفسي الشامل</span>
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Search & Status Filters */}
      <section className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5 relative">
            <Search
              className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6F5472]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحثي باسم المقياس، الرمز (مثل PHQ-9)، أو الموضوع..."
              className="w-full min-h-[44px] rounded-xl border border-[#E9D8D1] bg-[#FFFDF9] pr-10 pl-4 py-2 text-sm text-[#351B38] placeholder:text-[#6F5472]/70 focus:border-[#762D50] focus:outline-none"
            />
          </div>

          <div
            className="lg:col-span-7 flex flex-wrap items-center gap-1.5"
            role="group"
            aria-label="تصفية حسب الحالة"
          >
            {(
              [
                ['all', 'الكل'],
                ['playable', 'المتاحة للتطبيق'],
                ['completed', 'المكتملة'],
                ['in_progress', 'قيد الاستكمال'],
                ['exploratory_or_licensed', 'استكشافية / تحتاج ترخيصاً'],
              ] as Array<[StatusFilter, string]>
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setStatusFilter(key)}
                className={`min-h-[38px] rounded-lg px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  statusFilter === key
                    ? 'bg-[#351B38] text-[#F9F3EC]'
                    : 'bg-[#FFFDF9] border border-[#E9D8D1] text-[#5F4562] hover:border-[#762D50]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 7+1 Domain Tabs */}
        <div
          className="flex flex-wrap items-center gap-2 border-b border-[#E9D8D1] pb-4"
          role="tablist"
          aria-label="أقسام المكتبة النفسية"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selectedDomain === 'all'}
            onClick={() => setSelectedDomain('all')}
            className={`min-h-[38px] rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
              selectedDomain === 'all'
                ? 'bg-[#762D50] text-[#F9F3EC]'
                : 'text-[#5F4562] hover:bg-[#EFE4DC]'
            }`}
          >
            جميع الأقسام ({PSYCH_INSTRUMENTS_REGISTRY.length})
          </button>

          {PSYCH_DOMAIN_ORDER.map((domainId) => {
            const info = PSYCH_DOMAINS[domainId];
            return (
              <button
                key={domainId}
                type="button"
                role="tab"
                aria-selected={selectedDomain === domainId}
                onClick={() => setSelectedDomain(domainId)}
                className={`min-h-[38px] rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedDomain === domainId
                    ? 'bg-[#762D50] text-[#F9F3EC]'
                    : 'text-[#5F4562] hover:bg-[#EFE4DC]'
                }`}
              >
                {info.nameAr}
              </button>
            );
          })}
        </div>
      </section>

      {/* Instruments Grid — Zero-Pill Typography Discipline */}
      {filteredInstruments.length === 0 ? (
        <div className="rounded-2xl border border-[#E9D8D1] bg-[#FFFDF9] p-10 text-center space-y-3">
          <FileSearch className="mx-auto h-8 w-8 text-[#6F5472]" aria-hidden="true" />
          <h2 className="font-display text-xl font-bold text-[#351B38]">
            لا توجد أدوات مطابقة للتصفية الحالية
          </h2>
          <p className="text-sm text-[#5F4562]">
            جرّبي مسح عبارة البحث أو إعادة التصفية إلى «الكل» لاستعراض كامل المكتبة.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedDomain('all');
              setStatusFilter('all');
              setSearchQuery('');
            }}
            className="rounded-full bg-[#351B38] px-5 py-2 text-xs font-medium text-[#F9F3EC] hover:bg-[#4B2B4E] cursor-pointer"
          >
            عرض جميع الأدوات
          </button>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {filteredInstruments.map((spec) => {
            const isReferenceOnly = spec.scientificStatus === 'requires_license_reference';
            const isExploratory = spec.scientificStatus === 'exploratory_unstandardized';
            const isDone = completedIds.has(spec.id);
            const answered = getAnsweredCount(spec);
            const inProgress = !isReferenceOnly && answered > 0 && answered < spec.questionCount;

            return (
              <article
                key={spec.id}
                className={`rounded-2xl border p-6 flex flex-col justify-between gap-5 transition-colors ${
                  isReferenceOnly
                    ? 'border-[#E9D8D1] bg-[#F9F3EC]/70'
                    : 'border-[#E9D8D1] bg-[#FFFDF9] hover:border-[#762D50]/55'
                }`}
              >
                <div className="space-y-3">
                  {/* Quiet 1-line unboxed typographic metadata strip (No pill sandwiches!) */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#6F5472]">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span dir="ltr" className="font-semibold text-[#762D50]">
                        {spec.shortCode}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{spec.domainLabelAr}</span>
                    </div>

                    {isDone && (
                      <span className="inline-flex items-center gap-1 font-semibold text-[#351B38]">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#762D50]" aria-hidden="true" />
                        <span>مكتمل في ملفكِ</span>
                      </span>
                    )}
                    {inProgress && (
                      <span className="inline-flex items-center gap-1 font-semibold text-[#9F7E44]">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>محفوظ للاستكمال</span>
                      </span>
                    )}
                    {isReferenceOnly && (
                      <span className="inline-flex items-center gap-1 text-[#6F5472]">
                        <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>مرجع توثيقي فقط</span>
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h2 className="font-display text-xl font-bold text-[#351B38] leading-snug">
                      {spec.titleAr}
                    </h2>
                    <p dir="ltr" className="text-xs text-[#6F5472] text-right">
                      {spec.titleEn}
                    </p>
                  </div>

                  <p className="text-sm leading-relaxed text-[#5F4562]">
                    {spec.shortDescriptionAr}
                  </p>

                  {/* Quiet Unboxed Scientific & Validation Metadata Line */}
                  <div className="border-t border-[#E9D8D1]/70 pt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#6F5472] tabular-nums">
                    <span
                      className={
                        isExploratory
                          ? 'font-semibold text-[#9F7E44]'
                          : isReferenceOnly
                          ? 'text-[#6F5472]'
                          : 'font-semibold text-[#351B38]'
                      }
                    >
                      {formatScientificBadgeLabel(spec)}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{spec.questionCount} فقرة</span>
                    <span aria-hidden="true">·</span>
                    <span>~{spec.estimatedMinutes} د</span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {spec.arabicValidationStatus === 'published_arabic_studies'
                        ? 'تتوفر دراسات عربية'
                        : 'صياغة تحتاج تقنيناً عربياً'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  {isReferenceOnly ? (
                    <a
                      href={spec.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#762D50] hover:underline"
                    >
                      <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
                      <span>عرض المصدر الرسمي ومتطلبات الترخيص</span>
                    </a>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => handleOpenInstrument(spec)}
                        className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-[#762D50] px-5 py-2 text-xs sm:text-sm font-medium text-[#F9F3EC] hover:bg-[#5D223E] transition-colors cursor-pointer"
                      >
                        <span>
                          {inProgress
                            ? 'متابعة الجلسة المحفوظة'
                            : isDone
                            ? 'معاينة المقياس أو إعادته'
                            : 'بدء المقياس'}
                        </span>
                        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>

                      {isDone && (
                        <button
                          type="button"
                          onClick={() =>
                            onNavigate(
                              spec.isLegacyOnetRoute
                                ? '/results'
                                : `/assessment/${spec.id}/result`
                            )
                          }
                          className="text-xs sm:text-sm font-semibold text-[#351B38] hover:text-[#762D50] hover:underline cursor-pointer"
                        >
                          عرض نتيجتكِ المحفوظة
                        </button>
                      )}
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
