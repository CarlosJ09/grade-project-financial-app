import { IBankRepository } from '@/domain/repositories/IBankRepository';
import { Bank } from '@/domain/entities/Bank';

export type UpdateBankInput = {
  name?: string;
};

export class UpdateBank {
  constructor(private bankRepository: IBankRepository) {}

  async execute(id: string, input: UpdateBankInput): Promise<Bank> {
    return this.bankRepository.update(id, input);
  }
}
