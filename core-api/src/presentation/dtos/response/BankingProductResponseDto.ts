import { BankingProduct } from '@/domain/entities/BankingProduct';

export class BankingProductResponseDto {
  constructor(
    public readonly id: number,
    public readonly bankingProductName: string
  ) {}

  static fromEntity(bankingProduct: BankingProduct): BankingProductResponseDto {
    return new BankingProductResponseDto(
      bankingProduct.id,
      bankingProduct.bankingProductName
    );
  }
}
