import { Request, Response } from 'express';
import { GetAllExchangeRates } from '@/use-cases/exchangeRate/GetAllExchangeRates';
import { GetExchangeRateById } from '@/use-cases/exchangeRate/GetExchangeRateById';
import { CreateExchangeRate } from '@/use-cases/exchangeRate/CreateExchangeRate';
import { UpdateExchangeRate } from '@/use-cases/exchangeRate/UpdateExchangeRate';
import { DeleteExchangeRate } from '@/use-cases/exchangeRate/DeleteExchangeRate';
import { ExchangeRateResponseDto } from '@/presentation/dtos/response/ExchangeRateResponseDto';
import { BaseController } from './BaseController';

export class ExchangeRateController extends BaseController {
    constructor(
        private getAllExchangeRates: GetAllExchangeRates, 
        private getExchangeRateById: GetExchangeRateById,
        private createExchangeRate: CreateExchangeRate,
        private updateExchangeRate: UpdateExchangeRate,
        private deleteExchangeRate: DeleteExchangeRate
    ) {
        super();
    }

    async getAll(req: Request, res: Response) {
        return this.handleGetAll(req, res, this.getAllExchangeRates, ExchangeRateResponseDto);
    }

    async getById(req: Request, res: Response) {
        return this.handleGetById(req, res, this.getExchangeRateById, ExchangeRateResponseDto, 'ExchangeRate');
    }

    async create(req: Request, res: Response) {
        return this.handleCreate(req, res, this.createExchangeRate, ExchangeRateResponseDto, 'ExchangeRate');
    }

    async update(req: Request, res: Response) {
        return this.handleUpdate(req, res, this.updateExchangeRate, ExchangeRateResponseDto, 'ExchangeRate');
    }

    async delete(req: Request, res: Response) {
        return this.handleDelete(req, res, this.deleteExchangeRate, 'ExchangeRate');
    }
} 