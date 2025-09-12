import { UserBankingProduct } from '@/domain/entities/UserBankingProduct';
import { IUserBankingProductRepository } from '@/domain/repositories/IUserBankingProductRepository';

export type CreateUserBankingProductInput = {
  userId: string;
  bankBankingProductId: number;
  referenceNumber: string;
  label: string;
  currencyId: number;
};

export class CreateUserBankingProduct {
  constructor(
    private userBankingProductRepository: IUserBankingProductRepository
  ) {}

  async execute(
    input: CreateUserBankingProductInput
  ): Promise<UserBankingProduct> {
    return this.userBankingProductRepository.create(input);
  }
}
