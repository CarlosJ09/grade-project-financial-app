import { Currency } from '@/domain/entities/Currency';
import { Decimal } from '@prisma/client/runtime/library';

class UserAsset {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly assetType: string,
    public readonly assetName: string,
    public readonly currentValue: Decimal,
    public readonly currencyId: number,
    public readonly description: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly currency?: Currency
  ) {}
}

export { UserAsset };
