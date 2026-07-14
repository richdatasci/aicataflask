import tempfile
import unittest
from pathlib import Path

from app import create_app


class CatalogueAppTests(unittest.TestCase):
    def setUp(self):
        self.temp_directory = tempfile.TemporaryDirectory()
        self.app = create_app(
            {
                "TESTING": True,
                "CSRF_TOKEN": "test-token",
                "CLONE_ROOT": Path(self.temp_directory.name),
            }
        )
        self.client = self.app.test_client()

    def tearDown(self):
        self.temp_directory.cleanup()

    def test_index_contains_catalogue_shell_and_products(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"AI PRODUCT CATALOGUE", response.data)
        self.assertIn(b"/static/js/app.js", response.data)
        self.assertIn(b"8 PRODUCTS", response.data)
        self.assertIn(b"6 MODEL CARDS", response.data)
        self.assertIn(b"AI model cards", response.data)

    def test_health_reports_product_count(self):
        response = self.client.get("/api/health")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.get_json(),
            {"model_card_count": 6, "product_count": 8, "status": "ok"},
        )

    def test_catalogue_api_returns_all_products(self):
        response = self.client.get("/api/catalogue")
        payload = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(payload["products"]), 8)
        self.assertEqual(len(payload["model_cards"]), 6)
        self.assertIn("NLP", payload["product_categories"])
        self.assertIn("Language models", payload["model_categories"])

    def test_model_cards_are_explicit_placeholders(self):
        payload = self.client.get("/api/catalogue").get_json()
        for model_card in payload["model_cards"]:
            self.assertFalse(model_card["weights_available"])
            self.assertIn("placeholder", model_card["version"].lower())

    def test_static_assets_are_served(self):
        stylesheet = self.client.get("/static/css/styles.css")
        script = self.client.get("/static/js/app.js")
        try:
            self.assertEqual(stylesheet.status_code, 200)
            self.assertEqual(script.status_code, 200)
            self.assertIn(b".product-grid", stylesheet.data)
            self.assertIn(b"function renderCatalogue", script.data)
            self.assertIn(b"function renderModelDetails", script.data)
        finally:
            stylesheet.close()
            script.close()

    def test_security_headers_are_present(self):
        response = self.client.get("/")
        self.assertEqual(response.headers["X-Frame-Options"], "DENY")
        self.assertEqual(response.headers["X-Content-Type-Options"], "nosniff")
        self.assertIn("default-src 'self'", response.headers["Content-Security-Policy"])

    def test_clone_rejects_missing_csrf_token(self):
        response = self.client.post(
            "/api/clone",
            json={"product_id": "agentic-graphrag"},
        )
        self.assertEqual(response.status_code, 403)

    def test_clone_rejects_unknown_product(self):
        response = self.client.post(
            "/api/clone",
            json={"product_id": "unknown-product"},
            headers={"X-CSRF-Token": "test-token"},
        )
        self.assertEqual(response.status_code, 404)


if __name__ == "__main__":
    unittest.main()
