import { UserBank } from "@/domain/entities/UserBank";

export class UserBankResponseDto {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly bankId: string,
        public readonly alias: string,
        public readonly lastSyncAt?: Date,
    ) { }

    static fromEntity(userBank: UserBank): UserBankResponseDto {
        return new UserBankResponseDto(
            userBank.id,
            userBank.userId,
            userBank.bankId,
            userBank.alias,
            userBank.lastSyncAt,
        );
    }
} 