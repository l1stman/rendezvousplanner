import express from "express";
const router = express.Router();
import authController from "../controllers/auth.controller.js";
    //  /auth
router.route("/signup").post(authController.signup)
router.route("/signin").post(authController.signin)
router.route("/protected").post(authController.checkToken, authController.protect)
router.route("/logout").post(authController.logout)

export default router;