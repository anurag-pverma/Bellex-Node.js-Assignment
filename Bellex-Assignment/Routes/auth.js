import express  from "express"
const authRoutes = express.Router();
// import AuthController from "../Controller/AuthController.js"
import * as AuthController from "../Controller/AuthController.js";
authRoutes.post("/signup", AuthController.signup);
authRoutes.post("/login", AuthController.login);
export default authRoutes;
