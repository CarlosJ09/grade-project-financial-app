# Database Seeding System

This directory contains the database seeding system for the financial application backend. The seeding system follows clean architecture principles and provides a robust way to populate the database with essential reference data.

## Overview

The seeding system populates the following tables with reference data:

- **Currencies** - Major world currencies (USD, EUR, GBP, etc.)
- **Payment Methods** - Common payment methods (cash, credit card, digital wallet, etc.)
- **Categories** - Transaction categories organized by type (expense, income, budget)
- **Banks** - Major banks operating in the Dominican Republic
- **Banking Products** - Common banking products (checking account, savings account, etc.)

## File Structure

```
seeds/
├── README.md                    # This documentation
├── index.ts                     # Main seeding orchestrator
├── BankSeeder.ts               # Bank reference data
├── BankingProductSeeder.ts     # Banking product reference data
├── CategorySeeder.ts           # Category reference data
├── CurrencySeeder.ts           # Currency reference data
└── PaymentMethodSeeder.ts      # Payment method reference data
```

## Usage

### Running Seeds

To seed the database with all reference data:

```bash
npm run seed
```

### Clearing Seed Data

To clear all seeded reference data:

```bash
npm run seed:clear
```

### Direct Execution

You can also run the seeding scripts directly:

```bash
# Seed the database
npx tsx src/infraestructure/seeds/index.ts seed

# Clear seed data
npx tsx src/infraestructure/seeds/index.ts clear
```

## Seeding Process

The seeding process follows a specific order to handle dependencies:

1. **Currencies** - No dependencies
2. **Payment Methods** - No dependencies
3. **Categories** - No dependencies
4. **Banks** - No dependencies
5. **Banking Products** - No dependencies

The clearing process runs in reverse order to maintain referential integrity.

## Data Safety

- **Idempotent Operations**: Seeds can be run multiple times without duplicating data
- **Existence Checks**: Each seeder checks for existing records before creating new ones
- **Error Handling**: Comprehensive error handling with descriptive messages
- **Transaction Safety**: Each seeder handles its own error recovery

## Customization

### Adding New Seed Data

To add new reference data to existing seeders:

1. Open the appropriate seeder file (e.g., `BankSeeder.ts`)
2. Add new entries to the data array
3. Run the seeder - only new entries will be created

### Creating New Seeders

To create a new seeder:

1. Create a new file following the naming pattern: `[Entity]Seeder.ts`
2. Follow the existing seeder structure:

   ```typescript
   import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

   interface EntityData {
     // Define your data structure
   }

   const entityData: EntityData[] = [
     // Your seed data
   ];

   export async function seedEntities(prisma: PrismaClient): Promise<void> {
     // Seeding logic
   }
   ```

3. Add the seeder to `index.ts`:
   - Import the seeder function
   - Add it to the seeding sequence
   - Add cleanup logic to `clearSeedData`

## Architecture Principles

The seeding system follows these clean architecture principles:

- **Separation of Concerns**: Each seeder handles one entity type
- **Dependency Injection**: Prisma client is injected into seeders
- **Error Handling**: Comprehensive error handling at each level
- **Logging**: Detailed logging for monitoring and debugging
- **Testability**: Seeders can be easily tested in isolation

## Development Workflow

### During Development

1. **Initial Setup**: Run `npm run seed` to populate reference data
2. **Schema Changes**: After schema changes, clear and re-seed if needed
3. **Testing**: Use `npm run seed:clear` to reset data between tests

### Production Deployment

1. **Database Migration**: Run migrations first
2. **Seeding**: Run seeds to populate reference data
3. **Verification**: Check logs to ensure all seeds completed successfully

## Troubleshooting

### Common Issues

1. **Import Errors**: Ensure all seeder files are properly exported
2. **Database Connection**: Verify database is running and accessible
3. **Duplicate Data**: Seeds are idempotent, but check for schema changes
4. **Missing Dependencies**: Ensure Prisma client is generated

### Debugging

Enable detailed logging by setting the appropriate log level in the Database configuration:

```typescript
// In Database.ts
log: ['query', 'info', 'warn', 'error'];
```

## Data Sources

The seed data includes:

- **Currencies**: ISO 4217 currency codes for major world currencies
- **Payment Methods**: Common payment methods used in financial applications
- **Categories**: Comprehensive categories for expense, income, and budget tracking
- **Banks**: Major Dominican banks including commercial, international, government, and cooperative banks
- **Banking Products**: Standard banking products offered by financial institutions

## Contributing

When adding new seed data:

1. Follow existing naming conventions
2. Add appropriate comments and documentation
3. Test the seeder in isolation
4. Update this README if adding new seeders
5. Consider the impact on existing data

## Security Considerations

- **No Sensitive Data**: Seeds contain only reference data, no user data
- **Production Safety**: Seeds are safe to run in production environments
- **Data Validation**: All seed data is validated before insertion
- **Rollback Capability**: Clear function provides rollback capability for testing
