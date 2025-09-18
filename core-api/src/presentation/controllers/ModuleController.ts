import { ModuleResponseDto } from '@/presentation/dtos/response/ModuleResponseDto';
import { CreateModule } from '@/use-cases/module/CreateModule';
import { DeleteModule } from '@/use-cases/module/DeleteModule';
import { GetAllModules } from '@/use-cases/module/GetAllModules';
import { GetModuleById } from '@/use-cases/module/GetModuleById';
import { GetModulesByCourseId } from '@/use-cases/module/GetModulesByCourseId';
import { UpdateModule } from '@/use-cases/module/UpdateModule';
import { Request, Response } from 'express';
import { BaseController } from './BaseController';

export class ModuleController extends BaseController {
  constructor(
    private getAllModules: GetAllModules,
    private getModuleById: GetModuleById,
    private GetModulesByCourseId: GetModulesByCourseId,
    private createModule: CreateModule,
    private updateModule: UpdateModule,
    private deleteModule: DeleteModule
  ) {
    super();
  }

  async getAll(req: Request, res: Response) {
    return this.handleGetAll(req, res, this.getAllModules, ModuleResponseDto);
  }

  async getById(req: Request, res: Response) {
    return this.handleGetById(
      req,
      res,
      this.getModuleById,
      ModuleResponseDto,
      'Module'
    );
  }

  async getByCourseId(req: Request, res: Response) {
    return this.executeOperation(
      res,
      async () => {
        const { courseId } = req.params;

        if (!courseId) {
          return this.badRequest(res, 'Course ID parameter is required');
        }

        const entities = await this.getModulesByCourseId.execute(courseId);
        const dtos = entities.map(ModuleResponseDto.fromEntity);
        return this.ok(res, dtos);
      },
      'Error retrieving modules by course ID'
    );
  }

  async create(req: Request, res: Response) {
    return this.handleCreate(
      req,
      res,
      this.createModule,
      ModuleResponseDto,
      'Module'
    );
  }

  async update(req: Request, res: Response) {
    return this.handleUpdate(
      req,
      res,
      this.updateModule,
      ModuleResponseDto,
      'Module'
    );
  }

  async delete(req: Request, res: Response) {
    return this.handleDelete(req, res, this.deleteModule, 'Module');
  }
}
