# Deployment

## Live demo

- **URL:** https://publicdata-atlas-br.vercel.app  
- **Root directory on Vercel:** `frontend`  
- **Framework:** Next.js  

## Redeploy

```bash
cd frontend
npx vercel --prod
```

Or connect the GitHub repo and set Root Directory to `frontend`.

## Environment

Public lab demo needs **no secrets**. Optional local API:

```env
NEXT_PUBLIC_API_BASE=http://127.0.0.1:8000
```

Never commit `.env` / `.env.local`. See `.env.example`.

## GitHub homepage

Repository Settings → Website → `https://publicdata-atlas-br.vercel.app`
