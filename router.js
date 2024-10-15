import { Router } from "express";
import * as rh from "./requestHandler.js";
import Auth from "./middleware/Auth.js";
const router=Router()
// signup
router.route("/signup").post(rh.signup)
router.route("/signin").post(rh.signin)
router.route("/getuser/:_id").get(rh.getUser)
router.route("/getusers").get(rh.getUsers)
router.route("/getProducts").get(Auth,rh.getProducts)
router.route("/getProductdetails/:_id").get(rh.getProductDetails)
router.route("/updateuser/:_id").put(rh.updateUser)
router.route("/addproduct").post(rh.addProducts)
router.route("/deleteuser/:_id").delete(rh.deleteUser)
router.route("/deleteuser/:_id").delete(rh.deleteUser)




export default router