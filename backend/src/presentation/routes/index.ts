import { Router } from 'express';
import { userRoutes } from '@/presentation/routes/UserRoutes';
import { bankRoutes } from '@/presentation/routes/BankRoutes';
import { budgetRoutes } from '@/presentation/routes/BudgetRoutes';
import { transactionRoutes } from '@/presentation/routes/TransactionRoutes';
import { categoryRoutes } from '@/presentation/routes/CategoryRoutes';
import { paymentMethodRoutes } from '@/presentation/routes/PaymentMethodRoutes';
import { userBankRoutes } from '@/presentation/routes/UserBankRoutes';
import { currencyRoutes } from '@/presentation/routes/CurrencyRoutes';
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

export { apiRouter }; 