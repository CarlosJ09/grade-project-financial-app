# Financial AI Agent API

A comprehensive AI-powered financial literacy chatbot API with Retrieval Augmented Generation (RAG) capabilities. Built with FastAPI, this service provides intelligent financial advice and education through a local LLM integration.

## 🚀 Features

- **Local LLM Integration**: Uses Ollama for private, local language model processing
- **RAG Pipeline**: Retrieval Augmented Generation with ChromaDB for contextual responses
- **Conversation Memory**: Persistent conversation tracking and context management
- **Financial Education Focus**: Specialized prompts and content for financial literacy
- **RESTful API**: Clean, well-documented endpoints for easy integration
- **Health Monitoring**: Built-in health checks and system statistics
- **Feedback System**: User feedback collection for continuous improvement

## 🏗️ Architecture

```
agent-api/
├── app/                     # Main application package
│   ├── main.py              # FastAPI application and startup
│   ├── models.py            # Pydantic models (request/response schemas)
│   ├── routes.py            # API endpoints
│   └── chatbot/             # AI chatbot components
│       ├── llm.py           # Local LLM integration (Ollama)
│       ├── rag.py           # RAG pipeline (ChromaDB + embeddings)
│       ├── prompts.py       # Financial education prompt templates
│       └── memory.py        # Conversation memory management
├── data/                    # Data storage
│   ├── docs/                # Financial education documents
│   ├── embeddings/          # Vector database (ChromaDB)
│   └── memory/              # Conversation history
├── tests/                   # Test suite
└── requirements.txt         # Python dependencies
```

## 🛠️ Installation & Setup

### Prerequisites

1. **Python 3.9+**
2. **Ollama** - For local LLM inference
   ```bash
   # Install Ollama
   curl -fsSL https://ollama.ai/install.sh | sh
   
   # Pull a model (e.g., Llama 3.2)
   ollama pull llama3.2
   ```

### Installation

1. **Clone and navigate to the agent-api directory**
   ```bash
   cd agent-api
   ```

2. **Create and activate a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   ```bash
   cp .env .env.local  # Copy and customize as needed
   ```

5. **Start the API server**
   ```bash
   # Development mode
   python -m app.main
   
   # Or with uvicorn directly
   uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload
   ```

## 🐳 Docker Deployment

The API is configured to run with Docker Compose alongside the core API:

```bash
# From project root
docker-compose up agent-api
```

## 📚 API Endpoints

### Core Chat Functionality

#### POST `/api/v1/chat`
Start or continue a conversation with the AI agent.

**Request:**
```json
{
  "message": "How do I create my first budget?",
  "session_id": "optional-session-id",
  "user_id": "optional-user-id",
  "context": {
    "user_balance": 5000,
    "recent_transactions": [...],
    "budget_info": {...}
  }
}
```

**Response:**
```json
{
  "message": "Creating your first budget is a great step towards financial wellness...",
  "session_id": "uuid-session-id",
  "sources": ["budgeting_basics.txt", "financial_planning.pdf"],
  "confidence_score": 0.85,
  "suggestions": [
    "What's the 50/30/20 budgeting rule?",
    "How can I stick to my budget better?",
    "What budgeting apps do you recommend?"
  ]
}
```

#### POST `/api/v1/feedback`
Provide feedback on AI responses.

**Request:**
```json
{
  "session_id": "uuid-session-id",
  "message_id": "optional-message-id",
  "feedback_type": "thumbs_up",
  "comment": "Very helpful explanation!"
}
```

### Session Management

#### GET `/api/v1/sessions/{session_id}`
Retrieve conversation history for a session.

#### DELETE `/api/v1/sessions/{session_id}`
Delete a conversation session.

### System Monitoring

#### GET `/api/v1/health`
Health check endpoint for monitoring system status.

#### GET `/api/v1/stats`
System statistics including RAG, LLM, and memory metrics.

### Document Management

#### POST `/api/v1/documents/upload`
Upload new financial education documents to the knowledge base.

## 🧠 AI Components

### Local LLM (Ollama)

The API integrates with Ollama for local language model inference:

- **Default Model**: Llama 3.2
- **Configurable**: Switch models via environment variables
- **Health Monitoring**: Automatic health checks and failover

