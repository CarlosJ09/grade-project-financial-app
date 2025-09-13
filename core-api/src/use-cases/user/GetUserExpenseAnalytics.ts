import { ICurrencyRepository } from '@/domain/repositories/ICurrencyRepository';
import { ITransactionRepository } from '@/domain/repositories/ITransactionRepository';

interface ExpenseCategoryData {
  categoryName: string;
  amount: number;
  percentage: number;
  count: number;
}

interface UserExpenseAnalyticsData {
  totalExpenses: number;
  currency: string;
  categoriesData: ExpenseCategoryData[];
  period: {
    fromDate: Date | null;
    toDate: Date | null;
  };
}

interface GetUserExpenseAnalyticsRequest {
  userId: string;
  fromDate?: Date;
  toDate?: Date;
  baseCurrencyId?: number;
}

export class GetUserExpenseAnalytics {
  constructor(
    private transactionRepository: ITransactionRepository,
    private currencyRepository: ICurrencyRepository
  ) {}

  async execute(
    request: GetUserExpenseAnalyticsRequest
  ): Promise<UserExpenseAnalyticsData> {
    const { userId, fromDate, toDate, baseCurrencyId = 1 } = request;

    // Get all expense transactions for the user
    const transactions = await this.transactionRepository.findByUserId(userId, {
      fromDate,
      toDate,
      excludeDeleted: true,
    });

    // Filter only expense transactions (transactionTypeId = 4)
    const expenseTransactions = transactions.filter(
      transaction => transaction.transactionTypeId === 4
    );

    // Group expenses by category
    const categoryMap = new Map<string, { amount: number; count: number }>();
    let totalExpenses = 0;

    for (const transaction of expenseTransactions) {
      const amount = parseFloat(transaction.amount.toString());
      const categoryName = transaction.category?.name || 'Uncategorized';

      totalExpenses += amount;

      if (categoryMap.has(categoryName)) {
        const existing = categoryMap.get(categoryName)!;
        categoryMap.set(categoryName, {
          amount: existing.amount + amount,
          count: existing.count + 1,
        });
      } else {
        categoryMap.set(categoryName, { amount, count: 1 });
      }
    }

    // Convert to array and calculate percentages
    const categoriesData: ExpenseCategoryData[] = Array.from(
      categoryMap.entries()
    )
      .map(([categoryName, data]) => ({
        categoryName,
        amount: data.amount,
        percentage: totalExpenses > 0 ? (data.amount / totalExpenses) * 100 : 0,
        count: data.count,
      }))
      .sort((a, b) => b.amount - a.amount); // Sort by amount descending

    // Get currency code
    const currency = await this.getCurrencyCode(baseCurrencyId);

    return {
      totalExpenses,
      currency,
      categoriesData,
      period: {
        fromDate: fromDate || null,
        toDate: toDate || null,
      },
    };
  }

  private async getCurrencyCode(currencyId: number): Promise<string> {
    const currency = await this.currencyRepository.findByIdInt(currencyId);
    return currency?.code || 'DOP';
  }
}
