import api from '@/interceptor/core-api';
import type { Module } from '@/types/education';
import { BaseService } from './base';

export class ModuleService extends BaseService<Module> {
  constructor() {
    super('/modules');
  }

  async getModulesByCourse(courseId: number): Promise<Module[]> {
    const response = await api.get(`${this.endpoint}/course/${courseId}`);
    return response.data;
  }
}

export const moduleService = new ModuleService();
