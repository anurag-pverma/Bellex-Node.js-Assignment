import express from "express";
const authRoutes = express.Router();

import * as AuthController from "../Controller/AuthController.js";
authRoutes.post("/signup", AuthController.signup);
authRoutes.post("/login", AuthController.login);
authRoutes.get("/admin/orders", AuthController.getadmin);
authRoutes.put("/admin/orders/:order_id", AuthController.update);
authRoutes.get("/admin/orders/summary", AuthController.getallsummary);
export default authRoutes;
