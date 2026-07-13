# PORTFOLIO_HANDOFF — PublicData Atlas BR

**Date:** 2026-07-13  
**Branch:** `chore/portfolio-quality-pass`  
**Recommendation:** **Laboratório** (lab) — not featured / not “destaque” yet.

## One-liner

Civic atlas lab for Brazilian open data: dimensional source quality, UF indicators, schematic map and a methodological report — differentiated from CSV auditing.

## Before → After

| | Before | After |
|---|---|---|
| Score | ~6.8–8.2 lab | ~8.3 honest lab with synced deploy |
| Demo | Possibly stale alias | Fresh: https://publicdata-atlas-br-nu.vercel.app |
| Claims | Topics included duckdb/maplibre | Topics/description match lab reality |
| Tests | Thin | Vitest 9 + Pytest 4 + CI |
| Docs | Packaging README | Portfolio README + DEMO_SCRIPT + SCREENSHOTS |

## Atlas ≠ Auditor (keep forever)

- **Atlas:** map + indicators + ranking + methodological narrative  
- **Auditor (`public-data-quality-auditor-br`):** CSV checks + score + issues + datapackage  

## Commands / gates

```bash
cd frontend && npm run typecheck && npm test && npm run build
PYTHONPATH=. pytest backend/tests -q
```

Observed green on this pass (local).

## Deploy evidence

- New production: https://publicdata-atlas-br-nu.vercel.app (skip-link + view-all present)  
- Legacy: https://publicdata-atlas-br.vercel.app (stale; do not use)  
- GitHub homepage updated to `-nu` URL  

## Screenshots

Mock/lab assets exist under `assets/screenshots/`. Re-capture from the live `-nu` URL per `docs/SCREENSHOTS.md` before promoting beyond lab.

## Interview 60-second hook

> “Atlas reads territory with explicit quality and limits. Auditor audits messy CSVs. This lab answers one education question at UF level with synthetic seeds — MapLibre and real sources are the next honest step, not a hidden claim.”

## Next steps (only if promoting tier)

1. Transfer or retire legacy Vercel alias  
2. Re-capture live screenshots  
3. MapLibre + IBGE UF polygons  
4. One real versioned open source  
5. Then consider **selecionado** (still not automatic featured)

## Supermegaprompt

External file (required):  
`C:\dev\prompts_para_port\publicdata-atlas-br-supermegaprompt-portfolio.md`
