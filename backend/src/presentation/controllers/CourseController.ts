import { Request, Response } from 'express';
import { GetAllCourses } from '@/use-cases/course/GetAllCourses';
import { GetCourseById } from '@/use-cases/course/GetCourseById';
import { CreateCourse } from '@/use-cases/course/CreateCourse';
import { UpdateCourse } from '@/use-cases/course/UpdateCourse';
import { DeleteCourse } from '@/use-cases/course/DeleteCourse';
import { CourseResponseDto } from '@/presentation/dtos/response/CourseResponseDto';
import { BaseController } from './BaseController';

export class CourseController extends BaseController {
  constructor(
    private getAllCourses: GetAllCourses,
    private getCourseById: GetCourseById,
    private createCourse: CreateCourse,
    private updateCourse: UpdateCourse,
    private deleteCourse: DeleteCourse
  ) {
    super();
  }

  async getAll(req: Request, res: Response) {
    return this.handleGetAll(req, res, this.getAllCourses, CourseResponseDto);
  }

  async getById(req: Request, res: Response) {
    return this.handleGetById(
      req,
      res,
      this.getCourseById,
      CourseResponseDto,
      'Course'
    );
  }

  async create(req: Request, res: Response) {
    return this.handleCreate(
      req,
      res,
      this.createCourse,
      CourseResponseDto,
      'Course'
    );
  }

  async update(req: Request, res: Response) {
    return this.handleUpdate(
      req,
      res,
      this.updateCourse,
      CourseResponseDto,
      'Course'
    );
  }

  async delete(req: Request, res: Response) {
    return this.handleDelete(req, res, this.deleteCourse, 'Course');
  }
}
