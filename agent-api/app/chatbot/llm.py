import logging
import asyncio
from typing import Optional, Dict, Any, List
from langchain_ollama import OllamaLLM
from langchain.schema import HumanMessage, AIMessage, SystemMessage
import os
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)


class LocalLLM:
    """Wrapper for local LLM integration using Ollama."""
    
    def __init__(
        self,
        model_name: str = "llama3.2",
        ollama_base_url: str = "http://localhost:11434",
        temperature: float = 0.7,
        max_tokens: int = 1024,
    ):
        self.model_name = model_name
        self.ollama_base_url = ollama_base_url
        self.temperature = temperature
        self.max_tokens = max_tokens
        self._llm = None
        self._is_available = False
        
    async def initialize(self) -> bool:
        """Initialize the LLM connection and check availability."""
        try:
            self._llm = OllamaLLM(
                model=self.model_name,
                base_url=self.ollama_base_url,
                temperature=self.temperature,
                num_predict=self.max_tokens,
            )
            
            # Test connection with a simple query
            test_response = await self._llm.ainvoke("Hello")
            if test_response:
                self._is_available = True
                logger.info(f"LLM {self.model_name} initialized successfully")
                return True
            else:
                logger.error("LLM initialization failed: empty response")
                return False
                
        except Exception as e:
            logger.error(f"Failed to initialize LLM: {str(e)}")
            self._is_available = False
            return False
    
    @property
    def is_available(self) -> bool:
        """Check if the LLM is available for use."""
        return self._is_available
    
    async def generate_response(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        context: Optional[Dict[str, Any]] = None,
    ) -> Optional[str]:
        """Generate a response from the LLM."""
        if not self.is_available:
            logger.error("LLM is not available")
            return None
            
        try:
            # Combine system prompt and user prompt
            full_prompt = ""
            if system_prompt:
                full_prompt += f"System: {system_prompt}\n\n"
            full_prompt += f"User: {prompt}\n\nAssistant:"
            
            response = await self._llm.ainvoke(full_prompt)
            
            if response:
                # Clean up the response
                response = response.strip()
                logger.info(f"Generated response of length {len(response)}")
                return response
            else:
                logger.warning("LLM returned empty response")
                return None
                
        except Exception as e:
            logger.error(f"Error generating LLM response: {str(e)}")
            return None
    
    async def generate_streaming_response(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
    ):
        """Generate a streaming response from the LLM."""
        if not self.is_available:
            logger.error("LLM is not available for streaming")
            return
            
        try:
            # For streaming, we'd need to implement the Ollama streaming API
            # This is a simplified version - you may want to use the actual streaming
            full_prompt = ""
            if system_prompt:
                full_prompt += f"System: {system_prompt}\n\n"
            full_prompt += f"User: {prompt}\n\nAssistant:"
            
            # For now, return the full response
            # In a real implementation, you'd stream chunks
            response = await self._llm.ainvoke(full_prompt)
            yield response
            
        except Exception as e:
            logger.error(f"Error in streaming response: {str(e)}")
            yield f"Error: {str(e)}"
    
    async def health_check(self) -> Dict[str, Any]:
        """Perform a health check on the LLM."""
        try:
            if not self._llm:
                return {
                    "status": "unavailable",
                    "message": "LLM not initialized",
                    "model": self.model_name,
                }
            
            # Try a simple request
            start_time = asyncio.get_event_loop().time()
            test_response = await self._llm.ainvoke("Hello")
            end_time = asyncio.get_event_loop().time()
            
            response_time = end_time - start_time
            
            if test_response:
                return {
                    "status": "healthy",
                    "message": "LLM responding normally",
                    "model": self.model_name,
                    "response_time_seconds": round(response_time, 3),
                    "base_url": self.ollama_base_url,
                }
            else:
                return {
                    "status": "degraded",
                    "message": "LLM responding but with empty responses",
                    "model": self.model_name,
                }
                
        except Exception as e:
            return {
                "status": "error",
                "message": f"LLM health check failed: {str(e)}",
                "model": self.model_name,
            }
    
    def get_model_info(self) -> Dict[str, Any]:
        """Get information about the current model."""
        return {
            "model_name": self.model_name,
            "base_url": self.ollama_base_url,
            "temperature": self.temperature,
            "max_tokens": self.max_tokens,
            "is_available": self.is_available,
        }


# Global LLM instance
_llm_instance: Optional[LocalLLM] = None


async def get_llm() -> LocalLLM:
    """Get the global LLM instance, initializing if necessary."""
    global _llm_instance
    
    if _llm_instance is None:
        model_name = os.getenv("OLLAMA_MODEL", "llama3.2")
        base_url = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
        
        _llm_instance = LocalLLM(
            model_name=model_name,
            ollama_base_url=base_url,
        )
        
        await _llm_instance.initialize()
    
    return _llm_instance


async def initialize_llm() -> bool:
    """Initialize the global LLM instance."""
    llm = await get_llm()
    return llm.is_available
