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
    try {
      const budgetTypeId = req.query.budgetTypeId
        ? Number(req.query.budgetTypeId)
        : undefined;
      const budgetCategories =
        await this.getAllBudgetCategories.execute(budgetTypeId);
      const response = budgetCategories.map(
        BudgetCategoryResponseDto.fromEntity
      );

      return res.status(200).json({
        success: true,
        data: response,
        message: 'Budget categories retrieved successfully',
      });
    } catch (error) {
      return this.handleError(
        res,
        error,
        'Failed to retrieve budget categories'
      );
    }
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
