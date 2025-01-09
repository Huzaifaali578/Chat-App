import express from "express";
import { checkEmail, Logout, signIn, signUp } from "../controller/userAuthController.js";
import { getUserDatail } from "../controller/userDetailController.js";

const userAuthRouter = express.Router();

// user api
// create user
userAuthRouter.post("/signup", signUp);
// Check email exist 
userAuthRouter.post("/check", checkEmail);
// Enter Password
userAuthRouter.post("/signin", signIn);
// GET User detail
userAuthRouter.get("/user-detail", getUserDatail);
// LogOut
userAuthRouter.get("/logout", Logout);




export default userAuthRouter;