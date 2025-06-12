import { Request, Response } from 'express';
import { GetAllBanks } from '@/use-cases/bank/GetAllBanks';
import { GetBankById } from '@/use-cases/bank/GetBankById';
import { BankResponseDto } from '@/presentation/dtos/response/BankResponseDto';
import { BaseController } from './BaseController';

export class BankController extends BaseController {
    constructor(private getAllBanks: GetAllBanks, private getBankById: GetBankById) {
        super();
    }

    async getAll(req: Request, res: Response) {
        return this.handleGetAll(req, res, this.getAllBanks, BankResponseDto);
    }

    async getById(req: Request, res: Response) {
        return this.handleGetById(req, res, this.getBankById, BankResponseDto, 'Bank');
    }
}