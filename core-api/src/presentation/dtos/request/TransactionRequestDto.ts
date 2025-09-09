import { Decimal } from '@prisma/client/runtime/library';

export class CreateTransactionRequestDto {
  constructor(
    public readonly userId: string,
    public readonly amount: Decimal,
    public readonly currencyId: number,
    public readonly exchangeRateId: number | null,
    public readonly transactionTypeId: number,
    public readonly categoryId: number,
    public readonly merchantId: number,
    public readonly userBankingProductId: string | null,
    public readonly paymentMethodId: number,
    public readonly transactionDate: Date
  ) {}
}

export class UpdateTransactionRequestDto {
  constructor(
    public readonly amount?: Decimal,
    public readonly currencyId?: number,
    public readonly exchangeRateId?: number | null,
    public readonly transactionTypeId?: number,
    public readonly categoryId?: number,
    public readonly merchantId?: number,
    public readonly userBankingProductId?: string | null,
    public readonly paymentMethodId?: number,
    public readonly transactionDate?: Date
  ) {}
}
