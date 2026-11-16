import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

export interface PdfExportOutcome {
  ok: boolean;
  error?: string;
}

/**
 * Generates an A4 multi-page PDF preserving native Chromium Arabic RTL shaping
 * (ligatures, diacritics, and Tajawal/Amiri typography) without garbled Latin-only PDF fonts.
 */
export async function exportArabicDomToPdf(
  element: HTMLElement,
  filename: string
): Promise<PdfExportOutcome> {
  try {
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      await document.fonts.ready;
    }

    const dataUrl = await toPng(element, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: '#FFFDF9',
      filter: (node) => {
        if (!(node instanceof HTMLElement)) return true;
        return !node.classList.contains('no-print') && !node.dataset.pdfExclude;
      },
    });

    const img = new Image();
    img.src = dataUrl;
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Failed to load rendered report image'));
    });

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pageWidthMm = pdf.internal.pageSize.getWidth();
    const pageHeightMm = pdf.internal.pageSize.getHeight();
    const marginMm = 10;
    const printableWidthMm = pageWidthMm - marginMm * 2;
    const printableHeightMm = pageHeightMm - marginMm * 2;

    const totalImgHeightMm = (img.height * printableWidthMm) / img.width;

    // Slice into multi-page A4 canvas blocks cleanly
    const pxPerMm = img.width / printableWidthMm;
    const pageSliceHeightPx = Math.floor(printableHeightMm * pxPerMm);
    let renderedPx = 0;
    let pageIndex = 0;

    while (renderedPx < img.height) {
      const slicePx = Math.min(pageSliceHeightPx, img.height - renderedPx);
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = slicePx;
      const ctx = canvas.getContext('2d');
      if (!ctx) break;

      ctx.fillStyle = '#FFFDF9';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        0,
        renderedPx,
        img.width,
        slicePx,
        0,
        0,
        img.width,
        slicePx
      );

      const sliceDataUrl = canvas.toDataURL('image/png');
      const sliceHeightMm = (slicePx * printableWidthMm) / img.width;

      if (pageIndex > 0) {
        pdf.addPage();
      }
      pdf.addImage(
        sliceDataUrl,
        'PNG',
        marginMm,
        marginMm,
        printableWidthMm,
        sliceHeightMm,
        undefined,
        'FAST'
      );

      renderedPx += slicePx;
      pageIndex += 1;
    }

    if (totalImgHeightMm <= 0) {
      return { ok: false, error: 'تعذر احتساب أبعاد التقرير.' };
    }

    pdf.save(filename.endsWith('.pdf') ? filename : `${filename}.pdf`);
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error:
        err instanceof Error
          ? `تعذر إنشاء ملف PDF مباشرة (${err.message}). يمكنكِ استخدام زر الطباعة وحفظ الصفحة كـ PDF من المتصفح.`
          : 'تعذر إنشاء ملف PDF. يمكنكِ استخدام الطباعة من المتصفح.',
    };
  }
}
