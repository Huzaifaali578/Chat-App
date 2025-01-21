import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/Auth/authSlice";
import userDetailReducer from "../feature/UserDetail/UserDetailSlice.js";
import searchUserReducer from "../feature/search_user/SearchUserSlice.js";

export const store = configureStore({
    reducer: {
        user: authReducer,
        userDetail: userDetailReducer,
        searchUser: searchUserReducer,
    }
})