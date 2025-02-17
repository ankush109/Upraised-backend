import express from "express";
import { loginController } from "../controllers";

const router = express.Router();


router.post("/login", loginController.login);
router.post("/register", loginController.register);



export default router;
