# Demo script (3–5 min) — PublicData Atlas BR

**Audience:** recruiter / hiring manager (analytics engineering, data product, full-stack analítico)  
**URL:** https://publicdata-atlas-br-nu.vercel.app  
**Role recommendation:** **Laboratório** (lab demo) — not featured until real geometry + one real source.

## Minute 0:00–0:40 — Framing

> “This is a **civic atlas lab**, not a CSV auditor and not an official Inep product.  
> Question: which Brazilian states show higher synthetic IDEB-like scores in 2023, and how reliable are the two lab sources?”

Point to the **Responsible Open Data Notice**.

## Minute 0:40–1:40 — Map & ranking

1. Open **Mapa & ranking**.  
2. Click / keyboard-select **SC** (top IDEB).  
3. Show ranking top 3 and toggle **Ver todas** if useful.  
4. Call out gray markers = missing IDEB (e.g. RR).

## Minute 1:40–2:40 — Quality Score

1. Open **Quality Score**.  
2. Compare the two sources (IDEB lab stronger than enrollment).  
3. Explain weights: completeness 25%, consistency 25%, freshness 20%, coverage 15%, lineage 15%.  
4. Stress **Atlas ≠ Auditor** box.

## Minute 2:40–3:40 — Report & limits

1. Open **Relatório**.  
2. Read findings + limitations (synthetic, schematic map, no certification).  
3. Pipeline ASCII: seeds → score → indicators → map → report.

## Minute 3:40–5:00 — Interview close

Talk tracks:
- Why narrow scope (one domain, one question)  
- Why frontend-seeded Vercel demo (stable portfolio evidence)  
- Next honest step: MapLibre + IBGE geometry + one real versioned source  

**Do not claim:** production ETL, DuckDB in prod, MapLibre live, official education rankings, or “enterprise platform”.
