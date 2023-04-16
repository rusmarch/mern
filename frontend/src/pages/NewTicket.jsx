import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewTicket, reset } from '../features/tickets/ticketSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner } from '../components/Spinner';
import { BackButton } from '../components/BackButton';

export const NewTicket = () => {

   const user = useSelector(state => state.auth.user);
   const isLoading = useSelector(state => state.tickets.isLoading);
   const isError = useSelector(state => state.tickets.isError);
   const isSuccess = useSelector(state => state.tickets.isSuccess);
   const message = useSelector(state => state.tickets.message);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [name] = useState(user.name);
   const [email] = useState(user.email);
   const [product, setProduct] = useState('iPhone');
   const [description, setDescription] = useState('');

   useEffect(() => {
      if (isError) {
         toast.error(message);
      }

      if (isSuccess) {
         dispatch(reset());
         navigate('/');
      }
   }, [isError, isSuccess, message, dispatch, navigate])

   const onSubmit = (e) => {
      e.preventDefault();

      dispatch(createNewTicket({ product, description }));
   }

   if (isLoading) {
      return <Spinner />
   }


   return (
      <>
         <BackButton url='/'/>
         <section className="heading">
            <h1>Create new ticket</h1>
            <p>Please fill out the form below</p>
         </section>
         <section className="form">
            <div className="form-group">
               <label htmlFor="name">Customer name</label>
               <input
                  type="text"
                  className="form-control"
                  value={name}
                  disabled
               />
            </div>
            <div className="form-group">
               <label htmlFor="email">Customer email</label>
               <input
                  type="text"
                  className="form-control"
                  value={email}
                  disabled
               />
            </div>
            <form onSubmit={onSubmit}>
               <div className="form-group">
                  <label htmlFor="product">Product</label>
                  <select
                     name="product"
                     id="product"
                     value={product}
                     onChange={e => setProduct(e.target.value)}
                  >
                     <option value="iPhone">iPhone</option>
                     <option value="Macbook Pro">Macbook Pro</option>
                     <option value="iMac">iMac</option>
                     <option value="iPad">iPad</option>
                  </select>
               </div>
               <div className="form-group">
                  <label htmlFor="description">Description of the issue</label>
                  <textarea
                     name="description"
                     id="description"
                     className='form-control'
                     placeholder='Description'
                     value={description}
                     onChange={e => setDescription(e.target.value)}
                  ></textarea>
               </div>
               <div className="form-group">
                  <button className="btn btn-block">Submit</button>
               </div>
            </form>
         </section>
      </>
   )
}