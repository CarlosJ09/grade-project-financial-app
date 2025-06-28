import { Request, Response } from 'express';
import { GetAllBankingProducts } from '@/use-cases/bankingProduct/GetAllBankingProducts';
import { GetBankingProductById } from '@/use-cases/bankingProduct/GetBankingProductById';
import { CreateBankingProduct } from '@/use-cases/bankingProduct/CreateBankingProduct';
import { UpdateBankingProduct } from '@/use-cases/bankingProduct/UpdateBankingProduct';
import { DeleteBankingProduct } from '@/use-cases/bankingProduct/DeleteBankingProduct';
import { BankingProductResponseDto } from '@/presentation/dtos/response/BankingProductResponseDto';
import { BaseController } from './BaseController';

export class BankingProductController extends BaseController {
  constructor(
    private getAllBankingProducts: GetAllBankingProducts,
    private getBankingProductById: GetBankingProductById,
    private createBankingProduct: CreateBankingProduct,
    private updateBankingProduct: UpdateBankingProduct,
    private deleteBankingProduct: DeleteBankingProduct
  ) {
    super();
  }

  async getAll(req: Request, res: Response) {
    return this.handleGetAll(
      req,
      res,
      this.getAllBankingProducts,
      BankingProductResponseDto
    );
  }

  async getById(req: Request, res: Response) {
    return this.handleGetById(
      req,
      res,
      this.getBankingProductById,
      BankingProductResponseDto,
      'BankingProduct'
    );
  }

  async create(req: Request, res: Response) {
    return this.handleCreate(
      req,
      res,
      this.createBankingProduct,
      BankingProductResponseDto,
      'BankingProduct'
    );
  }

  async update(req: Request, res: Response) {
    return this.handleUpdate(
      req,
      res,
      this.updateBankingProduct,
      BankingProductResponseDto,
      'BankingProduct'
    );
  }

  async delete(req: Request, res: Response) {
    return this.handleDelete(
      req,
      res,
      this.deleteBankingProduct,
      'BankingProduct'
    );
  }
}
