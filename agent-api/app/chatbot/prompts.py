from string import Template
from typing import Dict, List, Optional


class FinancialPromptTemplates:
    """Template system for financial literacy chatbot prompts."""
    
    SYSTEM_PROMPT = """You are a knowledgeable and friendly financial literacy assistant. Your role is to help users understand personal finance concepts, budgeting, investing, and making informed financial decisions.

Guidelines:
- Provide clear, practical financial advice suitable for beginners to advanced users
- Use examples relevant to everyday financial situations
- Always emphasize the importance of personal financial responsibility
- If you're unsure about specific financial regulations or tax advice, recommend consulting with a qualified professional
- Focus on educational content rather than specific investment recommendations
- Be supportive and encouraging about financial learning journeys

Context from user's financial app data: {user_context}

Relevant financial education content: {rag_context}
"""

    CHAT_PROMPT = Template("""Based on the conversation history and relevant financial education materials, please provide a helpful response to the user's question about: $user_message

Previous conversation context:
$conversation_history

Relevant educational content:
$rag_context

User's financial context (if available):
$user_context

Please provide a comprehensive but concise response that:
1. Directly addresses the user's question
2. Incorporates relevant information from the educational materials
3. Provides actionable advice when appropriate
4. Suggests related topics they might want to learn about
""")

    RAG_CONTEXT_PROMPT = Template("""Here are relevant excerpts from financial education materials that may help answer the user's question:

$retrieved_content

Please use this information to provide context for your response, but don't simply repeat it. Synthesize and explain the concepts in a way that's most helpful for the user's specific question.
""")

    CONVERSATION_SUMMARY_PROMPT = Template("""Please provide a brief summary of this financial conversation to maintain context:

Conversation history:
$messages

Summary should capture:
- Main financial topics discussed
- Key advice or concepts covered
- User's apparent financial goals or concerns
- Current conversation thread

Keep summary under 200 words.
""")

    ERROR_RESPONSE = "I apologize, but I'm having trouble processing your request right now. Please try rephrasing your question about financial topics, and I'll do my best to help you learn about personal finance, budgeting, investing, or other money management topics."

    SUGGESTION_PROMPTS = {
        "budgeting": [
            "How do I create my first budget?",
            "What's the 50/30/20 budgeting rule?",
            "How can I stick to my budget better?",
        ],
        "saving": [
            "How much should I have in an emergency fund?",
            "What are the best high-yield savings accounts?",
            "How can I save money on everyday expenses?",
        ],
        "investing": [
            "What's the difference between stocks and bonds?",
            "How do I start investing with little money?",
            "What is dollar-cost averaging?",
        ],
        "debt": [
            "Should I pay off debt or invest first?",
            "What's the difference between good and bad debt?",
            "How does the debt snowball method work?",
        ],
        "credit": [
            "How can I improve my credit score?",
            "What factors affect my credit score?",
            "Should I close old credit cards?",
        ],
    }

    @classmethod
    def get_suggestions_for_topic(cls, topic: str) -> List[str]:
        """Get relevant follow-up questions based on the topic."""
        topic_lower = topic.lower()
        for key, suggestions in cls.SUGGESTION_PROMPTS.items():
            if key in topic_lower:
                return suggestions
        return [
            "Tell me about budgeting basics",
            "How do I start building an emergency fund?",
            "What should I know about investing?",
        ]

    @classmethod
    def format_chat_prompt(
        cls,
        user_message: str,
        conversation_history: str = "",
        rag_context: str = "",
        user_context: str = "",
    ) -> str:
        """Format the main chat prompt with context."""
        return cls.CHAT_PROMPT.substitute(
            user_message=user_message,
            conversation_history=conversation_history or "No previous conversation.",
            rag_context=rag_context or "No specific educational content retrieved.",
            user_context=user_context or "No specific user financial context available.",
        )

    @classmethod
    def format_system_prompt(
        cls,
        user_context: str = "",
        rag_context: str = "",
    ) -> str:
        """Format the system prompt with context."""
        return cls.SYSTEM_PROMPT.format(
            user_context=user_context or "No specific user context available.",
            rag_context=rag_context or "No specific educational content available.",
        )

    @classmethod
    def format_rag_context(cls, retrieved_content: str) -> str:
        """Format the RAG context prompt."""
        return cls.RAG_CONTEXT_PROMPT.substitute(retrieved_content=retrieved_content)

    @classmethod
    def format_conversation_summary_prompt(cls, messages: List[Dict]) -> str:
        """Format prompt for conversation summarization."""
        messages_text = "\n".join([
            f"{msg.get('role', 'unknown')}: {msg.get('content', '')}"
            for msg in messages
        ])
        return cls.CONVERSATION_SUMMARY_PROMPT.substitute(messages=messages_text)
