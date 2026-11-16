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
            <stop offset="0%" stopColor="#C04472" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#7651B8" stopOpacity="0.30" />
          </linearGradient>
        </defs>

        {/* Concentric Hex Grid */}
        {levels.map((lvl) => {
          const ringPts = RIASEC_ORDER.map((_, idx) => {
            const p = getPoint(idx, lvl);
            return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
          }).join(' ');
          return (
            <polygon
              key={lvl}
              points={ringPts}
              fill={lvl === 1 ? '#FFF8F3' : 'none'}
              fillOpacity={lvl === 1 ? 0.6 : 0}
              stroke="#EAD3E0"
              strokeWidth={lvl === 1 ? 1.5 : 1}
              strokeDasharray={lvl < 1 ? '3 3' : undefined}
            />
          );
        })}

        {/* Radial Spokes */}
        {RIASEC_ORDER.map((code, idx) => {
          const outer = getPoint(idx, 1);
          return (
            <line
              key={code}
              x1={cx}
              y1={cy}
              x2={outer.x}
              y2={outer.y}
              stroke="#EAD3E0"
              strokeWidth="1"
            />
          );
        })}

        {/* User Profile Polygon */}
        <polygon
          points={polygonPoints}
          fill="url(#riasecRadarFill)"
          stroke="#C04472"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {/* Vertices & Interactive Labels */}
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
                r={isActive ? 7.5 : 5.5}
                fill={d.info.colorHex}
                stroke="#FFF8F3"
                strokeWidth="2"
              />
              <text
                x={d.labelPt.x}
                y={d.labelPt.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={isActive ? d.info.colorHex : '#351B38'}
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
                fill="#5F4163"
                fontSize="9.5"
                fontWeight="600"
              >
                {d.area?.score ?? 0}/{d.area?.maxScore ?? 20}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Active vertex tooltip */}
      <div className="min-h-[28px] text-center text-xs text-[#5F4163]">
        {hoveredCode ? (
          <span>
            <strong style={{ color: RIASEC_PROFILES[hoveredCode].colorHex }}>
              {RIASEC_PROFILES[hoveredCode].nameAr}
            </strong>
            {' — '}
            <span className="tabular-nums font-semibold text-[#351B38]">
              {scores[hoveredCode]?.score ?? 0} من {scores[hoveredCode]?.maxScore ?? 20}
            </span>
          </span>
        ) : (
          <span>مرري أو اضغطي على أي نقطة لاستعراض درجة النمط</span>
        )}
      </div>
    </div>
  );
}
