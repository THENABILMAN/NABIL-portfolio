# Starts the FastAPI backend and Next.js frontend in separate windows.
$ProjectRoot = $PSScriptRoot
Set-Location $ProjectRoot

# Calling the env's python directly avoids needing `conda init` in PowerShell.
$Python = Join-Path $env:USERPROFILE "anaconda3\envs\nabport\python.exe"
if (!(Test-Path $Python)) {
    $Python = "python"
}

Write-Host "Root:   $ProjectRoot" -ForegroundColor Gray
Write-Host "Python: $Python" -ForegroundColor Gray

Write-Host "[1/2] Starting FastAPI backend on port 8000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$ProjectRoot'; & '$Python' -m uvicorn main:app --app-dir backend --host 127.0.0.1 --port 8000 --reload --reload-dir backend"

Write-Host "[2/2] Starting Next.js frontend on port 3000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$ProjectRoot'; npm run dev"

Write-Host "Site:    http://localhost:3000" -ForegroundColor Cyan
Write-Host "Backend: http://127.0.0.1:8000/health" -ForegroundColor Cyan
