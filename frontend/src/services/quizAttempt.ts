import api from '@/interceptor/core-api';
import type { QuizAttempt, QuizAttemptAnswer } from '@/types/education';
import { BaseService } from './base';

export class QuizAttemptService extends BaseService<QuizAttempt> {
  constructor() {
    super('/quiz-attempts');
  }

  async getUserAttempts(userId: string): Promise<QuizAttempt[]> {
    const response = await api.get(`${this.endpoint}?userId=${userId}`);
    return response.data;
  }

  async startQuiz(contentItemId: number): Promise<QuizAttempt> {
    const response = await api.post(this.endpoint, {
      contentItemId,
      status: 'in_progress',
      startedAt: new Date().toISOString(),
      attemptNo: 1,
      score: 0,
    });
    return response.data;
  }

  async submitQuiz(
    attemptId: number,
    answers: QuizAttemptAnswer[],
    score: number
  ): Promise<QuizAttempt> {
    const response = await api.put(`${this.endpoint}/${attemptId}`, {
      status: 'completed',
      finishedAt: new Date().toISOString(),
      score,
      answers,
    });
    return response.data;
  }
}

export const quizAttemptService = new QuizAttemptService();
