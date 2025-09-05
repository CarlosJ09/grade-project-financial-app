import { IUserBankRepository } from '@/domain/repositories/IUserBankRepository';
import { UserBank } from '@/domain/entities/UserBank';

export type CreateUserBankInput = {
  userId: string;
  bankId: string;
  alias: string;
  lastSyncAt?: Date;
};

export class CreateUserBank {
  constructor(private userBankRepository: IUserBankRepository) {}

  async execute(input: CreateUserBankInput): Promise<UserBank> {
    return this.userBankRepository.create(input);
  }
}
