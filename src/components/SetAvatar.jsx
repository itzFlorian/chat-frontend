import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { setAvatarRoute, checkUserRoute } from "../api-routes/ApiRoutes.js";
import { Buffer } from "buffer";

import Spinner from "./Spinner.jsx";

//toastify und Standardaussehen importieren
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import "../styles/setAvatar.scss"

//import axios
import axios from "axios";

const INITITIAL = {
  avatars:[],
  isLoading:true,
  selectedAvatar:""
}

const setAvatar = () => {
  const navigate = useNavigate()
  const api = "https://api.multiavatar.com/4585123"
  const apiKey = "QabH9wuCRNqVJG"

  const [selectAvatar, setSelectAvatar] = useState(INITITIAL)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token){
      navigate("/")
    }else{
      navigate("/users/login")
    } 
  },[])  

  const toastOptions = {
    position:"bottom-right",
    autoClose: 8000,
    theme:"dark"
  }

  const setProfilePicture = async () => {
    if(selectAvatar.selectedAvatar === ""){
      toast.error("Please choose an avatar", toastOptions)
    }else{
      const token = await JSON.parse(localStorage.getItem("token"))
      const id = await JSON.parse(localStorage.getItem("id"))
      await fetch(`${setAvatarRoute}`, {
      method: 'PATCH',
      body: JSON.stringify({
        img: selectAvatar.avatars[selectAvatar.selectedAvatar],
        id: id      
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        authorization: `Bearer ${token}`
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.status);
        if(data.status === true){
          toast.info("Profilpicture updated", toastOptions)
        }
        console.log(data);       
      });
    }
  }

  useEffect( () => {
    const data = [] 
    const fetchData = async () => {
      for (let i=0 ; i<4 ; i++ ){
        const image = await axios.get(`${api}/${Math.floor(Math.random()*1000)}?apikey=${apiKey}`)
        console.log(image.data);
        const buffer = new Buffer(image.data)
        data.push(buffer.toString("base64"))   
      }
      setSelectAvatar({...selectAvatar, isLoading:false, avatars:data })
    }
    fetchData()
  },[])

  return (
      <div className="body">
        <div className="title-container">
          <h1>Pick an avatar as profile picture</h1>
        </div>
        <div className="avatars">
          {selectAvatar.isLoading ?  <div><Spinner /></div>  :
          selectAvatar.avatars.map((avatar, i)=> {
            return (              
              <div key={i} className={`avatar ${selectAvatar.selectedAvatar === i ? "selected":""}`}>
                <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={() => setSelectAvatar({...selectAvatar, selectedAvatar:i})}/>
              </div>
            )
          })}
        </div>
        <button type="submit" onClick={setProfilePicture}>change picture</button>
        <button type="submit" onClick={() => navigate("/")}><Link to="/">back</Link></button>
        <ToastContainer />
      </div> 
    )
  }  

  export default setAvatar;