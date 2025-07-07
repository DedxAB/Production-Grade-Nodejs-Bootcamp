import { Router } from "express";
import {
  createUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", getAllUsersHandler);
router.get("/:id", getUserByIdHandler);
router.post("/", createUserHandler);

export default router;
