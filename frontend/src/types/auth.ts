export interface User {
  id: string;
  identificationNumber: string;
  email: string;
  name: string;
  lastName: string;
  dateOfBirth: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  identificationNumber: string;
  email: string;
  password: string;
  name: string;
  lastName: string;
  dateOfBirth: string;
}

export interface AuthError {
  message: string;
  field?: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}
