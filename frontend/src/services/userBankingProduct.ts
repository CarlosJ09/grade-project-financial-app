import api from '@/interceptor/core-api';
import { BaseService } from '@/services/base';
import { UserBankingProduct } from '@/types/financial/bank';
import { AxiosResponse } from 'axios';

class UserBankingProductService extends BaseService<UserBankingProduct> {
  constructor() {
    super('/user-banking-products');
  }

  async getAllByUserId(
    userId: string
  ): Promise<AxiosResponse<UserBankingProduct[]>> {
    return api.get<UserBankingProduct[]>(`${this.endpoint}/user/${userId}`);
  }
}

export const userBankingProductService = new UserBankingProductService();
