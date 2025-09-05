import { ITransactionRepository } from '@/domain/repositories/ITransactionRepository';
import { Transaction } from '@/domain/entities/Transaction';

export class GetTransactionById {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(id: string): Promise<Transaction | null> {
    return this.transactionRepository.findById(id);
  }
}
