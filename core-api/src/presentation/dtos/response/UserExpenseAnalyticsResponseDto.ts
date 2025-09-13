interface ExpenseCategoryData {
  categoryName: string;
  amount: number;
  percentage: number;
  count: number;
}

export class UserExpenseAnalyticsResponseDto {
  constructor(
    public readonly totalExpenses: number,
    public readonly currency: string,
    public readonly categoriesData: ExpenseCategoryData[],
    public readonly period: {
      fromDate: Date | null;
      toDate: Date | null;
    }
  ) {}

  static fromData(data: {
    totalExpenses: number;
    currency: string;
    categoriesData: Array<{
      categoryName: string;
      amount: number;
      percentage: number;
      count: number;
    }>;
    period: {
      fromDate: Date | null;
      toDate: Date | null;
    };
  }): UserExpenseAnalyticsResponseDto {
    return new UserExpenseAnalyticsResponseDto(
      data.totalExpenses,
      data.currency,
      data.categoriesData,
      data.period
    );
  }
}
