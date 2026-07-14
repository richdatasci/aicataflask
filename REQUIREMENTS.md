# AI Product Catalogue, Flask Edition

## Software Requirements Specification

| Field | Value |
| --- | --- |
| Status | POC implementation baseline |
| Version | 1.1 |
| Date | 14 July 2026 |
| Application type | Local Flask web application |
| Primary target | Managed Windows workstations |

## 1. Purpose

The application shall provide a central catalogue of reusable AI and machine-learning project foundations. It shall allow delivery teams to discover a relevant accelerator, understand its intended use and maturity, and obtain the source for local adaptation.

The Flask edition is specifically intended for environments where native compilation and Visual Studio C++ Build Tools are unavailable or prohibited.

## 2. Scope

The POC shall provide:

- A local Flask server started from PowerShell, Command Prompt or a batch file.
- Automatic opening in the user's default browser.
- The eight agreed catalogue products.
- A separate component catalogue containing six illustrative AI model cards.
- An explicit placeholder experience for model-weight selection and download.
- Search, AI and ML filtering and favourites.
- Detailed product metadata and readiness labels.
- Repository navigation, ZIP downloads and optional Git cloning.
- No Node.js, Streamlit, Rust or frontend compilation requirement.
- No application database, account system or telemetry.

Authentication, private repositories, enterprise administration, central hosting, automated product execution and distribution of real model binaries are outside the POC scope.

## 3. Business requirements

| ID | Requirement | Priority |
| --- | --- | --- |
| BR-001 | Provide one discoverable catalogue for reusable AI and ML products. | Must |
| BR-002 | Reduce duplicated discovery and setup effort. | Must |
| BR-003 | Support rapid local experimentation on restricted workstations. | Must |
| BR-004 | Explain suitability and readiness in accessible language. | Must |
| BR-005 | Avoid representing catalogue inclusion as production approval. | Must |
| BR-006 | Show how governed model components could be discovered and selected for fine-tuning. | Must |

## 4. Functional requirements

### 4.1 Application operation

| ID | Requirement | Acceptance criteria | Priority |
| --- | --- | --- | --- |
| FR-001 | The application shall start using Python from a terminal. | Running `python app.py` starts the local service. | Must |
| FR-002 | The application shall open the default browser automatically. | The catalogue opens at the configured loopback URL after startup. | Must |
| FR-003 | The application shall bind to `127.0.0.1` by default. | It is not exposed to other network devices. | Must |
| FR-004 | The application shall run without debug mode. | The interactive Flask debugger is not enabled. | Must |
| FR-005 | The application shall stop when the terminal process is terminated. | `CTRL+C` stops the server. | Must |
| FR-006 | The user shall be able to suppress automatic browser launch. | `--no-browser` starts the server only. | Should |
| FR-007 | The user shall be able to select a local port. | `--port` changes the listening port. | Should |

### 4.2 Catalogue discovery

| ID | Requirement | Acceptance criteria | Priority |
| --- | --- | --- | --- |
| FR-010 | All configured products shall be displayed with no active constraint. | Eight baseline products are available. | Must |
| FR-011 | Each card shall show title, purpose, category and readiness. | The user can compare products without opening details. | Must |
| FR-012 | Product cards shall open a detailed view. | The selected product's complete metadata is displayed. | Must |
| FR-013 | The card grid shall respond to browser width. | Cards reflow without a frontend rebuild. | Must |
| FR-014 | The catalogue shall provide a clear no-results state. | A helpful message replaces an empty grid. | Must |

### 4.3 Search and filters

| ID | Requirement | Acceptance criteria | Priority |
| --- | --- | --- | --- |
| FR-020 | Search shall match title, strapline, summary, categories, capabilities, inputs and stack. | Relevant metadata terms return the correct products. | Must |
| FR-021 | Search shall be case-insensitive and update as the user types. | No submit action is required. | Must |
| FR-022 | Every configured AI or ML category shall be filterable. | Selecting a category displays only assigned products. | Must |
| FR-023 | Search, category and favourites constraints shall combine. | Results satisfy every active constraint. | Must |
| FR-024 | The current result count shall be displayed. | The count updates after every state change. | Must |
| FR-025 | Search and filters shall be resettable. | The user can restore the complete catalogue in one action. | Must |

