import { authRoutes } from '@/presentation/routes/AuthRoutes';
import { bankRoutes } from '@/presentation/routes/BankRoutes';
import { budgetCategoryRoutes } from '@/presentation/routes/BudgetCategoryRoutes';
import { budgetRoutes } from '@/presentation/routes/BudgetRoutes';
import { budgetStatusRoutes } from '@/presentation/routes/BudgetStatusRoutes';
import { budgetTypeRoutes } from '@/presentation/routes/BudgetTypeRoutes';
import { contentItemRoutes } from '@/presentation/routes/ContentItemRoutes';
import { courseEnrollmentRoutes } from '@/presentation/routes/CourseEnrollmentRoutes';
import { courseRoutes } from '@/presentation/routes/CourseRoutes';
import { currencyRoutes } from '@/presentation/routes/CurrencyRoutes';
import { exchangeRateRoutes } from '@/presentation/routes/ExchangeRateRoutes';
import { merchantRoutes } from '@/presentation/routes/MerchantRoutes';
import { moduleRoutes } from '@/presentation/routes/ModuleRoutes';
import { paymentMethodRoutes } from '@/presentation/routes/PaymentMethodRoutes';
import { transactionCategoryRoutes } from '@/presentation/routes/TransactionCategoryRoutes';
import { transactionRoutes } from '@/presentation/routes/TransactionRoutes';
import { transactionTypeRoutes } from '@/presentation/routes/TransactionTypeRoutes';
import { userBankRoutes } from '@/presentation/routes/UserBankRoutes';
import { userBankingProductRoutes } from '@/presentation/routes/UserBankingProductRoutes';
import { userRoutes } from '@/presentation/routes/UserRoutes';
import { Router } from 'express';

const apiRouter = Router();

// Public routes (no authentication required)
apiRouter.use(authRoutes);

// Protected routes (authentication required)
apiRouter.use(userRoutes);
apiRouter.use(bankRoutes);
apiRouter.use(budgetRoutes);
apiRouter.use(budgetCategoryRoutes);
apiRouter.use(budgetStatusRoutes);
apiRouter.use(budgetTypeRoutes);
apiRouter.use(transactionRoutes);
apiRouter.use(transactionCategoryRoutes);
apiRouter.use(transactionTypeRoutes);
apiRouter.use(paymentMethodRoutes);
apiRouter.use(userBankRoutes);
apiRouter.use(userBankingProductRoutes);
apiRouter.use(currencyRoutes);
apiRouter.use(exchangeRateRoutes);
apiRouter.use(merchantRoutes);
apiRouter.use(courseRoutes);
apiRouter.use(moduleRoutes);
apiRouter.use(contentItemRoutes);
apiRouter.use(courseEnrollmentRoutes);

export { apiRouter };
