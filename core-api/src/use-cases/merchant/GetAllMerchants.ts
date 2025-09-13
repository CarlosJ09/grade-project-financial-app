import { Merchant } from '@/domain/entities/Merchant';
import { IMerchantRepository } from '@/domain/repositories/IMerchantRepository';

export class GetAllMerchants {
  constructor(private merchantRepository: IMerchantRepository) {}

  async execute(): Promise<Merchant[]> {
    return this.merchantRepository.findAll();
  }
}
