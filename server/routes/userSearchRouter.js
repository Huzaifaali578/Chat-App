import express from "express";
import { searchUser } from "../controller/userSearchController.js";

const userSearchRouter = express.Router();
// search User
userSearchRouter.post('/search-user', searchUser)

export default userSearchRouter;