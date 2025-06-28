import { ITransactionRepository } from '@/domain/repositories/ITransactionRepository';
import { Transaction } from '@/domain/entities/Transaction';

export type CreateTransactionInput = {
  userId: string;
  amount: number;
  currencyId: string;
  exchangeRateId?: string;
  type: string;
  categoryId: string;
  paymentMethodId: string;
  place: string;
  bankingProductId?: string;
  transactionDate: Date;
};

export class CreateTransaction {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(input: CreateTransactionInput): Promise<Transaction> {
    return this.transactionRepository.create({
      ...input,
      exchangeRateId: input.exchangeRateId || null,
      bankingProductId: input.bankingProductId || null,
    });
  }
}
