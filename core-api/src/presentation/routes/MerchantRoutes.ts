import { Database } from '@/infraestructure/config/Database';
import { PostgresMerchantRepository } from '@/infraestructure/repositories/PostgresMerchantRepository';
import { JwtTokenService } from '@/infraestructure/services/JwtTokenService';
import { MerchantController } from '@/presentation/controllers/MerchantController';
import { createAuthMiddleware } from '@/presentation/middleware/authMiddleware';
import { asyncHandler } from '@/presentation/utils/asyncHandler';
import { GetAllMerchants } from '@/use-cases/merchant/GetAllMerchants';
import { GetMerchantById } from '@/use-cases/merchant/GetMerchantById';
import { Router } from 'express';

const router = Router();

const tokenService = new JwtTokenService();
const authMiddleware = createAuthMiddleware(tokenService);

const prisma = Database.getInstance();
const merchantRepository = new PostgresMerchantRepository(prisma);
const getAllMerchants = new GetAllMerchants(merchantRepository);
const getMerchantById = new GetMerchantById(merchantRepository);

const merchantController = new MerchantController(
  getAllMerchants,
  getMerchantById
);

router.get(
  '/merchants',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return merchantController.getAll(req, res);
  })
);

router.get(
  '/merchants/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return merchantController.getById(req, res);
  })
);

export { router as merchantRoutes };
