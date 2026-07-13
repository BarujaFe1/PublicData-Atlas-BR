"use client";

import type { SourceMeta } from "@/lib/demo-data";
import { scoreQuality } from "@/lib/demo-data";

type Props = {
  sources: SourceMeta[];
  lang: "pt" | "en";
};

export function QualityPanel({ sources, lang }: Props) {
  const sourceScores = sources.map((s) => ({
    ...s,
    score: scoreQuality(s.dimensions),
  }));

  return (
    <section className="panel">
      <h2>{lang === "pt" ? "Score de qualidade por fonte" : "Quality score by source"}</h2>
      <p className="muted">
        {lang === "pt"
          ? "Pesos: completude 25%, consistência 25%, atualidade 20%, cobertura 15%, linhagem 15%."
          : "Weights: completeness 25%, consistency 25%, freshness 20%, coverage 15%, lineage 15%."}
      </p>
      <div className="source-grid">
        {sourceScores.map((s) => (
          <article key={s.id} className="source-card">
            <div className="source-head">
              <h3>{lang === "pt" ? s.name : s.nameEn}</h3>
              <span className="score" aria-label={`Quality score ${s.score}`}>
                {s.score}
              </span>
            </div>
            <p className="muted small">
              {s.id} · v{s.version}
            </p>
            <ul className="dims">
              {Object.entries(s.dimensions).map(([k, v]) => (
                <li key={k}>
                  <span>{k}</span>
                  <div className="bar" aria-hidden="true">
                    <i style={{ width: `${v * 100}%` }} />
                  </div>
                  <strong>{Math.round(v * 100)}%</strong>
                </li>
              ))}
            </ul>
            <div className="flags">
              {s.flags.map((f) => (
                <span key={f} className="flag">
                  {f}
                </span>
              ))}
            </div>
            <p className="small">{lang === "pt" ? s.notes : s.notesEn}</p>
          </article>
        ))}
      </div>
      <div className="diff-box">
        <h3>Atlas vs Public Data Quality Auditor BR</h3>
        <ul>
          <li>
            <strong>Atlas:</strong>{" "}
            {lang === "pt"
              ? "mapa, indicadores territoriais, ranking e relatório metodológico."
              : "map, territorial indicators, ranking and methodological report."}
          </li>
          <li>
            <strong>Auditor:</strong>{" "}
            {lang === "pt"
              ? "profiling de CSV, 12+ checks, issues priorizados e datapackage."
              : "CSV profiling, 12+ checks, prioritized issues and datapackage."}
          </li>
        </ul>
      </div>
    </section>
  );
}
