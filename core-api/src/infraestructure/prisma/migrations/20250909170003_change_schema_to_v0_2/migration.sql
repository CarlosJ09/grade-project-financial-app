/*
  Warnings:

  - You are about to drop the column `bankingProductName` on the `banking_products` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `budgets` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `currencies` table. All the data in the column will be lost.
  - You are about to drop the column `bankingProductId` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `place` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `lastSyncAt` on the `user_banks` table. All the data in the column will be lost.
  - You are about to drop the `budget_line_movements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `budget_statuses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `banking_products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `budgetAllocationId` to the `budgets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `budgetExecutionId` to the `budgets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startedDate` to the `budgets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `currencies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `currencies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `symbol` to the `currencies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `merchantId` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionTypeId` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `user_banks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."budget_line_movements" DROP CONSTRAINT "budget_line_movements_budgetId_fkey";

-- DropForeignKey
ALTER TABLE "public"."budget_line_movements" DROP CONSTRAINT "budget_line_movements_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."budgets" DROP CONSTRAINT "budgets_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."budgets" DROP CONSTRAINT "budgets_statusId_fkey";

-- DropForeignKey
ALTER TABLE "public"."transactions" DROP CONSTRAINT "transactions_bankingProductId_fkey";

-- DropForeignKey
ALTER TABLE "public"."transactions" DROP CONSTRAINT "transactions_categoryId_fkey";

-- AlterTable
ALTER TABLE "public"."banking_products" DROP COLUMN "bankingProductName",
ADD COLUMN     "name" VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE "public"."budgets" DROP COLUMN "startDate",
ADD COLUMN     "budgetAllocationId" INTEGER NOT NULL,
ADD COLUMN     "budgetExecutionId" INTEGER NOT NULL,
ADD COLUMN     "startedDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."currencies" DROP COLUMN "currency",
ADD COLUMN     "code" VARCHAR(3) NOT NULL,
ADD COLUMN     "name" VARCHAR(50) NOT NULL,
ADD COLUMN     "symbol" VARCHAR(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."transactions" DROP COLUMN "bankingProductId",
DROP COLUMN "place",
DROP COLUMN "type",
ADD COLUMN     "merchantId" INTEGER NOT NULL,
ADD COLUMN     "transactionTypeId" INTEGER NOT NULL,
ADD COLUMN     "userBankingProductId" TEXT;

-- AlterTable
ALTER TABLE "public"."user_banks" DROP COLUMN "lastSyncAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "public"."budget_line_movements";

-- DropTable
DROP TABLE "public"."budget_statuses";

-- DropTable
DROP TABLE "public"."categories";

-- CreateTable
CREATE TABLE "public"."budget_allocations" (
    "id" SERIAL NOT NULL,
    "budgetId" TEXT NOT NULL,
    "amount" DECIMAL(18,4) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "budget_allocations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budget_executions" (
    "id" SERIAL NOT NULL,
    "budgetId" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "budget_executions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budget_status" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "description" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "budget_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budget_categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "budget_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."transaction_categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transaction_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."transaction_types" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transaction_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."merchants" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "website" VARCHAR(50),
    "location" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "merchants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."merchant_categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "merchant_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_banking_products" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bankBankingProductId" INTEGER NOT NULL,
    "referenceNumber" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "currencyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_banking_products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "budget_status_name_key" ON "public"."budget_status"("name");

-- CreateIndex
CREATE UNIQUE INDEX "budget_categories_name_key" ON "public"."budget_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "transaction_categories_name_key" ON "public"."transaction_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "transaction_types_name_key" ON "public"."transaction_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "merchants_name_key" ON "public"."merchants"("name");

-- CreateIndex
CREATE UNIQUE INDEX "merchant_categories_name_key" ON "public"."merchant_categories"("name");

-- AddForeignKey
ALTER TABLE "public"."budgets" ADD CONSTRAINT "budgets_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "public"."budget_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."budgets" ADD CONSTRAINT "budgets_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."budget_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."budget_allocations" ADD CONSTRAINT "budget_allocations_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "public"."budgets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."budget_executions" ADD CONSTRAINT "budget_executions_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "public"."budgets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."budget_executions" ADD CONSTRAINT "budget_executions_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "public"."transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."transactions" ADD CONSTRAINT "transactions_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."transaction_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."transactions" ADD CONSTRAINT "transactions_transactionTypeId_fkey" FOREIGN KEY ("transactionTypeId") REFERENCES "public"."transaction_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."transactions" ADD CONSTRAINT "transactions_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "public"."merchants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."transactions" ADD CONSTRAINT "transactions_userBankingProductId_fkey" FOREIGN KEY ("userBankingProductId") REFERENCES "public"."user_banking_products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."merchants" ADD CONSTRAINT "merchants_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."merchant_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_banking_products" ADD CONSTRAINT "user_banking_products_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_banking_products" ADD CONSTRAINT "user_banking_products_bankBankingProductId_fkey" FOREIGN KEY ("bankBankingProductId") REFERENCES "public"."bank_banking_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_banking_products" ADD CONSTRAINT "user_banking_products_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "public"."currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
