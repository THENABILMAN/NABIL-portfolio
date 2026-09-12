@echo off
set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%.."
set "PROJECT_ROOT=%CD%"

echo ======================================================
echo  Starting Mohammad Ali Nabil Portfolio (Full Stack)
echo  Working Directory: %PROJECT_ROOT%
echo ======================================================

echo [1/2] Launching FastAPI RAG Backend (Port 8000)...
start "Portfolio RAG Backend" cmd /k "cd /d %PROJECT_ROOT% && conda activate nabport && python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload"

echo [2/2] Launching Next.js Frontend (Port 3000)...
start "Portfolio Next.js Frontend" cmd /k "cd /d %PROJECT_ROOT% && npm run dev"

echo.
echo Application started!
echo Frontend: http://localhost:3000
echo Backend:  http://127.0.0.1:8000/health
echo ======================================================
