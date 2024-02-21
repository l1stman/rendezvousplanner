import express from "express";
import authController from "../controllers/auth.controller.js";
const router = express.Router();
    //  /account
router.route("/").put(authController.checkToken, authController.LoginWithToken, authController.isLogged, authController.editaccount).delete(authController.checkToken, authController.LoginWithToken, authController.isLogged, authController.deleteaccount) // edit-delete

export default router;