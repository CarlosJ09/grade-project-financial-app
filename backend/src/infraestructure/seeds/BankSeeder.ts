import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

interface BankData {
  name: string;
}

/**
 * Seed data for banks
 * Major banks operating in the Dominican Republic
 */
const bankData: BankData[] = [
  // Major Commercial Banks
  { name: 'Banco de Reservas de la República Dominicana (Banreservas)' },
  { name: 'Banco Popular Dominicano' },
  { name: 'Banco BHD León' },
  { name: 'Banco Promerica' },
  { name: 'Banesco Banco Múltiple' },
  { name: 'Banco Caribe' },
  { name: 'Banco Ademi' },
  { name: 'Banco Múltiple BDI' },
  { name: 'Banco Múltiple Vimenca' },
  { name: 'Banco Múltiple Santa Cruz' },
  { name: 'Banco López de Haro' },
  { name: 'Banco Múltiple LAFISE' },
  { name: 'Banco Múltiple Activo' },
  { name: 'Banco Múltiple Dominicano del Progreso' },
  { name: 'Banco Múltiple Atlantico' },
  { name: 'Banco Múltiple Fihogar' },
  { name: 'Banco Múltiple Confisa' },
  { name: 'Banco Múltiple Dominicano Americano' },
  { name: 'Banco Múltiple Serfinansa' },

  // International Banks with Dominican Operations
  { name: 'Citibank Dominican Republic' },
  { name: 'Banco Scotiabank Dominican Republic' },
  { name: 'Deutsche Bank Dominican Republic' },
  { name: 'Banco Santander Dominican Republic' },

  // Government and Development Banks
  { name: 'Banco Agrícola de la República Dominicana' },
  { name: 'Banco Nacional de Fomento de la Vivienda y la Producción' },
  { name: 'Banco de Desarrollo y Crédito Cooperativo' },

  // Major Credit and Savings Banks (Bancos de Ahorro y Crédito)
  { name: 'Banco de Ahorro y Crédito Adopem' },
  { name: 'Banco de Ahorro y Crédito Fundación Dominicana de Desarrollo' },
  { name: 'Banco de Ahorro y Crédito Ademi' },
  { name: 'Banco de Ahorro y Crédito Aspire' },
  { name: 'Banco de Ahorro y Crédito Progreso' },
  { name: 'Banco de Ahorro y Crédito Comedica' },
  { name: 'Banco de Ahorro y Crédito Mujer Microfinanzas' },
  { name: 'Banco de Ahorro y Crédito Solidario' },
  { name: 'Banco de Ahorro y Crédito Apap' },

  // Major Cooperative Banks
  { name: 'Banco de Ahorro y Crédito Coopnama' },
  { name: 'Banco de Ahorro y Crédito Coopesan' },
  { name: 'Banco de Ahorro y Crédito Coopmedica' },
  { name: 'Banco de Ahorro y Crédito Coopherrera' },
  { name: 'Banco de Ahorro y Crédito Coopvega' },
  { name: 'Banco de Ahorro y Crédito Coopnaiboa' },
  { name: 'Banco de Ahorro y Crédito Coopnaba' },
  { name: 'Banco de Ahorro y Crédito Coopnabasur' },
  { name: 'Banco de Ahorro y Crédito Coopbarnoba' },
  { name: 'Banco de Ahorro y Crédito Coopnabasal' },
];

/**
 * Seeds bank data into the database
 * @param prisma - Prisma client instance
 */
export async function seedBanks(prisma: PrismaClient): Promise<void> {
  console.log('🏦 Seeding banks...');

  try {
    // Check existing banks and only create new ones
    for (const bank of bankData) {
      const existingBank = await prisma.bank.findFirst({
        where: { name: bank.name },
      });

      if (!existingBank) {
        await prisma.bank.create({
          data: bank,
        });
      }
    }

    console.log(`✅ Successfully seeded ${bankData.length} banks`);
  } catch (error) {
    console.error('❌ Failed to seed banks:', error);
    throw error;
  }
}
