import { useEffect, useReducer } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { reset, getTickets } from '../features/tickets/ticketSlice';
import { Spinner } from '../components/Spinner';
import { BackButton } from '../components/BackButton';
import { TicketItem } from '../components/TicketItem';

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
      
      <>
         <BackButton url='/'/>
         <h1>Tickets</h1>
         <div className="tickets">
            <div className="ticket-headings">
            <div>Date</div>
            <div>Product</div>
            <div>Status</div>
            <div></div>
            </div>
            {tickets.map(ticket => 
               <TicketItem 
               key={ticket._id}
               ticket={ticket}
               /> 
               )}
         </div>
      </>
   )
}