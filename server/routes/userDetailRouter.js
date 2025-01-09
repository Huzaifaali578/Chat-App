import express from "express";
// import { checkEmail, Logout, signIn, signUp } from "../controller/userAuthController.js";
import { getUserDatail, updateUserDetail } from "../controller/userDetailController.js";

const userDetailRouter = express.Router();

// user api
// GET User detail
userDetailRouter.get("/user-detail", getUserDatail);
// Update User
userDetailRouter.patch("/update-user", updateUserDetail);





export default userDetailRouter;