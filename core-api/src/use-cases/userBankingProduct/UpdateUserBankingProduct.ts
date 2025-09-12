import { UserBankingProduct } from '@/domain/entities/UserBankingProduct';
import { IUserBankingProductRepository } from '@/domain/repositories/IUserBankingProductRepository';

export type UpdateUserBankingProductInput = {
  referenceNumber?: string;
  label?: string;
  currencyId?: number;
};

export class UpdateUserBankingProduct {
  constructor(
    private userBankingProductRepository: IUserBankingProductRepository
  ) {}

  async execute(
    id: string,
    input: UpdateUserBankingProductInput
  ): Promise<UserBankingProduct> {
    return this.userBankingProductRepository.update(id, input);
  }
}
