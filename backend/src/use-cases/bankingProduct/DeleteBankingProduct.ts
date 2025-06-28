import { IBankingProductRepository } from '@/domain/repositories/IBankingProductRepository';

export class DeleteBankingProduct {
  constructor(private bankingProductRepository: IBankingProductRepository) {}

  async execute(id: string): Promise<boolean> {
    try {
      await this.bankingProductRepository.delete(id);
      return true;
    } catch (error) {
      return false;
    }
  }
}
