@echo off
rem One-click start for the Blau Batch Lead Dashboard (Windows).
rem First run: creates a virtual environment, installs everything, and opens
rem .env so you can paste your Gemini key. Later runs just start the app.
setlocal
cd /d "%~dp0"

python --version >nul 2>&1
if errorlevel 1 goto :no_python

if exist ".venv\Scripts\python.exe" goto :install
echo Creating the Python environment (first run only)...
python -m venv .venv
if errorlevel 1 goto :failed

:install
call ".venv\Scripts\activate.bat"
echo Checking dependencies...
python -m pip install --quiet --disable-pip-version-check -r requirements.txt
if errorlevel 1 goto :failed
python -m playwright install chromium
if errorlevel 1 goto :failed

if exist ".env" goto :check_key
copy ".env.example" ".env" >nul
echo.
echo Notepad will open your settings file.
echo Paste your Gemini key after GEMINI_API_KEY= then save and close Notepad.
echo Get a free key at https://aistudio.google.com/app/apikey
echo.
pause
start /wait notepad ".env"

:check_key
findstr /r /c:"^GEMINI_API_KEY=..*" ".env" >nul
if errorlevel 1 echo WARNING: GEMINI_API_KEY is empty in .env - Dispatch will fail until you add it.

echo.
echo Starting the dashboard at http://127.0.0.1:8000
echo Keep this window open while you use it. Close it to stop the dashboard.
echo.
start "" cmd /c "timeout /t 4 >nul & start http://127.0.0.1:8000"
python run.py
pause
exit /b 0

:no_python
echo Python was not found. Install Python 3.10 or newer from https://www.python.org/downloads/
echo and tick "Add Python to PATH" during setup. Then run this file again.
pause
exit /b 1

:failed
echo.
echo Setup failed. Scroll up for the error message, and send it to Claude.
pause
exit /b 1
