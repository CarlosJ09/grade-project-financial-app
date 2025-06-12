import { Router } from 'express';
import { userRoutes } from '@/presentation/routes/UserRoutes';
import { bankRoutes } from '@/presentation/routes/BankRoutes';

const apiRouter = Router();

apiRouter.use(userRoutes);
apiRouter.use(bankRoutes);

export { apiRouter }; 