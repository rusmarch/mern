import { useState } from "react"
import { FaUser } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import {
   register,
} from "../features/auth/authSlice";

export const Register = () => {

   const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      password2: ''
   })

   const { name, email, password, password2 } = formData;

   const user = useSelector(state => state.auth.user);
   const isLoading = useSelector(state => state.auth.isLoading);
   const isSuccess = useSelector(state => state.auth.isSuccess);
   const message = useSelector(state => state.auth.message);
   const dispatch = useDispatch();

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
      } else {
         const userData = {
            name,
            email,
            password,
         }
         dispatch(register(userData));
      }
   }


   return (
      <>
         <section className="heading">
            <h1><FaUser />Register {user}</h1>
            <p>Please create an accont</p>
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