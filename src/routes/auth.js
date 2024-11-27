import { Router } from "express";
import * as AuthController from "../controllers/auth.js";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

export default router;