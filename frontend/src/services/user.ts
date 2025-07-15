import api from '@/interceptor/core-api';
import { User } from '@/types/auth';
import { UserBalance } from '@/types/user';

class UserService {
  async getAllUsers(): Promise<User[]> {
    const response = await api.get('/users');
    return response.data;
  }
  async getUserById(userId: string): Promise<User> {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  }

  async getUserBalance(userId: string): Promise<UserBalance> {
    const response = await api.get(`/users/${userId}/balance`);
    return response.data;
  }
}

export const userService = new UserService();
