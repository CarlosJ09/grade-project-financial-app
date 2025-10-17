import os
import logging
from pathlib import Path
from typing import List, Dict, Any, Optional
import chromadb
from chromadb.config import Settings
from langchain_community.document_loaders import PyPDFLoader, TextLoader
from langchain_community.document_loaders import UnstructuredFileLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document
import uuid
import hashlib
import re

logger = logging.getLogger(__name__)

try:
    from sentence_transformers import SentenceTransformer
    import numpy as np
    SENTENCE_TRANSFORMERS_AVAILABLE = True
except ImportError:
    SENTENCE_TRANSFORMERS_AVAILABLE = False
    logger.warning("sentence-transformers not available, using simple text matching")


class SimpleTextEmbedder:
    """Simple text embedder that uses basic text features when sentence-transformers is not available."""
    
    def __init__(self):
        self.vocab_size = 10000  # Simple vocabulary for basic embedding
        
    def encode(self, texts: List[str]) -> List[List[float]]:
        """Create simple embeddings based on text features."""
        embeddings = []
        for text in texts:
            # Simple embedding based on text characteristics
            text_lower = text.lower()
            
            # Basic features
            features = [
                len(text),  # Text length
                len(text.split()),  # Word count
                text.count('.'),  # Sentence count approximation
                text.count('$'),  # Dollar signs (financial context)
                text.count('%'),  # Percentages
                len(re.findall(r'\d+', text)),  # Number count
                len(set(text_lower.split())),  # Unique word count
                text_lower.count('budget'),
                text_lower.count('save'),
                text_lower.count('invest'),
                text_lower.count('debt'),
                text_lower.count('money'),
                text_lower.count('financial'),
                text_lower.count('credit'),
                text_lower.count('loan'),
                text_lower.count('bank'),
            ]
            
            # Normalize features to 0-1 range (simple approach)
            max_vals = [1000, 200, 20, 10, 10, 50, 100] + [20] * 9  # Rough maximums
            normalized = [min(f / max_val, 1.0) for f, max_val in zip(features, max_vals)]
            
            # Pad to fixed size
            while len(normalized) < 32:
                normalized.append(0.0)
            
            embeddings.append(normalized[:32])
        
        return embeddings


