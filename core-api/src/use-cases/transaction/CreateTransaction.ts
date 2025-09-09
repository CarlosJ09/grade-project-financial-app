import { Transaction } from '@/domain/entities/Transaction';
import { ITransactionRepository } from '@/domain/repositories/ITransactionRepository';
import { Decimal } from '@prisma/client/runtime/library';

export type CreateTransactionInput = {
  userId: string;
  amount: Decimal;
  currencyId: number;
  exchangeRateId?: number | null;
  transactionTypeId: number;
  categoryId: number;
  merchantId: number;
  userBankingProductId?: string | null;
  paymentMethodId: number;
  transactionDate: Date;
};

export class CreateTransaction {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(input: CreateTransactionInput): Promise<Transaction> {
    return this.transactionRepository.create({
      userId: input.userId,
      amount: input.amount,
      currencyId: input.currencyId,
      exchangeRateId: input.exchangeRateId || null,
      transactionTypeId: input.transactionTypeId,
      categoryId: input.categoryId,
      merchantId: input.merchantId,
      userBankingProductId: input.userBankingProductId || null,
      paymentMethodId: input.paymentMethodId,
      transactionDate: input.transactionDate,
    });
  }
}
