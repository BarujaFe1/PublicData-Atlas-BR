@echo off
setlocal
cd /d "%~dp0"

echo [PublicData Atlas BR] Starting lab demo...

cd frontend
if not exist "node_modules" (
  call npm install
)
start "atlas-web" cmd /k "cd /d %~dp0frontend && npm run dev"
start "" "http://localhost:3000"
echo Frontend lab demo: http://localhost:3000
echo Optional API: python -m uvicorn backend.main:app --reload --port 8000
endlocal
