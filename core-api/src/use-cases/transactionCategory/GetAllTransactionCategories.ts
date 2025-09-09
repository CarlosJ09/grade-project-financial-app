import { TransactionCategory } from '@/domain/entities/TransactionCategory';
import { ITransactionCategoryRepository } from '@/domain/repositories/ITransactionCategoryRepository';

export class GetAllTransactionCategories {
  constructor(
    private transactionCategoryRepository: ITransactionCategoryRepository
  ) {}

  async execute(): Promise<TransactionCategory[]> {
    return this.transactionCategoryRepository.findAll();
  }
}
