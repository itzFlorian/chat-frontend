import { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import { toast, ToastContainer } from "react-toastify";
// IMPORT STANDARAUSSEHEN VOM TOAST
import "react-toastify/dist/ReactToastify.css"
//<----------------
import "../styles/register.scss"
const Register = () => {
  
  const [input, setInput] = useState({
    username: "",
    email:"",
    password:"",
    confirmPassword:""
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    handleValidation()
    console.log("hallo");
  }
  const handleChange = (e) => {
    setInput({...input, [e.target.name]:e.target.value})
  }

  const toastOptions = {
    position:"bottom-right",
    autoClose: 8000,
    theme:"dark"
  }

  const handleValidation = () => {
  const {username, email, password, confirmPassword} = input;
  if(password !== confirmPassword) toast.error("password and confirm password should be the same", toastOptions);
  if(username.length < 2) toast.error("Your username must have at least 2 characters", toastOptions)
  }

  return (
    <>
    <div className="form-container">
      <form onSubmit ={handleSubmit}>
        <div className="brand">
          <img src="" alt="" />
          <h1>BrandName</h1>
        </div>
        <input type="text" name="username" placeholder="Username" onChange={handleChange}/>
        <input type="email" name="email" placeholder="Email" onChange={handleChange}/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange}/>
        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange}/>
        <button type="submit">Submit</button>
        <p>Already have an Account ? <Link to ="/login"> Login </Link></p>
      </form> 
    </div>
    <ToastContainer>

    </ToastContainer>
    </>
  );
};

export default Register;