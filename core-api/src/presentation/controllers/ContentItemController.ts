import { Request, Response } from 'express';
import { GetAllContentItems } from '@/use-cases/contentItem/GetAllContentItems';
import { GetContentItemById } from '@/use-cases/contentItem/GetContentItemById';
import { CreateContentItem } from '@/use-cases/contentItem/CreateContentItem';
import { UpdateContentItem } from '@/use-cases/contentItem/UpdateContentItem';
import { DeleteContentItem } from '@/use-cases/contentItem/DeleteContentItem';
import { ContentItemResponseDto } from '@/presentation/dtos/response/ContentItemResponseDto';
import { BaseController } from './BaseController';

export class ContentItemController extends BaseController {
  constructor(
    private getAllContentItems: GetAllContentItems,
    private getContentItemById: GetContentItemById,
    private createContentItem: CreateContentItem,
    private updateContentItem: UpdateContentItem,
    private deleteContentItem: DeleteContentItem
  ) {
    super();
  }

  async getAll(req: Request, res: Response) {
    return this.handleGetAll(
      req,
      res,
      this.getAllContentItems,
      ContentItemResponseDto
    );
  }

  async getById(req: Request, res: Response) {
    return this.handleGetById(
      req,
      res,
      this.getContentItemById,
      ContentItemResponseDto,
      'ContentItem'
    );
  }

  async create(req: Request, res: Response) {
    return this.handleCreate(
      req,
      res,
      this.createContentItem,
      ContentItemResponseDto,
      'ContentItem'
    );
  }

  async update(req: Request, res: Response) {
    return this.handleUpdate(
      req,
      res,
      this.updateContentItem,
      ContentItemResponseDto,
      'ContentItem'
    );
  }

  async delete(req: Request, res: Response) {
    return this.handleDelete(req, res, this.deleteContentItem, 'ContentItem');
  }
}
