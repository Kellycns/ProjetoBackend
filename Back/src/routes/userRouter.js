import express from "express";
import AuthenticationController from "../controllers/userController.js";

const router = express.Router();

router.post("/register", AuthenticationController.userRegister);
router.post("/login", AuthenticationController.user);

export default router;