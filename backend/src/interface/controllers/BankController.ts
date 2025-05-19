import { Request, Response } from 'express';
import { GetAllBanks } from '@/use-cases/bank/GetAllBanks';
import { GetBankById } from '@/use-cases/bank/GetBankById';

export class BankController {
    constructor(private getAllBanks: GetAllBanks, private getBankById: GetBankById) { }

    async getAll(req: Request, res: Response) {
        const banks = await this.getAllBanks.execute();
        res.json(banks);
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;
        const bank = await this.getBankById.execute(id);
        res.json(bank);
    }
}