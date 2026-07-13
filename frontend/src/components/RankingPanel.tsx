"use client";

import type { UfIndicator } from "@/lib/demo-data";

type Ranked = UfIndicator & { rank: number };

type Props = {
  ranking: Ranked[];
  selected: string | null;
  selectedRow: UfIndicator | null;
  onSelect: (uf: string) => void;
  lang: "pt" | "en";
  showAll: boolean;
  onToggleShowAll: () => void;
};

export function RankingPanel({
  ranking,
  selected,
  selectedRow,
  onSelect,
  lang,
  showAll,
  onToggleShowAll,
}: Props) {
  const visible = showAll ? ranking : ranking.slice(0, 10);

  return (
    <div className="panel">
      <h2>{lang === "pt" ? "Ranking metodológico" : "Methodological ranking"}</h2>
      <p className="muted">
        {lang === "pt"
          ? "Ordenação por IDEB sintético 2023 (nulos excluídos)."
          : "Sorted by synthetic 2023 IDEB (nulls excluded)."}
      </p>
      {selectedRow && (
        <div className="selected">
          <strong>
            {selectedRow.uf} — {selectedRow.name}
          </strong>
          <div className="selected-grid">
            <span>IDEB: {selectedRow.ideb?.toFixed(1) ?? "—"}</span>
            <span>
              {lang === "pt" ? "Matrícula" : "Enrollment"}:{" "}
              {selectedRow.enrollmentRate != null
                ? `${Math.round(selectedRow.enrollmentRate * 100)}%`
                : "—"}
            </span>
            <span>
              {lang === "pt" ? "Escolas" : "Schools"}:{" "}
              {selectedRow.schools?.toLocaleString("pt-BR") ?? "—"}
            </span>
            <span>{selectedRow.region}</span>
          </div>
        </div>
      )}
      {ranking.length === 0 ? (
        <p className="empty" role="status">
          {lang === "pt"
            ? "Nenhum indicador IDEB disponível para ranking."
            : "No IDEB indicators available for ranking."}
        </p>
      ) : (
        <>
          <ol className="rank-list">
            {visible.map((r) => (
              <li key={r.uf}>
                <button
                  type="button"
                  className={selected === r.uf ? "rank-row active" : "rank-row"}
                  aria-pressed={selected === r.uf}
                  onClick={() => onSelect(r.uf)}
                >
                  <span className="rank">#{r.rank}</span>
                  <span className="uf">{r.uf}</span>
                  <span className="name">{r.name}</span>
                  <span className="val">{r.ideb?.toFixed(1)}</span>
                </button>
              </li>
            ))}
          </ol>
          {ranking.length > 10 && (
            <button type="button" className="linkish" onClick={onToggleShowAll}>
              {showAll
                ? lang === "pt"
                  ? "Mostrar só top 10"
                  : "Show top 10 only"
                : lang === "pt"
                  ? `Ver todas (${ranking.length})`
                  : `View all (${ranking.length})`}
            </button>
          )}
        </>
      )}
    </div>
  );
}
