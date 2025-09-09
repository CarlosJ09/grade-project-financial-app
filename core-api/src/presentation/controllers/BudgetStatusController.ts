import { BudgetStatusResponseDto } from '@/presentation/dtos/response/BudgetStatusResponseDto';
import { GetAllBudgetStatuses } from '@/use-cases/budgetStatus/GetAllBudgetStatuses';
import { GetBudgetStatusById } from '@/use-cases/budgetStatus/GetBudgetStatusById';
import { Request, Response } from 'express';
import { BaseController } from './BaseController';

export class BudgetStatusController extends BaseController {
  constructor(
    private getAllBudgetStatuses: GetAllBudgetStatuses,
    private getBudgetStatusById: GetBudgetStatusById
  ) {
    super();
  }

  async getAll(req: Request, res: Response) {
    return this.handleGetAll(
      req,
      res,
      this.getAllBudgetStatuses,
      BudgetStatusResponseDto
    );
  }

  async getById(req: Request, res: Response) {
    return this.handleGetById(
      req,
      res,
      this.getBudgetStatusById,
      BudgetStatusResponseDto,
      'Budget status'
    );
  }
}
