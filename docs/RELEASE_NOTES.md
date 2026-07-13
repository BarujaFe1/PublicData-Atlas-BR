# Release notes — portfolio quality pass (2026-07)

## Summary

Elevates PublicData Atlas BR as an **honest lab demo**: clearer scope, stronger tests/CI, a11y on the map, and public metadata that no longer overclaims DuckDB/MapLibre.

## Highlights

- Quality score clamps + shared weights (TS/Python)
- Split UI components + keyboard-accessible UF map
- Vitest + expanded pytest + GitHub Actions CI
- README / docs rewritten for portfolio interviews
- GitHub description & topics aligned to lab reality
- Production Vercel redeployed from quality-pass code

## Limits unchanged (by design)

- Synthetic education seeds (not official Inep)
- Schematic map (not IBGE geometry / MapLibre)
- Frontend-seeded demo (FastAPI optional locally)

## Upgrade path

1. MapLibre + simplified IBGE UF polygons  
2. One real versioned open source → DuckDB layers  
3. Then reconsider portfolio **selecionado** (still not automatic featured)
