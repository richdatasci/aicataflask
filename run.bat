@echo off
setlocal
cd /d "%~dp0"

if not exist ".venv\Scripts\python.exe" (
    echo Creating the local Python environment...
    where py >nul 2>nul
    if not errorlevel 1 (
        py -3 -m venv .venv
    ) else (
        python -m venv .venv
    )
    if errorlevel 1 goto :error
)

echo Installing or checking the small Flask dependency...
".venv\Scripts\python.exe" -m pip install --disable-pip-version-check -r requirements.txt
if errorlevel 1 goto :error

echo Starting the AI Product Catalogue...
".venv\Scripts\python.exe" app.py
goto :eof

:error
echo.
echo The catalogue could not be started. Review the error above.
pause
exit /b 1
