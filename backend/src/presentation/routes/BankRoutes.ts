import { Router } from "express";
import { PostgresBankRepository } from "@/infraestructure/repositories/PostgresBankRepository";

import { GetAllBanks } from "@/use-cases/bank/GetAllBanks";
import { GetBankById } from "@/use-cases/bank/GetBankById";
import { BankController } from "@/presentation/controllers/BankController";

import { PrismaClient } from "@/infraestructure/prisma/generated/prisma";

const router = Router();

const prisma = new PrismaClient();
const bankRepository = new PostgresBankRepository(prisma);
const getAllBanks = new GetAllBanks(bankRepository);
const getBankById = new GetBankById(bankRepository);

const bankController = new BankController(getAllBanks, getBankById);

/**
 * @swagger
 * /banks:
 *   get:
 *     summary: Get all banks
 *     tags: [Banks]
 *     responses:
 *       200:
 *         description: A list of banks
 */
router.get("/banks", (req, res) => bankController.getAll(req, res));

/**
 * @swagger
 * /banks/{id}:
 *   get:
 *     summary: Get a bank by id
 *     tags: [Banks]
 *     responses:
 *       200:
 *         description: A bank
 */
/* router.get("/banks/:id", (req, res) => bankController.getById(req, res)); */

export { router as bankRoutes };