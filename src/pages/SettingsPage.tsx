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
import { PsychPlatformExportBundle } from '@/src/types/psychology';

interface SettingsPageProps {
  personalName: string;
  completedPsychCount: number;
  activeSessionsCount: number;
  hasCareerResult: boolean;
  onSavePersonalName: (name: string) => void;
  onDownloadBundle: () => PsychPlatformExportBundle;
  onImportBundle: (rawJson: string) => { ok: boolean; error?: string };
  onClearAllData: () => void;
  onNavigate: (to: string) => void;
}

export function SettingsPage({
  personalName,
  completedPsychCount,
  activeSessionsCount,
  hasCareerResult,
  onSavePersonalName,
  onDownloadBundle,
  onImportBundle,
  onClearAllData,
  onNavigate,
}: SettingsPageProps) {
  const [nameInput, setNameInput] = useState(personalName);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmClearAll, setConfirmClearAll] = useState(false);

  const flashSuccess = (msg: string) => {
    setErrorMessage(null);
    setStatusMessage(msg);
    window.setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    onSavePersonalName(nameInput);
    flashSuccess('تم حفظ اسمكِ المفضل في متصفحكِ بنجاح.');
  };

  const handleExportJson = () => {
    const bundle = onDownloadBundle();
    const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'zahrti-personal-backup.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    flashSuccess('تم تصدير النسخة الاحتياطية الكاملة لبياناتكِ بصيغة JSON.');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const content = typeof reader.result === 'string' ? reader.result : '';
      const res = onImportBundle(content);
      if (res.ok) {
        flashSuccess('تم استيراد نسخة البيانات والتحقق من سلامتها بنجاح.');
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
          الإعدادات والخصوصية وإدارة بياناتكِ
        </h1>
        <p className="text-sm sm:text-base text-[#5F4562]">
          منصة زهرتي مخصصة لشخص واحد فقط؛ يمكنكِ هنا تعديل اسمكِ، تصدير أو استيراد نسخكِ
          الاحتياطية، أو مسح كامل البيانات من هذا الجهاز بضغطة واحدة.
        </p>
      </header>

      {statusMessage && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-2xl border border-[#C6A56B]/55 bg-[#FFFDF9] p-4 text-sm text-[#351B38]"
        >
          <CheckCircle2 className="h-4 w-4 text-[#762D50] shrink-0" aria-hidden="true" />
          <span>{statusMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-2xl border border-[#762D50] bg-[#FAF0F3] p-4 text-sm text-[#762D50]"
        >
          <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Personal Profile Name */}
      <section className="rounded-3xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 sm:p-8 space-y-5">
        <h2 className="font-display text-xl font-bold text-[#351B38]">
          الاسم الظاهر في التقرير (اختياري)
        </h2>
        <form onSubmit={handleSaveName} className="space-y-4">
          <div className="max-w-sm space-y-1.5">
            <label htmlFor="settings-personal-name" className="block text-xs font-semibold text-[#351B38]">
              الاسم المفضل
            </label>
            <input
              id="settings-personal-name"
              type="text"
              maxLength={40}
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="مثال: سارة"
              className="w-full min-h-[44px] rounded-xl border border-[#E9D8D1] bg-[#F9F3EC] px-4 py-2 text-sm text-[#351B38] focus:border-[#762D50] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-[#351B38] px-6 py-2.5 text-sm font-medium text-[#F9F3EC] hover:bg-[#4B2B4E] cursor-pointer"
          >
            حفظ الاسم
          </button>
        </form>
      </section>

      {/* Honest Data Location & Storage Notice */}
      <section className="rounded-3xl border border-[#E9D8D1] bg-[#FFFDF9] p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-2 text-[#762D50]">
          <Lock className="h-5 w-5" aria-hidden="true" />
          <h2 className="font-display text-xl font-bold text-[#351B38]">
            مكان حفظ البيانات وحجم السجل المحلي
          </h2>
        </div>

        <dl className="grid grid-cols-3 gap-4 rounded-2xl border border-[#E9D8D1] bg-[#F9F3EC]/60 p-4 text-xs sm:text-sm tabular-nums">
          <div>
            <dt className="text-[#6F5472]">المقاييس النفسية المكتملة</dt>
            <dd className="font-display text-lg font-bold text-[#351B38] mt-0.5">
              {completedPsychCount}
            </dd>
          </div>
          <div>
            <dt className="text-[#6F5472]">الجلسات قيد الاستكمال</dt>
            <dd className="font-display text-lg font-bold text-[#762D50] mt-0.5">
              {activeSessionsCount}
            </dd>
          </div>
          <div>
            <dt className="text-[#6F5472]">اختبار الميول المهنية</dt>
            <dd className="font-display text-lg font-bold text-[#351B38] mt-0.5">
              {hasCareerResult ? 'مكتمل' : 'غير مكتمل'}
            </dd>
          </div>
        </dl>

        <div className="rounded-2xl border border-[#C6A56B]/55 bg-[#F9F3EC] p-5 space-y-2 text-xs sm:text-sm leading-relaxed text-[#5F4562]">
          <p className="font-bold text-[#351B38] flex items-center gap-1.5">
            <ShieldAlert className="h-4 w-4 text-[#762D50]" aria-hidden="true" />
            <span>أين تُخزن بياناتكِ؟</span>
          </p>
          <p>
            تُحفظ جميع إجاباتكِ ونتائجكِ وتفضيلات التخصصات حصرياً داخل ذاكرة هذا المتصفح على
            جهازكِ (<span dir="ltr">localStorage</span>). لا يتم رفع أي إجابة نفسية إلى خوادم
            خارجية أو قواعد بيانات سحابية. إذا قمتِ بمسح بيانات المتصفح دون تصدير نسخة احتياطية
            فلن يمكن استرجاع النتائج لاحقاً.
          </p>
        </div>

        {/* Backup / Restore / Wipe All */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleExportJson}
            className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-[#E9D8D1] bg-[#F9F3EC] px-5 py-2 text-xs sm:text-sm font-medium text-[#351B38] hover:border-[#762D50] cursor-pointer"
          >
            <Download className="h-4 w-4 text-[#762D50]" aria-hidden="true" />
            <span>تصدير نسخة JSON كاملة</span>
          </button>

          <label className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-[#E9D8D1] bg-[#FFFDF9] px-5 py-2 text-xs sm:text-sm font-medium text-[#351B38] hover:border-[#762D50] cursor-pointer">
            <Upload className="h-4 w-4 text-[#351B38]" aria-hidden="true" />
            <span>استيراد نسخة احتياطية</span>
            <input
              type="file"
              accept="application/json"
              onChange={handleFileUpload}
              className="sr-only"
            />
          </label>

          {confirmClearAll ? (
            <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-0">
              <button
                type="button"
                onClick={() => {
                  onClearAllData();
                  setNameInput('');
                  setConfirmClearAll(false);
                  flashSuccess('تم مسح جميع بياناتكِ النفسية والمهنية نهائياً من هذا الجهاز.');
                }}
                className="min-h-[42px] rounded-full bg-[#762D50] px-5 py-2 text-xs sm:text-sm font-medium text-[#F9F3EC] cursor-pointer"
              >
                تأكيد المسح الكامل والنهائي
              </button>
              <button
                type="button"
                onClick={() => setConfirmClearAll(false)}
                className="min-h-[42px] rounded-full border border-[#E9D8D1] px-4 py-2 text-xs text-[#5F4562] cursor-pointer"
              >
                إلغاء
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmClearAll(true)}
              className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-[#762D50]/35 px-5 py-2 text-xs sm:text-sm font-medium text-[#762D50] hover:bg-[#FAF0F3] cursor-pointer"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              <span>مسح جميع البيانات من الجهاز</span>
            </button>
          )}
        </div>
      </section>

      <div>
        <button
          type="button"
          onClick={() => onNavigate('/privacy')}
          className="text-sm font-semibold text-[#762D50] hover:underline cursor-pointer"
        >
          اقرئي سياسة الخصوصية الكاملة
        </button>
      </div>
    </div>
  );
}
