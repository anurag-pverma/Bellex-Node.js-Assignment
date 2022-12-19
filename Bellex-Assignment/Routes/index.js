import { Router } from "express";
const router = Router();
import OrderRoutes  from "./orderRoutes.js";
import authRouter  from"./auth.js";
router.use("/order", OrderRoutes);
router.use("/role", authRouter);
export default router;
