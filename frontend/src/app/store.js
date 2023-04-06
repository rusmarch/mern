import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../features/auth/authService';



export const store = configureStore({
  reducer: {
    auth: authSlice
  },
});
