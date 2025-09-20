import pytest
import asyncio
from fastapi.testclient import TestClient
from unittest.mock import Mock, patch, AsyncMock
import sys
import os

# Add the app directory to the path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from app.main import app


class TestAPI:
    """Test suite for the Financial AI Agent API."""
    
    @pytest.fixture
    def client(self):
        """Create a test client."""
        return TestClient(app)
    
    @pytest.fixture
    def mock_llm(self):
        """Mock LLM for testing."""
        mock = AsyncMock()
        mock.is_available = True
        mock.generate_response.return_value = "This is a test response about budgeting."
        mock.health_check.return_value = {
            "status": "healthy",
            "model": "llama3.2",
            "response_time_seconds": 0.5,
        }
        mock.get_model_info.return_value = {
            "model_name": "llama3.2",
            "is_available": True,
        }
        return mock
    
    @pytest.fixture
    def mock_rag(self):
        """Mock RAG for testing."""
        mock = AsyncMock()
        mock.search.return_value = [
            {
                "content": "Budgeting is important for financial health.",
                "metadata": {"source": "budgeting_basics.txt"},
                "distance": 0.2,
            }
        ]
        mock.get_context_for_query.return_value = "Budgeting helps you track expenses and save money."
        mock.get_collection_stats.return_value = {
            "status": "healthy",
            "total_documents": 10,
            "unique_sources": 3,
        }
        return mock
    
    @pytest.fixture
    def mock_memory(self):
        """Mock memory for testing."""
        mock = Mock()
        mock.get_recent_context.return_value = "User: Hello\nAssistant: Hi there!"
        mock.add_message = Mock()
        mock.get_conversation_history.return_value = [
            {"role": "user", "content": "Hello", "timestamp": "2025-01-01T00:00:00"},
            {"role": "assistant", "content": "Hi there!", "timestamp": "2025-01-01T00:00:01"},
        ]
        mock.delete_session.return_value = True
        mock.get_session_summary.return_value = {
            "metadata": {"created_at": "2025-01-01T00:00:00", "updated_at": "2025-01-01T00:00:01"}
        }
        return mock
    
    def test_root_endpoint(self, client):
        """Test the root endpoint."""
        response = client.get("/")
        assert response.status_code == 200
        data = response.json()
        assert "name" in data
        assert "version" in data
        assert data["name"] == "Financial AI Agent API"
    
    @patch('app.routes.get_llm')
    @patch('app.routes.get_rag')
    @patch('app.routes.get_memory')
    def test_health_endpoint(self, mock_get_memory, mock_get_rag, mock_get_llm, 
                           client, mock_llm, mock_rag, mock_memory):
        """Test the health check endpoint."""
        mock_get_llm.return_value = mock_llm
        mock_get_rag.return_value = mock_rag
        mock_get_memory.return_value = mock_memory
        
        response = client.get("/api/v1/health")
        assert response.status_code == 200
        
        data = response.json()
        assert "status" in data
        assert "version" in data
        assert "llm_status" in data
        assert "rag_status" in data
    
    @patch('app.routes.get_llm')
    @patch('app.routes.get_rag')
    @patch('app.routes.get_memory')
    def test_chat_endpoint(self, mock_get_memory, mock_get_rag, mock_get_llm,
                          client, mock_llm, mock_rag, mock_memory):
        """Test the chat endpoint."""
        mock_get_llm.return_value = mock_llm
        mock_get_rag.return_value = mock_rag
        mock_get_memory.return_value = mock_memory
        
        chat_request = {
            "message": "How do I create a budget?",
            "user_id": "test_user",
        }
        
        response = client.post("/api/v1/chat", json=chat_request)
        assert response.status_code == 200
        
        data = response.json()
        assert "message" in data
        assert "session_id" in data
        assert len(data["session_id"]) > 0
        
        # Verify mocks were called
        mock_llm.generate_response.assert_called_once()
        mock_memory.add_message.assert_called()
    
    @patch('app.routes.get_memory')
    def test_feedback_endpoint(self, mock_get_memory, client, mock_memory):
        """Test the feedback endpoint."""
        mock_get_memory.return_value = mock_memory
        
        feedback_request = {
            "session_id": "test_session_123",
            "feedback_type": "thumbs_up",
            "comment": "Great response!",
        }
        
        response = client.post("/api/v1/feedback", json=feedback_request)
        assert response.status_code == 200
        
        data = response.json()
        assert data["success"] is True
        assert "message" in data
    
    @patch('app.routes.get_memory')
    def test_get_session_endpoint(self, mock_get_memory, client, mock_memory):
        """Test getting a conversation session."""
        mock_get_memory.return_value = mock_memory
        
        response = client.get("/api/v1/sessions/test_session_123")
        assert response.status_code == 200
        
        data = response.json()
        assert "session_id" in data
        assert "messages" in data
        assert data["session_id"] == "test_session_123"
    
    @patch('app.routes.get_memory')
    def test_delete_session_endpoint(self, mock_get_memory, client, mock_memory):
        """Test deleting a conversation session."""
        mock_get_memory.return_value = mock_memory
        
        response = client.delete("/api/v1/sessions/test_session_123")
        assert response.status_code == 200
        
        data = response.json()
        assert "message" in data
        mock_memory.delete_session.assert_called_once_with("test_session_123")
    
    @patch('app.routes.get_llm')
    @patch('app.routes.get_rag')
    @patch('app.routes.get_memory')
    def test_stats_endpoint(self, mock_get_memory, mock_get_rag, mock_get_llm,
                           client, mock_llm, mock_rag, mock_memory):
        """Test the stats endpoint."""
        mock_get_llm.return_value = mock_llm
        mock_get_rag.return_value = mock_rag
        mock_get_memory.return_value = mock_memory
        
        # Add session cache mock
        mock_memory._session_cache = {"session1": [], "session2": []}
        mock_memory.max_history = 50
        
        response = client.get("/api/v1/stats")
        assert response.status_code == 200
        
        data = response.json()
        assert "rag" in data
        assert "llm" in data
        assert "memory" in data
        assert "version" in data
    
    @patch('app.routes.get_llm')
    def test_chat_endpoint_llm_unavailable(self, mock_get_llm, client):
        """Test chat endpoint when LLM is unavailable."""
        mock_llm = AsyncMock()
        mock_llm.is_available = False
        mock_get_llm.return_value = mock_llm
        
        chat_request = {
            "message": "How do I create a budget?",
        }
        
        response = client.post("/api/v1/chat", json=chat_request)
        assert response.status_code == 503
        
        data = response.json()
        assert "error" in data
    
    @patch('app.routes.get_memory')
    def test_feedback_endpoint_session_not_found(self, mock_get_memory, client):
        """Test feedback endpoint with non-existent session."""
        mock_memory = Mock()
        mock_memory.get_conversation_history.return_value = []
        mock_get_memory.return_value = mock_memory
        
        feedback_request = {
            "session_id": "non_existent_session",
            "feedback_type": "thumbs_up",
        }
        
        response = client.post("/api/v1/feedback", json=feedback_request)
        assert response.status_code == 404
    
    def test_chat_endpoint_invalid_request(self, client):
        """Test chat endpoint with invalid request data."""
        # Missing required 'message' field
        invalid_request = {
            "user_id": "test_user",
        }
        
        response = client.post("/api/v1/chat", json=invalid_request)
        assert response.status_code == 422  # Validation error


