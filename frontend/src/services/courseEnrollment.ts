import api from '@/interceptor/core-api';
import type { CourseEnrollment } from '@/types/education';
import { BaseService } from './base';

export class CourseEnrollmentService extends BaseService<CourseEnrollment> {
  constructor() {
    super('/course-enrollments');
  }

  async enrollInCourse({
    userId,
    courseId,
  }: {
    userId: string;
    courseId: number;
  }): Promise<CourseEnrollment> {
    const response = await api.post(this.endpoint, {
      courseId,
      userId,
      enrolledAt: new Date().toISOString(),
    });
    return response.data;
  }

  async getUserEnrollments(userId: string): Promise<CourseEnrollment[]> {
    const response = await api.get(`${this.endpoint}?userId=${userId}`);
    return response.data;
  }

  async unenrollFromCourse(id: number): Promise<void> {
    await api.put(`${this.endpoint}/${id}`, {
      unenrolledAt: new Date().toISOString(),
    });
  }
}

export const courseEnrollmentService = new CourseEnrollmentService();
