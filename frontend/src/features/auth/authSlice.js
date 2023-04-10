import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
   user: 'Ruslan',
   user2: 'Ivan',
   isError: false,
   isSucces: false,
   isLoading: false,
   message: 'Hi, dude!'
}

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
   console.log(user)
})

export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {

   },
   extraReducers: (builder) => {

   } 
})



export const selectUser = (state) => state.auth.user;
export const selectUser2 = (state) => state.auth.user2;
export const selectIsError = (state) => state.auth.isError;
export const selectIsSuccess = (state) => state.auth.isSuccess;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectMessage = (state) => state.auth.message;


export default authSlice.reducer;