### 4.4 Favourites

| ID | Requirement | Acceptance criteria | Priority |
| --- | --- | --- | --- |
| FR-030 | Products shall be addable to and removable from favourites. | Favourite controls update without reloading the page. | Should |
| FR-031 | A favourites-only view shall be available. | Only marked products are shown. | Should |
| FR-032 | Favourites shall persist in the current browser profile. | Reloading the local page retains the list through local storage. | Should |

### 4.5 Product details and source access

| ID | Requirement | Acceptance criteria | Priority |
| --- | --- | --- | --- |
| FR-040 | Details shall include summary, readiness, capabilities, expected data and technology. | Every configured field is available. | Must |
| FR-041 | The repository shall open in a new browser tab. | The configured GitHub URL is used. | Must |
| FR-042 | The repository URL shall be copyable. | The exact URL is written to the clipboard. | Should |
| FR-043 | A ZIP download action shall work without Git. | The browser opens the configured branch archive. | Must |

### 4.6 Clone workflow

| ID | Requirement | Acceptance criteria | Priority |
| --- | --- | --- | --- |
| FR-050 | Git cloning shall be initiated by an explicit user action. | No repository is cloned during startup or browsing. | Must |
| FR-051 | The destination parent shall default to the user's Documents directory. | The calculated destination is shown before cloning. | Must |
| FR-052 | The parent shall be configurable through `AI_CATALOGUE_DOWNLOAD_DIR`. | Restarting with the variable changes the controlled destination. | Should |
| FR-053 | Product ID and server configuration shall determine the final target. | The browser does not provide arbitrary filesystem paths. | Must |
| FR-054 | Existing target folders shall not be overwritten. | The endpoint returns a conflict and preserves the directory. | Must |
| FR-055 | Git shall be invoked with a structured argument list and `shell=False`. | No free-form shell command is constructed. | Must |
| FR-056 | The clone shall use `--depth 1`. | A shallow local repository is created. | Should |
| FR-057 | Missing Git shall produce an actionable error. | The user is directed to Download ZIP. | Must |
| FR-058 | Clone requests shall use a same-origin request token. | Requests without the current token are rejected. | Must |
| FR-059 | Clone operations shall have a timeout. | A stalled command ends after five minutes. | Must |

### 4.7 AI model components

| ID | Requirement | Acceptance criteria | Priority |
| --- | --- | --- | --- |
| FR-060 | AI model components shall appear in a section separate from ready-to-use products. | The sidebar provides distinct product and AI Model Cards navigation. | Must |
| FR-061 | The POC shall include illustrative model cards across multiple task types. | Six model cards cover language, embeddings, vision, forecasting, multimodal document processing and retrieval. | Must |
| FR-062 | Model cards shall support search and model-type filtering. | Search and category controls operate only on the selected model-card collection. | Must |
| FR-063 | Each model card shall show its title, purpose, category, parameter count and planned weight format. | The user can compare model components from the grid. | Must |
| FR-064 | Model details shall show tasks, intended uses, inputs, outputs, fine-tuning options, limitations, licence and version. | The selected card displays every configured field. | Must |
| FR-065 | A model-weight action shall be available from model details. | Selecting Download model weights opens the package placeholder. | Must |
| FR-066 | The model-weight experience shall be explicitly marked as illustrative. | The interface states that no model binary or external model link is attached. | Must |
| FR-067 | The package placeholder shall indicate the metadata expected in a governed distribution. | Configuration, model card, fine-tuning configuration, checksum, licence and validation expectations are explained. | Should |
| FR-068 | Placeholder model entries shall not expose a functional binary download. | No model-weight URL or binary download endpoint is present. | Must |

## 5. User experience requirements

