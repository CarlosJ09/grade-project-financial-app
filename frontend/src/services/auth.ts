import api from '@/interceptor/core-api';
import {
  LoginCredentials,
  RefreshTokenResponse,
  RegisterCredentials,
} from '@/types/auth';

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

  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    try {
      const response = await api.post('/auth/refresh', { refreshToken });
      return response.data;
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    }
  }

  async logout(token: string) {
    try {
      const response = await api.post('/auth/logout', { token });
      return response;
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }
}

export const authService = new AuthService();
