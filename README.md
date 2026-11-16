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
- `src/matching/majorMatcher.ts` — نموذج الربط متعدد الأبعاد بين الاهتمامات والتخصصات.
- `src/pages/` — الصفحات المتكاملة: الرئيسية، مقدمة الاختبار، الاختبار، التحليل، النتائج وملف الاهتمامات، الأنماط الستة، دليل التخصصات، تفاصيل التخصص، المقارنة، عن الاختبار، المصادر والمنهجية، الخصوصية، التعديلات وإخلاء المسؤولية، و404.
- `server.ts` — خادم Express + Vite مع نقطة نهاية `/api/assessment/score` الجاهزة لاستخدام `ONET_API_KEY` على الخادم بأمان دون كشف أي مفتاح للمتصفح.

## التشغيل والاختبار محلياً
```bash
npm install
npx --yes tsx --test src/scoring/riasecScoring.test.ts src/matching/majorMatcher.test.ts
npm run lint
npm run build
npm run dev
```

## تفعيل O*NET Web Services v2 API (اختياري)
لتفعيل استعلام النتائج المباشر عبر خادم O*NET الرسمي:
1. سجّلي حساب مطور مجاني في `https://services.onetcenter.org/` للحصول على `X-API-Key`.
2. أضيفي `ONET_API_KEY="YOUR_KEY"` في متغيرات البيئة على الخادم فقط (لا تضعيه في الواجهة الأمامية مطلقاً).
3. عند غياب المفتاح، يعمل الموقع في وضع التحليل المحلي الموثق مع توضيح ذلك صراحةً للمستخدمة.
