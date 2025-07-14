export interface User {
  id: string;
  cedula: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate?: string;
  phone?: string;
  profilePicture?: string;
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
  cedula: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
}

export interface AuthError {
  message: string;
  field?: string;
}
