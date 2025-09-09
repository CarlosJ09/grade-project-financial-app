import { BudgetTypeResponseDto } from '@/presentation/dtos/response/BudgetTypeResponseDto';
import { GetAllBudgetTypes } from '@/use-cases/budgetType/GetAllBudgetTypes';
import { GetBudgetTypeById } from '@/use-cases/budgetType/GetBudgetTypeById';
import { Request, Response } from 'express';
import { BaseController } from './BaseController';

export class BudgetTypeController extends BaseController {
  constructor(
    private getAllBudgetTypes: GetAllBudgetTypes,
    private getBudgetTypeById: GetBudgetTypeById
  ) {
    super();
  }

  async getAll(req: Request, res: Response) {
    return this.handleGetAll(
      req,
      res,
      this.getAllBudgetTypes,
      BudgetTypeResponseDto
    );
  }

  async getById(req: Request, res: Response) {
    return this.handleGetById(
      req,
      res,
      this.getBudgetTypeById,
      BudgetTypeResponseDto,
      'Budget type'
    );
  }
}
