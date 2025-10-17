import agentApi from '@/interceptor/agent-api';

export interface ChatPayload {
  message: string;
  session_id?: string;
  user_id?: string;
  context?: Record<string, any>;
}

export interface ChatResponse {
  message: string;
  session_id: string;
  sources: string[];
  confidence_score: number;
  suggestions: string[];
}

export interface ConversationMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface ConversationHistory {
  session_id: string;
  messages: ConversationMessage[];
  created_at: string;
  updated_at: string;
  user_id?: string;
}

export interface HealthResponse {
  status: string;
  version: string;
  llm_status: string;
  rag_status: string;
}

export const agentChatService = {
  /**
   * Send a message to the AI agent
   */
  async sendMessage(payload: ChatPayload): Promise<ChatResponse> {
    const { data } = await agentApi.post<ChatResponse>('/chat', payload);
    return data;
  },

  /**
   * Get conversation history for a session
   */
  async getSession(sessionId: string): Promise<ConversationHistory> {
    const { data } = await agentApi.get<ConversationHistory>(
      `/sessions/${sessionId}`
    );
    return data;
  },

  /**
   * Delete a conversation session
   */
  async deleteSession(sessionId: string): Promise<{ message: string }> {
    const { data } = await agentApi.delete(`/sessions/${sessionId}`);
    return data;
  },

  /**
   * Check health status of the agent API
   */
  async health(): Promise<HealthResponse> {
    const { data } = await agentApi.get<HealthResponse>('/health');
    return data;
  },

  /**
   * Get system statistics
   */
  async getStats(): Promise<any> {
    const { data } = await agentApi.get('/stats');
    return data;
  },
};
