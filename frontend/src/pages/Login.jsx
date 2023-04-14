import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
   reset,
   login
} from '../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from '../components/Spinner';

export const Login = () => {

   const [formData, setFormData] = useState({
      email: '',
      password: '',
   })

   const user = useSelector(state => state.auth.user);
   const isError = useSelector(state => state.auth.isError);
   const isLoading = useSelector(state => state.auth.isLoading);
   const isSuccess = useSelector(state => state.auth.isSuccess);
   const message = useSelector(state => state.auth.message);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { email, password } = formData;

   useEffect(() => {
      if (isError) {
         toast.error(message);
      }

      // Redirect when logged in (if it successfull)
      if (isSuccess || user) {
         navigate('/')
      }

      dispatch(reset());
   }, [isError, isSuccess, user, message, navigate, dispatch])


   const onChange = (e) => {
      setFormData((prev) => ({
         ...prev,
         [e.target.name]: e.target.value,
      }));
   }

   const onSubmit = (e) => {
      e.preventDefault();

      const userData = {
         email,
         password
      }

      dispatch(login(userData));
   }

   if (isLoading) {
      return <Spinner/>
   }

   return (
      <>
         <section className="heading">
            <h1><FaSignInAlt />Login</h1>
            <p>Please log in to get support</p>
         </section>
         <section className="form">
            <form onSubmit={onSubmit}>
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
                  <button className="btn btn-block">Submit</button>
               </div>
            </form>
         </section>
      </>
   )
}