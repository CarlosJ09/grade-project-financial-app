import { IUserRepository } from "@/domain/interfaces/IUserRepository";
import { IPasswordService } from "@/domain/interfaces/IPasswordService";
import { ITokenService } from "@/domain/interfaces/ITokenService";

export type RegisterInput = {
    name: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: Date;
};

export type RegisterOutput = {
    accessToken: string;
    refreshToken: string;
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
    ) { }

    async execute(input: RegisterInput): Promise<RegisterOutput | null> {
        const users = await this.userRepository.findAll();
        const existingUser = users.find(u => u.email === input.email);

        if (existingUser) {
            return null;
        }

        const passwordHash = await this.passwordService.hash(input.password);

        const newUser = await this.userRepository.create({
            name: input.name,
            lastName: input.lastName,
            email: input.email,
            passwordHash,
            dateOfBirth: input.dateOfBirth,
            status: true
        });

        const accessToken = this.tokenService.generateAccessToken(newUser.id);
        const refreshToken = this.tokenService.generateRefreshToken(newUser.id);

        return {
            accessToken,
            refreshToken,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        };
    }
} 