# This file is kept for backward compatibility with Docker
# The main application is now in app/main.py

from app.main import app

# Re-export the app for uvicorn
__all__ = ["app"]