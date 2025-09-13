import { MerchantResponseDto } from '@/presentation/dtos/response/MerchantResponseDto';
import { GetAllMerchants } from '@/use-cases/merchant/GetAllMerchants';
import { GetMerchantById } from '@/use-cases/merchant/GetMerchantById';
import { Request, Response } from 'express';
import { BaseController } from './BaseController';

export class MerchantController extends BaseController {
  constructor(
    private getAllMerchants: GetAllMerchants,
    private getMerchantById: GetMerchantById
  ) {
    super();
  }

  async getAll(req: Request, res: Response) {
    return this.handleGetAll(
      req,
      res,
      this.getAllMerchants,
      MerchantResponseDto
    );
  }

  async getById(req: Request, res: Response) {
    return this.handleGetById(
      req,
      res,
      this.getMerchantById,
      MerchantResponseDto,
      'Merchant'
    );
  }
}
