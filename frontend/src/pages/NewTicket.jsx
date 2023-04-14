import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/auth/authSlice';

export const NewTicket = () => {

   const user = useSelector(state => state.auth.user);

   const [name, setName] = useState(user.name);
   const [email, setEmail] = useState(user.email);
   const [product, setProduct] = useState('');
   const [description, setDescription] = useState('');

   const onSubmit = (e) => {
      e.preventDefault();

   }

   console.log(user)

   return (
      <>
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