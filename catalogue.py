"""Governed catalogue metadata for the local AI Product Catalogue POC."""

PRODUCTS = [
    {
        "id": "agentic-graphrag",
        "title": "Agentic GraphRAG",
        "short_name": "AG",
        "strapline": "Grounded enterprise knowledge assistant",
        "summary": (
            "A multi-agent GraphRAG and chatbot reference architecture with multimodal "
            "ingestion, hybrid retrieval, knowledge graphs, evidence tracing and "
            "faithfulness evaluation."
        ),
        "categories": ["Generative AI", "Agentic AI", "NLP"],
        "capabilities": [
            "Multi-agent orchestration",
            "Graph and vector retrieval",
            "Multimodal document ingestion",
            "Evidence and faithfulness checks",
        ],
        "data_inputs": ["Documents", "Images", "Databases", "APIs", "Audio and video"],
        "stack": ["Python", "FastAPI", "Neo4j", "Qdrant", "React", "Docker"],
        "readiness": "Advanced POC",
        "readiness_description": (
            "A substantial reference architecture. Expect configuration, integration "
            "and assurance work before production use."
        ),
        "repo_url": "https://github.com/richdatasci/agentic-graphragV2",
        "clone_url": "https://github.com/richdatasci/agentic-graphragV2.git",
        "default_branch": "master",
        "accent": "#6c63ff",
    },
    {
        "id": "3d-path-finding",
        "title": "3D Path Finding",
        "short_name": "3D",
        "strapline": "Constraint-aware route optimisation",
        "summary": (
            "An interactive 3D route-planning demonstrator that models connected "
            "lifting points, capacity constraints and route options across multiple levels."
        ),
        "categories": ["Optimisation"],
        "capabilities": [
            "3D network visualisation",
            "Shortest-path calculation",
            "Capacity-aware routing",
            "Alternative route comparison",
        ],
        "data_inputs": ["JSON coordinates", "Network connections", "Equipment constraints"],
        "stack": ["Python", "Streamlit", "Plotly", "NetworkX"],
        "readiness": "Working Demo",
        "readiness_description": (
            "A runnable demonstration that can be adapted around a new use case, "
            "network or constraint model."
        ),
        "repo_url": "https://github.com/richdatasci/3dpathfinding",
        "clone_url": "https://github.com/richdatasci/3dpathfinding.git",
        "default_branch": "main",
        "accent": "#00c9a7",
    },
    {
        "id": "histology-classification",
        "title": "Image Classification",
        "short_name": "CV",
        "strapline": "Histology image classification starter",
        "summary": (
            "A computer-vision project for classifying colorectal histology imagery. "
            "It provides a practical base for adapting an image classification workflow "
            "to a new labelled dataset."
        ),
        "categories": ["Computer vision"],
        "capabilities": [
            "Image preprocessing",
            "Supervised classification",
            "Model evaluation",
            "Domain dataset adaptation",
        ],
        "data_inputs": ["Labelled images", "Class metadata"],
        "stack": ["Python", "Jupyter", "Deep learning"],
        "readiness": "Notebook Starter",
        "readiness_description": (
            "An exploratory notebook or compact codebase intended as a starting point "
            "for a new classification experiment."
        ),
        "repo_url": "https://github.com/richdatasci/ColorectalHistologyClassification",
        "clone_url": "https://github.com/richdatasci/ColorectalHistologyClassification.git",
        "default_branch": "main",
        "accent": "#ff5b89",
    },
    {
        "id": "time-series",
        "title": "Time Series Forecasting",
        "short_name": "TS",
        "strapline": "ARMA and ARIMA forecasting workflow",
        "summary": (
            "An exploratory time-series analysis starter focused on ARMA and ARIMA "
            "methods, from inspection and stationarity through model fitting and "
            "forecast review."
        ),
        "categories": ["Forecasting"],
        "capabilities": [
            "Time-series exploration",
            "Stationarity analysis",
            "ARMA and ARIMA modelling",
            "Forecast evaluation",
        ],
        "data_inputs": ["Timestamped numeric observations", "CSV or notebook data"],
        "stack": ["Python", "Jupyter", "Statsmodels", "Pandas"],
        "readiness": "Notebook Starter",
        "readiness_description": (
            "An exploratory notebook or compact codebase intended as a starting point "
            "for a new forecasting experiment."
        ),
        "repo_url": "https://github.com/richdatasci/Time-Series-Analysis-with-ARMA-ARIMA",
        "clone_url": "https://github.com/richdatasci/Time-Series-Analysis-with-ARMA-ARIMA.git",
        "default_branch": "main",
        "accent": "#f4ab41",
    },
    {
        "id": "geospatial-mapping",
        "title": "Geospatial Mapping",
        "short_name": "GEO",
        "strapline": "Interactive spatial analysis and mapping",
        "summary": (
            "A geospatial visualisation starter for exploring location data and "
            "producing interactive Plotly and Mapbox maps that can be adapted to "
            "operational datasets."
        ),
        "categories": ["Geospatial"],
        "capabilities": [
            "Interactive mapping",
            "Spatial data exploration",
            "Layered visualisation",
            "Map-based storytelling",
        ],
        "data_inputs": ["Latitude and longitude", "GeoJSON", "Tabular location data"],
        "stack": ["Python", "Jupyter", "Plotly", "Mapbox"],
        "readiness": "Notebook Starter",
        "readiness_description": (
            "An exploratory notebook or compact codebase intended as a starting point "
            "for a new mapping or spatial-analysis use case."
        ),
        "repo_url": "https://github.com/richdatasci/Geospatial-Plotly-and-MapBox",
        "clone_url": "https://github.com/richdatasci/Geospatial-Plotly-and-MapBox.git",
        "default_branch": "main",
        "accent": "#22aeff",
    },
    {
        "id": "sentiment-analysis",
        "title": "Sentiment Analysis",
        "short_name": "NLP",
        "strapline": "Conversational text insight dashboard",
        "summary": (
            "A compact WhatsApp chat analysis application that preprocesses exported "
            "conversations and surfaces language, participation and sentiment-oriented insights."
        ),
        "categories": ["NLP"],
        "capabilities": [
            "Chat preprocessing",
            "Text analytics",
            "Participation insights",
            "Sentiment-oriented analysis",
        ],
        "data_inputs": ["Exported WhatsApp chat text"],
        "stack": ["Python", "Streamlit", "NLP"],
        "readiness": "Working Demo",
        "readiness_description": (
            "A runnable demonstration that can be adapted around a new conversational "
            "dataset or text-analysis use case."
        ),
        "repo_url": "https://github.com/richdatasci/WhatsApp-Chat-Analysis-App---Heroku",
        "clone_url": "https://github.com/richdatasci/WhatsApp-Chat-Analysis-App---Heroku.git",
        "default_branch": "main",
        "accent": "#3dd675",
    },
    {
        "id": "customer-segmentation",
        "title": "Customer Segmentation",
        "short_name": "SEG",
        "strapline": "Behavioural clustering starter",
        "summary": (
            "An exploratory customer segmentation notebook for grouping records into "
            "interpretable clusters and profiling the resulting audience or service-user segments."
        ),
        "categories": ["Clustering"],
        "capabilities": [
            "Feature exploration",
            "Unsupervised clustering",
            "Segment profiling",
            "Visual interpretation",
        ],
        "data_inputs": ["Customer or user attributes", "Behavioural metrics"],
        "stack": ["Python", "Jupyter", "Scikit-learn", "Pandas"],
        "readiness": "Notebook Starter",
        "readiness_description": (
            "An exploratory notebook or compact codebase intended as a starting point "
            "for a new clustering and profiling exercise."
        ),
        "repo_url": "https://github.com/richdatasci/Customer-Segmentation",
        "clone_url": "https://github.com/richdatasci/Customer-Segmentation.git",
        "default_branch": "main",
        "accent": "#b16cff",
    },
    {
        "id": "ocr",
        "title": "Optical Character Recognition",
        "short_name": "OCR",
        "strapline": "Extract usable text from images",
        "summary": (
            "A Flask-based OCR demonstrator that accepts image inputs and extracts text, "
            "providing a starting point for scanned documents, forms or image-led workflows."
        ),
        "categories": ["Computer vision", "NLP"],
        "capabilities": [
            "Image upload workflow",
            "Text extraction",
            "Web application shell",
            "Document workflow integration",
        ],
        "data_inputs": ["Scans", "Photographs", "Image-based documents"],
        "stack": ["Python", "Flask", "OCR", "HTML and CSS"],
        "readiness": "Working Demo",
        "readiness_description": (
            "A runnable demonstration that can be adapted around a new document type "
            "or text-extraction workflow."
        ),
        "repo_url": "https://github.com/richdatasci/Optical-Character-Recognition-Flask-App",
        "clone_url": "https://github.com/richdatasci/Optical-Character-Recognition-Flask-App.git",
        "default_branch": "main",
        "accent": "#26c6da",
    },
]

PRODUCTS_BY_ID = {product["id"]: product for product in PRODUCTS}
CATEGORIES = sorted({category for product in PRODUCTS for category in product["categories"]})

