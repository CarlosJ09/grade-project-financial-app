import logging
import asyncio
from typing import Optional, Dict, Any, List
from langchain_ollama import OllamaLLM
from langchain.schema import HumanMessage, AIMessage, SystemMessage
import os
import random
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)


class MockLLM:
    """Mock LLM for development and fallback purposes."""
    
    def __init__(self):
        self._is_available = True
        self.responses = [
            "I understand you're looking for financial advice. While I'm currently running in mock mode, I'd recommend consulting with a financial advisor for personalized guidance.",
            "That's a great question about personal finance! For specific advice, please consider speaking with a qualified financial professional.",
            "Thanks for your question. For detailed financial guidance tailored to your situation, I'd suggest consulting with a certified financial planner.",
            "I appreciate your interest in financial topics. For the most accurate and personalized advice, please consult with a licensed financial advisor.",
        ]
    
    async def ainvoke(self, prompt: str) -> str:
        """Mock response generation."""
        await asyncio.sleep(0.1)  # Simulate processing time
        return random.choice(self.responses)
    
    @property
    def is_available(self) -> bool:
        return self._is_available


class LocalLLM:
    """Wrapper for local LLM integration using Ollama with fallback support."""
    
    def __init__(
        self,
        model_name: str = "llama3.2",
        ollama_base_url: str = "http://localhost:11434",
        temperature: float = 0.7,
        max_tokens: int = 1024,
        use_mock_fallback: bool = True,
    ):
        self.model_name = model_name
        self.ollama_base_url = ollama_base_url
        self.temperature = temperature
        self.max_tokens = max_tokens
        self.use_mock_fallback = use_mock_fallback
        self._llm = None
        self._mock_llm = None
        self._is_available = False
        self._using_mock = False
        
    async def initialize(self) -> bool:
        """Initialize the LLM connection and check availability."""
        # First try to initialize Ollama
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
                self._using_mock = False
                logger.info(f"LLM {self.model_name} initialized successfully")
                return True
            else:
                logger.warning("LLM initialization failed: empty response")
                if self.use_mock_fallback:
                    return await self._initialize_mock()
                return False
                
        except Exception as e:
            logger.warning(f"Failed to initialize Ollama LLM: {str(e)}")
            if self.use_mock_fallback:
                return await self._initialize_mock()
            self._is_available = False
            return False
    
    async def _initialize_mock(self) -> bool:
        """Initialize mock LLM as fallback."""
        try:
            self._mock_llm = MockLLM()
            self._is_available = True
            self._using_mock = True
            logger.info("Initialized mock LLM as fallback")
            return True
        except Exception as e:
            logger.error(f"Failed to initialize mock LLM: {str(e)}")
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
            if self._using_mock:
                # Use mock LLM
                response = await self._mock_llm.ainvoke(prompt)
                if response:
                    logger.info(f"Generated mock response of length {len(response)}")
                    return response
            else:
                # Use real LLM
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
            # Try fallback to mock if we're not already using it
            if not self._using_mock and self.use_mock_fallback:
                logger.info("Attempting fallback to mock LLM...")
                try:
                    await self._initialize_mock()
                    if self._using_mock:
                        return await self._mock_llm.ainvoke(prompt)
                except Exception as fallback_error:
                    logger.error(f"Fallback to mock LLM also failed: {str(fallback_error)}")
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
            if not self.is_available:
                return {
                    "status": "unavailable",
                    "message": "LLM not initialized",
                    "model": self.model_name,
                    "using_mock": self._using_mock,
                }
            
            # Try a simple request
            start_time = asyncio.get_event_loop().time()
            
            if self._using_mock:
                test_response = await self._mock_llm.ainvoke("Hello")
                status_message = "Mock LLM responding normally"
            else:
                test_response = await self._llm.ainvoke("Hello")
                status_message = "LLM responding normally"
            
            end_time = asyncio.get_event_loop().time()
            response_time = end_time - start_time
            
            if test_response:
                return {
                    "status": "healthy",
                    "message": status_message,
                    "model": self.model_name,
                    "response_time_seconds": round(response_time, 3),
                    "base_url": self.ollama_base_url,
                    "using_mock": self._using_mock,
                }
            else:
                return {
                    "status": "degraded",
                    "message": "LLM responding but with empty responses",
                    "model": self.model_name,
                    "using_mock": self._using_mock,
                }
                
        except Exception as e:
            return {
                "status": "error",
                "message": f"LLM health check failed: {str(e)}",
                "model": self.model_name,
                "using_mock": self._using_mock,
            }
    
    def get_model_info(self) -> Dict[str, Any]:
        """Get information about the current model."""
        return {
            "model_name": self.model_name,
            "base_url": self.ollama_base_url,
            "temperature": self.temperature,
            "max_tokens": self.max_tokens,
            "is_available": self.is_available,
            "using_mock": self._using_mock,
            "mode": "Mock LLM (Fallback)" if self._using_mock else "Ollama LLM",
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
