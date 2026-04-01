@echo off
color 0B
echo =========================================
echo    Starting Bulk LinkedIn Agent...
echo =========================================
echo.

cd /d "%~dp0"

if not exist ".\venv\Scripts\python.exe" (
    color 0C
    echo Error: Python virtual environment not found. Wait for the background installation to finish!
    pause
    exit /b
)

.\venv\Scripts\python.exe bulk_agent.py

echo.
echo =========================================
echo    Agent has finished executing.
echo =========================================
pause
