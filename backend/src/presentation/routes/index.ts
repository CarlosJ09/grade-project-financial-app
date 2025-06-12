import { Router } from 'express';
import { userRoutes } from '@/presentation/routes/UserRoutes';
import { bankRoutes } from '@/presentation/routes/BankRoutes';
import { authRoutes } from '@/presentation/routes/AuthRoutes';

const apiRouter = Router();

// Public routes (no authentication required)
apiRouter.use(authRoutes);

// Protected routes (authentication required)
apiRouter.use(userRoutes);
apiRouter.use(bankRoutes);

export { apiRouter }; 