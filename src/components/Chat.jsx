import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { getOneRoute } from "../api-routes/ApiRoutes.js";
import "../styles/chat.scss"
import SearchFriend from "./SearchFriend.jsx";
import Friends from "./Friends.jsx"
import Welcome from "./Welcome.jsx";
import ChatContainer from "./ChatContainer.jsx";
import Logout from "./Logout.jsx";


const Chat = () => {

  const navigate = useNavigate()

  const [currentUser, setCurrentUser] = useState(undefined)
  const [friends, setFriends] = useState([])

  const [currentSelected, setCurrentSelected] = useState(undefined)

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"))
    const id = JSON.parse(localStorage.getItem("id"))
    if(token){
      const fetchUser = async () =>{
        fetch(`getOneRoute/${id}`)
          .then(response => response.json())
          .then(data => {
            setCurrentUser(data)
          })
        }
        fetchUser()
    }else{
      navigate("/users/login")
    } 
  },[])

  useEffect(()=>{
    if(currentUser && !currentUser.isAvatarImgSet){
      navigate("/users/setAvatar")
    }
  },[currentUser])

  const toastOptions = {
    position:"bottom-right",
    autoClose: 8000,
    theme:"dark"
  }

  return (
    <>
      <div className="chat-container">        
        <SearchFriend friends={friends} setFriends={setFriends} currentUser={currentUser} setCurrentUser={setCurrentUser}/>        
        <div className="container">          
          <Friends friends={friends} currentUser={currentUser} currentSelected={currentSelected} setCurrentSelected={setCurrentSelected}/>
          {currentSelected === undefined ? 
          <Welcome currentUser={currentUser} /> : 
          <ChatContainer currentUser={currentUser} currentSelected={currentSelected}/>}        
        </div>
      </div>
      <ToastContainer/>
    </>    
      
  );
};

export default Chat;