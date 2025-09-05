import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { ITokenService } from '@/domain/services/ITokenService';

export type RefreshTokenInput = {
  refreshToken: string;
};

export type RefreshTokenOutput = {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
};

export class RefreshToken {
  constructor(
    private userRepository: IUserRepository,
    private tokenService: ITokenService
  ) {}

  async execute(input: RefreshTokenInput): Promise<RefreshTokenOutput | null> {
    try {
      // Verify the refresh token and get user ID
      const decoded = this.tokenService.verifyRefreshToken(input.refreshToken);

      if (!decoded) {
        return null;
      }

      // Check if user still exists and is active
      const user = await this.userRepository.findById(decoded.userId);
      if (!user || !user.status) {
        return null;
      }

      // Generate new tokens
      const accessToken = this.tokenService.generateAccessToken(user.id);
      const newRefreshToken = this.tokenService.generateRefreshToken(user.id);

      // Calculate expiration time (usually 15 minutes for access token)
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

      return {
        accessToken,
        refreshToken: newRefreshToken,
        expiresAt,
      };
    } catch (error) {
      console.error('Refresh token error:', error);
      return null;
    }
  }
}
