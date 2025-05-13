import { Router } from "express";
import { DbUserRepository } from "@/infraestructure/repositories/DbUserRepository";
import { GetAllUsers } from "@/use-cases/user/GetAllUsers";
import { UserController } from "@/interface/controllers/UserController";
import { PrismaClient } from "@/infraestructure/generated/prisma";

const router = Router();

const prisma = new PrismaClient();
const userRepository = new DbUserRepository(prisma);
const getAllUsers = new GetAllUsers(userRepository);
const userController = new UserController(getAllUsers);

router.get("/users", (req, res) => userController.getAll(req, res));

export { router as userRoutes };