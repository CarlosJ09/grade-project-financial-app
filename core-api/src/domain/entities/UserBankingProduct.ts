import { BankBankingProduct } from '@/domain/entities/BankBankingProduct';
import { Currency } from '@/domain/entities/Currency';
import { Decimal } from '@prisma/client/runtime/library';

class UserBankingProduct {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly bankBankingProductId: number,
    public readonly referenceNumber: string,
    public readonly label: string,
    public readonly currencyId: number,
    public readonly currentBalance: Decimal,
    public readonly lastBalanceUpdate: Date | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly bankBankingProduct?: BankBankingProduct,
    public readonly currency?: Currency
  ) {}
}

export { UserBankingProduct };
