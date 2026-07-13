"use client";

import { useMemo, useState } from "react";
import {
  DEMO,
  averageSourceScore,
  idebExtent,
  rankingByIdeb,
} from "@/lib/demo-data";
import { BrazilSchematicMap } from "@/components/BrazilSchematicMap";
import { RankingPanel } from "@/components/RankingPanel";
import { QualityPanel } from "@/components/QualityPanel";
import { ReportPanel } from "@/components/ReportPanel";

type Tab = "atlas" | "quality" | "report";

export default function AtlasDemo() {
  const [tab, setTab] = useState<Tab>("atlas");
  const [selected, setSelected] = useState<string | null>("SC");
  const [lang, setLang] = useState<"pt" | "en">("pt");
  const [showAllRanking, setShowAllRanking] = useState(false);

  const extent = useMemo(() => idebExtent(DEMO.indicators), []);
  const ranking = useMemo(() => rankingByIdeb(DEMO.indicators), []);
  const selectedRow = DEMO.indicators.find((r) => r.uf === selected) ?? null;
  const avgScore = useMemo(() => averageSourceScore(DEMO.sources), []);

  return (
    <div className="page">
      <a className="skip-link" href="#main-content">
        {lang === "pt" ? "Ir para o conteúdo" : "Skip to content"}
      </a>
      <header className="hero">
        <div className="hero-top">
          <p className="brand">PublicData Atlas BR</p>
          <div className="hero-actions">
            <span className="badge">Lab demo</span>
            <button
              type="button"
              className="lang"
              aria-label={lang === "pt" ? "Switch to English" : "Mudar para português"}
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
        <p className="lead">{lang === "pt" ? DEMO.questionPt : DEMO.questionEn}</p>
        <p className="notice" role="note">
          <strong>Responsible Open Data Notice:</strong>{" "}
          {lang === "pt"
            ? "dados sintéticos para portfólio. Não é publicação oficial Inep/IBGE. Atlas ≠ Auditor: aqui mapa/indicadores; o Auditor foca checks/issues em CSV."
            : "synthetic portfolio data. Not official Inep/IBGE. Atlas ≠ Auditor: map/indicators here; the Auditor focuses on CSV checks/issues."}
        </p>
        <div className="kpis">
          <Kpi label={lang === "pt" ? "Fontes" : "Sources"} value="2" />
          <Kpi label="UFs" value="27" />
          <Kpi
            label={lang === "pt" ? "Quality médio" : "Avg quality"}
            value={`${avgScore}`}
          />
          <Kpi
            label={lang === "pt" ? "Domínio" : "Domain"}
            value={lang === "pt" ? "Educação" : "Education"}
          />
        </div>
      </header>

      <nav className="tabs" aria-label={lang === "pt" ? "Seções" : "Sections"}>
        {(
          [
            ["atlas", lang === "pt" ? "Mapa & ranking" : "Map & ranking"],
            ["quality", "Quality Score"],
            ["report", lang === "pt" ? "Relatório" : "Report"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={tab === id ? "tab active" : "tab"}
            aria-pressed={tab === id}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      <main id="main-content">
        {tab === "atlas" && (
          <section className="grid-2">
            <div className="panel">
              <h2>
                {lang === "pt"
                  ? "Mapa esquemático (IDEB lab)"
                  : "Schematic map (IDEB lab)"}
              </h2>
              <p className="muted">
                {lang === "pt"
                  ? "Selecione uma UF (clique ou teclado). Cinza = valor ausente."
                  : "Select a state (click or keyboard). Gray = missing value."}
              </p>
              <BrazilSchematicMap
                indicators={DEMO.indicators}
                min={extent.min}
                max={extent.max}
                selected={selected}
                onSelect={setSelected}
                lang={lang}
              />
              <div className="legend" aria-hidden="true">
                <span>{extent.min.toFixed(1)}</span>
                <div className="legend-bar" />
                <span>{extent.max.toFixed(1)}</span>
              </div>
            </div>
            <RankingPanel
              ranking={ranking}
              selected={selected}
              selectedRow={selectedRow}
              onSelect={setSelected}
              lang={lang}
              showAll={showAllRanking}
              onToggleShowAll={() => setShowAllRanking((v) => !v)}
            />
          </section>
        )}

        {tab === "quality" && <QualityPanel sources={DEMO.sources} lang={lang} />}

        {tab === "report" && (
          <ReportPanel
            demo={DEMO}
            ranking={ranking}
            avgScore={avgScore}
            lang={lang}
          />
        )}
      </main>

      <footer className="footer">
        <p>
          {lang === "pt" ? "Desenvolvido por" : "Built by"}{" "}
          <strong>Felipe Alirio Baruja</strong> ·{" "}
          <a href="https://github.com/BarujaFe1/PublicData-Atlas-BR">GitHub</a> ·{" "}
          <a href="https://publicdata-atlas-br-nu.vercel.app">Live Demo</a> ·{" "}
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
