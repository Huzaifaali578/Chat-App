import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/Auth/authSlice";

export const store = configureStore({
    reducer: {
        user: authReducer,
    }
})