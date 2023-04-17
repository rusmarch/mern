import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ticketService } from './ticketService';

const initialState = {
   tickets: [],
   ticket: {},
   isError: false,
   isSuccess: false,
   isLoading: false,
   message: ''
}

export const createNewTicket = createAsyncThunk(
   'tickets/create',
   async (ticketData, thunkAPI) => {
      try {
      const token = thunkAPI.getState().auth.user.token;
         return await ticketService.createTicket(ticketData, token); 
      } catch (error) {
         const message = (
            error.response &&
            error.response.data &&
            error.response.data.message) 
            || error.message || error.toString();

         return thunkAPI.rejectWithValue(message);
      }
   })

   export const getTickets = createAsyncThunk(
      'tickets/getAll',
      async (_, thunkAPI) => {
         try {
         const token = thunkAPI.getState().auth.user.token;
            return await ticketService.getTickets(token); 
         } catch (error) {
            const message = (
               error.response &&
               error.response.data &&
               error.response.data.message) 
               || error.message || error.toString();
   
            return thunkAPI.rejectWithValue(message);
         }
      })

   export const getOneTicket = createAsyncThunk(
      'tickets/getOne',
      async (ticketId, thunkAPI) => {
         try {
         const token = thunkAPI.getState().auth.user.token;
            return await ticketService.getTicket(ticketId, token); 
         } catch (error) {
            const message = (
               error.response &&
               error.response.data &&
               error.response.data.message) 
               || error.message || error.toString();
   
            return thunkAPI.rejectWithValue(message);
         }
      })

export const ticketSlice = createSlice({
   name: 'tickets',
   initialState,
   reducers: {
      reset: (state) => initialState,
   },
   extraReducers: (builder) => {
      builder
      .addCase(createNewTicket.pending, (state) => {
         state.isLoading = true;
      })
      .addCase(createNewTicket.fulfilled, (state) => {
         state.isLoading = false;
         state.isSuccess = true;
      })
      .addCase(createNewTicket.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.message = action.payload;
         state.ticket = null;
      })
      .addCase(getTickets.pending, (state) => {
         state.isLoading = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
         state.isLoading = false;
         state.isSuccess = true;
         state.tickets = action.payload;
      })
      .addCase(getTickets.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.message = action.payload;
         state.ticket = null;
      })
      .addCase(getOneTicket.pending, (state) => {
         state.isLoading = true;
      })
      .addCase(getOneTicket.fulfilled, (state, action) => {
         state.isLoading = false;
         state.isSuccess = true;
         state.ticket = action.payload;
      })
      .addCase(getOneTicket.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.message = action.payload;
         state.ticket = null;
      })
   }

})

export const { reset } = ticketSlice.actions;

export const { reducer: ticketReducer } = ticketSlice;