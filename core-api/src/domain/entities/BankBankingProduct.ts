import { Bank } from '@/domain/entities/Bank';
import { BankingProduct } from '@/domain/entities/BankingProduct';

class BankBankingProduct {
  constructor(
    public readonly id: number,
    public readonly bankId: number,
    public readonly bankingProductId: number,
    public readonly bank?: Bank,
    public readonly bankingProduct?: BankingProduct
  ) {}
}

export { BankBankingProduct };