class RAGPipeline:
    """Retrieval Augmented Generation pipeline for financial education content."""
    
    def __init__(
        self,
        docs_dir: str = "data/docs",
        embeddings_dir: str = "data/embeddings",
        collection_name: str = "financial_docs",
        embedding_model: str = "all-MiniLM-L6-v2",
    ):
        self.docs_dir = Path(docs_dir)
        self.embeddings_dir = Path(embeddings_dir)
        self.collection_name = collection_name
        self.embedding_model_name = embedding_model
        
        # Create directories
        self.docs_dir.mkdir(parents=True, exist_ok=True)
        self.embeddings_dir.mkdir(parents=True, exist_ok=True)
        
        # Initialize components
        self.embedding_model = None
        self.chroma_client = None
        self.collection = None
        self.using_simple_embedder = False
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len,
        )
        
    async def initialize(self) -> bool:
        """Initialize the RAG pipeline."""
        try:
            # Initialize embedding model with fallback
            if SENTENCE_TRANSFORMERS_AVAILABLE:
                try:
                    logger.info(f"Loading embedding model: {self.embedding_model_name}")
                    self.embedding_model = SentenceTransformer(self.embedding_model_name)
                    logger.info("Successfully loaded SentenceTransformer model")
                    self.using_simple_embedder = False
                except Exception as e:
                    logger.warning(f"Failed to load SentenceTransformer: {str(e)}")
                    logger.info("Falling back to simple text embedder")
                    self.embedding_model = SimpleTextEmbedder()
                    self.using_simple_embedder = True
            else:
                logger.info("SentenceTransformers not available, using simple text embedder")
                self.embedding_model = SimpleTextEmbedder()
                self.using_simple_embedder = True
            
            # Initialize ChromaDB
            self.chroma_client = chromadb.PersistentClient(
                path=str(self.embeddings_dir),
                settings=Settings(allow_reset=True, anonymized_telemetry=False)
            )
            
            # Get or create collection
            try:
                self.collection = self.chroma_client.get_collection(self.collection_name)
                logger.info(f"Loaded existing collection: {self.collection_name}")
            except Exception:
                self.collection = self.chroma_client.create_collection(
                    name=self.collection_name,
                    metadata={"description": "Financial education documents"}
                )
                logger.info(f"Created new collection: {self.collection_name}")
            
            # Load and process documents if collection is empty
            if self.collection.count() == 0:
                await self._load_initial_documents()
            
            logger.info("RAG pipeline initialized successfully")
            return True
            
        except Exception as e:
            logger.error(f"Failed to initialize RAG pipeline: {str(e)}")
            return False
    
    async def add_document(self, file_path: str, metadata: Optional[Dict] = None) -> bool:
        """Add a document to the knowledge base."""
        try:
            file_path = Path(file_path)
            if not file_path.exists():
                logger.error(f"File does not exist: {file_path}")
                return False
            
            # Load document based on file type
            documents = await self._load_document(file_path)
            if not documents:
                logger.error(f"Failed to load document: {file_path}")
                return False
            
            # Split into chunks
            chunks = self.text_splitter.split_documents(documents)
            
            # Prepare data for ChromaDB
            chunk_texts = [chunk.page_content for chunk in chunks]
            chunk_embeddings = self.embedding_model.encode(chunk_texts).tolist()
            
            # Generate IDs and metadata
            chunk_ids = [str(uuid.uuid4()) for _ in chunks]
            chunk_metadata = []
            
            for i, chunk in enumerate(chunks):
                chunk_meta = {
                    "source": str(file_path),
                    "chunk_index": i,
                    "total_chunks": len(chunks),
                    **(metadata or {}),
                    **(chunk.metadata or {}),
                }
                chunk_metadata.append(chunk_meta)
            
            # Add to collection
            self.collection.add(
                ids=chunk_ids,
                documents=chunk_texts,
                embeddings=chunk_embeddings,
                metadatas=chunk_metadata,
            )
            
            logger.info(f"Added {len(chunks)} chunks from {file_path}")
            return True
            
        except Exception as e:
            logger.error(f"Error adding document {file_path}: {str(e)}")
            return False
    
    async def search(
        self,
        query: str,
        n_results: int = 5,
        filter_metadata: Optional[Dict] = None,
    ) -> List[Dict[str, Any]]:
        """Search for relevant documents."""
        try:
            if not self.collection:
                logger.error("RAG pipeline not initialized")
                return []
            
            # Generate query embedding
            query_embedding = self.embedding_model.encode([query]).tolist()[0]
            
            # Search in ChromaDB
            results = self.collection.query(
                query_embeddings=[query_embedding],
                n_results=n_results,
                where=filter_metadata,
                include=["documents", "metadatas", "distances"],
            )
            
            # Format results
            formatted_results = []
            for i in range(len(results["documents"][0])):
                result = {
                    "content": results["documents"][0][i],
                    "metadata": results["metadatas"][0][i],
                    "distance": results["distances"][0][i],
                    "relevance_score": 1 - results["distances"][0][i],  # Convert distance to similarity
                }
                formatted_results.append(result)
            
            logger.info(f"Retrieved {len(formatted_results)} results for query: {query[:50]}...")
            return formatted_results
            
        except Exception as e:
            logger.error(f"Error searching documents: {str(e)}")
            return []
    
    async def get_context_for_query(
        self,
        query: str,
        max_context_length: int = 2000,
        n_results: int = 5,
    ) -> str:
        """Get formatted context for a query."""
        results = await self.search(query, n_results=n_results)
        
        if not results:
            return "No relevant information found in the knowledge base."
        
        context_parts = []
        total_length = 0
        
        for result in results:
            content = result["content"]
            source = result["metadata"].get("source", "Unknown")
            
            # Add source information
            context_part = f"Source: {Path(source).name}\n{content}\n"
            
            # Check if adding this would exceed max length
            if total_length + len(context_part) > max_context_length:
                break
            
            context_parts.append(context_part)
            total_length += len(context_part)
        
        return "\n---\n".join(context_parts)
    
    def get_collection_stats(self) -> Dict[str, Any]:
        """Get statistics about the document collection."""
        if not self.collection:
            return {"status": "not_initialized"}
        
        try:
            count = self.collection.count()
            
            # Get sample of documents to analyze sources
            sample_results = self.collection.get(limit=min(100, count))
            sources = set()
            
            for metadata in sample_results.get("metadatas", []):
                if metadata and "source" in metadata:
                    sources.add(Path(metadata["source"]).name)
            
            return {
                "status": "healthy",
                "total_documents": count,
                "unique_sources": len(sources),
                "sources": list(sources)[:10],  # Show first 10 sources
                "embedding_model": self.embedding_model_name,
                "using_simple_embedder": self.using_simple_embedder,
                "embedder_type": "Simple Text Features" if self.using_simple_embedder else "SentenceTransformers",
            }
            
        except Exception as e:
            logger.error(f"Error getting collection stats: {str(e)}")
            return {
                "status": "error",
                "error": str(e)
            }
    
    async def _load_document(self, file_path: Path) -> Optional[List[Document]]:
        """Load a document based on its file type."""
        try:
            file_extension = file_path.suffix.lower()
            
            if file_extension == ".pdf":
                loader = PyPDFLoader(str(file_path))
            elif file_extension == ".txt":
                loader = TextLoader(str(file_path))
            else:
                # Try with unstructured loader for other formats
                loader = UnstructuredFileLoader(str(file_path))
            
            documents = loader.load()
            
            # Add source metadata
            for doc in documents:
                doc.metadata["source"] = str(file_path)
                doc.metadata["file_type"] = file_extension
            
            return documents
            
        except Exception as e:
            logger.error(f"Error loading document {file_path}: {str(e)}")
            return None
    
    async def _load_initial_documents(self) -> None:
        """Load initial documents from the docs directory."""
        logger.info("Loading initial documents from docs directory")
        
        # Create some sample financial education content if directory is empty
        if not any(self.docs_dir.iterdir()):
            await self._create_sample_documents()
        
        # Load all documents in the docs directory
        supported_extensions = {".pdf", ".txt", ".md"}
        
        for file_path in self.docs_dir.rglob("*"):
            if file_path.is_file() and file_path.suffix.lower() in supported_extensions:
                await self.add_document(str(file_path))
    
    async def _create_sample_documents(self) -> None:
        """Create sample financial education documents."""
        logger.info("Creating sample financial education documents")
        
        sample_docs = {
            "budgeting_basics.txt": """
# Budgeting Basics

Creating a budget is the foundation of good financial management. A budget helps you track your income and expenses, ensuring you spend less than you earn and save for your goals.

## The 50/30/20 Rule

A simple budgeting approach:
- 50% for needs (housing, food, utilities, minimum debt payments)
- 30% for wants (entertainment, dining out, hobbies)
- 20% for savings and extra debt payments

## Steps to Create a Budget

1. Calculate your monthly after-tax income
2. List all your fixed expenses (rent, insurance, loan payments)
3. Estimate variable expenses (groceries, gas, entertainment)
4. Set savings goals
5. Track your actual spending
6. Adjust as needed

## Budget Categories to Consider

- Housing (rent/mortgage, utilities, maintenance)
- Transportation (car payment, gas, insurance, maintenance)
- Food (groceries, dining out)
- Personal care
- Entertainment
- Savings and investments
- Debt payments
- Insurance
- Miscellaneous expenses

Regular review and adjustment of your budget is key to long-term success.
""",
            "emergency_fund.txt": """
# Building an Emergency Fund

An emergency fund is money set aside for unexpected expenses or financial emergencies. It's one of the most important aspects of financial security.

## How Much Should You Save?

Most financial experts recommend saving 3-6 months of living expenses. However, the right amount depends on your situation:

- 3 months: If you have stable employment and multiple income sources
- 6+ months: If you're self-employed, in a volatile industry, or the sole income earner

## Where to Keep Your Emergency Fund

Your emergency fund should be:
- Easily accessible (liquid)
- Safe from market volatility
- Separate from your checking account

Good options include:
- High-yield savings accounts
- Money market accounts
- Short-term CDs

## Building Your Fund

Start small and build gradually:
1. Set an initial goal of $500-1,000
2. Automate transfers to your emergency fund
3. Use windfalls (tax refunds, bonuses) to boost savings
4. Gradually increase your target as your income grows

## When to Use Your Emergency Fund

True emergencies include:
- Job loss
- Major medical expenses
- Urgent home or car repairs
- Family emergencies

Remember: Vacations, shopping, and predictable expenses are not emergencies.
""",
            "investing_101.txt": """
# Investing 101: Getting Started

Investing is putting your money to work to potentially grow over time. While there are risks involved, investing is often necessary to build wealth and achieve long-term financial goals.

## Key Investment Concepts

**Compound Interest**: Your money earns returns, and those returns earn returns too.

**Risk vs. Return**: Generally, higher potential returns come with higher risk.

**Diversification**: Spreading investments across different assets to reduce risk.

**Time Horizon**: How long you plan to invest affects your strategy.

## Types of Investments

**Stocks**: Shares of ownership in companies
- Potential for high returns
- Higher volatility
- Best for long-term goals

**Bonds**: Loans to companies or governments
- Generally more stable than stocks
- Lower expected returns
- Good for income and stability

**Mutual Funds/ETFs**: Baskets of stocks and/or bonds
- Instant diversification
- Professional management (mutual funds)
- Lower fees (ETFs typically)

**Real Estate**: Property investments
- Can provide income and appreciation
- Less liquid than stocks/bonds
- Higher barrier to entry

## Getting Started

1. Pay off high-interest debt first
2. Build an emergency fund
3. Take advantage of employer 401(k) match
4. Consider low-cost index funds for beginners
5. Increase contributions over time
6. Stay consistent and don't panic during market downturns

Remember: Investing is a long-term endeavor. Don't try to time the market.
""",
        }
        
        for filename, content in sample_docs.items():
            file_path = self.docs_dir / filename
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)
        
        logger.info(f"Created {len(sample_docs)} sample documents")


# Global RAG instance
_rag_instance: Optional[RAGPipeline] = None


async def get_rag() -> RAGPipeline:
    """Get the global RAG instance."""
    global _rag_instance
    
    if _rag_instance is None:
        docs_dir = os.getenv("DOCS_DIR", "data/docs")
        embeddings_dir = os.getenv("EMBEDDINGS_DIR", "data/embeddings")
        
        _rag_instance = RAGPipeline(docs_dir, embeddings_dir)
        await _rag_instance.initialize()
    
    return _rag_instance
