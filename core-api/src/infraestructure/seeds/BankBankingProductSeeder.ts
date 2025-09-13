import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

/**
 * Seeds relationships between banks and banking products.
 * Creates a link for each combination of existing Bank and BankingProduct,
 * skipping any that already exist.
 */
export async function seedBankBankingProducts(
  prisma: PrismaClient
): Promise<void> {
  console.log('🔗 Seeding bank-banking product relationships...');

  try {
    const [banks, products] = await Promise.all([
      prisma.bank.findMany({ select: { id: true } }),
      prisma.bankingProduct.findMany({ select: { id: true } }),
    ]);

    if (banks.length === 0 || products.length === 0) {
      console.log(
        'ℹ️ Skipping bank-banking product seeding: no banks or products found'
      );
      return;
    }

    const existing = await prisma.bankBankingProduct.findMany({
      select: { bankId: true, bankingProductId: true },
    });

    const existingKey = new Set(
      existing.map(e => `${e.bankId}-${e.bankingProductId}`)
    );

    const dataToCreate: { bankId: number; bankingProductId: number }[] = [];
    for (const bank of banks) {
      for (const product of products) {
        const key = `${bank.id}-${product.id}`;
        if (!existingKey.has(key)) {
          dataToCreate.push({ bankId: bank.id, bankingProductId: product.id });
        }
      }
    }

    if (dataToCreate.length === 0) {
      console.log('✅ Bank-banking product relationships already up to date');
      return;
    }

    // Batch insert for efficiency
    await prisma.bankBankingProduct.createMany({ data: dataToCreate });
    console.log(
      `✅ Created ${dataToCreate.length} bank-banking product relationships`
    );
  } catch (error) {
    console.error(
      '❌ Failed to seed bank-banking product relationships:',
      error
    );
    throw error;
  }
}
