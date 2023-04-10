import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

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
      try {
         return await authService.register(user)
      } catch (error) {
         const message = (error.response
            && error.response.data
            && error.response.message)
            || error.message || error.toString();

         return thunkAPI.rejectWithValue(message);
      }
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
      reset: (state) => {
         state.isLoading = false;
         state.isError = false;
         state.isSuccess = false;
         state.message = '';
      }
   },
   extraReducers: (builder) => {
      builder
      .addCase(register.pending, (state) => {
         state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
         state.isLoading = false;
         state.isSuccess = true;
         state.user = action.payload;
      }) 
      .addCase(register.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.message = action.payload;
         state.user = null;
      })
   }
})


export const { reset } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsError = (state) => state.auth.isError; 
export const selectIsSuccess = (state) => state.auth.isSuccess;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectMessage = (state) => state.auth.message;

export default authSlice.reducer;

