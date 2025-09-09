import { Transaction } from '@/domain/entities/Transaction';
import { ITransactionRepository } from '@/domain/repositories/ITransactionRepository';
import { Decimal } from '@prisma/client/runtime/library';

export type UpdateTransactionInput = {
  amount?: Decimal;
  currencyId?: number;
  exchangeRateId?: number | null;
  transactionTypeId?: number;
  categoryId?: number;
  merchantId?: number;
  userBankingProductId?: string | null;
  paymentMethodId?: number;
  transactionDate?: Date;
};

export class UpdateTransaction {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(
    id: string,
    input: UpdateTransactionInput
  ): Promise<Transaction> {
    const updateData: Partial<{
      userId: string;
      amount: Decimal;
      currencyId: number;
      exchangeRateId: number | null;
      transactionTypeId: number;
      categoryId: number;
      merchantId: number;
      userBankingProductId: string | null;
      paymentMethodId: number;
      transactionDate: Date;
      deletedAt?: Date;
    }> = {};

    // Only include defined fields
    if (input.amount !== undefined) updateData.amount = input.amount;
    if (input.currencyId !== undefined)
      updateData.currencyId = input.currencyId;
    if (input.exchangeRateId !== undefined)
      updateData.exchangeRateId = input.exchangeRateId;
    if (input.transactionTypeId !== undefined)
      updateData.transactionTypeId = input.transactionTypeId;
    if (input.categoryId !== undefined)
      updateData.categoryId = input.categoryId;
    if (input.merchantId !== undefined)
      updateData.merchantId = input.merchantId;
    if (input.userBankingProductId !== undefined)
      updateData.userBankingProductId = input.userBankingProductId;
    if (input.paymentMethodId !== undefined)
      updateData.paymentMethodId = input.paymentMethodId;
    if (input.transactionDate !== undefined)
      updateData.transactionDate = input.transactionDate;

    return this.transactionRepository.update(id, updateData);
  }
}
