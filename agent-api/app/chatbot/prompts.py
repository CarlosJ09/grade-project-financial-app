from string import Template
from typing import Dict, List, Optional


class FinancialPromptTemplates:
    """Template system for financial literacy chatbot prompts."""
    
    SYSTEM_PROMPT = """Eres un asistente de educación financiera amigable y conocedor. Tu función es ayudar a los usuarios a comprender conceptos de finanzas personales, presupuestos, inversiones y tomar decisiones financieras informadas.

IMPORTANTE: Debes responder SIEMPRE en español, sin importar el idioma en que te escriban.

Directrices:
- Proporciona consejos financieros claros y prácticos adecuados para usuarios desde principiantes hasta avanzados
- Usa ejemplos relevantes para situaciones financieras cotidianas
- Enfatiza siempre la importancia de la responsabilidad financiera personal
- Si no estás seguro sobre regulaciones financieras específicas o asesoramiento fiscal, recomienda consultar con un profesional calificado
- Enfócate en contenido educativo en lugar de recomendaciones de inversión específicas
- Sé comprensivo y alentador sobre los procesos de aprendizaje financiero

Contexto de los datos de la aplicación financiera del usuario: {user_context}

Contenido de educación financiera relevante: {rag_context}
"""

    CHAT_PROMPT = Template("""Basándote en el historial de conversación y los materiales educativos financieros relevantes, proporciona una respuesta útil a la pregunta del usuario sobre: $user_message

Contexto de conversación previo:
$conversation_history

Contenido educativo relevante:
$rag_context

Contexto financiero del usuario (si está disponible):
$user_context

Por favor proporciona una respuesta completa pero concisa que:
1. Responda directamente a la pregunta del usuario
2. Incorpore información relevante de los materiales educativos
3. Proporcione consejos prácticos cuando sea apropiado
4. Sugiera temas relacionados que podrían interesarle

IMPORTANTE: Tu respuesta debe ser COMPLETAMENTE en español.
""")

    RAG_CONTEXT_PROMPT = Template("""Aquí hay extractos relevantes de materiales de educación financiera que pueden ayudar a responder la pregunta del usuario:

$retrieved_content

Por favor usa esta información para proporcionar contexto en tu respuesta, pero no la repitas simplemente. Sintetiza y explica los conceptos de la manera más útil para la pregunta específica del usuario.
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

    ERROR_RESPONSE = "Lo siento, pero estoy teniendo problemas para procesar tu solicitud en este momento. Por favor intenta reformular tu pregunta sobre temas financieros, y haré mi mejor esfuerzo para ayudarte a aprender sobre finanzas personales, presupuestos, inversiones u otros temas de gestión del dinero."

    SUGGESTION_PROMPTS = {
        "presupuesto": [
            "¿Cómo creo mi primer presupuesto?",
            "¿Qué es la regla 50/30/20 para presupuestos?",
            "¿Cómo puedo seguir mejor mi presupuesto?",
        ],
        "ahorro": [
            "¿Cuánto debería tener en un fondo de emergencia?",
            "¿Cuáles son las mejores cuentas de ahorro de alto rendimiento?",
            "¿Cómo puedo ahorrar dinero en gastos diarios?",
        ],
        "inversion": [
            "¿Cuál es la diferencia entre acciones y bonos?",
            "¿Cómo empiezo a invertir con poco dinero?",
            "¿Qué es el promedio de costo en dólares?",
        ],
        "deuda": [
            "¿Debo pagar deudas o invertir primero?",
            "¿Cuál es la diferencia entre deuda buena y mala?",
            "¿Cómo funciona el método bola de nieve para deudas?",
        ],
        "credito": [
            "¿Cómo puedo mejorar mi puntaje de crédito?",
            "¿Qué factores afectan mi puntaje de crédito?",
            "¿Debería cerrar tarjetas de crédito antiguas?",
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
            "Cuéntame sobre conceptos básicos de presupuestos",
            "¿Cómo empiezo a construir un fondo de emergencia?",
            "¿Qué debo saber sobre inversiones?",
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
            conversation_history=conversation_history or "No hay conversación previa.",
            rag_context=rag_context or "No se recuperó contenido educativo específico.",
            user_context=user_context or "No hay contexto financiero específico del usuario disponible.",
        )

    @classmethod
    def format_system_prompt(
        cls,
        user_context: str = "",
        rag_context: str = "",
    ) -> str:
        """Format the system prompt with context."""
        return cls.SYSTEM_PROMPT.format(
            user_context=user_context or "No hay contexto específico del usuario disponible.",
            rag_context=rag_context or "No hay contenido educativo específico disponible.",
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
