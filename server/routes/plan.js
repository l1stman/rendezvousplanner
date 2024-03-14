import express from "express";
import apicache from "apicache";
import planController from "../controllers/plan.controller.js";
import authController from "../controllers/auth.controller.js";
const router = express.Router();
const cache = apicache.middleware;
    // /plan 
    
router.route("/list").get(planController.list) // full plans data
router.route("/list/length").get(planController.listLength) // full plans data length
router.route("/list/explore").get(cache("5 minutes"), planController.listByPage) // plans data by page
router.route("/list/owner/:owner").get( planController.listByOwner)  // plans list
router.route("/list/date/:date").get(cache("5 minutes"), planController.listByDate) // plans list 

router.route("/").post(authController.isLogged, planController.create) // create
router.route("/:id").get(cache("10 seconds"), planController.get).put(authController.isLogged, authController.isPlanOwner, planController.edit).delete(authController.isLogged, authController.isPlanOwner, planController.remove) // read-update-delete

router.route("/:id/reserve").post(planController.reserve) // reserve a rendezvous

router.route("/get/:serial").get(cache("30 minutes"),planController.serial, planController.getRendezvous) // get plan by serial
router.param("id", planController.id)
router.param("serial", planController.serial)


export default router;