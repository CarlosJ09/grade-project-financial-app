import { ITransactionRepository } from '@/domain/repositories/ITransactionRepository';
import { Transaction } from '@/domain/entities/Transaction';

export class GetAllTransactions {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(): Promise<Transaction[]> {
    return this.transactionRepository.findAll();
  }
}
