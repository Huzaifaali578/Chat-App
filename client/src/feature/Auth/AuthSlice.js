import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkEmail, signInApi, signUpAPI } from "./authAPI";

const initialState = {
    signUpStatus: null,
    checkEmailUser: null,
    loggedInUser: null,
    status: "idle", 
};

// Async Thunk for Sign Up API
export const signUpAPIAsync = createAsyncThunk(
    "user/signUpAPI",
    async (userData) => {
        const response = await signUpAPI(userData); // API call
        return response.data; // Assumes response contains `data`
    }
);

// Async Thunk for check email API
export const checkEmailAsync = createAsyncThunk(
    "user/checkEmail",
    async ({email}) => {
        const response = await checkEmail({email});
        return response.data;
    }
)

// Async Thunk for check email API
export const signInApiAsync = createAsyncThunk(
    'user/signInApi',
    async (password) => {
        const response = await signInApi(password);
        // console.log(response.data)
        return response.data;
    }
)
// Create a Slice for Auth
export const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {}, // Omit this if no synchronous reducers
    extraReducers: (builder) => {
        builder
            .addCase(signUpAPIAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(signUpAPIAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.signUpStatus = action.payload;
            })
            .addCase(signUpAPIAsync.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(checkEmailAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(checkEmailAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.checkEmailUser = action.payload;
            })
            .addCase(checkEmailAsync.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(signInApiAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(signInApiAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.loggedInUser = action.payload;
            })
            .addCase(signInApiAsync.rejected, (state) => {
                state.status = "failed";
            });
    },
});

// Selector to Access User Data
export const selectSignUpStatus = (state) => state.user.signUpStatus;
export const selectCheckEmailUser = (state) => state.user.checkEmailUser;
export const selectLoggedInUser = (state) => state.user.loggedInUser;

// Export Reducer
const authReducer = authSlice.reducer;
export default authReducer;
