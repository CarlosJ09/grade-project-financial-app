import api from '@/interceptor/core-api';
import type { Course } from '@/types/education';
import { BaseService } from './base';

export class CourseService extends BaseService<Course> {
  constructor() {
    super('/courses');
  }

  async getCourseWithModules(id: number): Promise<Course & { modules: any[] }> {
    const response = await api.get(`${this.endpoint}/${id}/modules`);
    return response.data;
  }
}

export const courseService = new CourseService();
