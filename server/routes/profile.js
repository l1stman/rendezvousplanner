import express from "express";
import profileController from "../controllers/profile.controller.js";
import authController from "../controllers/auth.controller.js";
const router = express.Router();
    //  /profile
router.route("/create").post(profileController.create)
router.route("/create/byauth").post(authController.checkToken, authController.LoginWithToken, authController.isLogged, profileController.create) // create for an logged account
router.route("/:id").get(profileController.get).put(authController.checkToken, authController.LoginWithToken, authController.isLogged, authController.isProfileOwner, profileController.edit) // get-edit
router.route("/account/:accountid").get(profileController.get).put(authController.checkToken, authController.LoginWithToken, authController.isLogged, authController.isProfileOwner, profileController.edit) 

router.param("id", profileController.id)
router.param("accountid", profileController.accountid)

export default router;