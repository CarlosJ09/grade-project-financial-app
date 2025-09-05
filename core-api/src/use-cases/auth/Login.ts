import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { IPasswordService } from '@/domain/services/IPasswordService';
import { ITokenService } from '@/domain/services/ITokenService';

export type LoginInput = {
  email: string;
  password: string;
};

export type LoginOutput = {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  user: {
    id: string;
    identificationNumber: string;
    email: string;
    firstName: string;
    lastName: string;
    birthDate: string;
  };
};

export class Login {
  constructor(
    private userRepository: IUserRepository,
    private passwordService: IPasswordService,
    private tokenService: ITokenService
  ) {}

  async execute(input: LoginInput): Promise<LoginOutput | null> {
    const users = await this.userRepository.findAll();
    const user = users.find(u => u.email === input.email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await this.passwordService.compare(
      input.password,
      user.passwordHash
    );
    if (!isPasswordValid) {
      return null;
    }

    const accessToken = this.tokenService.generateAccessToken(user.id);
    const refreshToken = this.tokenService.generateRefreshToken(user.id);

    // Calculate expiration time (15 minutes for access token)
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    return {
      accessToken,
      refreshToken,
      expiresAt,
      user: {
        id: user.id,
        identificationNumber: user.identificationNumber,
        email: user.email,
        firstName: user.name,
        lastName: user.lastName,
        birthDate: user.dateOfBirth.toISOString(),
      },
    };
  }
}
