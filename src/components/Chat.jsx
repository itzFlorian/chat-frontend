import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

import "../styles/chat.scss"
import SearchFriend from "./SearchFriend.jsx";
import Friends from "./Friends.jsx"



const Chat = () => {

  const navigate = useNavigate()

  const [currentUser, setCurrentUser] = useState(undefined)
  const [friends, setFriends] = useState([])
  const [currenChat, setCurrentChat] = useState(undefined)
  
  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }


  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"))
    if(token){
      navigate("/")
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
          <Friends friends={friends} currentUser={currentUser} changeChat={handleChatChange}/>
        </div>
      </div>
      <ToastContainer/>
    </>    
      
  );
};

export default Chat;