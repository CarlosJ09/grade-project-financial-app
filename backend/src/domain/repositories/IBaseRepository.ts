export interface IBaseRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(entity: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
  update(
    id: string,
    entity: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<T>;
  delete(id: string): Promise<void>;
}
