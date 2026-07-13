export type QualityDimensions = {
  completeness: number;
  freshness: number;
  consistency: number;
  coverage: number;
  lineage: number;
};

export type SourceMeta = {
  id: string;
  name: string;
  nameEn: string;
  domain: "education";
  version: string;
  collectedAt: string;
  rows: number;
  geoLevel: "UF";
  notes: string;
  notesEn: string;
  dimensions: QualityDimensions;
  flags: string[];
};

export type UfIndicator = {
  uf: string;
  name: string;
  region: string;
  year: number;
  ideb: number | null;
  enrollmentRate: number | null;
  schools: number | null;
};

export type DemoBundle = {
  product: string;
  phase: "lab-demo";
  questionPt: string;
  questionEn: string;
  sources: SourceMeta[];
  indicators: UfIndicator[];
  rankingMetric: "ideb";
  limitations: string[];
  limitationsEn: string[];
};

/** Keep TS and Python weights in sync (see docs/TECHNICAL_DECISIONS.md). */
export const QUALITY_WEIGHTS = {
  completeness: 0.25,
  freshness: 0.2,
  consistency: 0.25,
  coverage: 0.15,
  lineage: 0.15,
} as const;

/** Schematic map anchors (viewBox 0 0 400 420) for UF choropleth lab demo. */
export const UF_MAP_ANCHORS: Record<string, { x: number; y: number; r?: number }> = {
  RR: { x: 145, y: 48 },
  AP: { x: 220, y: 55 },
  AM: { x: 120, y: 95 },
  PA: { x: 200, y: 100 },
  AC: { x: 55, y: 140 },
  RO: { x: 95, y: 155 },
  TO: { x: 230, y: 155 },
  MA: { x: 265, y: 110 },
  PI: { x: 285, y: 140 },
  CE: { x: 320, y: 115 },
  RN: { x: 345, y: 125 },
  PB: { x: 345, y: 145 },
  PE: { x: 335, y: 160 },
  AL: { x: 340, y: 175 },
  SE: { x: 330, y: 188 },
  BA: { x: 295, y: 195 },
  MT: { x: 175, y: 195 },
  GO: { x: 230, y: 210 },
  DF: { x: 245, y: 220, r: 5 },
  MS: { x: 175, y: 250 },
  MG: { x: 275, y: 240 },
  ES: { x: 315, y: 255 },
  RJ: { x: 300, y: 280 },
  SP: { x: 255, y: 285 },
  PR: { x: 230, y: 315 },
  SC: { x: 245, y: 340 },
  RS: { x: 220, y: 370 },
};

function clamp01(n: number): number {
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(1, n));
}

export function scoreQuality(d: QualityDimensions): number {
  const dims = {
    completeness: clamp01(d.completeness),
    freshness: clamp01(d.freshness),
    consistency: clamp01(d.consistency),
    coverage: clamp01(d.coverage),
    lineage: clamp01(d.lineage),
  };
  const total =
    dims.completeness * QUALITY_WEIGHTS.completeness +
    dims.freshness * QUALITY_WEIGHTS.freshness +
    dims.consistency * QUALITY_WEIGHTS.consistency +
    dims.coverage * QUALITY_WEIGHTS.coverage +
    dims.lineage * QUALITY_WEIGHTS.lineage;
  return Math.round(Math.max(0, Math.min(100, total * 100)) * 10) / 10;
}