| ID | Requirement | Priority |
| --- | --- | --- |
| UX-001 | The existing dark professional catalogue aesthetic shall be retained. | Must |
| UX-002 | Primary, secondary and quiet actions shall be visually distinct. | Must |
| UX-003 | The layout shall support desktop, tablet-width and narrow browser windows. | Must |
| UX-004 | Keyboard focus shall be visible. | Must |
| UX-005 | Essential meaning shall not be communicated by colour alone. | Must |
| UX-006 | Reduced-motion browser preferences shall be respected. | Should |
| UX-007 | Clone status and errors shall be communicated without blocking the page. | Must |
| UX-008 | Product and model-component areas shall remain visually related but clearly distinct. | Must |
| UX-009 | Placeholder status shall be conveyed with text as well as styling. | Must |

## 6. Security and privacy requirements

| ID | Requirement | Priority |
| --- | --- | --- |
| SEC-001 | The service shall bind to the loopback interface only. | Must |
| SEC-002 | Debug mode and the interactive debugger shall remain disabled. | Must |
| SEC-003 | Responses shall set CSP, frame, content-type and referrer headers. | Must |
| SEC-004 | The application shall not collect telemetry or personal data. | Must |
| SEC-005 | Catalogue metadata shall not contain credentials or tokens. | Must |
| SEC-006 | The clone endpoint shall accept only configured product IDs. | Must |
| SEC-007 | The application shall refuse to overwrite clone targets. | Must |
| SEC-008 | Catalogue inclusion shall not imply production approval. | Must |
| SEC-009 | Jinja automatic escaping shall remain enabled. | Must |
| SEC-010 | Placeholder model cards shall not imply ownership, approval, benchmark performance or licence rights for a real model. | Must |

## 7. Technical requirements

| ID | Requirement | Specification |
| --- | --- | --- |
| TR-001 | Language | Python 3.9 or newer. |
| TR-002 | Backend | Flask 3.1.x. |
| TR-003 | Templates | Jinja HTML templates. |
| TR-004 | Frontend | Native HTML, CSS and JavaScript with no build process. |
| TR-005 | Data source | Structured Python metadata in `catalogue.py`. |
| TR-006 | Server | Flask local development server for POC demonstration only. |
| TR-007 | Host | `127.0.0.1`. |
| TR-008 | Default port | `5050`. |
| TR-009 | Storage | Browser local storage for favourites only. |
| TR-010 | External process | Optional Git CLI for cloning. |

## 8. Non-functional requirements

| ID | Requirement | Target | Priority |
| --- | --- | --- | --- |
| NFR-001 | Local startup | Browser available within 5 seconds after dependencies are installed. | Should |
| NFR-002 | Search and filtering | Visible response within 100 milliseconds for the baseline catalogue. | Must |
| NFR-003 | Offline catalogue use | Browsing, search, filtering and details work without network access. | Must |
| NFR-004 | Maintainability | Backend, data, template, styles and interactions are separated. | Must |
| NFR-005 | Installation | Only Flask and its standard dependencies are required. | Must |
| NFR-006 | Browser support | Current Edge, Chrome and Firefox. | Should |

## 9. Testing and acceptance

The automated suite shall verify:

- Index rendering and baseline products.
- Health endpoint and product count.
- Catalogue API content.
- Model-card count, categories and explicit placeholder status.
- Rejection of missing clone request tokens.
- Rejection of unknown product IDs.

Manual acceptance shall verify:

- PowerShell and batch-file startup on a managed Windows workstation.
- Automatic browser launch.
- All product filters and search terms.
- Persistent favourites after refresh.
- Product details and responsive layouts.
- Model-card navigation, search, filters, details and placeholder package dialog.
- Repository navigation, clipboard copying and ZIP downloads.
- Successful clone when Git is available.
- Safe errors for missing Git and existing targets.
- Operation without Visual Studio C++ Build Tools.

## 10. POC definition of done

The POC is complete when:

- It starts using the documented Python commands.
- The browser opens automatically on the loopback address.
- All eight products and current metadata are present.
- All six illustrative model cards are present in a separate section.
- Search, filtering, favourites and details operate correctly.
- The model-weights action opens an explicit placeholder and never supplies a fake download.
- Direct repository and ZIP actions work.
- Clone behaviour is safe and errors are handled.
- Automated tests pass.
- The complete project contains setup instructions and this specification.
