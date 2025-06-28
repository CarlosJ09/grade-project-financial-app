import { IBankingProductRepository } from '@/domain/repositories/IBankingProductRepository';
import { BankingProduct } from '@/domain/entities/BankingProduct';

export class GetBankingProductById {
  constructor(private bankingProductRepository: IBankingProductRepository) {}

  async execute(id: string): Promise<BankingProduct | null> {
    return this.bankingProductRepository.findById(id);
  }
}
