/*
  Warnings:

  - The primary key for the `bank_banking_products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `bank_banking_products` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `banking_products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `banking_products` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `banks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `banks` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `budget_categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `budget_categories` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `budget_line_movements` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `budget_line_movements` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `categories` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `chat_embeddings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `chat_embeddings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `chat_feedback` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `chat_feedback` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `content_items` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `content_items` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `course_enrollments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `course_enrollments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `courses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `courses` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `currencies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `currencies` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `exchange_rates` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `exchange_rates` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `modules` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `modules` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `prerequisiteModuleId` column on the `modules` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `payment_methods` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `payment_methods` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `quiz_attempt_answers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `quiz_attempt_answers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `quiz_attempts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `quiz_attempts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `quiz_options` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `quiz_options` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `quiz_questions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `quiz_questions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `recommendations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `recommendations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `exchangeRateId` column on the `transactions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `bankingProductId` column on the `transactions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `user_module_progress` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `user_module_progress` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `bankId` on the `bank_banking_products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `bankingProductId` on the `bank_banking_products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `categoryId` on the `budget_categories` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `currencyId` on the `budgets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `moduleId` on the `content_items` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `courseId` on the `course_enrollments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `currencyId` on the `exchange_rates` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `courseId` on the `modules` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `quizAttemptId` on the `quiz_attempt_answers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `quizQuestionId` on the `quiz_attempt_answers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `contentItemId` on the `quiz_attempts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `quizQuestionId` on the `quiz_options` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `contentItemId` on the `quiz_questions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `currencyId` on the `transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `categoryId` on the `transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `paymentMethodId` on the `transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `bankId` on the `user_banks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `moduleId` on the `user_module_progress` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "bank_banking_products" DROP CONSTRAINT "bank_banking_products_bankId_fkey";

-- DropForeignKey
ALTER TABLE "bank_banking_products" DROP CONSTRAINT "bank_banking_products_bankingProductId_fkey";

-- DropForeignKey
ALTER TABLE "budgets" DROP CONSTRAINT "budgets_currencyId_fkey";

-- DropForeignKey
ALTER TABLE "content_items" DROP CONSTRAINT "content_items_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "course_enrollments" DROP CONSTRAINT "course_enrollments_courseId_fkey";

-- DropForeignKey
ALTER TABLE "exchange_rates" DROP CONSTRAINT "exchange_rates_currencyId_fkey";

-- DropForeignKey
ALTER TABLE "modules" DROP CONSTRAINT "modules_courseId_fkey";

-- DropForeignKey
ALTER TABLE "quiz_attempt_answers" DROP CONSTRAINT "quiz_attempt_answers_quizAttemptId_fkey";

-- DropForeignKey
ALTER TABLE "quiz_attempt_answers" DROP CONSTRAINT "quiz_attempt_answers_quizQuestionId_fkey";

-- DropForeignKey
ALTER TABLE "quiz_options" DROP CONSTRAINT "quiz_options_quizQuestionId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_bankingProductId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_currencyId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_exchangeRateId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_paymentMethodId_fkey";

-- DropForeignKey
ALTER TABLE "user_banks" DROP CONSTRAINT "user_banks_bankId_fkey";

-- DropForeignKey
ALTER TABLE "user_module_progress" DROP CONSTRAINT "user_module_progress_moduleId_fkey";

-- AlterTable
ALTER TABLE "bank_banking_products" DROP CONSTRAINT "bank_banking_products_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "bankId",
ADD COLUMN     "bankId" INTEGER NOT NULL,
DROP COLUMN "bankingProductId",
ADD COLUMN     "bankingProductId" INTEGER NOT NULL,
ADD CONSTRAINT "bank_banking_products_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "banking_products" DROP CONSTRAINT "banking_products_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "banking_products_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "banks" DROP CONSTRAINT "banks_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "banks_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "budget_categories" DROP CONSTRAINT "budget_categories_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "categoryId",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD CONSTRAINT "budget_categories_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "budget_line_movements" DROP CONSTRAINT "budget_line_movements_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "budget_line_movements_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "budgets" DROP COLUMN "currencyId",
ADD COLUMN     "currencyId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "categories" DROP CONSTRAINT "categories_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "chat_embeddings" DROP CONSTRAINT "chat_embeddings_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "chat_embeddings_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "chat_feedback" DROP CONSTRAINT "chat_feedback_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "chat_feedback_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "content_items" DROP CONSTRAINT "content_items_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "moduleId",
ADD COLUMN     "moduleId" INTEGER NOT NULL,
ADD CONSTRAINT "content_items_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "course_enrollments" DROP CONSTRAINT "course_enrollments_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "courseId",
ADD COLUMN     "courseId" INTEGER NOT NULL,
ADD CONSTRAINT "course_enrollments_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "courses" DROP CONSTRAINT "courses_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "courses_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "currencies" DROP CONSTRAINT "currencies_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "currencies_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "exchange_rates" DROP CONSTRAINT "exchange_rates_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "currencyId",
ADD COLUMN     "currencyId" INTEGER NOT NULL,
ADD CONSTRAINT "exchange_rates_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "modules" DROP CONSTRAINT "modules_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "courseId",
ADD COLUMN     "courseId" INTEGER NOT NULL,
DROP COLUMN "prerequisiteModuleId",
ADD COLUMN     "prerequisiteModuleId" INTEGER,
ADD CONSTRAINT "modules_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "payment_methods" DROP CONSTRAINT "payment_methods_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "quiz_attempt_answers" DROP CONSTRAINT "quiz_attempt_answers_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "quizAttemptId",
ADD COLUMN     "quizAttemptId" INTEGER NOT NULL,
DROP COLUMN "quizQuestionId",
ADD COLUMN     "quizQuestionId" INTEGER NOT NULL,
ADD CONSTRAINT "quiz_attempt_answers_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "quiz_attempts" DROP CONSTRAINT "quiz_attempts_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "contentItemId",
ADD COLUMN     "contentItemId" INTEGER NOT NULL,
ADD CONSTRAINT "quiz_attempts_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "quiz_options" DROP CONSTRAINT "quiz_options_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "quizQuestionId",
ADD COLUMN     "quizQuestionId" INTEGER NOT NULL,
ADD CONSTRAINT "quiz_options_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "quiz_questions" DROP CONSTRAINT "quiz_questions_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "contentItemId",
ADD COLUMN     "contentItemId" INTEGER NOT NULL,
ADD CONSTRAINT "quiz_questions_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "recommendations" DROP CONSTRAINT "recommendations_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "recommendations_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "currencyId",
ADD COLUMN     "currencyId" INTEGER NOT NULL,
DROP COLUMN "exchangeRateId",
ADD COLUMN     "exchangeRateId" INTEGER,
DROP COLUMN "categoryId",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
DROP COLUMN "paymentMethodId",
ADD COLUMN     "paymentMethodId" INTEGER NOT NULL,
DROP COLUMN "bankingProductId",
ADD COLUMN     "bankingProductId" INTEGER;

-- AlterTable
ALTER TABLE "user_banks" DROP COLUMN "bankId",
ADD COLUMN     "bankId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user_module_progress" DROP CONSTRAINT "user_module_progress_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "moduleId",
ADD COLUMN     "moduleId" INTEGER NOT NULL,
ADD CONSTRAINT "user_module_progress_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_exchangeRateId_fkey" FOREIGN KEY ("exchangeRateId") REFERENCES "exchange_rates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "payment_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_bankingProductId_fkey" FOREIGN KEY ("bankingProductId") REFERENCES "banking_products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exchange_rates" ADD CONSTRAINT "exchange_rates_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_banks" ADD CONSTRAINT "user_banks_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "banks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bank_banking_products" ADD CONSTRAINT "bank_banking_products_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "banks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bank_banking_products" ADD CONSTRAINT "bank_banking_products_bankingProductId_fkey" FOREIGN KEY ("bankingProductId") REFERENCES "banking_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_enrollments" ADD CONSTRAINT "course_enrollments_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_module_progress" ADD CONSTRAINT "user_module_progress_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modules" ADD CONSTRAINT "modules_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_items" ADD CONSTRAINT "content_items_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_options" ADD CONSTRAINT "quiz_options_quizQuestionId_fkey" FOREIGN KEY ("quizQuestionId") REFERENCES "quiz_questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_attempt_answers" ADD CONSTRAINT "quiz_attempt_answers_quizAttemptId_fkey" FOREIGN KEY ("quizAttemptId") REFERENCES "quiz_attempts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_attempt_answers" ADD CONSTRAINT "quiz_attempt_answers_quizQuestionId_fkey" FOREIGN KEY ("quizQuestionId") REFERENCES "quiz_options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
