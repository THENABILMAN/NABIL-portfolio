@echo off
rem Starts the FastAPI backend and Next.js frontend in separate windows.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0run_web.ps1"
