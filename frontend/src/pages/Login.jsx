import { useState } from "react"
import { FaSignInAlt } from "react-icons/fa";

export const Login = () => {

   const [formData, setFormData] = useState({
      email: '',
      password: '',
   })

   const { email, password } = formData;

   const onChange = (e) => {
      setFormData((prev) => ({
         ...prev,
         [e.target.name]: e.target.value,
      }));
   }

   const onSubmit = (e) => {
      e.preventDefault();
      
   }

   console.table(formData);

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