import { UserBankingProduct } from '@/domain/entities/UserBankingProduct';
import { IUserBankingProductRepository } from '@/domain/repositories/IUserBankingProductRepository';

export class GetAllUserBankingProductsByUserId {
  constructor(
    private userBankingProductRepository: IUserBankingProductRepository
  ) {}

  async execute(userId: string): Promise<UserBankingProduct[]> {
    return this.userBankingProductRepository.findByUserId(userId);
  }
}