export const DEMO: DemoBundle = {
  product: "PublicData Atlas BR",
  phase: "lab-demo",
  questionPt:
    "Quais UFs concentram IDEB mais alto em 2023 — e quão confiáveis são as duas fontes sintéticas usadas neste lab?",
  questionEn:
    "Which Brazilian states show higher 2023 IDEB-like scores — and how reliable are the two synthetic sources in this lab?",
  sources: [
    {
      id: "seed_ideb_uf_v1",
      name: "IDEB sintético por UF (lab)",
      nameEn: "Synthetic IDEB by state (lab)",
      domain: "education",
      version: "2023.lab.1",
      collectedAt: "2026-07-01",
      rows: 27,
      geoLevel: "UF",
      notes:
        "Dataset sintético inspirado em padrões públicos de educação. Não é o IDEB oficial do Inep.",
      notesEn:
        "Synthetic dataset inspired by public education patterns. Not official Inep IDEB.",
      dimensions: {
        completeness: 0.96,
        freshness: 0.88,
        consistency: 0.93,
        coverage: 1.0,
        lineage: 0.95,
      },
      flags: ["synthetic", "uf-complete", "nulls-in-2-ufs"],
    },
    {
      id: "seed_matriculas_uf_v1",
      name: "Matrículas escolares sintéticas por UF (lab)",
      nameEn: "Synthetic school enrollment by state (lab)",
      domain: "education",
      version: "2023.lab.1",
      collectedAt: "2026-06-15",
      rows: 27,
      geoLevel: "UF",
      notes:
        "Fonte sintética com lacunas intencionais em 3 UFs e inconsistência leve de ranges — para exercitar Quality Score.",
      notesEn:
        "Synthetic source with intentional gaps in 3 states and mild range inconsistency — to exercise Quality Score.",
      dimensions: {
        completeness: 0.78,
        freshness: 0.82,
        consistency: 0.74,
        coverage: 0.89,
        lineage: 0.9,
      },
      flags: ["synthetic", "missing-3-ufs", "range-warnings"],
    },
  ],
  rankingMetric: "ideb",
  limitations: [
    "Dados sintéticos para demo de portfólio — não substituem publicações oficiais (Inep/IBGE).",
    "Mapa é esquemático (âncoras por UF), não geometria oficial IBGE.",
    "Quality Score é dimensional e explicável, não certificação estatística.",
    "Diferente do Public Data Quality Auditor BR: aqui o foco é atlas (mapa + indicadores + narrativa); o Auditor foca checks/issues sobre CSV.",
  ],
  limitationsEn: [
    "Synthetic portfolio demo data — does not replace official Inep/IBGE releases.",
    "Map is schematic (UF anchors), not official IBGE geometry.",
    "Quality Score is dimensional and explainable, not statistical certification.",
    "Unlike Public Data Quality Auditor BR: this product is an atlas (map + indicators + narrative); the Auditor focuses on CSV checks/issues.",
  ],
  indicators: [
    { uf: "AC", name: "Acre", region: "Norte", year: 2023, ideb: 4.6, enrollmentRate: 0.91, schools: 1480 },
    { uf: "AL", name: "Alagoas", region: "Nordeste", year: 2023, ideb: 4.4, enrollmentRate: 0.88, schools: 3120 },
    { uf: "AP", name: "Amapá", region: "Norte", year: 2023, ideb: 4.3, enrollmentRate: null, schools: 980 },
    { uf: "AM", name: "Amazonas", region: "Norte", year: 2023, ideb: 4.5, enrollmentRate: 0.86, schools: 5210 },
    { uf: "BA", name: "Bahia", region: "Nordeste", year: 2023, ideb: 4.7, enrollmentRate: 0.9, schools: 18400 },
    { uf: "CE", name: "Ceará", region: "Nordeste", year: 2023, ideb: 5.6, enrollmentRate: 0.94, schools: 9800 },
    { uf: "DF", name: "Distrito Federal", region: "Centro-Oeste", year: 2023, ideb: 5.8, enrollmentRate: 0.96, schools: 920 },
    { uf: "ES", name: "Espírito Santo", region: "Sudeste", year: 2023, ideb: 5.5, enrollmentRate: 0.95, schools: 4100 },
    { uf: "GO", name: "Goiás", region: "Centro-Oeste", year: 2023, ideb: 5.3, enrollmentRate: 0.93, schools: 6200 },
    { uf: "MA", name: "Maranhão", region: "Nordeste", year: 2023, ideb: 4.2, enrollmentRate: 0.84, schools: 11200 },
    { uf: "MT", name: "Mato Grosso", region: "Centro-Oeste", year: 2023, ideb: 5.1, enrollmentRate: 0.92, schools: 4300 },
    { uf: "MS", name: "Mato Grosso do Sul", region: "Centro-Oeste", year: 2023, ideb: 5.2, enrollmentRate: 0.93, schools: 2800 },
    { uf: "MG", name: "Minas Gerais", region: "Sudeste", year: 2023, ideb: 5.7, enrollmentRate: 0.95, schools: 22100 },
    { uf: "PA", name: "Pará", region: "Norte", year: 2023, ideb: 4.4, enrollmentRate: 0.85, schools: 9800 },
    { uf: "PB", name: "Paraíba", region: "Nordeste", year: 2023, ideb: 4.8, enrollmentRate: 0.9, schools: 5400 },
    { uf: "PR", name: "Paraná", region: "Sul", year: 2023, ideb: 5.9, enrollmentRate: 0.96, schools: 9800 },
    { uf: "PE", name: "Pernambuco", region: "Nordeste", year: 2023, ideb: 5.0, enrollmentRate: 0.91, schools: 10200 },
    { uf: "PI", name: "Piauí", region: "Nordeste", year: 2023, ideb: 4.6, enrollmentRate: null, schools: 6100 },
    { uf: "RJ", name: "Rio de Janeiro", region: "Sudeste", year: 2023, ideb: 5.4, enrollmentRate: 0.94, schools: 11200 },
    { uf: "RN", name: "Rio Grande do Norte", region: "Nordeste", year: 2023, ideb: 4.9, enrollmentRate: 0.9, schools: 4300 },
    { uf: "RS", name: "Rio Grande do Sul", region: "Sul", year: 2023, ideb: 5.8, enrollmentRate: 0.95, schools: 11800 },
    { uf: "RO", name: "Rondônia", region: "Norte", year: 2023, ideb: 4.8, enrollmentRate: 0.9, schools: 2100 },
    { uf: "RR", name: "Roraima", region: "Norte", year: 2023, ideb: null, enrollmentRate: 0.87, schools: 720 },
    { uf: "SC", name: "Santa Catarina", region: "Sul", year: 2023, ideb: 6.1, enrollmentRate: 0.97, schools: 7200 },
    { uf: "SP", name: "São Paulo", region: "Sudeste", year: 2023, ideb: 5.9, enrollmentRate: 0.96, schools: 28500 },
    { uf: "SE", name: "Sergipe", region: "Nordeste", year: 2023, ideb: 4.5, enrollmentRate: null, schools: 2400 },
    { uf: "TO", name: "Tocantins", region: "Norte", year: 2023, ideb: 4.9, enrollmentRate: 0.89, schools: 2600 },
  ],
};

