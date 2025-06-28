import { Request, Response } from 'express';
import { GetAllCategories } from '@/use-cases/category/GetAllCategories';
import { GetCategoryById } from '@/use-cases/category/GetCategoryById';
import { CreateCategory } from '@/use-cases/category/CreateCategory';
import { UpdateCategory } from '@/use-cases/category/UpdateCategory';
import { DeleteCategory } from '@/use-cases/category/DeleteCategory';
import { CategoryResponseDto } from '@/presentation/dtos/response/CategoryResponseDto';
import { BaseController } from './BaseController';

export class CategoryController extends BaseController {
  constructor(
    private getAllCategories: GetAllCategories,
    private getCategoryById: GetCategoryById,
    private createCategory: CreateCategory,
    private updateCategory: UpdateCategory,
    private deleteCategory: DeleteCategory
  ) {
    super();
  }

  async getAll(req: Request, res: Response) {
    return this.handleGetAll(
      req,
      res,
      this.getAllCategories,
      CategoryResponseDto
    );
  }

  async getById(req: Request, res: Response) {
    return this.handleGetById(
      req,
      res,
      this.getCategoryById,
      CategoryResponseDto,
      'Category'
    );
  }

  async create(req: Request, res: Response) {
    return this.handleCreate(
      req,
      res,
      this.createCategory,
      CategoryResponseDto,
      'Category'
    );
  }

  async update(req: Request, res: Response) {
    return this.handleUpdate(
      req,
      res,
      this.updateCategory,
      CategoryResponseDto,
      'Category'
    );
  }

  async delete(req: Request, res: Response) {
    return this.handleDelete(req, res, this.deleteCategory, 'Category');
  }
}
