"""Local Flask entry point for the AI Product Catalogue POC."""

from __future__ import annotations

import argparse
import os
import secrets
import subprocess
import threading
import webbrowser
from pathlib import Path
from typing import Optional

from flask import Flask, jsonify, render_template, request

from catalogue import CATEGORIES, PRODUCTS, PRODUCTS_BY_ID


BASE_DIR = Path(__file__).resolve().parent
DEFAULT_CLONE_ROOT = Path(
    os.environ.get(
        "AI_CATALOGUE_DOWNLOAD_DIR",
        str(Path.home() / "Documents" / "AI-Products"),
    )
).expanduser()


def create_app(test_config: Optional[dict] = None) -> Flask:
    app = Flask(__name__)
    app.config.from_mapping(
        CLONE_ROOT=DEFAULT_CLONE_ROOT,
        CSRF_TOKEN=secrets.token_urlsafe(32),
        JSON_SORT_KEYS=False,
        MAX_CONTENT_LENGTH=16 * 1024,
    )
    if test_config:
        app.config.update(test_config)

    clone_lock = threading.Lock()

    @app.after_request
    def add_security_headers(response):
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; "
            "script-src 'self'; "
            "style-src 'self'; "
            "img-src 'self' data:; "
            "connect-src 'self'; "
            "font-src 'self'; "
            "object-src 'none'; "
            "base-uri 'none'; "
            "frame-ancestors 'none'"
        )
        response.headers["Referrer-Policy"] = "no-referrer"
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["Cache-Control"] = "no-store"
        return response

    @app.get("/")
    def index():
        clone_root = Path(app.config["CLONE_ROOT"]).expanduser().resolve()
        return render_template(
            "index.html",
            products=PRODUCTS,
            categories=CATEGORIES,
            clone_root=str(clone_root),
            csrf_token=app.config["CSRF_TOKEN"],
        )

    @app.get("/api/health")
    def health():
        return jsonify(status="ok", product_count=len(PRODUCTS))

    @app.get("/api/catalogue")
    def catalogue():
        return jsonify(products=PRODUCTS, categories=CATEGORIES)

    @app.post("/api/clone")
    def clone_product():
        if request.headers.get("X-CSRF-Token") != app.config["CSRF_TOKEN"]:
            return jsonify(error="The request could not be verified. Refresh the page and try again."), 403

        payload = request.get_json(silent=True) or {}
        product_id = payload.get("product_id")
        product = PRODUCTS_BY_ID.get(product_id)
        if product is None:
            return jsonify(error="Unknown catalogue product."), 404

        clone_root = Path(app.config["CLONE_ROOT"]).expanduser().resolve()
        target = clone_root / product["id"]

        with clone_lock:
            if target.exists():
                return (
                    jsonify(
                        error="The product folder already exists.",
                        target=str(target),
                    ),
                    409,
                )

            try:
                clone_root.mkdir(parents=True, exist_ok=True)
            except OSError as error:
                return (
                    jsonify(
                        error=f"The destination folder could not be created: {error}",
                        target=str(clone_root),
                    ),
                    500,
                )

            try:
                result = subprocess.run(
                    [
                        "git",
                        "clone",
                        "--depth",
                        "1",
                        product["clone_url"],
                        str(target),
                    ],
                    capture_output=True,
                    text=True,
                    timeout=300,
                    check=False,
                    shell=False,
                )
            except FileNotFoundError:
                return (
                    jsonify(
                        error=(
                            "Git could not be found. Install Git or use the Download ZIP "
                            "action instead."
                        )
                    ),
                    503,
                )
            except subprocess.TimeoutExpired:
                return jsonify(error="The clone operation exceeded the five-minute limit."), 504
            except OSError as error:
                return jsonify(error=f"Git could not be started: {error}"), 500

            if result.returncode != 0:
                diagnostic = (result.stderr or result.stdout or "Git clone failed.").strip()
                return jsonify(error=diagnostic), 502

        return (
            jsonify(
                status="cloned",
                product=product["title"],
                target=str(target),
            ),
            201,
        )

    return app


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run the local AI Product Catalogue.")
    parser.add_argument("--port", type=int, default=5050, help="Local port. Default: 5050")
    parser.add_argument(
        "--no-browser",
        action="store_true",
        help="Start the server without opening the default browser.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    app = create_app()
    url = f"http://127.0.0.1:{args.port}"

    if not args.no_browser:
        threading.Timer(0.8, lambda: webbrowser.open(url)).start()

    print("AI Product Catalogue")
    print(f"Running locally at {url}")
    print("Press CTRL+C to stop.")
    app.run(
        host="127.0.0.1",
        port=args.port,
        debug=False,
        use_reloader=False,
        threaded=True,
    )


if __name__ == "__main__":
    main()