export function rankingByIdeb(indicators: UfIndicator[]) {
  return [...indicators]
    .filter((r) => r.ideb != null)
    .sort((a, b) => (b.ideb ?? 0) - (a.ideb ?? 0))
    .map((r, i) => ({ rank: i + 1, ...r }));
}

export function idebExtent(indicators: UfIndicator[]): { min: number; max: number } {
  const vals = indicators.map((r) => r.ideb).filter((v): v is number => v != null);
  if (vals.length === 0) return { min: 0, max: 1 };
  return { min: Math.min(...vals), max: Math.max(...vals) };
}

export function colorForIdeb(value: number | null, min: number, max: number): string {
  if (value == null) return "#94a3b8";
  const t = max === min ? 0.5 : (value - min) / (max - min);
  const r = Math.round(15 + (4 - 15) * t);
  const g = Math.round(118 + (180 - 118) * t);
  const b = Math.round(110 + (140 - 110) * t);
  return `rgb(${r},${g},${b})`;
}

export function averageSourceScore(sources: SourceMeta[]): number {
  if (sources.length === 0) return 0;
  const sum = sources.reduce((acc, s) => acc + scoreQuality(s.dimensions), 0);
  return Math.round((sum / sources.length) * 10) / 10;
}

export function missingIdebUfs(indicators: UfIndicator[]): string[] {
  return indicators.filter((r) => r.ideb == null).map((r) => r.uf);
}

export function missingEnrollmentUfs(indicators: UfIndicator[]): string[] {
  return indicators.filter((r) => r.enrollmentRate == null).map((r) => r.uf);
}
