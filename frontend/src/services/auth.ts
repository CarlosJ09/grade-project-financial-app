import api from '@/interceptor/core-api';
import { LoginCredentials, RegisterCredentials } from '@/types/auth';

class AuthService {
  async login(credentials: LoginCredentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async register(payload: RegisterCredentials) {
    try {
      const response = await api.post('/auth/register', payload);
      return response;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }
}

export const authService = new AuthService();
