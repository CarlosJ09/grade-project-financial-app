import { BankingProduct } from '@/domain/entities/BankingProduct';

export class BankingProductResponseDto {
  constructor(
    public readonly id: string,
    public readonly bankingProductName: string
  ) {}

  static fromEntity(bankingProduct: BankingProduct): BankingProductResponseDto {
    return new BankingProductResponseDto(
      bankingProduct.id,
      bankingProduct.bankingProductName
    );
  }
}
