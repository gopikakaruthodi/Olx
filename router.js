import { Router } from "express";
import * as rh from "./requestHandler.js";
import Auth from "./middleware/Auth.js";
const router=Router()
// signup
router.route("/signup").post(rh.signup)
router.route("/signin").post(rh.signin)
router.route("/getuser/:_id").get(rh.getUser)
// router.route("/getusers").get(rh.getUsers)
router.route("/getProducts").get(Auth,rh.getProducts)
router.route("/getProductdetails/:_id").get(rh.getProductDetails)
router.route("/updateuser/:_id").put(rh.updateUser)
router.route("/addproduct").post(rh.addProducts)
router.route("/deleteuser/:_id").delete(rh.deleteUser)
router.route("/updateproduct/:_id").put(rh.updateProduct)
router.route("/deleteproduct/:_id").delete(rh.deleteProduct)
router.route("/addwish").post(rh.addWish)
router.route("/getwish").get(rh.getWish)
router.route("/deletewish/:_id").delete(rh.deleteWish)


router.route("/getproductss").get(rh.getProductss);
router.route("/otp").post(rh.generateOTP);
router.route("/compareotp").post(rh.compareOTP);
router.route("/changepassword").post(rh.changePassword);





export default router