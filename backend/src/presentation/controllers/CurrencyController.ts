import { Request, Response } from 'express';
import { GetAllCurrencies } from '@/use-cases/currency/GetAllCurrencies';
import { GetCurrencyById } from '@/use-cases/currency/GetCurrencyById';
import { CurrencyResponseDto } from '@/presentation/dtos/response/CurrencyResponseDto';
import { BaseController } from './BaseController';

export class CurrencyController extends BaseController {
  constructor(
    private getAllCurrencies: GetAllCurrencies,
    private getCurrencyById: GetCurrencyById
  ) {
    super();
  }

  async getAll(req: Request, res: Response) {
    return this.handleGetAll(
      req,
      res,
      this.getAllCurrencies,
      CurrencyResponseDto
    );
  }

  async getById(req: Request, res: Response) {
    return this.handleGetById(
      req,
      res,
      this.getCurrencyById,
      CurrencyResponseDto,
      'Currency'
    );
  }
}