### RAG Pipeline

Retrieval Augmented Generation enhances responses with relevant financial education content:

- **Vector Database**: ChromaDB for efficient similarity search
- **Embeddings**: Sentence Transformers for semantic understanding
- **Document Processing**: Support for PDF, TXT, and other formats
- **Smart Retrieval**: Context-aware document retrieval

### Conversation Memory

Persistent conversation tracking with:

- **Session Management**: Unique session IDs for conversation continuity
- **Context Preservation**: Recent message context for coherent responses
- **Automatic Cleanup**: Configurable cleanup of old sessions
- **Metadata Tracking**: User information and conversation statistics

## 🎯 Financial Education Features

### Specialized Prompts

- **Domain-Specific**: Tailored for financial literacy and education
- **Contextual**: Incorporates user's financial data when available
- **Educational**: Focus on teaching rather than specific advice
- **Safe**: Includes disclaimers for professional financial advice

### Topic Coverage

- Budgeting and expense tracking
- Saving and emergency funds
- Investment basics
- Debt management
- Credit scores and reports
- Retirement planning
- Insurance basics
- Tax fundamentals

### Smart Suggestions

Context-aware follow-up questions based on conversation topics.

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app

# Run specific test file
pytest tests/test_api.py -v
```

## ⚙️ Configuration

### Environment Variables

```env
# API Configuration
AGENT_PORT=8001

# Ollama Configuration
OLLAMA_MODEL=llama3.2
OLLAMA_BASE_URL=http://localhost:11434

# RAG Configuration
DOCS_DIR=data/docs
EMBEDDINGS_DIR=data/embeddings

# Memory Configuration
MEMORY_DIR=data/memory
MAX_CONVERSATION_HISTORY=50

# Logging
LOG_LEVEL=INFO
```

### Customizing the Model

To use a different Ollama model:

1. Pull the model: `ollama pull mistral`
2. Update `OLLAMA_MODEL=mistral` in your `.env` file
3. Restart the API

### Adding Financial Education Content

1. Place documents in the `data/docs/` directory
2. Supported formats: PDF, TXT, MD
3. The RAG system will automatically process new documents on startup
4. Or use the `/api/v1/documents/upload` endpoint for dynamic uploads

## 🔗 Integration with Expo App

### Example Usage in React Native

```typescript
// services/aiAgent.ts
const AI_AGENT_BASE_URL = 'http://localhost:8001/api/v1';

export class AIAgentService {
  async chat(message: string, sessionId?: string, context?: any) {
    const response = await fetch(`${AI_AGENT_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        session_id: sessionId,
        context,
      }),
    });
    return response.json();
  }
  
  async provideFeedback(sessionId: string, feedbackType: string, comment?: string) {
    const response = await fetch(`${AI_AGENT_BASE_URL}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: sessionId,
        feedback_type: feedbackType,
        comment,
      }),
    });
    return response.json();
  }
}
```

## 🚀 Production Deployment

### Performance Optimization

1. **Model Selection**: Choose optimal models for your hardware
2. **Vector Database**: Tune ChromaDB settings for your dataset size
3. **Memory Management**: Configure conversation history limits
4. **Caching**: Implement response caching for common queries

### Security Considerations

1. **API Authentication**: Add authentication middleware
2. **Rate Limiting**: Implement request rate limiting
3. **Input Validation**: Ensure robust input sanitization
4. **CORS Configuration**: Restrict origins in production

### Monitoring

1. **Health Checks**: Use `/api/v1/health` for monitoring
2. **Logging**: Configure structured logging
3. **Metrics**: Monitor response times and success rates
4. **Alerts**: Set up alerts for system degradation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

This project is part of the Grade Project Financial App and follows the main project's license.

## 🆘 Support

For issues and questions:
1. Check the [API documentation](http://localhost:8001/docs) when running
2. Review the logs for error details
3. Ensure Ollama is running and accessible
4. Verify all dependencies are installed correctly

## 🔮 Future Enhancements

- [ ] Multi-language support
- [ ] Advanced analytics and insights
- [ ] Integration with more LLM providers
- [ ] Enhanced document processing capabilities
- [ ] Real-time streaming responses
- [ ] Voice interaction support
- [ ] Advanced personalization features
