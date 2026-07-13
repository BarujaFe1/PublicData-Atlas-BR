# Testing

## Frontend

```bash
cd frontend
npm install
npm test          # vitest run
npm run typecheck
npm run build
```

Coverage focus:
- `scoreQuality` weights + clamps
- ranking / extent edge cases
- missing UF helpers

## Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate   # Windows
pip install -r requirements.txt
cd ..
PYTHONPATH=. pytest backend/tests -q
```

## CI

GitHub Actions runs frontend typecheck/test/build and backend pytest on push/PR.
