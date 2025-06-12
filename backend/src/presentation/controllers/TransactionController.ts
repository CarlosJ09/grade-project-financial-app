import { Request, Response } from 'express';
import { GetAllTransactions } from '@/use-cases/transaction/GetAllTransactions';
import { GetTransactionById } from '@/use-cases/transaction/GetTransactionById';
import { CreateTransaction } from '@/use-cases/transaction/CreateTransaction';
import { UpdateTransaction } from '@/use-cases/transaction/UpdateTransaction';
import { DeleteTransaction } from '@/use-cases/transaction/DeleteTransaction';
import { TransactionResponseDto } from '@/presentation/dtos/response/TransactionResponseDto';
import { BaseController } from './BaseController';

export class TransactionController extends BaseController {
    constructor(
        private getAllTransactions: GetAllTransactions, 
        private getTransactionById: GetTransactionById,
        private createTransaction: CreateTransaction,
        private updateTransaction: UpdateTransaction,
        private deleteTransaction: DeleteTransaction
    ) {
        super();
    }

    async getAll(req: Request, res: Response) {
        return this.handleGetAll(req, res, this.getAllTransactions, TransactionResponseDto);
    }

    async getById(req: Request, res: Response) {
        return this.handleGetById(req, res, this.getTransactionById, TransactionResponseDto, 'Transaction');
    }

    async create(req: Request, res: Response) {
        return this.handleCreate(req, res, this.createTransaction, TransactionResponseDto, 'Transaction');
    }

    async update(req: Request, res: Response) {
        return this.handleUpdate(req, res, this.updateTransaction, TransactionResponseDto, 'Transaction');
    }

    async delete(req: Request, res: Response) {
        return this.handleDelete(req, res, this.deleteTransaction, 'Transaction');
    }
} 