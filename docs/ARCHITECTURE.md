# Architecture — PublicData Atlas BR

## Product shape

Lab demo civic atlas focused on **one domain (education)** and **UF-level** synthetic indicators.

```text
Browser (Next.js lab UI)
  └─ embedded seeds (demo-data.ts + data/seed/*)
Optional local API (FastAPI)
  └─ /health, /api/v1/meta, /api/v1/demo/quality
```

The **public Vercel deployment is frontend-only**. Seeds live in the client bundle so the demo stays stable without a Python runtime on Vercel.

## Layers

| Layer | Responsibility |
|---|---|
| `frontend/src/lib/demo-data.ts` | Domain types, quality score, ranking, demo seeds |
| `frontend/src/components/*` | Atlas UI (map, ranking, quality, report) |
| `frontend/src/app/*` | Next.js App Router shell |
| `backend/services/quality.py` | Same quality weights for API/tests |
| `data/seed/` | Portable CSV/JSON artifacts for methodology narrative |
| `docs/` | Methodology, audit, handoff |

## Atlas vs Auditor

- **Atlas (this repo):** territorial reading — map, indicators, ranking, methodological report.
- **Auditor (`public-data-quality-auditor-br`):** CSV profiling — checks, dimensional score, issues register, datapackage.

## Non-goals (lab)

- Official Inep/IBGE publication
- Full IBGE geometry / MapLibre production tiles
- Multi-domain nationwide coverage
- Authenticated multi-tenant SaaS
