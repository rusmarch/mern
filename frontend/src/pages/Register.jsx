import { useState } from "react"
import { FaUser } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { 
   selectUser,
   selectIsLoading,
   selectIsError,
   selectMessage, 
   register
 } from '../features/auth/authSlice'

export const Register = () => {

   const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      password2: ''
   })

   const user = useSelector(selectUser);
   const isLoading = useSelector(selectIsLoading);
   const isError = useSelector(selectIsError);
   const message = useSelector(selectMessage);
   const dispatch = useDispatch();

   const { name, email, password, password2 } = formData;

   const onChange = (e) => {
      setFormData((prev) => ({
         ...prev,
         [e.target.name]: e.target.value,
      }));
   }

   const onSubmit = (e) => {
      e.preventDefault();
      if (password !== password2) {
         toast.error('Passwords do not match');
      }
   }


   return (
      <>
         <section className="heading">
            <h1><FaUser />Register</h1>
            <p>Please create an account</p>
         </section>
         <section className="form">
            <form onSubmit={onSubmit}>
               <div className="form-group">
                  <input
                     className="form-control"
                     type="text"
                     name="name"
                     placeholder="Enter your name"
                     required
                     id="name"
                     value={name}
                     onChange={onChange}
                  />
               </div>
               <div className="form-group">
                  <input
                     className="form-control"
                     type="email"
                     name="email"
                     placeholder="Enter your email"
                     required
                     id="email"
                     value={email}
                     onChange={onChange}
                  />
               </div>
               <div className="form-group">
                  <input
                     className="form-control"
                     type="password"
                     name="password"
                     placeholder="Enter your password"
                     required
                     id="password"
                     value={password}
                     onChange={onChange}
                  />
               </div>
               <div className="form-group">
                  <input
                     className="form-control"
                     type="password"
                     name="password2"
                     placeholder="Confirm password"
                     required
                     id="password2"
                     value={password2}
                     onChange={onChange}
                  />
               </div>
               <div className="form-group">
                  <button className="btn btn-block">Submit</button>
               </div>
            </form>
         </section>
      </>
   )
}