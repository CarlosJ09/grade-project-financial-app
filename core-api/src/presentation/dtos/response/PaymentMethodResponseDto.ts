import { PaymentMethod } from '@/domain/entities/PaymentMethod';

export class PaymentMethodResponseDto {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  static fromEntity(paymentMethod: PaymentMethod): PaymentMethodResponseDto {
    return new PaymentMethodResponseDto(
      paymentMethod.id,
      paymentMethod.name,
      paymentMethod.createdAt,
      paymentMethod.updatedAt
    );
  }
}
