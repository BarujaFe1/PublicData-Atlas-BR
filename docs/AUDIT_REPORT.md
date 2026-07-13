# AUDIT_REPORT — PublicData Atlas BR

**Branch:** `chore/portfolio-quality-pass`  
**Date:** 2026-07-13  
**Auditor role:** senior architecture + data product + QA + portfolio recruiter

---

## 1. Executive summary

PublicData Atlas BR is a **civic-tech lab demo**: synthetic UF-level education indicators, dimensional Quality Score, schematic Brazil map, methodological ranking and a short public report. The **live Next.js demo works** (Vercel). The backend FastAPI layer is a thin meta/quality scaffold — the demo is intentionally frontend-seeded for deploy stability.

**Current maturity:** solid lab portfolio piece, not a production open-data platform.

| Area | Score |
|---|---:|
| Portfolio narrative | 7.5 |
| Demo / deployability | 8.5 |
| Data/methodology honesty | 8.0 |
| Code quality / tests | 5.5 |
| UX / a11y | 6.0 |
| Docs / DX | 5.0 |
| Security posture | 7.5 |
| **Overall** | **6.8 / 10** |

---

## 2. Stack (verified)

- **Frontend:** Next.js 15 (App Router), React 19, TypeScript, plain CSS
- **Backend (optional):** FastAPI + quality helper + pytest
- **Data:** `data/seed/` CSV + JSON (synthetic education UF)
- **Deploy:** Vercel (`frontend/`), homepage on GitHub repo

---

## 3. Main risks

1. Recruiter may confuse Atlas with **Public Data Quality Auditor BR** (mitigated in UI copy; must stay explicit).
2. Schematic map may be misread as official IBGE geometry — notice must stay visible.
3. Backend is easy to oversell (DuckDB/MapLibre in README aspirational vs lab reality).
4. Thin test coverage (quality score only).
5. Accessibility gaps on map interactions (mouse-only circles).

---

## 4. Bugs / issues found

| ID | Severity | Issue | Status |
|---|---|---|---|
| B1 | Medium | `idebExtent([])` → `Infinity/-Infinity` | Fix in quality-pass |
| B2 | Medium | Map UF markers not keyboard-accessible | Fix |
| B3 | Low | KPI “Quality médio” not bilingual | Fix |
| B4 | Low | `npm run lint` lacks eslint-config-next | Fix |
| B5 | Low | Untracked `frontend/.gitignore`; root ignores `.vercel` OK | Align |
| B6 | Info | Ranking shows top-10 only without “view all” | Improve UX |
| B7 | Info | Monolithic `AtlasDemo.tsx` (~335 LOC) | Split components |

No secrets found in tracked files. `.env.example` placeholders only.

---

## 5. Quick wins

- Harden pure functions + frontend unit tests (Vitest)
- A11y on map + tab semantics (`aria-pressed`)
- Portfolio README rewrite (honest lab scope)
- CI (frontend typecheck/build + backend pytest)
- Architecture / testing / deployment docs

---

## 6. Structural improvements (this pass)

- Extract UI: map, ranking, quality panel, report
- Shared score weights documented TS ↔ Python
- Empty/edge-case guards
- `docs/*` suite + HANDOFF

---

## 7. Execution plan

1. Fix bugs B1–B4 + UX/a11y  
2. Add Vitest + expand pytest  
3. Docs + CI + README  
4. Verify build/tests  
5. Commit + push branch  

---

## 8. Final checklist (target)

- [x] Install / run documented  
- [x] Build green  
- [x] Tests green (Vitest 9 + Pytest 4)  
- [x] README portfolio-grade  
- [x] CI present  
- [x] `.env.example` + `.gitignore` safe  
- [x] HANDOFF complete  

**Post-pass score (estimated):** ~8.2 / 10 as an honest lab portfolio piece. 
