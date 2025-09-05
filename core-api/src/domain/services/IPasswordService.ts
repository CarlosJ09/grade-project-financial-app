/**
 * Interface for password-related operations
 * Abstracts the password hashing implementation
 */
export interface IPasswordService {
  /**
   * Hash a plain text password
   */
  hash(password: string): Promise<string>;

  /**
   * Compare plain text password with hashed password
   */
  compare(password: string, hashedPassword: string): Promise<boolean>;
}
