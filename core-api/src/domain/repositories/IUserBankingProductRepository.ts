import { UserBankingProduct } from '@/domain/entities/UserBankingProduct';
import { IBaseRepository } from './IBaseRepository';

export interface IUserBankingProductRepository
  extends IBaseRepository<UserBankingProduct> {
  findByUserId(userId: string): Promise<UserBankingProduct[]>;
}
