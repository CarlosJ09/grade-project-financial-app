import { Router } from 'express';
import { userRoutes } from './UserRoutes';
import { bankRoutes } from './BankRoutes';
const apiRouter = Router();

apiRouter.use(userRoutes);
apiRouter.use(bankRoutes);

export { apiRouter }; 