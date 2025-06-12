import { Request, Response } from 'express';
import { GetAllBudgets } from '@/use-cases/budget/GetAllBudgets';
import { GetBudgetById } from '@/use-cases/budget/GetBudgetById';
import { CreateBudget } from '@/use-cases/budget/CreateBudget';
import { UpdateBudget } from '@/use-cases/budget/UpdateBudget';
import { DeleteBudget } from '@/use-cases/budget/DeleteBudget';
import { BudgetResponseDto } from '@/presentation/dtos/response/BudgetResponseDto';
import { BaseController } from './BaseController';

export class BudgetController extends BaseController {
    constructor(
        private getAllBudgets: GetAllBudgets, 
        private getBudgetById: GetBudgetById,
        private createBudget: CreateBudget,
        private updateBudget: UpdateBudget,
        private deleteBudget: DeleteBudget
    ) {
        super();
    }

    async getAll(req: Request, res: Response) {
        return this.handleGetAll(req, res, this.getAllBudgets, BudgetResponseDto);
    }

    async getById(req: Request, res: Response) {
        return this.handleGetById(req, res, this.getBudgetById, BudgetResponseDto, 'Budget');
    }

    async create(req: Request, res: Response) {
        return this.handleCreate(req, res, this.createBudget, BudgetResponseDto, 'Budget');
    }

    async update(req: Request, res: Response) {
        return this.handleUpdate(req, res, this.updateBudget, BudgetResponseDto, 'Budget');
    }

    async delete(req: Request, res: Response) {
        return this.handleDelete(req, res, this.deleteBudget, 'Budget');
    }
} 