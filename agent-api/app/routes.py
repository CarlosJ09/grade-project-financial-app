from fastapi import APIRouter, HTTPException, BackgroundTasks
from typing import Dict, Any, Optional
import logging
import uuid
from datetime import datetime

from .models import (
    ChatRequest,
    ChatResponse,
    FeedbackRequest,
    FeedbackResponse,
    HealthResponse,
    ConversationHistory,
)
from .chatbot.llm import get_llm
from .chatbot.rag import get_rag
from .chatbot.memory import get_memory
from .chatbot.prompts import FinancialPromptTemplates

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/chat", response_model=ChatResponse) 
async def chat_endpoint(request: ChatRequest) -> ChatResponse:
    """Main chat endpoint for the financial AI agent."""
    try:
        # Get or create session ID
        session_id = request.session_id or str(uuid.uuid4())
        
        # Initialize components
        llm = await get_llm()
        rag = await get_rag()
        memory = get_memory()
        
        if not llm.is_available:
            raise HTTPException(
                status_code=503,
                detail="AI model is currently unavailable. Please try again later."
            )
        
        # Get conversation context
        conversation_context = memory.get_recent_context(session_id, max_messages=10)
        
        # Get RAG context
        rag_context = await rag.get_context_for_query(
            request.message,
            max_context_length=1500,
            n_results=3,
        )
        
        # Format user context (from the app)
        user_context = ""
        if request.context:
            context_parts = []
            if "user_balance" in request.context:
                context_parts.append(f"Current balance: {request.context['user_balance']}")
            if "recent_transactions" in request.context:
                context_parts.append(f"Recent transactions: {len(request.context['recent_transactions'])} transactions")
            if "budget_info" in request.context:
                context_parts.append(f"Budget status: {request.context['budget_info']}")
            user_context = "; ".join(context_parts) if context_parts else ""
        
        # Create system prompt
        system_prompt = FinancialPromptTemplates.format_system_prompt(
            user_context=user_context,
            rag_context=rag_context[:500],  # Brief context for system prompt
        )
        
        # Create main prompt
        main_prompt = FinancialPromptTemplates.format_chat_prompt(
            user_message=request.message,
            conversation_history=conversation_context,
            rag_context=rag_context,
            user_context=user_context,
        )
        
        # Generate response from LLM
        response_text = await llm.generate_response(
            prompt=main_prompt,
            system_prompt=system_prompt,
        )
        
        if not response_text:
            response_text = FinancialPromptTemplates.ERROR_RESPONSE
        
        # Store conversation in memory
        memory.add_message(
            session_id=session_id,
            role="user",
            content=request.message,
            metadata={"context": request.context},
            user_id=request.user_id,
        )
        
        memory.add_message(
            session_id=session_id,
            role="assistant",
            content=response_text,
            metadata={"rag_sources": len(await rag.search(request.message, n_results=3))},
        )
        
        # Extract topics for suggestions
        topic_keywords = request.message.lower()
        suggestions = FinancialPromptTemplates.get_suggestions_for_topic(topic_keywords)
        
        # Get sources from RAG results
        rag_results = await rag.search(request.message, n_results=3)
        sources = [result["metadata"].get("source", "Unknown") for result in rag_results]
        unique_sources = list(set([source.split("/")[-1] for source in sources if source != "Unknown"]))
        
        return ChatResponse(
            message=response_text,
            session_id=session_id,
            sources=unique_sources[:3],  # Limit to top 3 sources
            confidence_score=0.85 if rag_results else 0.7,  # Simple confidence scoring
            suggestions=suggestions[:3],  # Limit to 3 suggestions
        )
        
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while processing your request. Please try again."
        )


@router.post("/feedback", response_model=FeedbackResponse)
async def feedback_endpoint(request: FeedbackRequest) -> FeedbackResponse:
    """Endpoint for collecting user feedback on responses."""
    try:
        memory = get_memory()
        
        # Get session history to validate
        history = memory.get_conversation_history(request.session_id)
        if not history:
            raise HTTPException(
                status_code=404,
                detail="Session not found"
            )
        
        # Store feedback (in a real implementation, you'd save this to a database)
        feedback_data = {
            "session_id": request.session_id,
            "message_id": request.message_id,
            "feedback_type": request.feedback_type,
            "comment": request.comment,
            "user_id": request.user_id,
            "timestamp": datetime.now().isoformat(),
        }
        
        # For now, we'll just log the feedback
        # In production, you'd want to store this in a proper database
        logger.info(f"Received feedback: {feedback_data}")
        
        # Add feedback to conversation metadata
        memory.add_message(
            session_id=request.session_id,
            role="system",
            content=f"User provided feedback: {request.feedback_type}",
            metadata=feedback_data,
            user_id=request.user_id,
        )
        
        return FeedbackResponse(
            success=True,
            message="Thank you for your feedback! It helps us improve our responses."
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in feedback endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while processing your feedback."
        )


