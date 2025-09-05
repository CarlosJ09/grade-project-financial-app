import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { IPasswordService } from '@/domain/services/IPasswordService';
import { ITokenService } from '@/domain/services/ITokenService';

export type RegisterInput = {
  identificationNumber: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: Date;
};

export type RegisterOutput = {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export class Register {
  constructor(
    private userRepository: IUserRepository,
    private passwordService: IPasswordService,
    private tokenService: ITokenService
  ) {}

  async execute(input: RegisterInput): Promise<RegisterOutput | null> {
    const users = await this.userRepository.findAll();
    const existingUser = users.find(u => u.email === input.email);

    if (existingUser) {
      return null;
    }

    const passwordHash = await this.passwordService.hash(input.password);

    const newUser = await this.userRepository.create({
      identificationNumber: input.identificationNumber,
      name: input.name,
      lastName: input.lastName,
      email: input.email,
      passwordHash,
      dateOfBirth: input.dateOfBirth,
      status: true,
    });

    const accessToken = this.tokenService.generateAccessToken(newUser.id);
    const refreshToken = this.tokenService.generateRefreshToken(newUser.id);

    // Calculate expiration time (15 minutes for access token)
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    return {
      accessToken,
      refreshToken,
      expiresAt,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    };
  }
}
