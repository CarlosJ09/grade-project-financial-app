import { TransactionType } from '@/domain/entities/TransactionType';
import { ITransactionTypeRepository } from '@/domain/repositories/ITransactionTypeRepository';

export class GetAllTransactionTypes {
  constructor(private transactionTypeRepository: ITransactionTypeRepository) {}

  async execute(): Promise<TransactionType[]> {
    return this.transactionTypeRepository.findAll();
  }
}
