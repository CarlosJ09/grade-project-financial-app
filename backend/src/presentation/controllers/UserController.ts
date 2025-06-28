import { Request, Response } from 'express';
import { GetAllUsers } from '@/use-cases/user/GetAllUsers';
import { GetUserById } from '@/use-cases/user/GetUserById';
import { UserResponseDto } from '@/presentation/dtos/response/UserResponseDto';
import { BaseController } from './BaseController';

export class UserController extends BaseController {
  constructor(
    private getAllUsers: GetAllUsers,
    private getUserById: GetUserById
  ) {
    super();
  }

  async getAll(req: Request, res: Response) {
    return this.handleGetAll(req, res, this.getAllUsers, UserResponseDto);
  }

  async getById(req: Request, res: Response) {
    return this.handleGetById(
      req,
      res,
      this.getUserById,
      UserResponseDto,
      'User'
    );
  }
}
