import { IBankingProductRepository } from '@/domain/repositories/IBankingProductRepository';
import { BankingProduct } from '@/domain/entities/BankingProduct';

export class GetAllBankingProducts {
  constructor(private bankingProductRepository: IBankingProductRepository) {}

  async execute(): Promise<BankingProduct[]> {
    return this.bankingProductRepository.findAll();
  }
}
