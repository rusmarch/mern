import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from './authService';

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
         return await authService.registerUser(user);
      } catch (error) {
         const message = ( 
         error.response && 
         error.response.data &&
         error.response.data.message)
         || error.message || error.toString();

         return thunkAPI.rejectWithValue(message);
      }
})


export const login = createAsyncThunk(
   'auth/login', 
   async (user, thunkAPI) => {
   console.log(user);
})

export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      reset: (state) => {
         state.isLoading = false;
         state.isError = false;
         state.isSucces = false;
         state.messate = '';
      }
   },
   extraReducers: (builder) => {
      builder
      .addCase(register.pending, (state) => {
         state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
         state.isLoading = false;
         state.isSucces = true;
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

export const selectUser = (state => state.auth.user);
export const selectIsError = (state => state.auth.isError);
export const selectIsLoading = (state => state.auth.isLoading);
export const selectIsSuccess = (state => state.auth.isSuccess);
export const selelctMessage = (state => state.auth.message);

export default authSlice.reducer;