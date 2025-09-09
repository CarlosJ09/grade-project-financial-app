/*
  Warnings:

  - Added the required column `budgetTypeId` to the `budget_categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."budget_categories" ADD COLUMN     "budgetTypeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."budget_categories" ADD CONSTRAINT "budget_categories_budgetTypeId_fkey" FOREIGN KEY ("budgetTypeId") REFERENCES "public"."budget_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
