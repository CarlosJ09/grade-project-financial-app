/*
  Warnings:

  - You are about to drop the column `state` on the `budgets` table. All the data in the column will be lost.
  - Added the required column `statusId` to the `budgets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "budgets" DROP COLUMN "state",
ADD COLUMN     "statusId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "budget_statuses" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "description" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "budget_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "budget_statuses_name_key" ON "budget_statuses"("name");

-- AddForeignKey
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "budget_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
