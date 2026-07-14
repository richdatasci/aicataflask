$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$venvPython = Join-Path $PSScriptRoot ".venv\Scripts\python.exe"

if (-not (Test-Path $venvPython)) {
    Write-Host "Creating the local Python environment..." -ForegroundColor Cyan
    if (Get-Command py -ErrorAction SilentlyContinue) {
        & py -3 -m venv .venv
    }
    elseif (Get-Command python -ErrorAction SilentlyContinue) {
        & python -m venv .venv
    }
    else {
        throw "Python was not found. Install Python 3.9 or newer and try again."
    }
}

Write-Host "Installing or checking the small Flask dependency..." -ForegroundColor Cyan
& $venvPython -m pip install --disable-pip-version-check -r requirements.txt

Write-Host "Starting the AI Product Catalogue..." -ForegroundColor Green
& $venvPython app.py

