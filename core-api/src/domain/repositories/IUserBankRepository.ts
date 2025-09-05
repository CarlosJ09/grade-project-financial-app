import { UserBank } from '@/domain/entities/UserBank';
import { IBaseRepository } from './IBaseRepository';

export interface IUserBankRepository extends IBaseRepository<UserBank> {}
