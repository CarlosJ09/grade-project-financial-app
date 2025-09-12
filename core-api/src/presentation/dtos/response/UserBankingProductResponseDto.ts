import { BankBankingProduct } from '@/domain/entities/BankBankingProduct';
import { Currency } from '@/domain/entities/Currency';
import { UserBankingProduct } from '@/domain/entities/UserBankingProduct';

export class UserBankingProductResponseDto {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly bankBankingProductId: number,
    public readonly referenceNumber: string,
    public readonly label: string,
    public readonly currencyId: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly bankBankingProduct?: BankBankingProduct,
    public readonly currency?: Currency
  ) {}

  static fromEntity(
    userBankingProduct: UserBankingProduct
  ): UserBankingProductResponseDto {
    return new UserBankingProductResponseDto(
      userBankingProduct.id,
      userBankingProduct.userId,
      userBankingProduct.bankBankingProductId,
      userBankingProduct.referenceNumber,
      userBankingProduct.label,
      userBankingProduct.currencyId,
      userBankingProduct.createdAt,
      userBankingProduct.updatedAt,
      userBankingProduct.bankBankingProduct,
      userBankingProduct.currency
    );
  }
}
