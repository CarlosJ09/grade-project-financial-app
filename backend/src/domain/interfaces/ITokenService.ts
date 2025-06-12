/**
 * Interface for JWT token operations
 * Abstracts the token implementation
 */
export interface ITokenService {
    /**
     * Generate access token for user
     */
    generateAccessToken(userId: string): string;

    /**
     * Generate refresh token for user
     */
    generateRefreshToken(userId: string): string;

    /**
     * Verify and decode access token
     */
    verifyAccessToken(token: string): { userId: string } | null;

    /**
     * Verify and decode refresh token
     */
    verifyRefreshToken(token: string): { userId: string } | null;
} 