import { Router } from "express";
import * as productControllers from "../Controller/productController.js";
import auth from "../Middleware/auth.js";
const router = Router();
router.use(auth);
router.get("/", productControllers.index);
router.post(`/`, productControllers.create);
router.patch("/:id", productControllers.update);
export default router;
