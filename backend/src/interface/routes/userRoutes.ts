import { Router } from "express";
import { PostgresUserRepository } from "@/infraestructure/repositories/PostgresUserRepository";

import { GetAllUsers } from "@/use-cases/user/GetAllUsers";
import { GetUserById } from "@/use-cases/user/GetUserById";
import { UserController } from "@/interface/controllers/UserController";

import { PrismaClient } from "@/infraestructure/prisma/generated/prisma";

const router = Router();

const prisma = new PrismaClient();
const userRepository = new PostgresUserRepository(prisma);
const getAllUsers = new GetAllUsers(userRepository);
const getUserById = new GetUserById(userRepository);

const userController = new UserController(getAllUsers, getUserById);

router.get("/users", (req, res) => userController.getAll(req, res));
router.get("/users/:id", (req, res) => userController.getById(req, res));

export { router as userRoutes };