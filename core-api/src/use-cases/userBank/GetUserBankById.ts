import { IUserBankRepository } from '@/domain/repositories/IUserBankRepository';
import { UserBank } from '@/domain/entities/UserBank';

export class GetUserBankById {
  constructor(private userBankRepository: IUserBankRepository) {}

  async execute(id: string): Promise<UserBank | null> {
    return this.userBankRepository.findById(id);
  }
}
