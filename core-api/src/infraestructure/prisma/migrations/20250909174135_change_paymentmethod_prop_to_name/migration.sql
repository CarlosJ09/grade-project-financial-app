/*
  Warnings:

  - You are about to drop the column `paymentMethod` on the `payment_methods` table. All the data in the column will be lost.
  - Added the required column `name` to the `payment_methods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."payment_methods" DROP COLUMN "paymentMethod",
ADD COLUMN     "name" TEXT NOT NULL;
