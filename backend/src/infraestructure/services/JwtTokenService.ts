import jwt from 'jsonwebtoken';
import { ITokenService } from '@/domain/services/ITokenService';

/**
 * JWT implementation of token service
 * Handles token generation and verification
 */
export class JwtTokenService implements ITokenService {
  private readonly accessTokenSecret: string;
  private readonly refreshTokenSecret: string;
  private readonly accessTokenExpiry = '15m'; // 15 minutes
  private readonly refreshTokenExpiry = '7d'; // 7 days

  constructor() {
    this.accessTokenSecret =
      process.env.JWT_ACCESS_SECRET || 'access-secret-key';
    this.refreshTokenSecret =
      process.env.JWT_REFRESH_SECRET || 'refresh-secret-key';

    if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
      console.warn(
        '⚠️ JWT secrets not found in environment variables. Using default values for development.'
      );
    }
  }

  generateAccessToken(userId: string): string {
    return jwt.sign({ userId }, this.accessTokenSecret, {
      expiresIn: this.accessTokenExpiry,
    });
  }

  generateRefreshToken(userId: string): string {
    return jwt.sign({ userId }, this.refreshTokenSecret, {
      expiresIn: this.refreshTokenExpiry,
    });
  }

  verifyAccessToken(token: string): { userId: string } | null {
    try {
      const decoded = jwt.verify(token, this.accessTokenSecret) as {
        userId: string;
      };
      return decoded;
    } catch (error) {
      return null;
    }
  }

  verifyRefreshToken(token: string): { userId: string } | null {
    try {
      const decoded = jwt.verify(token, this.refreshTokenSecret) as {
        userId: string;
      };
      return decoded;
    } catch (error) {
      return null;
    }
  }
}
