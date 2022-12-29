import { loginRoute } from "../api-routes/ApiRoutes.js";

import { useState } from "react";
import {Link, useNavigate} from "react-router-dom"

// IMPORT TOAST UND STANDARAUSSEHEN
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
//<----------------

import "../styles/register.scss"

const Login = () => { 
  const navigate = useNavigate()   
  const [input, setInput] = useState({
    username: "",
    password:"",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (handleValidation()){
      const {username, password} = input;
      fetch(loginRoute, {
      method: 'POST',
      body: JSON.stringify({
      username,
      password
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
      localStorage.setItem("token",JSON.stringify(data.token))
      localStorage.setItem("id", JSON.stringify(data.id))
      setInput(prev => prev = {
        username: "",
        password: ""
      })
      navigate("/")
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
   if(username === "") {
    toast.error("Username is required", toastOptions)
    return false
  }else if(password === "") {
    toast.error("Password is required", toastOptions)
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
        <input type="password" name="password" placeholder="Password" onChange={handleChange} value={input.password}/>
        <button type="submit">Submit</button>
        <p>YOU DONT HAVE AN ACCOUNT ? <Link to ="/users/register"> Register </Link></p>
      </form> 
    </div>
    <ToastContainer/>
    </>
  );
};

export default Login;