import api from '@/interceptor/core-api';
import type { ContentItem } from '@/types/education';
import { BaseService } from './base';

export class ContentItemService extends BaseService<ContentItem> {
  constructor() {
    super('/content-items');
  }

  async getContentByModule(moduleId: number): Promise<ContentItem[]> {
    const response = await api.get(`${this.endpoint}?moduleId=${moduleId}`);
    return response.data;
  }
}

export const contentItemService = new ContentItemService();
