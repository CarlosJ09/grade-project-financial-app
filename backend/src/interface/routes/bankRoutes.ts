import { Router } from "express";
import { PostgresBankRepository } from "@/infraestructure/repositories/PostgresBankRepository";

import { GetAllBanks } from "@/use-cases/bank/GetAllBanks";
import { GetBankById } from "@/use-cases/bank/GetBankById";
import { BankController } from "@/interface/controllers/BankController";

import { PrismaClient } from "@/infraestructure/prisma/generated/prisma";

const router = Router();

const prisma = new PrismaClient();
const bankRepository = new PostgresBankRepository(prisma);
const getAllBanks = new GetAllBanks(bankRepository);
const getBankById = new GetBankById(bankRepository);

const bankController = new BankController(getAllBanks, getBankById);

router.get("/banks", (req, res) => bankController.getAll(req, res));
router.get("/banks/:id", (req, res) => bankController.getById(req, res));

export { router as bankRoutes };