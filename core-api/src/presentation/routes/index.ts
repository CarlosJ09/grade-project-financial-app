import { authRoutes } from '@/presentation/routes/AuthRoutes';
import { bankRoutes } from '@/presentation/routes/BankRoutes';
import { budgetRoutes } from '@/presentation/routes/BudgetRoutes';
import { categoryRoutes } from '@/presentation/routes/CategoryRoutes';
import { contentItemRoutes } from '@/presentation/routes/ContentItemRoutes';
import { courseEnrollmentRoutes } from '@/presentation/routes/CourseEnrollmentRoutes';
import { courseRoutes } from '@/presentation/routes/CourseRoutes';
import { currencyRoutes } from '@/presentation/routes/CurrencyRoutes';
import { exchangeRateRoutes } from '@/presentation/routes/ExchangeRateRoutes';
import { moduleRoutes } from '@/presentation/routes/ModuleRoutes';
import { paymentMethodRoutes } from '@/presentation/routes/PaymentMethodRoutes';
import { transactionRoutes } from '@/presentation/routes/TransactionRoutes';
import { userBankRoutes } from '@/presentation/routes/UserBankRoutes';
import { userRoutes } from '@/presentation/routes/UserRoutes';
import { Router } from 'express';

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
apiRouter.use(exchangeRateRoutes);
apiRouter.use(courseRoutes);
apiRouter.use(moduleRoutes);
apiRouter.use(contentItemRoutes);
apiRouter.use(courseEnrollmentRoutes);

export { apiRouter };
