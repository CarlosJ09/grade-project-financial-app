import { Request, Response } from 'express';
import { GetAllUserBanks } from '@/use-cases/userBank/GetAllUserBanks';
import { GetUserBankById } from '@/use-cases/userBank/GetUserBankById';
import { CreateUserBank } from '@/use-cases/userBank/CreateUserBank';
import { UpdateUserBank } from '@/use-cases/userBank/UpdateUserBank';
import { DeleteUserBank } from '@/use-cases/userBank/DeleteUserBank';
import { UserBankResponseDto } from '@/presentation/dtos/response/UserBankResponseDto';
import { BaseController } from './BaseController';

export class UserBankController extends BaseController {
  constructor(
    private getAllUserBanks: GetAllUserBanks,
    private getUserBankById: GetUserBankById,
    private createUserBank: CreateUserBank,
    private updateUserBank: UpdateUserBank,
    private deleteUserBank: DeleteUserBank
  ) {
    super();
  }

  async getAll(req: Request, res: Response) {
    return this.handleGetAll(
      req,
      res,
      this.getAllUserBanks,
      UserBankResponseDto
    );
  }

  async getById(req: Request, res: Response) {
    return this.handleGetById(
      req,
      res,
      this.getUserBankById,
      UserBankResponseDto,
      'UserBank'
    );
  }

  async create(req: Request, res: Response) {
    return this.handleCreate(
      req,
      res,
      this.createUserBank,
      UserBankResponseDto,
      'UserBank'
    );
  }

  async update(req: Request, res: Response) {
    return this.handleUpdate(
      req,
      res,
      this.updateUserBank,
      UserBankResponseDto,
      'UserBank'
    );
  }

  async delete(req: Request, res: Response) {
    return this.handleDelete(req, res, this.deleteUserBank, 'UserBank');
  }
}
