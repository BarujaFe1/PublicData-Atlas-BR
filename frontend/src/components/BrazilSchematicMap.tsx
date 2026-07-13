"use client";

import { useMemo } from "react";
import {
  UF_MAP_ANCHORS,
  colorForIdeb,
  type UfIndicator,
} from "@/lib/demo-data";

type Props = {
  indicators: UfIndicator[];
  min: number;
  max: number;
  selected: string | null;
  onSelect: (uf: string) => void;
  lang: "pt" | "en";
};

export function BrazilSchematicMap({
  indicators,
  min,
  max,
  selected,
  onSelect,
  lang,
}: Props) {
  const byUf = useMemo(() => {
    const m = new Map<string, UfIndicator>();
    for (const r of indicators) m.set(r.uf, r);
    return m;
  }, [indicators]);

  return (
    <svg
      viewBox="0 0 400 420"
      className="map"
      role="group"
      aria-label={
        lang === "pt"
          ? "Mapa esquemático do Brasil por UF (IDEB lab)"
          : "Schematic Brazil map by state (IDEB lab)"
      }
    >
      <rect x="0" y="0" width="400" height="420" fill="#f1f5f9" rx="16" />
      {Object.entries(UF_MAP_ANCHORS).map(([uf, pos]) => {
        const row = byUf.get(uf);
        const fill = colorForIdeb(row?.ideb ?? null, min, max);
        const r = pos.r ?? 14;
        const isSel = selected === uf;
        const label =
          row == null
            ? uf
            : `${row.name}: IDEB ${row.ideb?.toFixed(1) ?? "n/a"}`;
        return (
          <g key={uf}>
            <circle
              cx={pos.x}
              cy={pos.y}
              r={isSel ? r + 3 : r}
              fill={fill}
              stroke={isSel ? "#0b1f33" : "#ffffff"}
              strokeWidth={isSel ? 3 : 1.5}
              role="button"
              tabIndex={0}
              aria-label={label}
              aria-pressed={isSel}
              style={{ cursor: "pointer" }}
              onClick={() => onSelect(uf)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(uf);
                }
              }}
            />
            <text
              x={pos.x}
              y={pos.y + 4}
              textAnchor="middle"
              fontSize="9"
              fontWeight="700"
              fill="#0b1f33"
              pointerEvents="none"
            >
              {uf}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
