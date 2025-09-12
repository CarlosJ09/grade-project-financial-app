import { IUserBankingProductRepository } from '@/domain/repositories/IUserBankingProductRepository';

export class DeleteUserBankingProduct {
  constructor(
    private userBankingProductRepository: IUserBankingProductRepository
  ) {}

  async execute(id: string): Promise<boolean> {
    try {
      await this.userBankingProductRepository.delete(id);
      return true;
    } catch (error) {
      return false;
    }
  }
}
