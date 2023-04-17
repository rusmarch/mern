import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOneTicket, reset } from '../features/tickets/ticketSlice';
import { BackButton } from '../components/BackButton';
import { Spinner } from '../components/Spinner';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Ticket = () => {

   const ticket = useSelector(state => state.tickets.ticket);
   const isLoading = useSelector(state => state.tickets.isLoading);
   const isError = useSelector(state => state.tickets.isError);
   const message = useSelector(state => state.tickets.message);
   const dispatch = useDispatch();
   const { ticketId } = useParams();


   useEffect(() => {
      if (isError) {
         toast.error(message);
      }
      dispatch(getOneTicket(ticketId));
   }, [isError, message, ticketId, dispatch])

   if (isLoading) {
      return <Spinner />
   }

   if (isError) {
      return <h3>Something went wrong...</h3>
   }


   return (
      <div className='ticket-page'>
         <header className="ticket-header">
            <BackButton url='/tickets' />
            <h2>Ticket ID: {ticket._id}
               <span className={`status status-${ticket.status}`}>
                  {ticket.status}
               </span>
            </h2>
            <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleDateString('en-US')}</h3>
            <hr />
            <div className="ticket-desc">
               <h3>Description of Issue</h3>
               <p>{ticket.description}</p>
            </div>
         </header>
      </div>
   )
}