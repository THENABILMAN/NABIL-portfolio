$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$ProjectRoot = Split-Path -Parent $ScriptDir
if (!$ProjectRoot) { $ProjectRoot = "C:\Nabil protfolio" }
Set-Location $ProjectRoot

$NabportPython = "C:\Users\Nabil\anaconda3\envs\nabport\python.exe"
if (!(Test-Path $NabportPython)) {
    $NabportPython = "python"
}

Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "  Starting Mohammad Ali Nabil Portfolio (Full Stack)" -ForegroundColor Green
Write-Host "  Root:   $ProjectRoot" -ForegroundColor Gray
Write-Host "  Python: $NabportPython" -ForegroundColor Gray
Write-Host "======================================================" -ForegroundColor Cyan

Write-Host "`n[1/2] Launching FastAPI RAG Backend (Port 8000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$ProjectRoot'; & '$NabportPython' -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload"

Write-Host "[2/2] Launching Next.js Frontend (Port 3000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$ProjectRoot'; npm run dev"

Write-Host "`nFull Web App Running!" -ForegroundColor Green
Write-Host "Portfolio Website:  http://localhost:3000" -ForegroundColor Cyan
Write-Host "RAG Backend API:    http://127.0.0.1:8000/health" -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan
