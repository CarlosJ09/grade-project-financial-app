import { Request, Response } from 'express';
import { GetAllBanks } from '@/use-cases/bank/GetAllBanks';
import { GetBankById } from '@/use-cases/bank/GetBankById';
import { BankResponseDto } from '@/presentation/dtos/response/BankResponseDto';


export class BankController {
    constructor(private getAllBanks: GetAllBanks, private getBankById: GetBankById) { }

    async getAll(req: Request, res: Response) {
        const banks = await this.getAllBanks.execute();
        const bankDtos = banks.map(BankResponseDto.fromEntity);
        res.json(bankDtos);
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;
        const bank = await this.getBankById.execute(id);

        if (!bank) {
            return res.status(404).json({ message: 'Bank not found' });
        }

        const bankDto = BankResponseDto.fromEntity(bank);
        res.json(bankDto);
    }
}