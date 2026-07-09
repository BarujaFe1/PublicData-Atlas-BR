@echo off
setlocal
cd /d "%~dp0"

echo [PublicData Atlas BR] Starting local scaffold...

if not exist "backend\.venv" (
  python -m venv backend\.venv
)

call backend\.venv\Scripts\activate.bat
pip install -r backend\requirements.txt

start "atlas-api" cmd /k "cd /d %~dp0 && backend\.venv\Scripts\python.exe -m uvicorn backend.main:app --reload --port 8000"

cd frontend
if not exist "node_modules" (
  call npm install
)
start "atlas-web" cmd /k "cd /d %~dp0frontend && npm run dev"

start "" "http://localhost:3000"
echo Backend: http://127.0.0.1:8000
echo Frontend: http://localhost:3000
endlocal
