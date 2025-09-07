export interface IBaseRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: any): Promise<T | null>;
  create(entity: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
  update(
    id: any,
    entity: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<T>;
  delete(id: any): Promise<void>;
}
