import { Currency } from '@/domain/entities/Currency';
import { Decimal } from '@prisma/client/runtime/library';

class UserCashHolding {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly currencyId: number,
    public readonly amount: Decimal,
    public readonly label: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly currency?: Currency
  ) {}
}

export { UserCashHolding };
