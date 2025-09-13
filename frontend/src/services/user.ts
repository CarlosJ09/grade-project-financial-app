import api from '@/interceptor/core-api';
import { User } from '@/types/auth';

export type UserBalanceResponse = {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  baseCurrency: string;
  balancesByCurrency: [
    {
      currency: string;
      balance: number;
      income: number;
      expenses: number;
    },
  ];
  lastTransactionDate: Date;
};

export interface ExpenseCategoryData {
  categoryName: string;
  amount: number;
  percentage: number;
  count: number;
}

export interface UserExpenseAnalyticsResponse {
  totalExpenses: number;
  currency: string;
  categoriesData: ExpenseCategoryData[];
  period: {
    fromDate: Date | null;
    toDate: Date | null;
  };
}

class UserService {
  async getAllUsers(): Promise<User[]> {
    const response = await api.get('/users');
    return response.data;
  }
  async getUserById(userId: string): Promise<User> {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  }

  async getUserBalance(userId: string): Promise<UserBalanceResponse> {
    const response = await api.get(`/users/${userId}/balance`);
    return response.data;
  }

  async getUserExpenseAnalytics(
    userId: string
  ): Promise<UserExpenseAnalyticsResponse> {
    const response = await api.get(`/users/${userId}/expense-analytics`);
    return response.data;
  }
}

export const userService = new UserService();
