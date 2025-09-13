import { UserBankingProduct } from '@/domain/entities/UserBankingProduct';
import { Decimal } from '@prisma/client/runtime/library';
import { IBaseRepository } from './IBaseRepository';

export interface IUserBankingProductRepository
  extends IBaseRepository<UserBankingProduct> {
  findByUserId(userId: string): Promise<UserBankingProduct[]>;
  updateBalance(accountId: string, newBalance: Decimal): Promise<void>;
}
