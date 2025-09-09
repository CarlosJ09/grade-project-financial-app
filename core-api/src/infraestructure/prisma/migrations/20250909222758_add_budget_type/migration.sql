/*
  Warnings:

  - Added the required column `budgetTypeId` to the `budgets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."budgets" ADD COLUMN     "budgetTypeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."budget_types" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "description" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "budget_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "budget_types_name_key" ON "public"."budget_types"("name");

-- AddForeignKey
ALTER TABLE "public"."budgets" ADD CONSTRAINT "budgets_budgetTypeId_fkey" FOREIGN KEY ("budgetTypeId") REFERENCES "public"."budget_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
