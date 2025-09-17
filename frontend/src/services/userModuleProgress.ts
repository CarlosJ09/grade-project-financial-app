import api from '@/interceptor/core-api';
import type { UserModuleProgress } from '@/types/education';
import { BaseService } from './base';

export class UserModuleProgressService extends BaseService<UserModuleProgress> {
  constructor() {
    super('/user-module-progress');
  }

  async getUserProgress(userId: string): Promise<UserModuleProgress[]> {
    const response = await api.get(`${this.endpoint}?userId=${userId}`);
    return response.data;
  }

  async updateProgress(
    moduleId: number,
    progressPercent: number
  ): Promise<UserModuleProgress> {
    const response = await api.put(`${this.endpoint}/${moduleId}`, {
      progressPercent,
      status: progressPercent >= 100 ? 'completed' : 'in_progress',
    });
    return response.data;
  }

  async startModule(moduleId: number): Promise<UserModuleProgress> {
    const response = await api.post(this.endpoint, {
      moduleId,
      status: 'in_progress',
      progressPercent: 0,
      startedAt: new Date().toISOString(),
    });
    return response.data;
  }

  async completeModule(moduleId: number): Promise<UserModuleProgress> {
    const response = await api.put(`${this.endpoint}/${moduleId}`, {
      status: 'completed',
      progressPercent: 100,
      completedAt: new Date().toISOString(),
    });
    return response.data;
  }
}

export const userModuleProgressService = new UserModuleProgressService();
