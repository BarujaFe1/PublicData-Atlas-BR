"use client";

import { useMemo, useState } from "react";
import {
  DEMO,
  UF_MAP_ANCHORS,
  colorForIdeb,
  idebExtent,
  rankingByIdeb,
  scoreQuality,
  type UfIndicator,
} from "@/lib/demo-data";

type Tab = "atlas" | "quality" | "report";

export default function AtlasDemo() {
  const [tab, setTab] = useState<Tab>("atlas");
  const [selected, setSelected] = useState<string | null>("SC");
  const [lang, setLang] = useState<"pt" | "en">("pt");

  const extent = useMemo(() => idebExtent(DEMO.indicators), []);
  const ranking = useMemo(() => rankingByIdeb(DEMO.indicators), []);
  const selectedRow = DEMO.indicators.find((r) => r.uf === selected) ?? null;
  const sourceScores = DEMO.sources.map((s) => ({
    ...s,
    score: scoreQuality(s.dimensions),
  }));
  const avgScore =
    Math.round(
      (sourceScores.reduce((a, s) => a + s.score, 0) / sourceScores.length) * 10,
    ) / 10;

  return (
    <div className="page">
      <header className="hero">
        <div className="hero-top">
          <p className="brand">PublicData Atlas BR</p>
          <div className="hero-actions">
            <span className="badge">Lab demo</span>
            <button
              type="button"
              className="lang"
              onClick={() => setLang((l) => (l === "pt" ? "en" : "pt"))}
            >
              {lang === "pt" ? "EN" : "PT"}
            </button>
          </div>
        </div>
        <h1>
          {lang === "pt"
            ? "Atlas cívico de educação (UF) com qualidade explícita"
            : "Civic education atlas (states) with explicit quality"}
        </h1>
        <p className="lead">
          {lang === "pt" ? DEMO.questionPt : DEMO.questionEn}
        </p>
        <p className="notice">
          <strong>Responsible Open Data Notice:</strong>{" "}
          {lang === "pt"
            ? "dados sintéticos para portfólio. Não é publicação oficial Inep/IBGE. Atlas ≠ Auditor: aqui mapa/indicadores; o Auditor foca checks/issues em CSV."
            : "synthetic portfolio data. Not official Inep/IBGE. Atlas ≠ Auditor: map/indicators here; the Auditor focuses on CSV checks/issues."}
        </p>
        <div className="kpis">
          <Kpi label={lang === "pt" ? "Fontes" : "Sources"} value="2" />
          <Kpi label="UFs" value="27" />
          <Kpi label="Quality médio" value={`${avgScore}`} />
          <Kpi label="Domínio" value={lang === "pt" ? "Educação" : "Education"} />
        </div>
      </header>

      <nav className="tabs" aria-label="Sections">
        {(
          [
            ["atlas", lang === "pt" ? "Mapa & ranking" : "Map & ranking"],
            ["quality", lang === "pt" ? "Quality Score" : "Quality Score"],
            ["report", lang === "pt" ? "Relatório" : "Report"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={tab === id ? "tab active" : "tab"}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      {tab === "atlas" && (
        <section className="grid-2">
          <div className="panel">
            <h2>{lang === "pt" ? "Mapa esquemático (IDEB lab)" : "Schematic map (IDEB lab)"}</h2>
            <p className="muted">
              {lang === "pt"
                ? "Clique em uma UF. Cinza = valor ausente."
                : "Click a state. Gray = missing value."}
            </p>
            <BrazilSchematicMap
              indicators={DEMO.indicators}
              min={extent.min}
              max={extent.max}
              selected={selected}
              onSelect={setSelected}
            />
            <div className="legend">
              <span>{extent.min.toFixed(1)}</span>
              <div className="legend-bar" />
              <span>{extent.max.toFixed(1)}</span>
            </div>
          </div>
          <div className="panel">
            <h2>{lang === "pt" ? "Ranking metodológico" : "Methodological ranking"}</h2>
            <p className="muted">
              {lang === "pt"
                ? "Ordenação por IDEB sintético 2023 (nulos excluídos)."
                : "Sorted by synthetic 2023 IDEB (nulls excluded)."}
            </p>
            {selectedRow && <SelectedCard row={selectedRow} lang={lang} />}
            <ol className="rank-list">
              {ranking.slice(0, 10).map((r) => (
                <li key={r.uf}>
                  <button
                    type="button"
                    className={selected === r.uf ? "rank-row active" : "rank-row"}
                    onClick={() => setSelected(r.uf)}
                  >
                    <span className="rank">#{r.rank}</span>
                    <span className="uf">{r.uf}</span>
                    <span className="name">{r.name}</span>
                    <span className="val">{r.ideb?.toFixed(1)}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {tab === "quality" && (
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
                  <span className="score">{s.score}</span>
                </div>
                <p className="muted small">{s.id} · v{s.version}</p>
                <ul className="dims">
                  {Object.entries(s.dimensions).map(([k, v]) => (
                    <li key={k}>
                      <span>{k}</span>
                      <div className="bar">
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
            <h3>
              {lang === "pt"
                ? "Atlas vs Public Data Quality Auditor BR"
                : "Atlas vs Public Data Quality Auditor BR"}
            </h3>
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
      )}

      {tab === "report" && (
        <section className="panel report">
          <h2>{lang === "pt" ? "Relatório metodológico (lab)" : "Methodological report (lab)"}</h2>
          <h3>{lang === "pt" ? "Pergunta" : "Question"}</h3>
          <p>{lang === "pt" ? DEMO.questionPt : DEMO.questionEn}</p>
          <h3>{lang === "pt" ? "Achados (demo)" : "Findings (demo)"}</h3>
          <ul>
            <li>
              {lang === "pt"
                ? `Topo do ranking: ${ranking[0]?.uf} (${ranking[0]?.ideb?.toFixed(1)}), seguido de ${ranking[1]?.uf} e ${ranking[2]?.uf}.`
                : `Top ranking: ${ranking[0]?.uf} (${ranking[0]?.ideb?.toFixed(1)}), then ${ranking[1]?.uf} and ${ranking[2]?.uf}.`}
            </li>
            <li>
              {lang === "pt"
                ? `Quality médio das fontes: ${avgScore}/100 (IDEB lab mais forte que matrículas).`
                : `Average source quality: ${avgScore}/100 (IDEB lab stronger than enrollment).`}
            </li>
            <li>
              {lang === "pt"
                ? "Lacunas: RR sem IDEB; AP/PI/SE sem taxa de matrícula — sinalizadas no mapa/score."
                : "Gaps: RR missing IDEB; AP/PI/SE missing enrollment rate — flagged in map/score."}
            </li>
          </ul>
          <h3>{lang === "pt" ? "Limitações" : "Limitations"}</h3>
          <ul>
            {(lang === "pt" ? DEMO.limitations : DEMO.limitationsEn).map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
          <h3>{lang === "pt" ? "Pipeline" : "Pipeline"}</h3>
          <pre className="pipe">{`Open/synthetic sources
  → versioned seed (CSV + quality JSON)
  → dimensional Quality Score
  → UF indicators + ranking
  → schematic map explorer
  → methodological report`}</pre>
        </section>
      )}

      <footer className="footer">
        <p>
          {lang === "pt" ? "Desenvolvido por" : "Built by"}{" "}
          <strong>Felipe Alirio Baruja</strong> ·{" "}
          <a href="https://github.com/BarujaFe1/PublicData-Atlas-BR">GitHub</a> ·{" "}
          <a href="https://barujafe.vercel.app">Portfolio</a>
        </p>
      </footer>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="kpi">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function SelectedCard({ row, lang }: { row: UfIndicator; lang: "pt" | "en" }) {
  return (
    <div className="selected">
      <strong>
        {row.uf} — {row.name}
      </strong>
      <div className="selected-grid">
        <span>IDEB: {row.ideb?.toFixed(1) ?? "—"}</span>
        <span>
          {lang === "pt" ? "Matrícula" : "Enrollment"}:{" "}
          {row.enrollmentRate != null ? `${Math.round(row.enrollmentRate * 100)}%` : "—"}
        </span>
        <span>
          {lang === "pt" ? "Escolas" : "Schools"}: {row.schools?.toLocaleString("pt-BR") ?? "—"}
        </span>
        <span>{row.region}</span>
      </div>
    </div>
  );
}

function BrazilSchematicMap({
  indicators,
  min,
  max,
  selected,
  onSelect,
}: {
  indicators: UfIndicator[];
  min: number;
  max: number;
  selected: string | null;
  onSelect: (uf: string) => void;
}) {
  const byUf = useMemo(() => {
    const m = new Map<string, UfIndicator>();
    for (const r of indicators) m.set(r.uf, r);
    return m;
  }, [indicators]);

  return (
    <svg viewBox="0 0 400 420" className="map" role="img" aria-label="Brazil UF schematic map">
      <rect x="0" y="0" width="400" height="420" fill="#f1f5f9" rx="16" />
      {Object.entries(UF_MAP_ANCHORS).map(([uf, pos]) => {
        const row = byUf.get(uf);
        const fill = colorForIdeb(row?.ideb ?? null, min, max);
        const r = pos.r ?? 14;
        const isSel = selected === uf;
        return (
          <g key={uf} onClick={() => onSelect(uf)} style={{ cursor: "pointer" }}>
            <circle
              cx={pos.x}
              cy={pos.y}
              r={isSel ? r + 3 : r}
              fill={fill}
              stroke={isSel ? "#0b1f33" : "#ffffff"}
              strokeWidth={isSel ? 3 : 1.5}
            />
            <text
              x={pos.x}
              y={pos.y + 4}
              textAnchor="middle"
              fontSize="9"
              fontWeight="700"
              fill="#0b1f33"
            >
              {uf}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
