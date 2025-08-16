import { Category } from '@/domain/entities/Category';

export class CategoryResponseDto {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly kind: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  static fromEntity(category: Category): CategoryResponseDto {
    return new CategoryResponseDto(
      category.id,
      category.name,
      category.kind,
      category.createdAt,
      category.updatedAt
    );
  }
}
