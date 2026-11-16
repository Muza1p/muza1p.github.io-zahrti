import React, { useState } from 'react';
import { RIASEC_ORDER, RIASEC_PROFILES } from '@/src/data/interests/riasecProfiles';
import { RiasecAreaScore, RiasecCode } from '@/src/types';

interface RiasecRadarChartProps {
  scores: Record<RiasecCode, RiasecAreaScore>;
}

export function RiasecRadarChart({ scores }: RiasecRadarChartProps) {
  const [hoveredCode, setHoveredCode] = useState<RiasecCode | null>(null);

  const cx = 170;
  const cy = 155;
  const maxR = 102;
  const levels = [0.25, 0.5, 0.75, 1];

  const getPoint = (idx: number, ratio: number) => {
    const angle = -Math.PI / 2 + (idx * Math.PI * 2) / 6;
    return {
      x: cx + Math.cos(angle) * maxR * ratio,
      y: cy + Math.sin(angle) * maxR * ratio,
    };
  };

  const dataPoints = RIASEC_ORDER.map((code, idx) => {
    const area = scores[code];
    const ratio = area ? Math.max(0.08, area.score / Math.max(1, area.maxScore)) : 0.1;
    return {
      code,
      area,
      info: RIASEC_PROFILES[code],
      pt: getPoint(idx, ratio),
      labelPt: getPoint(idx, 1.24),
    };
  });

  const polygonPoints = dataPoints.map((d) => `${d.pt.x.toFixed(1)},${d.pt.y.toFixed(1)}`).join(' ');

  return (
    <div className="flex flex-col items-center space-y-3">
      <svg
        viewBox="0 0 340 310"
        role="img"
        aria-label="مخطط شبكي سداسي يوضح توزيع درجات الاهتمامات الستة"
        className="w-full max-w-[340px] select-none"
      >
        <defs>
          <linearGradient id="riasecRadarFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#762D50" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#C47C91" stopOpacity="0.26" />
          </linearGradient>
        </defs>

        {levels.map((lvl) => {
          const ringPts = RIASEC_ORDER.map((_, idx) => {
            const p = getPoint(idx, lvl);
            return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
          }).join(' ');
          return (
            <polygon
              key={lvl}
              points={ringPts}
              fill={lvl === 1 ? '#FFFDF9' : 'none'}
              fillOpacity={lvl === 1 ? 0.75 : 0}
              stroke="#E9D8D1"
              strokeWidth={lvl === 1 ? 1.5 : 1}
              strokeDasharray={lvl < 1 ? '3 3' : undefined}
            />
          );
        })}

        {RIASEC_ORDER.map((code, idx) => {
          const outer = getPoint(idx, 1);
          return (
            <line
              key={code}
              x1={cx}
              y1={cy}
              x2={outer.x}
              y2={outer.y}
              stroke="#E9D8D1"
              strokeWidth="1"
            />
          );
        })}

        <polygon
          points={polygonPoints}
          fill="url(#riasecRadarFill)"
          stroke="#762D50"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {dataPoints.map((d) => {
          const isActive = hoveredCode === d.code;
          return (
            <g
              key={d.code}
              onMouseEnter={() => setHoveredCode(d.code)}
              onMouseLeave={() => setHoveredCode(null)}
              onClick={() => setHoveredCode((prev) => (prev === d.code ? null : d.code))}
              className="cursor-pointer"
            >
              <circle
                cx={d.pt.x}
                cy={d.pt.y}
                r={isActive ? 7.5 : 5.2}
                fill={isActive ? '#C6A56B' : '#762D50'}
                stroke="#FFFDF9"
                strokeWidth="2"
              />
              <text
                x={d.labelPt.x}
                y={d.labelPt.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={isActive ? '#762D50' : '#351B38'}
                fontSize="11.5"
                fontWeight="700"
              >
                {d.info.letter}
              </text>
              <text
                x={d.labelPt.x}
                y={d.labelPt.y + 13}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#5F4562"
                fontSize="9.5"
                fontWeight="600"
              >
                {d.area?.score ?? 0}/{d.area?.maxScore ?? 20}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="min-h-[28px] text-center text-xs text-[#5F4562]">
        {hoveredCode ? (
          <span>
            <strong className="text-[#762D50]">
              {RIASEC_PROFILES[hoveredCode].nameAr}
            </strong>
            {' — '}
            <span className="tabular-nums font-semibold text-[#351B38]">
              {scores[hoveredCode]?.score ?? 0} من {scores[hoveredCode]?.maxScore ?? 20}
            </span>
          </span>
        ) : (
          <span>مرري أو اضغطي على أي محور لاستعراض درجة النمط</span>
        )}
      </div>
    </div>
  );
}
