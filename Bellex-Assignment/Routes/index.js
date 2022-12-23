import { Router } from "express";
const router = Router();
import OrderRoutes from "./orderRoutes.js";
import authRouter from "./auth.js";
import roleRouter from "./roleRoutes.js";
router.use("/", authRouter);
router.use("/role", roleRouter);
router.use("/orders", OrderRoutes);
export default router;
