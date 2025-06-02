import { User } from "@/domain/entities/User";

export class UserResponseDto {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly dateOfBirth: Date,
        public readonly status: boolean,
        public readonly createdAt: Date,
    ) { }

    static fromEntity(user: User): UserResponseDto {
        return new UserResponseDto(
            user.id,
            user.name,
            user.lastName,
            user.email,
            user.dateOfBirth,
            user.status,
            user.createdAt
        );
    }
}