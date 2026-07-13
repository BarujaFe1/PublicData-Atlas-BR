# Deployment

## Canonical Live Demo (current team)

- **URL:** https://publicdata-atlas-br-nu.vercel.app  
- **Vercel project:** `baruja-fe/publicdata-atlas-br`  
- **Root directory:** `frontend`  
- **Framework:** Next.js 15  

## Legacy alias warning

`https://publicdata-atlas-br.vercel.app` is still bound to an older Vercel team/account and may serve a **stale build**. Do not use it in portfolio cards until the alias is transferred. Prefer the canonical `-nu` URL above.

## Redeploy

```bash
cd frontend
npx vercel link --yes --project publicdata-atlas-br
npx vercel --prod --yes
```

## Environment

Public lab demo needs **no secrets**. Optional local API:

```env
NEXT_PUBLIC_API_BASE=http://127.0.0.1:8000
```

Never commit `.env` / `.env.local`.

## GitHub metadata

- Homepage: `https://publicdata-atlas-br-nu.vercel.app`
- Description: lab demo wording (synthetic education seeds)
- Topics: no `duckdb` / `maplibre` until implemented
