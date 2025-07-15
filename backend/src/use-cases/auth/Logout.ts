import { ITokenService } from '@/domain/services/ITokenService';

export type LogoutInput = {
  token: string;
};

export type LogoutOutput = {
  success: boolean;
  message: string;
};

export class Logout {
  constructor(private tokenService: ITokenService) {}

  async execute(input: LogoutInput): Promise<LogoutOutput> {
    try {
      // Verify the token to ensure it's valid
      const decoded = this.tokenService.verifyAccessToken(input.token);

      if (!decoded) {
        return {
          success: false,
          message: 'Invalid token',
        };
      }

      // In a production system, you would typically:
      // 1. Add the token to a blacklist in Redis/database
      // 2. Or maintain a whitelist of valid tokens
      // 3. Or implement token versioning

      // For now, we'll just return success since JWT is stateless
      // The client will delete the token from storage

      return {
        success: true,
        message: 'Logged out successfully',
      };
    } catch (error) {
      console.error('Logout error:', error);
      return {
        success: false,
        message: 'Logout failed',
      };
    }
  }
}
