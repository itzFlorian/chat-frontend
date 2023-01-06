import "../styles/chat.scss"

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client"

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

import SearchFriend from "./SearchFriend.jsx";
import Friends from "./Friends.jsx"
import Welcome from "./Welcome.jsx";
import ChatContainer from "./ChatContainer.jsx";

import { host } from "../api-routes/ApiRoutes.js";

const Chat = () => {
  const socket = useRef()

  const navigate = useNavigate()

  const [currentUser, setCurrentUser] = useState(undefined)
  const [friends, setFriends] = useState([])
  const [currentSelected, setCurrentSelected] = useState(undefined)

  const [showDelete, setShowDelete] = useState(false)

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
  },[showDelete])

  useEffect(()=>{
    if(currentUser && !currentUser.isAvatarImgSet){
      navigate("/users/setAvatar")
    }
    if(currentUser){
      socket.current = io(host)
      socket.current.emit("add-user", currentUser._id)
    }
    },[currentUser])


  return (
    <>
      <div className="chat-container">        
        <SearchFriend friends={friends} setFriends={setFriends} currentUser={currentUser} setCurrentUser={setCurrentUser} showDelete={showDelete}/>        
        <div className="container">          
          <Friends showDelete={showDelete} friends={friends} setFriends={setFriends} currentUser={currentUser} currentSelected={currentSelected} setCurrentSelected={setCurrentSelected} />
          {currentSelected === undefined ? 
          <Welcome currentUser={currentUser} /> : 
          <ChatContainer socket={socket} currentUser={currentUser} currentSelected={currentSelected} setCurrentSelected={setCurrentSelected} showDelete={showDelete} setShowDelete={setShowDelete}/>}        
        </div>
      </div>
      <ToastContainer/>
    </>    
      
  );
};

export default Chat;