@echo off
color 0A
echo =========================================
echo    Starting your LinkedIn AI Agent...
echo =========================================
echo.

:: Securely change to the script's directory
cd /d "%~dp0"

:: Check if virtual environment exists
if not exist ".\venv\Scripts\python.exe" (
    color 0C
    echo Error: Python virtual environment not found. Wait for the background installation to finish!
    pause
    exit /b
)

:: Run the script
.\venv\Scripts\python.exe agent.py

echo.
echo =========================================
echo    Agent has finished executing.
echo =========================================
pause
