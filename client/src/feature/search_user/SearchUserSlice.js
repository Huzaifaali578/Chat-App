import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchUserAPI } from "./SearchUserAPI";

const initialState = {
    status: "idle",
    user: []
}

export const searchUserAPIAsync = createAsyncThunk(
    "search-user/searchUserAPI",
    async (search) => {
        const response = await searchUserAPI(search);
        return response.data;
    }
);


export const searchUserSlice = createSlice({
    name: "search-user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchUserAPIAsync.pending, (state) => {
                state.status = "pending"
            })
            .addCase(searchUserAPIAsync.fulfilled, (state, action) => {
                state.status = "idle"
                state.user = action.payload
            })
    }
});

export const selectSearchUser = (state) => state.searchUser.user;
const searchUserReducer = searchUserSlice.reducer;

export default searchUserReducer;