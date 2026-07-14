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


# These model cards are deliberately illustrative. They demonstrate the governed
# metadata and download experience without claiming that model weights exist.
MODEL_CARDS = [
    {
        "id": "enterprise-language-model-7b",
        "title": "Enterprise Language Model 7B",
        "short_name": "LLM",
        "strapline": "Adaptable text generation and reasoning component",
        "summary": (
            "An illustrative language-model component for demonstrating how teams could "
            "compare intended use, fine-tuning options, limitations and downloadable weights."
        ),
        "categories": ["Language models"],
        "tasks": ["Question answering", "Summarisation", "Instruction following"],
        "parameter_count": "7B",
        "input_profile": "Text, illustrative 8K-token context",
        "output_profile": "Generated text",
        "weight_formats": ["SafeTensors", "GGUF"],
        "fine_tuning": ["LoRA", "QLoRA", "Supervised fine-tuning"],
        "intended_uses": [
            "Domain-specific assistants",
            "Controlled document summarisation",
            "Instruction-following experiments",
        ],
        "limitations": [
            "No real model or benchmark is attached to this POC entry.",
            "Production use would require safety, bias and domain evaluation.",
            "Generated answers would require grounding and verification controls.",
        ],
        "licence": "To be confirmed by catalogue owner",
        "version": "Demo placeholder 1.0",
        "weights_available": False,
        "accent": "#7c72ff",
    },
    {
        "id": "semantic-embedding-model",
        "title": "Semantic Embedding Model",
        "short_name": "EMB",
        "strapline": "Dense representations for search and retrieval",
        "summary": (
            "An illustrative embedding component for semantic search, clustering and "
            "retrieval experiments over organisation-specific text."
        ),
        "categories": ["Embeddings"],
        "tasks": ["Semantic search", "Clustering", "Retrieval"],
        "parameter_count": "335M",
        "input_profile": "Text, illustrative 512-token input",
        "output_profile": "1024-dimensional vector",
        "weight_formats": ["SafeTensors", "ONNX"],
        "fine_tuning": ["Contrastive learning", "Domain-pair tuning", "Hard-negative mining"],
        "intended_uses": [
            "Vector-search prototypes",
            "Document similarity",
            "Domain-specific retrieval evaluation",
        ],
        "limitations": [
            "No real embedding model or evaluation score is attached.",
            "Vector quality would need testing on representative domain queries.",
            "Embedding storage and source permissions require separate design."
        ],
        "licence": "To be confirmed by catalogue owner",
        "version": "Demo placeholder 1.0",
        "weights_available": False,
        "accent": "#22aeff",
    },
    {
        "id": "vision-encoder-base",
        "title": "Vision Encoder Base",
        "short_name": "VIS",
        "strapline": "Reusable visual feature and classification backbone",
        "summary": (
            "An illustrative vision component that could be fine-tuned for image "
            "classification, visual similarity or domain-specific feature extraction."
        ),
        "categories": ["Computer vision"],
        "tasks": ["Image classification", "Feature extraction", "Visual similarity"],
        "parameter_count": "300M",
        "input_profile": "RGB image, illustrative 224 by 224 pixels",
        "output_profile": "Class scores or visual embeddings",
        "weight_formats": ["SafeTensors", "ONNX"],
        "fine_tuning": ["Linear probing", "Full fine-tuning", "Adapter tuning"],
        "intended_uses": [
            "Domain image classification",
            "Visual quality inspection",
            "Image-similarity experiments",
        ],
        "limitations": [
            "No real image encoder, training dataset or benchmark is attached.",
            "Performance may vary substantially across image domains.",
            "Representative data and class-balance assessment would be required."
        ],
        "licence": "To be confirmed by catalogue owner",
        "version": "Demo placeholder 1.0",
        "weights_available": False,
        "accent": "#ff5b89",
    },
    {
        "id": "time-series-foundation-model",
        "title": "Time-Series Foundation Model",
        "short_name": "TSF",
        "strapline": "General forecasting component for sequential data",
        "summary": (
            "An illustrative forecasting component for demonstrating zero-shot baselines "
            "and fine-tuning against operational time-series data."
        ),
        "categories": ["Forecasting"],
        "tasks": ["Forecasting", "Anomaly detection", "Representation learning"],
        "parameter_count": "200M",
        "input_profile": "Numeric sequences, illustrative 512-step context",
        "output_profile": "Point or probabilistic forecasts",
        "weight_formats": ["SafeTensors", "ONNX"],
        "fine_tuning": ["Full fine-tuning", "Linear head", "Domain adaptation"],
        "intended_uses": [
            "Demand forecasting experiments",
            "Sensor-data baselines",
            "Operational anomaly exploration",
        ],
        "limitations": [
            "No real model, training data or forecast benchmark is attached.",
            "Seasonality, missing values and data leakage require use-case testing.",
            "Forecast uncertainty would need explicit evaluation."
        ],
        "licence": "To be confirmed by catalogue owner",
        "version": "Demo placeholder 1.0",
        "weights_available": False,
        "accent": "#f4ab41",
    },
    {
        "id": "document-vision-language-model",
        "title": "Document Vision-Language Model",
        "short_name": "VLM",
        "strapline": "Multimodal understanding for complex documents",
        "summary": (
            "An illustrative multimodal component for scanned documents, diagrams, "
            "forms and document question-answering experiments."
        ),
        "categories": ["Multimodal", "OCR"],
        "tasks": ["Document understanding", "OCR", "Visual question answering"],
        "parameter_count": "3B",
        "input_profile": "Image or document page with text prompt",
        "output_profile": "Extracted or generated text",
        "weight_formats": ["SafeTensors", "GGUF"],
        "fine_tuning": ["LoRA", "Instruction tuning", "Document-layout adaptation"],
        "intended_uses": [
            "Form and table extraction experiments",
            "Diagram understanding",
            "Scanned-document question answering",
        ],
        "limitations": [
            "No real multimodal model or OCR benchmark is attached.",
            "Small text, complex layouts and handwriting may reduce accuracy.",
            "Sensitive documents would require controlled local processing."
        ],
        "licence": "To be confirmed by catalogue owner",
        "version": "Demo placeholder 1.0",
        "weights_available": False,
        "accent": "#26c6da",
    },
    {
        "id": "cross-encoder-reranker",
        "title": "Cross-Encoder Reranker",
        "short_name": "RER",
        "strapline": "Relevance scoring for higher-quality retrieval",
        "summary": (
            "An illustrative reranking component for improving the ordering of search, "
            "RAG and evidence-retrieval results."
        ),
        "categories": ["Retrieval"],
        "tasks": ["Reranking", "Relevance scoring", "Retrieval evaluation"],
        "parameter_count": "110M",
        "input_profile": "Query and candidate passage pair",
        "output_profile": "Relevance score",
        "weight_formats": ["SafeTensors", "ONNX"],
        "fine_tuning": ["Pairwise ranking", "Hard-negative tuning", "Domain relevance tuning"],
        "intended_uses": [
            "RAG retrieval improvement",
            "Search result reranking",
            "Evidence-prioritisation experiments",
        ],
        "limitations": [
            "No real reranker or relevance benchmark is attached.",
            "Cross-encoding increases latency for large candidate sets.",
            "Domain-specific relevance labels would be required for validation."
        ],
        "licence": "To be confirmed by catalogue owner",
        "version": "Demo placeholder 1.0",
        "weights_available": False,
        "accent": "#b16cff",
    },
]

MODEL_CARDS_BY_ID = {model["id"]: model for model in MODEL_CARDS}
MODEL_CATEGORIES = sorted(
    {category for model in MODEL_CARDS for category in model["categories"]}
)
