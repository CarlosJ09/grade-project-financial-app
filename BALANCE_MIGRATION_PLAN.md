# Balance System Migration Plan

## Overview
This migration transforms the balance calculation from a transaction-based approach to an account-based approach, providing more accurate and comprehensive financial tracking.

## Changes Made

### 1. Schema Updates

#### UserBankingProduct Table
- **Added**: `currentBalance` (Decimal 18,4) - Current account balance
- **Added**: `lastBalanceUpdate` (DateTime) - When balance was last updated

#### New Tables
- **UserCashHolding**: Track user's cash holdings by currency
  - `id`, `userId`, `currencyId`, `amount`, `label`, `createdAt`, `updatedAt`
  - Unique constraint: `(userId, currencyId)`

- **UserAsset**: Track other assets (investments, crypto, etc.)
  - `id`, `userId`, `assetType`, `assetName`, `currentValue`, `currencyId`, `description`, `createdAt`, `updatedAt`

### 2. Entity Updates
- Updated `UserBankingProduct` entity with new balance fields
- Created `UserCashHolding` entity
- Created `UserAsset` entity

### 3. Balance Calculation Logic
- **Before**: Balance = Income - Expenses (from transactions)
- **After**: Balance = Sum of all account balances + cash holdings + asset values

### 4. API Response Updates
Enhanced `UserBalanceResponseDto` with:
- `accountBalances`: Detailed breakdown of each account
- `cashHoldings`: Cash holdings by currency
- `assets`: Investment and other asset values

## Migration Steps

### Phase 1: Database Schema Migration
```bash
# Run the migration
npx prisma db push
# or
npx prisma migrate dev --name add_balance_tracking
```

### Phase 2: Data Migration
1. **Set Initial Account Balances**: For existing `UserBankingProduct` records, calculate initial balance from transaction history
2. **Initialize Cash Holdings**: Create default cash holdings for users (optional)

### Phase 3: Update Balance Management
1. **Transaction Processing**: When transactions are created, update the corresponding account balance
2. **Balance Sync**: Implement periodic balance synchronization with external bank APIs
3. **Manual Balance Updates**: Allow users to manually update account balances

## Implementation Recommendations

### 1. Balance Update Strategies

#### Option A: Real-time Updates
- Update account balance immediately when transactions are created/updated
- Pros: Always accurate, real-time
- Cons: More complex, potential for race conditions

#### Option B: Batch Updates
- Update balances periodically (daily/hourly)
- Pros: Simpler, better performance
- Cons: May not reflect real-time changes

#### Option C: Hybrid Approach (Recommended)
- Real-time updates for user-initiated transactions
- Batch updates for external/imported transactions
- Manual refresh option for users

### 2. Data Consistency
- Implement database transactions for balance updates
- Add validation to ensure balances don't go negative (for appropriate account types)
- Create audit trail for balance changes

### 3. Future Enhancements
- **Bank Integration**: Sync with real bank APIs
- **Investment Tracking**: Real-time asset value updates
- **Multi-currency Support**: Enhanced exchange rate handling
- **Balance History**: Track balance changes over time

## Use Cases to Implement

### High Priority
1. `UpdateAccountBalance` - Update specific account balance
2. `SyncAccountBalances` - Sync all account balances
3. `CreateCashHolding` - Add cash holding for user
4. `UpdateCashHolding` - Update cash amount

### Medium Priority
1. `CreateUserAsset` - Add investment/asset
2. `UpdateAssetValue` - Update asset value
3. `GetBalanceHistory` - Track balance changes over time

### Low Priority
1. `ImportBankStatement` - Import and reconcile bank statements
2. `BalanceReconciliation` - Compare calculated vs actual balances

## Testing Strategy
1. **Unit Tests**: Test balance calculation logic
2. **Integration Tests**: Test database updates and consistency
3. **Migration Tests**: Verify data migration accuracy
4. **Performance Tests**: Ensure balance calculations are efficient

## Rollback Plan
If issues arise:
1. Revert to previous transaction-based calculation
2. Keep new schema fields but ignore them in calculations
3. Run data validation to ensure consistency
