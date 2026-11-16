import React from 'react';
import { PsychChartType, PsychSubscaleResult } from '@/src/types/psychology';

interface PsychScoreChartProps {
  chartType: PsychChartType;
  subscales: PsychSubscaleResult[];
  primaryScore: number;
  primaryMaxScore: number;
}

export function PsychScoreChart({
  chartType,
  subscales,
  primaryScore,
  primaryMaxScore,
}: PsychScoreChartProps) {
  if (chartType === 'none' || subscales.length === 0) return null;

  if (chartType === 'radar' && subscales.length >= 4) {
    const cx = 175;
    const cy = 155;
    const radius = 102;
    const n = subscales.length;
    const rings = [25, 50, 75, 100];

    const pointAt = (idx: number, pct: number) => {
      const angle = (Math.PI * 2 * idx) / n - Math.PI / 2;
      const r = (Math.max(4, Math.min(100, pct)) / 100) * radius;
      return {
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle),
        labelX: cx + (radius + 26) * Math.cos(angle),
        labelY: cy + (radius + 22) * Math.sin(angle),
      };
    };

    const polygonPoints = subscales
      .map((s, idx) => {
        const pt = pointAt(idx, s.percentage);
        return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
      })
      .join(' ');

    return (
      <div className="flex flex-col items-center">
        <svg
          viewBox="0 0 350 320"
          className="w-full max-w-[360px]"
          role="img"
          aria-label="رسم بياني راداري لتوزيع الأبعاد"
        >
          {rings.map((ring) => {
            const pts = subscales
              .map((_, idx) => {
                const pt = pointAt(idx, ring);
                return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
              })
              .join(' ');
            return (
              <polygon
                key={ring}
                points={pts}
                fill="none"
                stroke="#E9D8D1"
                strokeWidth="1"
              />
            );
          })}

          {subscales.map((s, idx) => {
            const edge = pointAt(idx, 100);
            return (
              <g key={s.id}>
                <line
                  x1={cx}
                  y1={cy}
                  x2={edge.x}
                  y2={edge.y}
                  stroke="#E9D8D1"
                  strokeWidth="1"
                />
                <text
                  x={edge.labelX}
                  y={edge.labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-[#351B38] text-[10px] font-semibold"
                >
                  {s.nameAr.split(' ')[0]}
                </text>
              </g>
            );
          })}

          <polygon
            points={polygonPoints}
            fill="rgba(118, 45, 80, 0.22)"
            stroke="#762D50"
            strokeWidth="2.2"
          />

          {subscales.map((s, idx) => {
            const pt = pointAt(idx, s.percentage);
            return (
              <circle
                key={`${s.id}-pt`}
                cx={pt.x}
                cy={pt.y}
                r="4"
                fill="#762D50"
                stroke="#FFFDF9"
                strokeWidth="1.5"
              />
            );
          })}
        </svg>
      </div>
    );
  }

  if (chartType === 'gauge' && subscales.length === 1) {
    const sub = subscales[0];
    const ratio = primaryMaxScore > 0 ? Math.min(1, Math.max(0, primaryScore / primaryMaxScore)) : 0;
    const widthPct = Math.round(sub.percentage);

    return (
      <div className="space-y-3 py-2">
        <div className="flex items-baseline justify-between text-xs sm:text-sm">
          <span className="font-semibold text-[#351B38]">{sub.nameAr}</span>
          <span dir="ltr" className="tabular-nums font-bold text-[#762D50]">
            {primaryScore} / {primaryMaxScore}
          </span>
        </div>
        <div
          className="relative h-3.5 w-full overflow-hidden rounded-full bg-[#EFE4DC]"
          role="progressbar"
          aria-valuenow={Math.round(ratio * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-gradient-to-l from-[#762D50] to-[#C47C91] transition-all duration-300"
            style={{ width: `${Math.max(4, widthPct)}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-[#6F5472] tabular-nums">
          <span>الحد الأدنى ({sub.minScore})</span>
          <span>{sub.bandLabelAr}</span>
          <span>الحد الأعلى ({sub.maxScore})</span>
        </div>
      </div>
    );
  }

  // Horizontal Subscale Bars (DASS-21, RRS-10, Exploratory)
  return (
    <div className="space-y-4">
      {subscales.map((sub) => (
        <div key={sub.id} className="space-y-1.5">
          <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs sm:text-sm">
            <div>
              <span className="font-semibold text-[#351B38]">{sub.nameAr}</span>{' '}
              <span dir="ltr" className="text-[11px] text-[#6F5472]">
                ({sub.nameEn})
              </span>
            </div>
            <span className="tabular-nums font-semibold text-[#762D50]">
              <span dir="ltr">
                {sub.scaledScore} / {sub.maxScore}
              </span>{' '}
              · {sub.bandLabelAr}
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#EFE4DC]">
            <div
              className="h-full rounded-full bg-[#762D50]"
              style={{ width: `${Math.max(4, Math.min(100, sub.percentage))}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
