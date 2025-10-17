from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging
import os
from contextlib import asynccontextmanager
from dotenv import load_dotenv

from .routes import router
from .chatbot.llm import initialize_llm
from .chatbot.rag import get_rag
from .chatbot.memory import get_memory

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events."""
    # Startup
    logger.info("Starting Financial AI Agent API...")
    
    try:
        # Initialize LLM
        llm_ready = await initialize_llm()
        if llm_ready:
            logger.info("✅ LLM initialized successfully")
        else:
            logger.warning("⚠️ LLM initialization failed - running in limited mode")
        
        # Initialize RAG
        rag = await get_rag()
        if rag:
            logger.info("✅ RAG pipeline initialized successfully")
        else:
            logger.warning("⚠️ RAG initialization failed")
        
        # Initialize Memory
        memory = get_memory()
        logger.info("✅ Memory system initialized successfully")
        
        # Clean up old sessions (older than 30 days)
        cleaned = memory.cleanup_old_sessions(30)
        if cleaned > 0:
            logger.info(f"🧹 Cleaned up {cleaned} old sessions")
        
        logger.info("🚀 Financial AI Agent API is ready!")
        
    except Exception as e:
        logger.error(f"❌ Startup failed: {str(e)}")
        # Don't raise - allow the app to start in degraded mode
    
    yield
    
    # Shutdown
    logger.info("Shutting down Financial AI Agent API...")


# Create FastAPI app with lifespan
app = FastAPI(
    title="Financial AI Agent API",
    description="AI-powered financial literacy chatbot with RAG capabilities",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(router, prefix="/api/v1")


@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    """Global HTTP exception handler."""
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": {
                "message": exc.detail,
                "status_code": exc.status_code,
            }
        },
    )


@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    """Global exception handler for unhandled exceptions."""
    logger.error(f"Unhandled exception: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "error": {
                "message": "An internal server error occurred",
                "status_code": 500,
            }
        },
    )


if __name__ == "__main__":
    import uvicorn
    
    port = int(os.getenv("AGENT_PORT", 8001))
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=port,
        reload=True,
        log_level="info",
    )
