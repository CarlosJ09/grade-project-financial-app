import { TransactionCategoryResponseDto } from '@/presentation/dtos/response/TransactionCategoryResponseDto';
import { GetAllTransactionCategories } from '@/use-cases/transactionCategory/GetAllTransactionCategories';
import { GetTransactionCategoryById } from '@/use-cases/transactionCategory/GetTransactionCategoryById';
import { Request, Response } from 'express';
import { BaseController } from './BaseController';

export class TransactionCategoryController extends BaseController {
  constructor(
    private getAllTransactionCategories: GetAllTransactionCategories,
    private getTransactionCategoryById: GetTransactionCategoryById
  ) {
    super();
  }

  async getAll(req: Request, res: Response) {
    return this.handleGetAll(
      req,
      res,
      this.getAllTransactionCategories,
      TransactionCategoryResponseDto
    );
  }

  async getById(req: Request, res: Response) {
    return this.handleGetById(
      req,
      res,
      this.getTransactionCategoryById,
      TransactionCategoryResponseDto,
      'Transaction category'
    );
  }
}
