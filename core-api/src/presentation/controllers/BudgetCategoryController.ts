import { BudgetCategoryResponseDto } from '@/presentation/dtos/response/BudgetCategoryResponseDto';
import { GetAllBudgetCategories } from '@/use-cases/budgetCategory/GetAllBudgetCategories';
import { GetBudgetCategoryById } from '@/use-cases/budgetCategory/GetBudgetCategoryById';
import { Request, Response } from 'express';
import { BaseController } from './BaseController';

export class BudgetCategoryController extends BaseController {
  constructor(
    private getAllBudgetCategories: GetAllBudgetCategories,
    private getBudgetCategoryById: GetBudgetCategoryById
  ) {
    super();
  }

  async getAll(req: Request, res: Response) {
    return this.handleGetAll(
      req,
      res,
      this.getAllBudgetCategories,
      BudgetCategoryResponseDto
    );
  }

  async getById(req: Request, res: Response) {
    return this.handleGetById(
      req,
      res,
      this.getBudgetCategoryById,
      BudgetCategoryResponseDto,
      'Budget category'
    );
  }
}
