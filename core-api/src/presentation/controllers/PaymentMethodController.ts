import { Request, Response } from 'express';
import { GetAllPaymentMethods } from '@/use-cases/paymentMethod/GetAllPaymentMethods';
import { GetPaymentMethodById } from '@/use-cases/paymentMethod/GetPaymentMethodById';
import { CreatePaymentMethod } from '@/use-cases/paymentMethod/CreatePaymentMethod';
import { UpdatePaymentMethod } from '@/use-cases/paymentMethod/UpdatePaymentMethod';
import { DeletePaymentMethod } from '@/use-cases/paymentMethod/DeletePaymentMethod';
import { PaymentMethodResponseDto } from '@/presentation/dtos/response/PaymentMethodResponseDto';
import { BaseController } from './BaseController';

export class PaymentMethodController extends BaseController {
  constructor(
    private getAllPaymentMethods: GetAllPaymentMethods,
    private getPaymentMethodById: GetPaymentMethodById,
    private createPaymentMethod: CreatePaymentMethod,
    private updatePaymentMethod: UpdatePaymentMethod,
    private deletePaymentMethod: DeletePaymentMethod
  ) {
    super();
  }

  async getAll(req: Request, res: Response) {
    return this.handleGetAll(
      req,
      res,
      this.getAllPaymentMethods,
      PaymentMethodResponseDto
    );
  }

  async getById(req: Request, res: Response) {
    return this.handleGetById(
      req,
      res,
      this.getPaymentMethodById,
      PaymentMethodResponseDto,
      'PaymentMethod'
    );
  }

  async create(req: Request, res: Response) {
    return this.handleCreate(
      req,
      res,
      this.createPaymentMethod,
      PaymentMethodResponseDto,
      'PaymentMethod'
    );
  }

  async update(req: Request, res: Response) {
    return this.handleUpdate(
      req,
      res,
      this.updatePaymentMethod,
      PaymentMethodResponseDto,
      'PaymentMethod'
    );
  }

  async delete(req: Request, res: Response) {
    return this.handleDelete(
      req,
      res,
      this.deletePaymentMethod,
      'PaymentMethod'
    );
  }
}
