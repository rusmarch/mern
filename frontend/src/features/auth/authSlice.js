import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
   user: null,
   isError: false,
   isSuccess: false,
   isLoading: false,
   message: ''
}

export const register = createAsyncThunk(
   'auth/register',
    async (user, thunkAPI) => {
      console.table(user);
   })

   export const login = createAsyncThunk(
   'auth/login',
    async (user, thunkAPI) => {
      console.table(user);
   })



export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {

   },
   extraReducers: (builder) => {

   }
})


// export const selectUser = (state) => state.auth.user;
// export const selectIsError = (state) => state.auth.isError; 
// export const selectIsSuccess = (state) => state.auth.isSuccess;
// export const selectIsLoading = (state) => state.auth.isLoading;
// export const selectMessage = (state) => state.auth.message;

export default authSlice.reducer;

