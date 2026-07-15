# AI Product Catalogue, Flask Edition

A polished local Flask application for discovering reusable AI products and exploring illustrative AI model components for fine-tuning workflows.

It runs from PowerShell and opens in the default browser. It does not require Rust, Node.js, Streamlit, Visual Studio or Microsoft C++ Build Tools.

## Included experience

- Eight preconfigured AI and ML products
- A separate AI Model Cards section with six illustrative model components
- Model task, input, output, limitation, licence and fine-tuning metadata
- An explicit model-weights package placeholder with no fake binary or external link
- Professional responsive dark interface
- Live search across product metadata
- AI and ML type filters with counts
- Persistent browser favourites
- Product readiness, capabilities, expected data and technology details
- Direct GitHub links and copy-to-clipboard
- A live Demo Product link for 3D Path Finding
- Download ZIP option that does not require Git
- Optional safe local Git clone
- Automatic browser launch
- Local-only server bound to `127.0.0.1`
- No database, accounts, telemetry or frontend build process

## Fastest Windows start

Extract the project, open PowerShell in this directory, then run:

```powershell
.\run.ps1
```

If PowerShell script execution is restricted, double-click `run.bat` or use the manual commands below.

## Manual Windows start without activating a virtual environment

These commands avoid PowerShell activation-policy problems:

```powershell
py -3 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe app.py
```

The catalogue opens automatically at:

```text
http://127.0.0.1:5050
```

Press `CTRL+C` in the terminal to stop it.

## Requirements

- Python 3.9 or newer
- Permission to install the Flask Python package in a local virtual environment
- A modern version of Edge, Chrome or Firefox
- Git only if using the Clone Repository action
- Network access to GitHub only when opening, downloading or cloning a product

Flask and its normal dependencies install inside `.venv`. They do not require the Visual Studio C++ Build Tools for this application.

## Run on another port

```powershell
.\.venv\Scripts\python.exe app.py --port 5051
```

## Start without opening the browser

```powershell
.\.venv\Scripts\python.exe app.py --no-browser
```

## Change the clone destination

The default clone directory is:

```text
%USERPROFILE%\Documents\AI-Products
```

Set a different parent directory before starting the application:

```powershell
$env:AI_CATALOGUE_DOWNLOAD_DIR = "C:\Users\your.name\Projects\AI-Products"
.\.venv\Scripts\python.exe app.py
```

The browser cannot supply arbitrary filesystem paths. This restriction is intentional. The backend derives each product target from the controlled parent directory and product ID, refuses to overwrite existing folders, and invokes Git without a shell.

## Run tests

```powershell
.\.venv\Scripts\python.exe -m unittest discover -s tests -v
```

## Project structure

```text
ai-product-catalogue-flask/
├── app.py
├── catalogue.py
├── requirements.txt
├── run.ps1
├── run.bat
├── README.md
├── REQUIREMENTS.md
├── static/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── app.js
├── templates/
│   └── index.html
└── tests/
    └── test_app.py
```

## Catalogue updates

Edit `catalogue.py` to add or update ready-to-use products and model cards. Every product contains:

- Stable ID
- Title and visual short name
- Strapline and summary
- AI or ML categories
- Core capabilities
- Expected data inputs
- Technology stack
- Readiness and explanation
- Repository URL, clone URL and default branch
- Optional live demonstration URL
- Interface accent colour

Every illustrative model card contains:

- Stable ID, title and visual short name
- Model category, supported tasks and intended uses
- Illustrative parameter count, inputs and outputs
- Fine-tuning options and planned weight formats
- Limitations, licence placeholder and version
- Explicit weight-availability status

The current model-card entries are generated examples for demonstrating the interface. Selecting Download model weights opens an illustrative package preview. It does not download a binary or imply that an approved model exists.

## POC boundary

Catalogue inclusion does not mean a repository or model is approved for production or sensitive data. Review licensing, dependencies, security, data handling, model risks, accessibility and deployment architecture before using any accelerator or model component with client data.
