# ZAHRTI — اختبار زهرتي (اكتشفي التخصص اللي يشبهج)

منصة ويب عربية تفاعلية بالكامل (RTL) لمساعدة الطالبات والطلبة على استكشاف اهتماماتهم المهنية والتخصصات الجامعية التي قد تتقاطع مع ميولهم، بصياغة مسؤولة وبعيدة عن الادعاءات القطعية.

## إشعار ترخيص O*NET® Tools Developer License
> This application includes information from the O*NET Career Exploration Tools by the U.S. Department of Labor, Employment and Training Administration (USDOL/ETA). Used under the O*NET Tools Developer License. O*NET® is a trademark of USDOL/ETA. ZAHRTI Project (مشروع زهرتي) has modified all or some of this information. USDOL/ETA has not approved, endorsed, or tested these modifications.

- النسخة العربية لأسئلة Mini-IP (30 فقرة) هي ترجمة وتكييف مبدئي يحتاج إلى مراجعة مختصين وإجراء **Validation Study** قبل أي اعتماد رسمي أو إطلاق تقنيني، وذلك التزاماً ببنود `O*NET Tools Developer License`.

## هيكل المشروع
- `src/data/questions/miniIpQuestions.ts` — قائمة الأسئلة الثلاثين الرسمية لـ Mini-IP مع النص الإنجليزي الأصلي والترجمة العربية وحقول المراجعة والتحقق.
- `src/data/interests/riasecProfiles.ts` — توصيف أنماط الاهتمامات الستة (RIASEC).
- `src/data/majors/majorsCatalog.ts` — قاعدة التخصصات الجامعية والمسارات عبر 9 مجالات، مع الفصل بين البكالوريوس والدبلوم والشهادة المهنية وتوثيق المصادر العراقية.
- `src/data/sources/officialSources.ts` — المراجع الرسمية وإشعارات الترخيص.
- `src/scoring/riasecScoring.ts` — محرك التقييم المنفصل وفق معادلة Mini-IP (0 إلى 20 لكل نمط + z-score + كسر التعادل وفق سداسي هولاند).
- `src/scoring/compatibilityEngine.ts` — محرك تحليل التوافق الموزون بين الشخصين بعد اكتمال الاختبارين وتفعيل الموافقة.
- `src/matching/majorMatcher.ts` — نموذج الربط متعدد الأبعاد بين الاهتمامات والتخصصات مع حساب نسبة التوافق `affinityPercentage`.
- `src/services/syncAdapter.ts` — طبقة تخزين محلي معزول لكل شخص مع التحقق من البنية (`JSON Schema Guard`) ودعم التصدير والاستيراد.
- `src/components/three/` — مشاهد Three.js ثلاثية الأبعاد تفاعلية مع بديل SVG ثنائي الأبعاد للأنظمة منخفضة الموارد.
- `src/pages/` — الصفحات المتكاملة: الرئيسية، المقدمة وإدخال الأسماء، الاختبار، التحليل، النتائج والمفضلة، التوافق، عالمنا، الإعدادات والخصوصية، الأنماط الستة، دليل التخصصات، تفاصيل التخصص، المقارنة، عن الاختبار، المصادر والمنهجية، الشروط، و404.
- `.github/workflows/deploy.yml` — مسار النشر التلقائي إلى GitHub Pages بالمسار الفرعي `/muza1p.github.io-zahrti/`.

## التشغيل والاختبار محلياً
```bash
npm install
npx --yes tsx --test src/scoring/*.test.ts src/matching/majorMatcher.test.ts
npm run lint
npm run build
npm run dev
```

## النشر على GitHub Pages
1. ادفعي الكود إلى فرع `main` في المستودع `muza1p.github.io-zahrti`.
2. من إعدادات المستودع في GitHub: افتحي **Settings → Pages** واختاري المصدر **GitHub Actions**.
3. سيعمل مسار `.github/workflows/deploy.yml` تلقائياً ويبني الموقع بمسار الأساس `/muza1p.github.io-zahrti/` مع تضمين `404.html` والتوجيه عبر `#/` لضمان عدم ظهور شاشة بيضاء.
4. إذا غيّرتِ اسم المستودع لاحقاً، اضبطي متغير `VITE_BASE_PATH` قبل البناء.

## تفعيل O*NET Web Services v2 API (اختياري عند التشغيل مع خادم Node)
1. سجّلي حساب مطور مجاني في `https://services.onetcenter.org/` للحصول على `X-API-Key`.
2. أضيفي `ONET_API_KEY="YOUR_KEY"` في متغيرات البيئة على الخادم فقط (لا تضعيه في الواجهة الأمامية مطلقاً).
3. عند التشغيل الساكن على GitHub Pages أو عند غياب المفتاح، يعمل الموقع بالكامل عبر الحساب المحلي الموثق في المتصفح.
