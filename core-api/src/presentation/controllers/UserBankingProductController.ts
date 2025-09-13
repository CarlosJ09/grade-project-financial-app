import { UserBankingProductResponseDto } from '@/presentation/dtos/response/UserBankingProductResponseDto';
import { CreateUserBankingProduct } from '@/use-cases/userBankingProduct/CreateUserBankingProduct';
import { DeleteUserBankingProduct } from '@/use-cases/userBankingProduct/DeleteUserBankingProduct';
import { GetAllUserBankingProductsByUserId } from '@/use-cases/userBankingProduct/GetAllUserBankingProductsByUserId';
import { GetUserBankingProductById } from '@/use-cases/userBankingProduct/GetUserBankingProductById';
import { UpdateUserBankingProduct } from '@/use-cases/userBankingProduct/UpdateUserBankingProduct';
import { Request, Response } from 'express';
import { BaseController } from './BaseController';

export class UserBankingProductController extends BaseController {
  constructor(
    private getAllUserBankingProductsByUserId: GetAllUserBankingProductsByUserId,
    private getUserBankingProductById: GetUserBankingProductById,
    private createUserBankingProduct: CreateUserBankingProduct,
    private updateUserBankingProduct: UpdateUserBankingProduct,
    private deleteUserBankingProduct: DeleteUserBankingProduct
  ) {
    super();
  }

  async getAllByUserId(req: Request, res: Response) {
    return this.executeOperation(
      res,
      async () => {
        const { userId } = req.params;

        if (!userId) {
          return this.badRequest(res, 'User ID parameter is required');
        }

        const entities =
          await this.getAllUserBankingProductsByUserId.execute(userId);
        const dtos = entities.map(UserBankingProductResponseDto.fromEntity);
        return this.ok(res, dtos);
      },
      'Error retrieving user banking products'
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
