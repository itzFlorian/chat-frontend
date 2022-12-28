import { registerRoute } from "../api-routes/ApiRoutes.js";

import { useState } from "react";
import {Link, useNavigate} from "react-router-dom"

// IMPORT TOAST UND STANDARAUSSEHEN
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
//<----------------

import "../styles/register.scss"

const Register = () => { 
  const navigate = useNavigate()   
  const [input, setInput] = useState({
    username: "",
    email:"",
    password:"",
    confirmPassword:""
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (handleValidation()){
      const {username, email, password} = input;
      fetch(registerRoute, {
      method: 'POST',
      body: JSON.stringify({
      username,
      password,
      email
      }),
      headers: {
      'Content-type': 'application/json; charset=UTF-8',
      },
    })
  .then((response) => response.json())
  .then((data) => {
    if(data.status === false){
      toast.error(data.message, toastOptions)
    }
    if(data.status === true){      
      navigate("/login")
      setInput(prev => prev = {
        username: "",
        email:"",
        password:"",
        confirmPassword:""
      })
    }
  });
  }
}

  const handleChange = (e) => {
    setInput(prev => prev = {...input, [e.target.name]:e.target.value})
  }

  const toastOptions = {
    position:"bottom-right",
    autoClose: 8000,
    theme:"dark"
  }
  const handleValidation = () => {
  const {username, email, password, confirmPassword} = input;
  if(password !== confirmPassword) {
    toast.error("password and confirm password should be the same", toastOptions);
    return false
  }else if(username.length < 2) {
    toast.error("Username must have at least 2 characters", toastOptions)
    return false
  }else if(password.length < 6) {
    toast.error("Password must have at least 7 charhacters", toastOptions)
    return false
  }else if (email === ""){
    toast.error("email is required", toastOptions)
    return false
  }
  return true
  }

  return (
    <>
    <div className="form-container">
      <form onSubmit ={handleSubmit}>
        <div className="brand">
          <img src="" alt="" />
          <h1>BrandName</h1>
        </div>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} value={input.username}/>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} value={input.email}/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} value={input.password}/>
        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} value={input.confirmPassword}/>
        <button type="submit">Submit</button>
        <p>Already have an Account ? <Link to ="/login"> Login </Link></p>
      </form> 
    </div>
    <ToastContainer/>
    </>
  );
};

export default Register;