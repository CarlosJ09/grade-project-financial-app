import { Request, Response } from 'express';
import { GetAllModules } from '@/use-cases/module/GetAllModules';
import { GetModuleById } from '@/use-cases/module/GetModuleById';
import { CreateModule } from '@/use-cases/module/CreateModule';
import { UpdateModule } from '@/use-cases/module/UpdateModule';
import { DeleteModule } from '@/use-cases/module/DeleteModule';
import { ModuleResponseDto } from '@/presentation/dtos/response/ModuleResponseDto';
import { BaseController } from './BaseController';

export class ModuleController extends BaseController {
    constructor(
        private getAllModules: GetAllModules, 
        private getModuleById: GetModuleById,
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
        return this.handleGetById(req, res, this.getModuleById, ModuleResponseDto, 'Module');
    }

    async create(req: Request, res: Response) {
        return this.handleCreate(req, res, this.createModule, ModuleResponseDto, 'Module');
    }

    async update(req: Request, res: Response) {
        return this.handleUpdate(req, res, this.updateModule, ModuleResponseDto, 'Module');
    }

    async delete(req: Request, res: Response) {
        return this.handleDelete(req, res, this.deleteModule, 'Module');
    }
} 