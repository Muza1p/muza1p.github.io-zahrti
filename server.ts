import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import {
  buildAnswersString,
  findMissingQuestionIndices,
  isValidMiniIpAnswersString,
  scoreMiniIpAnswers,
} from './src/scoring/riasecScoring';
import { LikertValue, RiasecCode } from './src/types';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '16kb' }));

  // Health and API configuration status (never exposes secrets or user answers)
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      onetApiConfigured: Boolean(process.env.ONET_API_KEY && process.env.ONET_API_KEY.trim().length > 0),
    });
  });

  // Assessment scoring endpoint
  app.post('/api/assessment/score', async (req, res) => {
    try {
      const body = req.body as {
        answers?: Record<string, unknown>;
        elapsedSeconds?: unknown;
      };

      if (!body || typeof body.answers !== 'object' || body.answers === null) {
        res.status(400).json({
          error: 'بيانات الإجابات غير صالحة.',
          code: 'INVALID_PAYLOAD',
        });
        return;
      }

      const normalizedAnswers: Record<number, LikertValue> = {};
      for (let i = 1; i <= 30; i++) {
        const rawVal = Number(body.answers[String(i)]);
        if ([1, 2, 3, 4, 5].includes(rawVal)) {
          normalizedAnswers[i] = rawVal as LikertValue;
        }
      }

      const missing = findMissingQuestionIndices(normalizedAnswers);
      if (missing.length > 0) {
        res.status(400).json({
          error: 'الاختبار غير مكتمل. توجد أسئلة لم تتم الإجابة عنها.',
          code: 'INCOMPLETE_ANSWERS',
          missingQuestions: missing,
        });
        return;
      }

      const answersString = buildAnswersString(normalizedAnswers);
      if (!isValidMiniIpAnswersString(answersString)) {
        res.status(400).json({
          error: 'تنسيق سلسلة الإجابات غير صالح.',
          code: 'INVALID_ANSWERS_FORMAT',
        });
        return;
      }

      const elapsedSeconds =
        typeof body.elapsedSeconds === 'number' && Number.isFinite(body.elapsedSeconds) && body.elapsedSeconds >= 0
          ? Math.round(body.elapsedSeconds)
          : null;

      const onetKey = process.env.ONET_API_KEY?.trim();

      if (onetKey) {
        try {
          const url = `https://api-v2.onetcenter.org/mnm/interestprofiler/results?answers=${encodeURIComponent(
            answersString
          )}`;
          const apiRes = await fetch(url, {
            headers: {
              Accept: 'application/json',
              'X-API-Key': onetKey,
            },
            signal: AbortSignal.timeout(8000),
          });

          if (!apiRes.ok) {
            throw new Error(`O*NET API returned status ${apiRes.status}`);
          }

          const apiData = (await apiRes.json()) as {
            result?: Array<{ code: string; score: number }>;
          };

          if (Array.isArray(apiData.result) && apiData.result.length === 6) {
            const officialScores: Partial<Record<RiasecCode, number>> = {};
            for (const item of apiData.result) {
              if (
                ['realistic', 'investigative', 'artistic', 'social', 'enterprising', 'conventional'].includes(
                  item.code
                )
              ) {
                officialScores[item.code as RiasecCode] = item.score;
              }
            }
            const result = scoreMiniIpAnswers(normalizedAnswers, {
              scoringMode: 'onet_official_api',
              officialApiScores: officialScores,
              elapsedSeconds,
            });
            res.json({ result });
            return;
          }
        } catch {
          // Return explicit upstream error so UI can inform user honestly while preserving answers
          res.status(502).json({
            error: 'تعذر الاتصال بخدمة O*NET الرسمية حالياً. يمكنك إعادة المحاولة أو استخدام التحليل المحلي الموثق.',
            code: 'ONET_UPSTREAM_UNAVAILABLE',
            fallbackAvailable: true,
          });
          return;
        }
      }

      const localResult = scoreMiniIpAnswers(normalizedAnswers, {
        scoringMode: 'local_mini_ip_formula',
        elapsedSeconds,
      });
      res.json({ result: localResult });
    } catch {
      res.status(500).json({
        error: 'حدث خطأ غير متوقع أثناء تحليل الإجابات. إجاباتج محفوظة محلياً.',
        code: 'SCORING_INTERNAL_ERROR',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      const indexFile = path.join(distDir, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(404).send('Build output not found.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ZAHRTI server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start ZAHRTI server:', err);
  process.exit(1);
});
