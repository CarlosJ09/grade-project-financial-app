import bcrypt from 'bcryptjs';
import { IPasswordService } from '@/domain/services/IPasswordService';

/**
 * Bcrypt implementation of password service
 * Handles password hashing and verification
 */
export class BcryptPasswordService implements IPasswordService {
  private readonly saltRounds = 12;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
