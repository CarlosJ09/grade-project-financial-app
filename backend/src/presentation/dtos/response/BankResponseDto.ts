import { Bank } from '@/domain/entities/Bank';

export class BankResponseDto {
  constructor(
    public readonly id: number,
    public readonly name: string
  ) {}

  static fromEntity(bank: Bank): BankResponseDto {
    return new BankResponseDto(bank.id, bank.name);
  }
}
