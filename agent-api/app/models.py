from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum


class MessageRole(str, Enum):
    USER = "user"
    ASSISTANT = "assistant"
    SYSTEM = "system"


class ChatMessage(BaseModel):
    role: MessageRole
    content: str
    timestamp: Optional[datetime] = Field(default_factory=datetime.now)
    metadata: Optional[Dict[str, Any]] = None


class ChatRequest(BaseModel):
    message: str = Field(..., description="User message to send to the AI agent")
    session_id: Optional[str] = Field(None, description="Session ID for conversation context")
    user_id: Optional[str] = Field(None, description="User ID for personalization")
    context: Optional[Dict[str, Any]] = Field(None, description="Additional context from the app")


class ChatResponse(BaseModel):
    message: str = Field(..., description="AI agent response")
    session_id: str = Field(..., description="Session ID for conversation tracking")
    sources: Optional[List[str]] = Field(None, description="Sources used for RAG context")
    confidence_score: Optional[float] = Field(None, description="Confidence score of the response")
    suggestions: Optional[List[str]] = Field(None, description="Suggested follow-up questions")


class FeedbackType(str, Enum):
    THUMBS_UP = "thumbs_up"
    THUMBS_DOWN = "thumbs_down"
    REPORT = "report"


class FeedbackRequest(BaseModel):
    session_id: str = Field(..., description="Session ID of the conversation")
    message_id: Optional[str] = Field(None, description="Specific message ID being rated")
    feedback_type: FeedbackType = Field(..., description="Type of feedback")
    comment: Optional[str] = Field(None, description="Optional comment about the feedback")
    user_id: Optional[str] = Field(None, description="User providing feedback")


class FeedbackResponse(BaseModel):
    success: bool = Field(..., description="Whether feedback was recorded successfully")
    message: str = Field(..., description="Response message")


class HealthResponse(BaseModel):
    status: str = Field(..., description="API health status")
    version: str = Field(..., description="API version")
    llm_status: str = Field(..., description="Local LLM connection status")
    rag_status: str = Field(..., description="RAG system status")


class ConversationHistory(BaseModel):
    session_id: str
    messages: List[ChatMessage]
    created_at: datetime
    updated_at: datetime
    user_id: Optional[str] = None


class DocumentMetadata(BaseModel):
    filename: str
    source_type: str
    uploaded_at: datetime
    processed: bool = False
    chunk_count: Optional[int] = None


class RAGDocument(BaseModel):
    content: str
    metadata: DocumentMetadata
    embedding_vector: Optional[List[float]] = None
