import { IUserBankingProductRepository } from '@/domain/repositories/IUserBankingProductRepository';
import { Decimal } from '@prisma/client/runtime/library';

interface UpdateAccountBalanceRequest {
  accountId: string;
  newBalance: Decimal;
  userId?: string; // For validation
}

export class UpdateAccountBalance {
  constructor(
    private userBankingProductRepository: IUserBankingProductRepository
  ) {}

  async execute(request: UpdateAccountBalanceRequest): Promise<void> {
    const { accountId, newBalance, userId } = request;

    // Get the account to validate ownership if userId is provided
    if (userId) {
      const account =
        await this.userBankingProductRepository.findById(accountId);
      if (!account) {
        throw new Error('Account not found');
      }
      if (account.userId !== userId) {
        throw new Error('Unauthorized: Account does not belong to user');
      }
    }

    // Update the account balance
    await this.userBankingProductRepository.updateBalance(
      accountId,
      newBalance
    );
  }
}
