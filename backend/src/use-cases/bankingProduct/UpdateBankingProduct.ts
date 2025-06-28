import { IBankingProductRepository } from '@/domain/repositories/IBankingProductRepository';
import { BankingProduct } from '@/domain/entities/BankingProduct';

export type UpdateBankingProductInput = {
  bankingProductName?: string;
};

export class UpdateBankingProduct {
  constructor(private bankingProductRepository: IBankingProductRepository) {}

  async execute(
    id: string,
    input: UpdateBankingProductInput
  ): Promise<BankingProduct> {
    return this.bankingProductRepository.update(id, input);
  }
}
