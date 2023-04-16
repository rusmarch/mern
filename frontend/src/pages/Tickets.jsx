import { useEffect, useReducer } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { reset, getTickets } from '../features/tickets/ticketSlice';
import { Spinner } from '../components/Spinner';
import { BackButton } from '../components/BackButton';

export const Tickets = () => {


   const tickets = useSelector(state => state.tickets.tickets);
   const isLoading = useSelector(state => state.tickets.isLoading);
   const isSuccess = useSelector(state => state.tickets.isSuccess);
   const dispatch = useDispatch();

   useEffect(() => {
      return () => {
         if (isSuccess) {
            dispatch(reset());
         }
      }
   }, [dispatch, isSuccess])

   useEffect(() => {
      dispatch(getTickets())
   }, [dispatch])

   if(isLoading) {
      return <Spinner/>
   }


   
   return (
      <div>
         <h1>Tickets</h1>
      </div>
   )
}