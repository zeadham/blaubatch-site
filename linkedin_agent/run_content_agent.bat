@echo off
color 0E
echo =========================================
echo    Starting Content Engine Agent...
echo =========================================
echo.

cd /d "%~dp0"

if not exist ".\venv\Scripts\python.exe" (
    color 0C
    echo Error: Python virtual environment not found. Wait for the background installation to finish!
    pause
    exit /b
)

.\venv\Scripts\python.exe content_agent.py

echo.
echo =========================================
echo    Agent has finished executing.
echo =========================================
pause