class TestModels:
    """Test Pydantic models."""
    
    def test_chat_request_model(self):
        """Test ChatRequest model validation."""
        from app.models import ChatRequest
        
        # Valid request
        valid_data = {
            "message": "How do I budget?",
            "user_id": "test_user",
        }
        request = ChatRequest(**valid_data)
        assert request.message == "How do I budget?"
        assert request.user_id == "test_user"
        assert request.session_id is None
    
    def test_chat_response_model(self):
        """Test ChatResponse model validation."""
        from app.models import ChatResponse
        
        response_data = {
            "message": "Here's how to budget...",
            "session_id": "session_123",
            "sources": ["budgeting_guide.pdf"],
            "confidence_score": 0.85,
        }
        response = ChatResponse(**response_data)
        assert response.message == "Here's how to budget..."
        assert response.session_id == "session_123"
        assert len(response.sources) == 1
    
    def test_feedback_request_model(self):
        """Test FeedbackRequest model validation."""
        from app.models import FeedbackRequest, FeedbackType
        
        feedback_data = {
            "session_id": "session_123",
            "feedback_type": "thumbs_up",
            "comment": "Great response!",
        }
        feedback = FeedbackRequest(**feedback_data)
        assert feedback.session_id == "session_123"
        assert feedback.feedback_type == FeedbackType.THUMBS_UP


if __name__ == "__main__":
    # Add pytest dependency to requirements for testing
    pytest.main([__file__, "-v"])
