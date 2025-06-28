import api from '@/interceptor/core-api';
import { AxiosResponse } from 'axios';

export class BaseService<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async getAll(): Promise<AxiosResponse<T[]>> {
    return api.get<T[]>(`${this.endpoint}`);
  }
  async getById(id: string): Promise<AxiosResponse<T>> {
    return api.get<T>(`${this.endpoint}/${id}`);
  }

  async create(data: Partial<T>): Promise<AxiosResponse<T>> {
    return api.post<T>(`${this.endpoint}`, data);
  }

  async update(id: string, data: Partial<T>): Promise<AxiosResponse<T>> {
    return api.put<T>(`${this.endpoint}/${id}`, data);
  }

  async delete(id: string): Promise<AxiosResponse<T>> {
    return api.delete<T>(`${this.endpoint}/${id}`);
  }
}
