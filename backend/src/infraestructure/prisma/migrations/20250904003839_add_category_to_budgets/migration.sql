/*
  Warnings:

  - You are about to drop the `budget_categories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `budgets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "budgets" ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "budget_categories";

-- AddForeignKey
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
