import { Merchant } from '@/domain/entities/Merchant';

export interface IMerchantRepository {
  findAll(): Promise<Merchant[]>;
  findById(id: number): Promise<Merchant | null>;
}
