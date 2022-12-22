import { Router } from "express";
const router = Router();

import * as roleController from "../Controller/RoleController.js";


router.post("/", roleController.roledata)

export default router;