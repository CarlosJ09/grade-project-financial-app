-- Add current balance to user banking products
ALTER TABLE "user_banking_products" 
ADD COLUMN "currentBalance" DECIMAL(18, 4) NOT NULL DEFAULT 0.00;

-- Add last updated balance timestamp
ALTER TABLE "user_banking_products" 
ADD COLUMN "lastBalanceUpdate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- Create table for user cash holdings
CREATE TABLE "user_cash_holdings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "currencyId" INTEGER NOT NULL,
    "amount" DECIMAL(18, 4) NOT NULL DEFAULT 0.00,
    "label" VARCHAR(50) NOT NULL DEFAULT 'Cash',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_cash_holdings_pkey" PRIMARY KEY ("id")
);

-- Create table for other assets (investments, crypto, etc.)
CREATE TABLE "user_assets" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "assetType" VARCHAR(50) NOT NULL, -- 'investment', 'crypto', 'property', etc.
    "assetName" VARCHAR(100) NOT NULL,
    "currentValue" DECIMAL(18, 4) NOT NULL DEFAULT 0.00,
    "currencyId" INTEGER NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_assets_pkey" PRIMARY KEY ("id")
);

-- Add foreign key constraints
ALTER TABLE "user_cash_holdings" ADD CONSTRAINT "user_cash_holdings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "user_cash_holdings" ADD CONSTRAINT "user_cash_holdings_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "user_assets" ADD CONSTRAINT "user_assets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "user_assets" ADD CONSTRAINT "user_assets_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Create indexes for performance
CREATE INDEX "user_cash_holdings_userId_idx" ON "user_cash_holdings"("userId");
CREATE INDEX "user_assets_userId_idx" ON "user_assets"("userId");
CREATE INDEX "user_assets_assetType_idx" ON "user_assets"("assetType");

-- Add unique constraint to prevent duplicate cash holdings per currency per user
ALTER TABLE "user_cash_holdings" ADD CONSTRAINT "user_cash_holdings_userId_currencyId_key" UNIQUE ("userId", "currencyId");
