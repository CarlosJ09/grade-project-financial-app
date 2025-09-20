import json
import os
import uuid
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
import logging
from pathlib import Path

logger = logging.getLogger(__name__)


class ConversationMemory:
    """Manages conversation memory for the chatbot."""
    
    def __init__(self, memory_dir: str = "data/memory", max_history: int = 50):
        self.memory_dir = Path(memory_dir)
        self.max_history = max_history
        self.memory_dir.mkdir(parents=True, exist_ok=True)
        
        # In-memory cache for active sessions
        self._session_cache: Dict[str, List[Dict[str, Any]]] = {}
        self._session_metadata: Dict[str, Dict[str, Any]] = {}
    
    def generate_session_id(self) -> str:
        """Generate a new session ID."""
        return str(uuid.uuid4())
    
    def get_session_file_path(self, session_id: str) -> Path:
        """Get the file path for a session."""
        return self.memory_dir / f"session_{session_id}.json"
    
    def add_message(
        self,
        session_id: str,
        role: str,
        content: str,
        metadata: Optional[Dict[str, Any]] = None,
        user_id: Optional[str] = None,
    ) -> None:
        """Add a message to the conversation memory."""
        message = {
            "role": role,
            "content": content,
            "timestamp": datetime.now().isoformat(),
            "metadata": metadata or {},
        }
        
        # Add to cache
        if session_id not in self._session_cache:
            self._session_cache[session_id] = []
            self._session_metadata[session_id] = {
                "created_at": datetime.now().isoformat(),
                "user_id": user_id,
                "message_count": 0,
            }
        
        self._session_cache[session_id].append(message)
        self._session_metadata[session_id]["message_count"] += 1
        self._session_metadata[session_id]["updated_at"] = datetime.now().isoformat()
        
        # Trim history if too long
        if len(self._session_cache[session_id]) > self.max_history:
            self._session_cache[session_id] = self._session_cache[session_id][-self.max_history:]
        
        # Persist to disk
        self._save_session(session_id)
    
    def get_conversation_history(
        self,
        session_id: str,
        limit: Optional[int] = None,
    ) -> List[Dict[str, Any]]:
        """Get conversation history for a session."""
        # Try cache first
        if session_id in self._session_cache:
            messages = self._session_cache[session_id]
        else:
            # Load from disk
            messages = self._load_session(session_id)
            if messages:
                self._session_cache[session_id] = messages
        
        if not messages:
            return []
        
        # Apply limit
        if limit:
            return messages[-limit:]
        
        return messages
    
    def get_recent_context(
        self,
        session_id: str,
        max_messages: int = 10,
        max_chars: int = 2000,
    ) -> str:
        """Get recent conversation context as a formatted string."""
        history = self.get_conversation_history(session_id, limit=max_messages)
        
        if not history:
            return "No previous conversation."
        
        context_parts = []
        total_chars = 0
        
        # Work backwards from most recent
        for message in reversed(history):
            role = message["role"].title()
            content = message["content"]
            
            message_text = f"{role}: {content}"
            
            # Check if adding this message would exceed character limit
            if total_chars + len(message_text) > max_chars:
                break
            
            context_parts.insert(0, message_text)
            total_chars += len(message_text)
        
        return "\n".join(context_parts)
    
    def get_session_summary(self, session_id: str) -> Dict[str, Any]:
        """Get a summary of the session."""
        metadata = self._session_metadata.get(session_id, {})
        history = self.get_conversation_history(session_id)
        
        # Calculate basic statistics
        user_messages = [msg for msg in history if msg["role"] == "user"]
        assistant_messages = [msg for msg in history if msg["role"] == "assistant"]
        
        # Extract topics (simple keyword extraction)
        topics = self._extract_topics(history)
        
        return {
            "session_id": session_id,
            "metadata": metadata,
            "message_count": len(history),
            "user_message_count": len(user_messages),
            "assistant_message_count": len(assistant_messages),
            "topics": topics,
            "duration_minutes": self._calculate_session_duration(history),
        }
    
    def delete_session(self, session_id: str) -> bool:
        """Delete a conversation session."""
        try:
            # Remove from cache
            self._session_cache.pop(session_id, None)
            self._session_metadata.pop(session_id, None)
            
            # Remove from disk
            session_file = self.get_session_file_path(session_id)
            if session_file.exists():
                session_file.unlink()
            
            return True
        except Exception as e:
            logger.error(f"Error deleting session {session_id}: {str(e)}")
            return False
    
    def cleanup_old_sessions(self, days: int = 30) -> int:
        """Clean up sessions older than specified days."""
        cutoff_date = datetime.now() - timedelta(days=days)
        deleted_count = 0
        
        try:
            for session_file in self.memory_dir.glob("session_*.json"):
                if session_file.stat().st_mtime < cutoff_date.timestamp():
                    session_id = session_file.stem.replace("session_", "")
                    if self.delete_session(session_id):
                        deleted_count += 1
        except Exception as e:
            logger.error(f"Error during session cleanup: {str(e)}")
        
        return deleted_count
    
    def _save_session(self, session_id: str) -> None:
        """Save session to disk."""
        try:
            session_data = {
                "session_id": session_id,
                "metadata": self._session_metadata.get(session_id, {}),
                "messages": self._session_cache.get(session_id, []),
            }
            
            session_file = self.get_session_file_path(session_id)
            with open(session_file, 'w', encoding='utf-8') as f:
                json.dump(session_data, f, indent=2, ensure_ascii=False)
                
        except Exception as e:
            logger.error(f"Error saving session {session_id}: {str(e)}")
    
    def _load_session(self, session_id: str) -> Optional[List[Dict[str, Any]]]:
        """Load session from disk."""
        try:
            session_file = self.get_session_file_path(session_id)
            if not session_file.exists():
                return None
            
            with open(session_file, 'r', encoding='utf-8') as f:
                session_data = json.load(f)
            
            # Update metadata cache
            self._session_metadata[session_id] = session_data.get("metadata", {})
            
            return session_data.get("messages", [])
            
        except Exception as e:
            logger.error(f"Error loading session {session_id}: {str(e)}")
            return None
    
    def _extract_topics(self, history: List[Dict[str, Any]]) -> List[str]:
        """Extract topics from conversation history using simple keyword matching."""
        financial_keywords = {
            "budget": ["budget", "budgeting", "expenses", "income"],
            "saving": ["save", "savings", "emergency fund", "money"],
            "investing": ["invest", "investment", "stocks", "bonds", "portfolio"],
            "debt": ["debt", "loan", "credit", "mortgage", "payment"],
            "credit_score": ["credit score", "credit report", "credit card"],
            "retirement": ["retirement", "401k", "ira", "pension"],
            "insurance": ["insurance", "coverage", "premium", "policy"],
            "taxes": ["tax", "taxes", "deduction", "refund"],
        }
        
        topics = set()
        all_text = " ".join([msg["content"].lower() for msg in history])
        
        for topic, keywords in financial_keywords.items():
            for keyword in keywords:
                if keyword in all_text:
                    topics.add(topic)
                    break
        
        return list(topics)
    
    def _calculate_session_duration(self, history: List[Dict[str, Any]]) -> float:
        """Calculate session duration in minutes."""
        if len(history) < 2:
            return 0
        
        try:
            start_time = datetime.fromisoformat(history[0]["timestamp"])
            end_time = datetime.fromisoformat(history[-1]["timestamp"])
            duration = (end_time - start_time).total_seconds() / 60
            return round(duration, 2)
        except Exception:
            return 0


# Global memory instance
_memory_instance: Optional[ConversationMemory] = None


def get_memory() -> ConversationMemory:
    """Get the global memory instance."""
    global _memory_instance
    
    if _memory_instance is None:
        memory_dir = os.getenv("MEMORY_DIR", "data/memory")
        max_history = int(os.getenv("MAX_CONVERSATION_HISTORY", "50"))
        _memory_instance = ConversationMemory(memory_dir, max_history)
    
    return _memory_instance
