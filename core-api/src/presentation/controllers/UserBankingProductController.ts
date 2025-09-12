import { UserBankingProductResponseDto } from '@/presentation/dtos/response/UserBankingProductResponseDto';
import { CreateUserBankingProduct } from '@/use-cases/userBankingProduct/CreateUserBankingProduct';
import { DeleteUserBankingProduct } from '@/use-cases/userBankingProduct/DeleteUserBankingProduct';
import { GetAllUserBankingProducts } from '@/use-cases/userBankingProduct/GetAllUserBankingProducts';
import { GetUserBankingProductById } from '@/use-cases/userBankingProduct/GetUserBankingProductById';
import { UpdateUserBankingProduct } from '@/use-cases/userBankingProduct/UpdateUserBankingProduct';
import { Request, Response } from 'express';
import { BaseController } from './BaseController';

export class UserBankingProductController extends BaseController {
  constructor(
    private getAllUserBankingProducts: GetAllUserBankingProducts,
    private getUserBankingProductById: GetUserBankingProductById,
    private createUserBankingProduct: CreateUserBankingProduct,
    private updateUserBankingProduct: UpdateUserBankingProduct,
    private deleteUserBankingProduct: DeleteUserBankingProduct
  ) {
    super();
  }

  async getAll(req: Request, res: Response) {
    return this.handleGetAll(
      req,
      res,
      this.getAllUserBankingProducts,
      UserBankingProductResponseDto
    );
  }

  async getById(req: Request, res: Response) {
    return this.handleGetById(
      req,
      res,
      this.getUserBankingProductById,
      UserBankingProductResponseDto,
      'User banking product'
    );
  }

  async create(req: Request, res: Response) {
    return this.handleCreate(
      req,
      res,
      this.createUserBankingProduct,
      UserBankingProductResponseDto,
      'User banking product'
    );
  }

  async update(req: Request, res: Response) {
    return this.handleUpdate(
      req,
      res,
      this.updateUserBankingProduct,
      UserBankingProductResponseDto,
      'User banking product'
    );
  }

  async delete(req: Request, res: Response) {
    return this.handleDelete(
      req,
      res,
      this.deleteUserBankingProduct,
      'User banking product'
    );
  }
}
