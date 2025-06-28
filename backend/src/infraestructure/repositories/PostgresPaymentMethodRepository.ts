import { PaymentMethod } from '@/domain/entities/PaymentMethod';
import { IPaymentMethodRepository } from '@/domain/repositories/IPaymentMethodRepository';
import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

export class PostgresPaymentMethodRepository
  implements IPaymentMethodRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<PaymentMethod[]> {
    const paymentMethods = await this.prisma.paymentMethod.findMany();
    return paymentMethods.map(
      paymentMethod =>
        new PaymentMethod(
          paymentMethod.id,
          paymentMethod.paymentMethod,
          paymentMethod.createdAt,
          paymentMethod.updatedAt
        )
    );
  }

  async findById(id: string): Promise<PaymentMethod | null> {
    const paymentMethod = await this.prisma.paymentMethod.findUnique({
      where: { id },
    });

    if (!paymentMethod) return null;

    return new PaymentMethod(
      paymentMethod.id,
      paymentMethod.paymentMethod,
      paymentMethod.createdAt,
      paymentMethod.updatedAt
    );
  }

  async create(
    entity: Omit<PaymentMethod, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<PaymentMethod> {
    const paymentMethod = await this.prisma.paymentMethod.create({
      data: entity,
    });

    return new PaymentMethod(
      paymentMethod.id,
      paymentMethod.paymentMethod,
      paymentMethod.createdAt,
      paymentMethod.updatedAt
    );
  }

  async update(
    id: string,
    entity: Partial<Omit<PaymentMethod, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<PaymentMethod> {
    const paymentMethod = await this.prisma.paymentMethod.update({
      where: { id },
      data: entity,
    });

    return new PaymentMethod(
      paymentMethod.id,
      paymentMethod.paymentMethod,
      paymentMethod.createdAt,
      paymentMethod.updatedAt
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.paymentMethod.delete({
      where: { id },
    });
  }
}
