# Technical decisions

## 1. Frontend-seeded demo on Vercel

**Decision:** Ship the lab demo as a static Next.js app with embedded seeds.  
**Why:** Zero cold-start Python cost; predictable portfolio demo; still honest about synthetic data.  
**Trade-off:** Not a live ETL against open APIs yet.

## 2. Schematic map instead of MapLibre (lab)

**Decision:** UF bubble map with fixed anchors.  
**Why:** Fast to ship, no tile keys, clear “lab” affordance.  
**Trade-off:** Not cartographically accurate — called out in UI notice and limitations.

## 3. Shared quality weights (TS ↔ Python)

**Decision:** Document and mirror weights: completeness 25%, consistency 25%, freshness 20%, coverage 15%, lineage 15%.  
**Why:** Interviewers can verify the score; backend tests guard the formula.  
**Trade-off:** Manual sync until a shared package exists (acceptable for lab).

## 4. Dimensional clamp before weighting

**Decision:** Clamp each dimension to `[0, 1]` before applying weights.  
**Why:** Prevents inflated scores from bad inputs; deterministic for demos/tests.

## 5. Optional FastAPI scaffold

**Decision:** Keep a thin API for meta/quality JSON without requiring it for the public demo.  
**Why:** Leaves a path to DuckDB/ingestion later without blocking portfolio publish.
