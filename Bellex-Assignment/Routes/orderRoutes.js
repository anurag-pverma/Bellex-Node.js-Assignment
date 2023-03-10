import { Router } from "express";
import * as productControllers from "../Controller/productController.js";
import *   as middleware from "../Middleware/auth.js";
const router = Router();
router.use(middleware.auth);
router.get("/", productControllers.index);
router.post(`/`, productControllers.create);
// not protected route ...X
// router.get("/admin/orders", productControllers.getadmin);
// router.put("/admin/orders/:order_id", productControllers.update);
// router.patch("/admin/orders/summary", productControllers.getallsummary);
export default router;
