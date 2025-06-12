import { IUserRepository } from "@/domain/interfaces/IUserRepository";
import { IPasswordService } from "@/domain/interfaces/IPasswordService";
import { ITokenService } from "@/domain/interfaces/ITokenService";

export type LoginInput = {
    email: string;
    password: string;
};

export type LoginOutput = {
    accessToken: string;
    refreshToken: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
};

export class Login {
    constructor(
        private userRepository: IUserRepository,
        private passwordService: IPasswordService,
        private tokenService: ITokenService
    ) { }

    async execute(input: LoginInput): Promise<LoginOutput | null> {
        const users = await this.userRepository.findAll();
        const user = users.find(u => u.email === input.email);

        if (!user) {
            return null;
        }

        const isPasswordValid = await this.passwordService.compare(input.password, user.passwordHash);
        if (!isPasswordValid) {
            return null;
        }

        const accessToken = this.tokenService.generateAccessToken(user.id);
        const refreshToken = this.tokenService.generateRefreshToken(user.id);

        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        };
    }
} 