import api from '@/interceptor/core-api';

export class BaseService<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async getAll(): Promise<T[]> {
    const response = await api.get<T[]>(`${this.endpoint}`);
    return response.data;
  }
  async getById(id: string | number): Promise<T> {
    const response = await api.get<T>(`${this.endpoint}/${id}`);
    return response.data;
  }

  async create(data: Partial<T>): Promise<T> {
    const response = await api.post<T>(`${this.endpoint}`, data);
    return response.data;
  }

  async update(id: string | number, data: Partial<T>): Promise<T> {
    const response = await api.put<T>(`${this.endpoint}/${id}`, data);
    return response.data;
  }

  async delete(id: string | number): Promise<void> {
    await api.delete<T>(`${this.endpoint}/${id}`);
  }
}
