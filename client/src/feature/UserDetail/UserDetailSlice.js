import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserDetailAPI, updateUserDetailAPI } from "./UserDetailAPI.js";
import { FaWpexplorer } from "react-icons/fa";

const initialState = {
    loggedInUserDetail: {success: false},
    status: "idle",
    updateUser: null
}

// GET User Detail API Thunk
export const getUserDetailAPIAsync = createAsyncThunk(
    'user-detail/getUserDetailAPI',
    async () => {
        const response = await getUserDetailAPI();
        return response.data;
    }
);

// PATCH user Detail API thunk
export const updateUserDetailAPIAsync = createAsyncThunk(
    "user/updateUserDetailAPI",
    async (updateData) => {
        const response = await updateUserDetailAPI(updateData);
        return response.data;
    }
);



const userDetailSlice = createSlice({
    name: 'user-detail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserDetailAPIAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getUserDetailAPIAsync.fulfilled, (state, action) => {
                state.loggedInUserDetail = action.payload;
                state.status = "idle"
            })
            .addCase(updateUserDetailAPIAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateUserDetailAPIAsync.fulfilled, (state, action) => {
                state.updateUser = action.payload;
                state.status = "idle"
            })
    }
});

export const selectLoggedInUserDetail = (state) => state.userDetail.loggedInUserDetail;
export const selectUpdateUser = (state) => state.userDetail.updateUser;
const userDetailReducer = userDetailSlice.reducer;

export default userDetailReducer;