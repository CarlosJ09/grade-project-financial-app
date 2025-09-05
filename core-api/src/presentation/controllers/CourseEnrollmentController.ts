import { Request, Response } from 'express';
import { GetAllCourseEnrollments } from '@/use-cases/courseEnrollment/GetAllCourseEnrollments';
import { GetCourseEnrollmentById } from '@/use-cases/courseEnrollment/GetCourseEnrollmentById';
import { CreateCourseEnrollment } from '@/use-cases/courseEnrollment/CreateCourseEnrollment';
import { UpdateCourseEnrollment } from '@/use-cases/courseEnrollment/UpdateCourseEnrollment';
import { DeleteCourseEnrollment } from '@/use-cases/courseEnrollment/DeleteCourseEnrollment';
import { CourseEnrollmentResponseDto } from '@/presentation/dtos/response/CourseEnrollmentResponseDto';
import { BaseController } from './BaseController';

export class CourseEnrollmentController extends BaseController {
  constructor(
    private getAllCourseEnrollments: GetAllCourseEnrollments,
    private getCourseEnrollmentById: GetCourseEnrollmentById,
    private createCourseEnrollment: CreateCourseEnrollment,
    private updateCourseEnrollment: UpdateCourseEnrollment,
    private deleteCourseEnrollment: DeleteCourseEnrollment
  ) {
    super();
  }

  async getAll(req: Request, res: Response) {
    return this.handleGetAll(
      req,
      res,
      this.getAllCourseEnrollments,
      CourseEnrollmentResponseDto
    );
  }

  async getById(req: Request, res: Response) {
    return this.handleGetById(
      req,
      res,
      this.getCourseEnrollmentById,
      CourseEnrollmentResponseDto,
      'CourseEnrollment'
    );
  }

  async create(req: Request, res: Response) {
    return this.handleCreate(
      req,
      res,
      this.createCourseEnrollment,
      CourseEnrollmentResponseDto,
      'CourseEnrollment'
    );
  }

  async update(req: Request, res: Response) {
    return this.handleUpdate(
      req,
      res,
      this.updateCourseEnrollment,
      CourseEnrollmentResponseDto,
      'CourseEnrollment'
    );
  }

  async delete(req: Request, res: Response) {
    return this.handleDelete(
      req,
      res,
      this.deleteCourseEnrollment,
      'CourseEnrollment'
    );
  }
}
