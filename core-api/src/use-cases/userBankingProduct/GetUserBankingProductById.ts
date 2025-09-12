import { UserBankingProduct } from '@/domain/entities/UserBankingProduct';
import { IUserBankingProductRepository } from '@/domain/repositories/IUserBankingProductRepository';

export class GetUserBankingProductById {
  constructor(
    private userBankingProductRepository: IUserBankingProductRepository
  ) {}

  async execute(id: string): Promise<UserBankingProduct | null> {
    return this.userBankingProductRepository.findById(id);
  }
}