@router.get("/health", response_model=HealthResponse)
async def health_endpoint() -> HealthResponse:
    """Health check endpoint for monitoring system status."""
    try:
        # Check LLM status
        llm = await get_llm()
        llm_health = await llm.health_check()
        
        # Check RAG status
        rag = await get_rag()
        rag_stats = rag.get_collection_stats()
        
        # Overall system status
        overall_status = "healthy"
        if llm_health["status"] != "healthy":
            overall_status = "degraded"
        if rag_stats["status"] != "healthy":
            overall_status = "degraded"
        
        return HealthResponse(
            status=overall_status,
            version="1.0.0",
            llm_status=llm_health["status"],
            rag_status=rag_stats["status"],
        )
        
    except Exception as e:
        logger.error(f"Error in health endpoint: {str(e)}")
        return HealthResponse(
            status="error",
            version="1.0.0",
            llm_status="error",
            rag_status="error",
        )


@router.get("/sessions/{session_id}", response_model=ConversationHistory)
async def get_session_endpoint(session_id: str) -> ConversationHistory:
    """Get conversation history for a specific session."""
    try:
        memory = get_memory()
        
        # Get conversation history
        messages = memory.get_conversation_history(session_id)
        if not messages:
            raise HTTPException(
                status_code=404,
                detail="Session not found"
            )
        
        # Get session summary for metadata
        session_summary = memory.get_session_summary(session_id)
        session_metadata = session_summary.get("metadata", {})
        
        # Convert messages to proper format
        from .models import ChatMessage, MessageRole
        formatted_messages = []
        
        for msg in messages:
            # Skip system messages in the response
            if msg["role"] == "system":
                continue
                
            try:
                role = MessageRole(msg["role"])
            except ValueError:
                continue  # Skip invalid roles
            
            formatted_messages.append(ChatMessage(
                role=role,
                content=msg["content"],
                timestamp=datetime.fromisoformat(msg["timestamp"]) if msg.get("timestamp") else datetime.now(),
                metadata=msg.get("metadata"),
            ))
        
        return ConversationHistory(
            session_id=session_id,
            messages=formatted_messages,
            created_at=datetime.fromisoformat(session_metadata.get("created_at", datetime.now().isoformat())),
            updated_at=datetime.fromisoformat(session_metadata.get("updated_at", datetime.now().isoformat())),
            user_id=session_metadata.get("user_id"),
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting session {session_id}: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while retrieving the session."
        )


@router.delete("/sessions/{session_id}")
async def delete_session_endpoint(session_id: str) -> Dict[str, str]:
    """Delete a conversation session."""
    try:
        memory = get_memory()
        
        success = memory.delete_session(session_id)
        if not success:
            raise HTTPException(
                status_code=404,
                detail="Session not found"
            )
        
        return {"message": "Session deleted successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting session {session_id}: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while deleting the session."
        )


@router.post("/documents/upload")
async def upload_document_endpoint(
    background_tasks: BackgroundTasks,
    file_path: str,
    metadata: Optional[Dict[str, Any]] = None,
) -> Dict[str, str]:
    """Upload a new document to the knowledge base."""
    try:
        rag = await get_rag()
        
        # Add document processing as background task
        background_tasks.add_task(
            _process_document,
            rag,
            file_path,
            metadata or {},
        )
        
        return {"message": "Document upload started. Processing in background."}
        
    except Exception as e:
        logger.error(f"Error starting document upload: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while starting document processing."
        )


async def _process_document(rag, file_path: str, metadata: Dict[str, Any]) -> None:
    """Background task to process uploaded documents."""
    try:
        success = await rag.add_document(file_path, metadata)
        if success:
            logger.info(f"Successfully processed document: {file_path}")
        else:
            logger.error(f"Failed to process document: {file_path}")
    except Exception as e:
        logger.error(f"Error processing document {file_path}: {str(e)}")


@router.get("/stats")
async def stats_endpoint() -> Dict[str, Any]:
    """Get system statistics and information."""
    try:
        # RAG stats
        rag = await get_rag()
        rag_stats = rag.get_collection_stats()
        
        # LLM stats
        llm = await get_llm()
        llm_info = llm.get_model_info()
        
        # Memory stats (simplified)
        memory = get_memory()
        
        return {
            "rag": rag_stats,
            "llm": llm_info,
            "memory": {
                "active_sessions": len(memory._session_cache),
                "max_history": memory.max_history,
            },
            "version": "1.0.0",
        }
        
    except Exception as e:
        logger.error(f"Error getting stats: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while retrieving statistics."
        )
