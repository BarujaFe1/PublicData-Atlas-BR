"use client";

import type { DemoBundle, UfIndicator } from "@/lib/demo-data";
import { missingEnrollmentUfs, missingIdebUfs } from "@/lib/demo-data";

type Ranked = UfIndicator & { rank: number };

type Props = {
  demo: DemoBundle;
  ranking: Ranked[];
  avgScore: number;
  lang: "pt" | "en";
};

export function ReportPanel({ demo, ranking, avgScore, lang }: Props) {
  const missIdeb = missingIdebUfs(demo.indicators);
  const missEnroll = missingEnrollmentUfs(demo.indicators);

  return (
    <section className="panel report">
      <h2>{lang === "pt" ? "Relatório metodológico (lab)" : "Methodological report (lab)"}</h2>
      <h3>{lang === "pt" ? "Pergunta" : "Question"}</h3>
      <p>{lang === "pt" ? demo.questionPt : demo.questionEn}</p>
      <h3>{lang === "pt" ? "Achados (demo)" : "Findings (demo)"}</h3>
      <ul>
        <li>
          {lang === "pt"
            ? `Topo do ranking: ${ranking[0]?.uf ?? "—"} (${ranking[0]?.ideb?.toFixed(1) ?? "—"}), seguido de ${ranking[1]?.uf ?? "—"} e ${ranking[2]?.uf ?? "—"}.`
            : `Top ranking: ${ranking[0]?.uf ?? "—"} (${ranking[0]?.ideb?.toFixed(1) ?? "—"}), then ${ranking[1]?.uf ?? "—"} and ${ranking[2]?.uf ?? "—"}.`}
        </li>
        <li>
          {lang === "pt"
            ? `Quality médio das fontes: ${avgScore}/100 (IDEB lab mais forte que matrículas).`
            : `Average source quality: ${avgScore}/100 (IDEB lab stronger than enrollment).`}
        </li>
        <li>
          {lang === "pt"
            ? `Lacunas IDEB: ${missIdeb.join(", ") || "nenhuma"}; matrícula: ${missEnroll.join(", ") || "nenhuma"}.`
            : `IDEB gaps: ${missIdeb.join(", ") || "none"}; enrollment: ${missEnroll.join(", ") || "none"}.`}
        </li>
      </ul>
      <h3>{lang === "pt" ? "Limitações" : "Limitations"}</h3>
      <ul>
        {(lang === "pt" ? demo.limitations : demo.limitationsEn).map((l) => (
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
  );
}
