import { useState, useEffect } from "react";
import {Link} from "react-router-dom"
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
    alert("form")
  }
  const handleChange = (e) => {
    setInput({...input, [e.target.name]:e.target.value})
  }
  return (
    <>
    <div className="form-container">
      <form onSubmit ={()=>handleSubmit}>
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
    </>
  );
};

export default Register;