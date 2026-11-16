import { SourceReference } from '@/src/types';

export const ONET_LICENSE_NOTICE_EN =
  'This application includes information from the O*NET Career Exploration Tools by the U.S. Department of Labor, Employment and Training Administration (USDOL/ETA). Used under the O*NET Tools Developer License. O*NET® is a trademark of USDOL/ETA. ZAHRTI Project (مشروع زهرتي) has modified all or some of this information. USDOL/ETA has not approved, endorsed, or tested these modifications.';

export const ONET_LICENSE_NOTICE_AR =
  'يتضمن هذا الموقع معلومات مستندة إلى أدوات استكشاف المسار المهني O*NET Career Exploration Tools الصادرة عن وزارة العمل الأمريكية — إدارة التوظيف والتدريب (USDOL/ETA)، والمستخدمة بموجب رخصة مطوري أدوات O*NET (O*NET Tools Developer License). تعدّ O*NET® علامة تجارية مسجلة لـ USDOL/ETA. قام مشروع زهرتي (ZAHRTI) بترجمة وتكييف هذا المحتوى إلى اللغة العربية، ولم تعتمد وزارة العمل الأمريكية أو تصادق أو تختبر هذه التعديلات، كما أن النسخة العربية لم تخضع بعد لدراسة تقنين وتحقق علمي (Validation Study).';

export const OFFICIAL_ONET_SOURCES: SourceReference[] = [
  {
    title: 'O*NET Interest Profiler Overview',
    url: 'https://services.onetcenter.org/ip',
    authority: 'U.S. Department of Labor / O*NET Center',
    lastChecked: '2026-11-16',
    note: 'المرجع الرئيسي لأدوات وخدمات مقياس الاهتمامات المهنية O*NET Interest Profiler.',
  },
  {
    title: 'Mini-IP Questions API v2 (30-question mobile version)',
    url: 'https://services.onetcenter.org/reference/mpp/ip/ip_questions_30',
    authority: 'O*NET Web Services v2 Reference Manual',
    lastChecked: '2026-11-16',
    note: 'تم التحقق من أن عدد الأسئلة 30 سؤالاً (5 لكل نمط RIASEC). ملاحظة تقنية موثقة: النص التوضيحي للوثائق يذكر سلسلة 60 حرفاً، لكن مخطط OpenAPI 3.1 الرسمي (/reference/openapi.json) يقبل النمط ^[12345]{30}([12345]{30})?$ أي 30 أو 60 خانة.',
  },
  {
    title: 'O*NET Interest Profiler Results API v2',
    url: 'https://services.onetcenter.org/reference/mpp/ip/ip_results',
    authority: 'O*NET Web Services v2 Reference Manual',
    lastChecked: '2026-11-16',
    note: 'نقطة نهاية النتائج الرسمية التي تتطلب مفتاح X-API-Key على الخادم.',
  },
  {
    title: 'O*NET Tools Developer License',
    url: 'https://www.onetcenter.org/license_toolsdev.html',
    authority: 'O*NET Resource Center / USDOL-ETA',
    lastChecked: '2026-11-16',
    note: 'تشترط الإسناد الرسمي وإشعار التعديلات وإجراء Validation Study لأي نسخة معدلة أو مترجمة.',
  },
  {
    title: 'O*NET Tools License Agreements Overview',
    url: 'https://www.onetcenter.org/license_tools.html',
    authority: 'O*NET Resource Center',
    lastChecked: '2026-11-16',
    note: 'صفحة تراخيص أدوات O*NET المهنية.',
  },
  {
    title: 'Official O*NET Mini-IP Web Application',
    url: 'https://onetinterestprofiler.org/',
    authority: 'USDOL/ETA & National Center for O*NET Development',
    lastChecked: '2026-11-16',
    note: 'تم التحقق من نصوص الأسئلة الثلاثين وترتيبها وتصنيفها وآلية احتساب الدرجات الأولية (0 إلى 20 لكل نمط) وتوحيدها.',
  },
];

export const OFFICIAL_IRAQI_SOURCES: SourceReference[] = [
  {
    title: 'وزارة التعليم العالي والبحث العلمي العراقية',
    url: 'https://mohesr.gov.iq/',
    authority: 'جمهورية العراق — وزارة التعليم العالي والبحث العلمي',
    lastChecked: '2026-11-16',
    note: 'المرجع الرسمي للقبول المركزي وضوابط الكليات والمعاهد في العراق (دائرة الدراسات والتخطيط والمتابعة).',
  },
  {
    title: 'جامعة بغداد — الكليات والأقسام العلمية',
    url: 'https://uobaghdad.edu.iq/',
    authority: 'جامعة بغداد',
    lastChecked: '2026-11-16',
    note: 'تم التحقق من وجود الكليات الطبية، الهندسية، العلوم، الحاسوب، الآداب، الإدارة والاقتصاد، القانون، اللغات، التربية، والفنون الجميلة.',
  },
  {
    title: 'جامعة الكوفة — الكليات والأقسام',
    url: 'https://uokufa.edu.iq/',
    authority: 'جامعة الكوفة',
    lastChecked: '2026-11-16',
    note: 'تم التحقق من وجود كليات الطب، طب الأسنان، الصيدلة، التمريض، الهندسة، العلوم، علوم الحاسوب والرياضيات، الزراعة، الإدارة والاقتصاد، القانون، الآداب، واللغات.',
  },
  {
    title: 'جامعة القادسية — الكليات والأقسام',
    url: 'https://qu.edu.iq/',
    authority: 'جامعة القادسية',
    lastChecked: '2026-11-16',
    note: 'تم التحقق من وجود كليات الطب، طب الأسنان، الصيدلة، التمريض، الهندسة، العلوم (بضمنها التحليلات المرضية والبيئة)، علوم الحاسوب وتكنولوجيا المعلومات، الزراعة، التربية، الآداب، الإدارة والاقتصاد، القانون، والفنون الجميلة.',
  },
];
