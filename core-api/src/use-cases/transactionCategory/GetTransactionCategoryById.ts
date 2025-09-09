import { TransactionCategory } from '@/domain/entities/TransactionCategory';
import { ITransactionCategoryRepository } from '@/domain/repositories/ITransactionCategoryRepository';

export class GetTransactionCategoryById {
  constructor(
    private transactionCategoryRepository: ITransactionCategoryRepository
  ) {}

  async execute(id: number): Promise<TransactionCategory | null> {
    return this.transactionCategoryRepository.findById(id);
  }
}
