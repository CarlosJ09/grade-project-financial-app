import { TransactionType } from '@/domain/entities/TransactionType';
import { ITransactionTypeRepository } from '@/domain/repositories/ITransactionTypeRepository';

export class GetTransactionTypeById {
  constructor(private transactionTypeRepository: ITransactionTypeRepository) {}

  async execute(id: number): Promise<TransactionType | null> {
    return this.transactionTypeRepository.findById(id);
  }
}
