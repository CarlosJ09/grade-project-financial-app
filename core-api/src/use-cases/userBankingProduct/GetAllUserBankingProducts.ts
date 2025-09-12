import { UserBankingProduct } from '@/domain/entities/UserBankingProduct';
import { IUserBankingProductRepository } from '@/domain/repositories/IUserBankingProductRepository';

export class GetAllUserBankingProducts {
  constructor(
    private userBankingProductRepository: IUserBankingProductRepository
  ) {}

  async execute(userId?: string): Promise<UserBankingProduct[]> {
    if (userId) {
      return this.userBankingProductRepository.findByUserId(userId);
    }
    return this.userBankingProductRepository.findAll();
  }
}
