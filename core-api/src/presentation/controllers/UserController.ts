import { UserBalanceResponseDto } from '@/presentation/dtos/response/UserBalanceResponseDto';
import { UserExpenseAnalyticsResponseDto } from '@/presentation/dtos/response/UserExpenseAnalyticsResponseDto';
import { UserResponseDto } from '@/presentation/dtos/response/UserResponseDto';
import { GetAllUsers } from '@/use-cases/user/GetAllUsers';
import { GetUserBalance } from '@/use-cases/user/GetUserBalance';
import { GetUserById } from '@/use-cases/user/GetUserById';
import { GetUserExpenseAnalytics } from '@/use-cases/user/GetUserExpenseAnalytics';
import { Request, Response } from 'express';
import { BaseController } from './BaseController';

export class UserController extends BaseController {
  constructor(
    private getAllUsers: GetAllUsers,
    private getUserById: GetUserById,
    private getUserBalance: GetUserBalance,
    private getUserExpenseAnalytics: GetUserExpenseAnalytics
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

  async getBalance(req: Request, res: Response) {
    return this.executeOperation(
      res,
      async () => {
        const { id } = req.params;
        const { baseCurrencyId, fromDate, toDate } = req.query;

        if (!id) {
          return this.badRequest(res, 'User ID parameter is required');
        }

        const request = {
          userId: id,
          baseCurrencyId: baseCurrencyId
            ? parseInt(baseCurrencyId as string)
            : undefined,
          fromDate: fromDate ? new Date(fromDate as string) : undefined,
          toDate: toDate ? new Date(toDate as string) : undefined,
        };

        const balanceData = await this.getUserBalance.execute(request);
        const dto = UserBalanceResponseDto.fromData(balanceData);

        return this.ok(res, dto);
      },
      'Error retrieving user balance'
    );
  }

  async getExpenseAnalytics(req: Request, res: Response) {
    return this.executeOperation(
      res,
      async () => {
        const { id } = req.params;
        const { baseCurrencyId, fromDate, toDate } = req.query;

        if (!id) {
          return this.badRequest(res, 'User ID parameter is required');
        }

        const request = {
          userId: id,
          baseCurrencyId: baseCurrencyId
            ? parseInt(baseCurrencyId as string)
            : undefined,
          fromDate: fromDate ? new Date(fromDate as string) : undefined,
          toDate: toDate ? new Date(toDate as string) : undefined,
        };

        const analyticsData =
          await this.getUserExpenseAnalytics.execute(request);
        const dto = UserExpenseAnalyticsResponseDto.fromData(analyticsData);

        return this.ok(res, dto);
      },
      'Error retrieving user expense analytics'
    );
  }
}
