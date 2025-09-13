-- DropForeignKey
ALTER TABLE "public"."user_assets" DROP CONSTRAINT "user_assets_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_cash_holdings" DROP CONSTRAINT "user_cash_holdings_userId_fkey";

-- DropIndex
DROP INDEX "public"."user_assets_assetType_idx";

-- DropIndex
DROP INDEX "public"."user_assets_userId_idx";

-- DropIndex
DROP INDEX "public"."user_cash_holdings_userId_idx";

-- AddForeignKey
ALTER TABLE "public"."user_cash_holdings" ADD CONSTRAINT "user_cash_holdings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_assets" ADD CONSTRAINT "user_assets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
