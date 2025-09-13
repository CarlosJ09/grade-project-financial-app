import api from '@/interceptor/core-api';
import { User } from '@/types/auth';

type UserBalanceResponse = {
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
}

export const userService = new UserService();
