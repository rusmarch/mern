import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ticketService } from './ticketService';
import { initializeConnect } from "react-redux/es/components/connect";

const initialState = {
   tickets: [],
   ticket: {},
   isError: false,
   isSuccess: false,
   isLoading: false,
   message: ''
}

export const ticketSlice = createSlice({
   name: 'ticket',
   initialState,
   reducers: {
      reset: (state) => initialState,
   },
   extraReducers: (builder) => {
      
   }

})

export const { reset } = ticketSlice.actions;

export const { reducer: ticketReducer } = ticketSlice;