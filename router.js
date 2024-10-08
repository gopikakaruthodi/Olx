import { Router } from "express";
import { addMember, signin } from "./requestHandler.js";
const router=Router()

router.route("/addData").post(addMember)
router.route("/signin").post(signin)


export default router