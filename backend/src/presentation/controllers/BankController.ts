import { Request, Response } from 'express';
import { GetAllBanks } from '@/use-cases/bank/GetAllBanks';
import { GetBankById } from '@/use-cases/bank/GetBankById';
import { CreateBank } from '@/use-cases/bank/CreateBank';
import { UpdateBank } from '@/use-cases/bank/UpdateBank';
import { DeleteBank } from '@/use-cases/bank/DeleteBank';
import { BankResponseDto } from '@/presentation/dtos/response/BankResponseDto';
import { BaseController } from './BaseController';

export class BankController extends BaseController {
    constructor(
        private getAllBanks: GetAllBanks, 
        private getBankById: GetBankById,
        private createBank: CreateBank,
        private updateBank: UpdateBank,
        private deleteBank: DeleteBank
    ) {
        super();
    }

    async getAll(req: Request, res: Response) {
        return this.handleGetAll(req, res, this.getAllBanks, BankResponseDto);
    }

    async getById(req: Request, res: Response) {
        return this.handleGetById(req, res, this.getBankById, BankResponseDto, 'Bank');
    }

    async create(req: Request, res: Response) {
        return this.handleCreate(req, res, this.createBank, BankResponseDto, 'Bank');
    }

    async update(req: Request, res: Response) {
        return this.handleUpdate(req, res, this.updateBank, BankResponseDto, 'Bank');
    }

    async delete(req: Request, res: Response) {
        return this.handleDelete(req, res, this.deleteBank, 'Bank');
    }
}