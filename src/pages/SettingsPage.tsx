import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  Lock,
  ShieldAlert,
  Trash2,
  Upload,
} from 'lucide-react';
import { EditorialCrest } from '@/src/components/ornaments/BotanicalArt';
import { PersonExportBundle, PersonId, ProfilePrivacySettings } from '@/src/types';

interface SettingsPageProps {
  rawPerson1Name: string;
  rawPerson2Name: string;
  person1Name: string;
  person2Name: string;
  privacy: ProfilePrivacySettings;
  person1AnsweredCount: number;
  person2AnsweredCount: number;
  person1Completed: boolean;
  person2Completed: boolean;
  onSaveNames: (p1: string, p2: string) => void;
  onSetCompatibilityConsent: (personId: PersonId, allowed: boolean) => void;
  onExportPerson: (personId: PersonId) => PersonExportBundle;
  onImportPerson: (rawJson: string, targetPersonId: PersonId) => { ok: boolean; error?: string };
  onClearPersonData: (personId: PersonId) => void;
  onNavigate: (to: string) => void;
}

export function SettingsPage({
  rawPerson1Name,
  rawPerson2Name,
  person1Name,
  person2Name,
  privacy,
  person1AnsweredCount,
  person2AnsweredCount,
  person1Completed,
  person2Completed,
  onSaveNames,
  onSetCompatibilityConsent,
  onExportPerson,
  onImportPerson,
  onClearPersonData,
  onNavigate,
}: SettingsPageProps) {
  const [p1Input, setP1Input] = useState(rawPerson1Name);
  const [p2Input, setP2Input] = useState(rawPerson2Name);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmClearTarget, setConfirmClearTarget] = useState<PersonId | null>(null);

  const flashSuccess = (msg: string) => {
    setErrorMessage(null);
    setStatusMessage(msg);
    window.setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleSaveNames = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveNames(p1Input, p2Input);
    flashSuccess('تم تحديث الأسماء وحفظها في المتصفح.');
  };

  const handleDownloadBackup = (personId: PersonId) => {
    const bundle = onExportPerson(personId);
    const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zahrti-${personId}-backup.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    flashSuccess(`تم تصدير النسخة الاحتياطية الخاصة بـ ${personId === 'person1' ? person1Name : person2Name}.`);
  };

  const handleFileUpload = (personId: PersonId, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const content = typeof reader.result === 'string' ? reader.result : '';
      const res = onImportPerson(content, personId);
      if (res.ok) {
        flashSuccess('تم استيراد البيانات والتحقق من سلامتها بنجاح.');
      } else {
        setStatusMessage(null);
        setErrorMessage(res.error || 'فشل استيراد الملف.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 space-y-8">
      <header className="space-y-2">
        <EditorialCrest className="w-12 h-7" />
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#351B38]">
          الإعدادات والخصوصية وإدارة البيانات
        </h1>
        <p className="text-sm sm:text-base text-[#5F4562]">
          تحكم كامل بالأسماء، وموافقة مشاركة التوافق، والنسخ الاحتياطي، وحذف بيانات كل طرف على حدة.
        </p>
      </header>

      {statusMessage && (
        <div role="status" className="flex items-center gap-2 rounded-2xl border border-[#C6A56B]/55 bg-[#FFFDF9] p-4 text-sm text-[#351B38]">
          <CheckCircle2 className="h-4 w-4 text-[#762D50] shrink-0" aria-hidden="true" />
          <span>{statusMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div role="alert" className="flex items-center gap-2 rounded-2xl border border-[#762D50] bg-[#F9F3EC] p-4 text-sm text-[#762D50]">
          <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 1. Edit Dynamic Names */}
      <section className="rounded-3xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 sm:p-8 space-y-5">
        <h2 className="font-display text-xl font-bold text-[#351B38]">تعديل الأسماء</h2>
        <form onSubmit={handleSaveNames} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="settings-p1" className="block text-xs font-semibold text-[#351B38]">
                اسم الطرف الأول
              </label>
              <input
                id="settings-p1"
                type="text"
                maxLength={40}
                value={p1Input}
                onChange={(e) => setP1Input(e.target.value)}
                placeholder="الاسم الأول"
                className="w-full min-h-[44px] rounded-xl border border-[#E9D8D1] bg-[#F9F3EC] px-4 py-2 text-sm text-[#351B38] focus:border-[#762D50] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="settings-p2" className="block text-xs font-semibold text-[#351B38]">
                اسم الطرف الثاني
              </label>
              <input
                id="settings-p2"
                type="text"
                maxLength={40}
                value={p2Input}
                onChange={(e) => setP2Input(e.target.value)}
                placeholder="الاسم الأول"
                className="w-full min-h-[44px] rounded-xl border border-[#E9D8D1] bg-[#F9F3EC] px-4 py-2 text-sm text-[#351B38] focus:border-[#762D50] focus:outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            className="rounded-full bg-[#351B38] px-6 py-2.5 text-sm font-medium text-[#F9F3EC] hover:bg-[#4B2B4E] cursor-pointer"
          >
            حفظ الأسماء
          </button>
        </form>
      </section>

      {/* 2. Explicit Consent & Privacy Controls */}
      <section className="rounded-3xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-2 text-[#762D50]">
          <Lock className="h-5 w-5" aria-hidden="true" />
          <h2 className="font-display text-xl font-bold text-[#351B38]">
            التحكم في الخصوصية والمشاركة في التوافق
          </h2>
        </div>

        <div className="space-y-3 text-sm">
          <label className="flex items-center justify-between gap-4 rounded-2xl border border-[#E9D8D1] bg-[#F9F3EC]/60 p-4 cursor-pointer">
            <span className="text-[#351B38]">
              تضمين نتيجة <strong>{person1Name}</strong> في صفحة التوافق وعالمنا (دون كشف الإجابات)
            </span>
            <input
              type="checkbox"
              checked={privacy.person1IncludeInCompatibility}
              onChange={(e) => onSetCompatibilityConsent('person1', e.target.checked)}
              className="h-5 w-5 accent-[#762D50]"
            />
          </label>

          <label className="flex items-center justify-between gap-4 rounded-2xl border border-[#E9D8D1] bg-[#F9F3EC]/60 p-4 cursor-pointer">
            <span className="text-[#351B38]">
              تضمين نتيجة <strong>{person2Name}</strong> في صفحة التوافق وعالمنا (دون كشف الإجابات)
            </span>
            <input
              type="checkbox"
              checked={privacy.person2IncludeInCompatibility}
              onChange={(e) => onSetCompatibilityConsent('person2', e.target.checked)}
              className="h-5 w-5 accent-[#762D50]"
            />
          </label>
        </div>

        {/* Honest Storage Explanation for GitHub Pages */}
        <div className="rounded-2xl border border-[#C6A56B]/55 bg-[#F9F3EC] p-5 space-y-2 text-xs sm:text-sm leading-relaxed text-[#5F4562]">
          <p className="font-bold text-[#351B38] flex items-center gap-1.5">
            <ShieldAlert className="h-4 w-4 text-[#762D50]" aria-hidden="true" />
            <span>توضيح تقني صادق حول مكان حفظ البيانات:</span>
          </p>
          <p>
            يعمل موقع زهرتي على <span dir="ltr">GitHub Pages</span> بصفته تطبيقاً ساكناً بدون قاعدة
            بيانات خارجية. تُحفظ بيانات كل شخص في مفاتيح منفصلة داخل ذاكرة هذا المتصفح فقط (
            <span dir="ltr">localStorage</span>). إذا اختبر كل طرف من هاتف أو متصفح مختلف، فلن
            تنتقل البيانات تلقائياً بين الجهازين دون ربط خادم ومصادقة؛ ويمكنكما حالياً نقل ملف واحد
            أو استيراد نسخة <span dir="ltr">JSON</span> عند الرغبة.
          </p>
        </div>
      </section>

      {/* 3. Per-Person Export / Import / Delete */}
      <section className="grid gap-6 md:grid-cols-2">
        {(['person1', 'person2'] as const).map((pid) => {
          const name = pid === 'person1' ? person1Name : person2Name;
          const count = pid === 'person1' ? person1AnsweredCount : person2AnsweredCount;
          const done = pid === 'person1' ? person1Completed : person2Completed;
          return (
            <article
              key={pid}
              className="rounded-2xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 space-y-4"
            >
              <div>
                <h3 className="font-display text-lg font-bold text-[#351B38]">
                  بيانات {name}
                </h3>
                <p className="text-xs text-[#6F5472] tabular-nums">
                  {done ? 'يوجد اختبار مكتمل' : `التقدم الحالي: ${count}/30`}
                </p>
              </div>

              <div className="rounded-xl border border-[#E9D8D1] bg-[#F9F3EC] p-3 text-xs leading-relaxed text-[#5F4562]">
                تحذير خصوصية: يحتوي ملف <span dir="ltr">JSON</span> على إجابات ونتائج هذا الشخص.
                لا تشاركيه إلا مع من تثقين به.
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleDownloadBackup(pid)}
                  className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full border border-[#E9D8D1] bg-[#F9F3EC] px-4 py-1.5 text-xs font-medium text-[#351B38] hover:border-[#762D50] cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5 text-[#762D50]" aria-hidden="true" />
                  <span>تصدير نسخة</span>
                </button>

                <label className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full border border-[#E9D8D1] bg-white px-4 py-1.5 text-xs font-medium text-[#351B38] hover:border-[#762D50] cursor-pointer">
                  <Upload className="h-3.5 w-3.5 text-[#351B38]" aria-hidden="true" />
                  <span>استيراد نسخة</span>
                  <input
                    type="file"
                    accept="application/json"
                    onChange={(e) => handleFileUpload(pid, e)}
                    className="sr-only"
                  />
                </label>

                {confirmClearTarget === pid ? (
                  <div className="w-full pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        onClearPersonData(pid);
                        setConfirmClearTarget(null);
                        flashSuccess(`تم مسح بيانات ${name} نهائياً من هذا الجهاز.`);
                      }}
                      className="rounded-full bg-[#762D50] px-4 py-1.5 text-xs font-medium text-[#F9F3EC] cursor-pointer"
                    >
                      تأكيد المسح النهائي
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmClearTarget(null)}
                      className="rounded-full border border-[#E9D8D1] px-4 py-1.5 text-xs text-[#5F4562] cursor-pointer"
                    >
                      إلغاء
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmClearTarget(pid)}
                    className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full border border-[#762D50]/35 px-4 py-1.5 text-xs font-medium text-[#762D50] hover:bg-[#F9F3EC] cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>مسح بيانات {name}</span>
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </section>

      <div className="pt-2">
        <button
          type="button"
          onClick={() => onNavigate('/privacy')}
          className="text-sm font-semibold text-[#762D50] hover:underline cursor-pointer"
        >
          اقرئي صفحة الخصوصية الكاملة
        </button>
      </div>
    </div>
  );
}
