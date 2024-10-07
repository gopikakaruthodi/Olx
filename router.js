import { Router } from "express";
import { addMember } from "./requestHandler.js";
const router=Router()

router.route("/addData").post(addMember)

export default router