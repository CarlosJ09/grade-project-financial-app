import { TransactionTypeResponseDto } from '@/presentation/dtos/response/TransactionTypeResponseDto';
import { GetAllTransactionTypes } from '@/use-cases/transactionType/GetAllTransactionTypes';
import { GetTransactionTypeById } from '@/use-cases/transactionType/GetTransactionTypeById';
import { Request, Response } from 'express';
import { BaseController } from './BaseController';

export class TransactionTypeController extends BaseController {
  constructor(
    private getAllTransactionTypes: GetAllTransactionTypes,
    private getTransactionTypeById: GetTransactionTypeById
  ) {
    super();
  }

  async getAll(req: Request, res: Response) {
    return this.handleGetAll(
      req,
      res,
      this.getAllTransactionTypes,
      TransactionTypeResponseDto
    );
  }

  async getById(req: Request, res: Response) {
    return this.handleGetById(
      req,
      res,
      this.getTransactionTypeById,
      TransactionTypeResponseDto,
      'Transaction type'
    );
  }
}
