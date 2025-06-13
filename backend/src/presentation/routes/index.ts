import { Router } from 'express';
import { userRoutes } from '@/presentation/routes/UserRoutes';
import { bankRoutes } from '@/presentation/routes/BankRoutes';
import { budgetRoutes } from '@/presentation/routes/BudgetRoutes';
import { transactionRoutes } from '@/presentation/routes/TransactionRoutes';
import { categoryRoutes } from '@/presentation/routes/CategoryRoutes';
import { paymentMethodRoutes } from '@/presentation/routes/PaymentMethodRoutes';
import { userBankRoutes } from '@/presentation/routes/UserBankRoutes';
import { currencyRoutes } from '@/presentation/routes/CurrencyRoutes';
import { bankingProductRoutes } from '@/presentation/routes/BankingProductRoutes';
import { exchangeRateRoutes } from '@/presentation/routes/ExchangeRateRoutes';
import { courseRoutes } from '@/presentation/routes/CourseRoutes';
import { moduleRoutes } from '@/presentation/routes/ModuleRoutes';
import { contentItemRoutes } from '@/presentation/routes/ContentItemRoutes';
import { courseEnrollmentRoutes } from '@/presentation/routes/CourseEnrollmentRoutes';
import { authRoutes } from '@/presentation/routes/AuthRoutes';

const apiRouter = Router();

// Public routes (no authentication required)
apiRouter.use(authRoutes);

// Protected routes (authentication required)
apiRouter.use(userRoutes);
apiRouter.use(bankRoutes);
apiRouter.use(budgetRoutes);
apiRouter.use(transactionRoutes);
apiRouter.use(categoryRoutes);
apiRouter.use(paymentMethodRoutes);
apiRouter.use(userBankRoutes);
apiRouter.use(currencyRoutes);
apiRouter.use(bankingProductRoutes);
apiRouter.use(exchangeRateRoutes);
apiRouter.use(courseRoutes);
apiRouter.use(moduleRoutes);
apiRouter.use(contentItemRoutes);
apiRouter.use(courseEnrollmentRoutes);

export { apiRouter }; 