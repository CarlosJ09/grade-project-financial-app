import { Merchant } from '@/domain/entities/Merchant';

export class MerchantResponseDto {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly categoryId: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly website?: string,
    public readonly location?: string
  ) {}

  static fromEntity(merchant: Merchant): MerchantResponseDto {
    return new MerchantResponseDto(
      merchant.id,
      merchant.name,
      merchant.categoryId,
      merchant.createdAt,
      merchant.updatedAt,
      merchant.website,
      merchant.location
    );
  }
}
