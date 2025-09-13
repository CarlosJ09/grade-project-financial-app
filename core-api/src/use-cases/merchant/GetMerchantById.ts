import { Merchant } from '@/domain/entities/Merchant';
import { IMerchantRepository } from '@/domain/repositories/IMerchantRepository';

export class GetMerchantById {
  constructor(private merchantRepository: IMerchantRepository) {}

  async execute(id: number): Promise<Merchant | null> {
    return this.merchantRepository.findById(id);
  }
}
