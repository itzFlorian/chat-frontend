import "../styles/chat-container.scss"
import ChatInput from "./ChatInput.jsx";
import { sendMessagesRoute, getMessagesRoute, deleteFriendRoute } from "../api-routes/ApiRoutes.js";
import { useState, useEffect, useRef } from "react";
import { RiDeleteBinLine } from "react-icons/ri"

const ChatContainer = ({socket, currentUser, currentSelected, setCurrentSelected, showDelete, setShowDelete }) => {

  const [messages, setMessages] = useState([])
  const [msgArrived, setMsgArrived] =useState(undefined)
  const scrollRef = useRef()
  const deleteHandler = async () => {
  const token = JSON.parse(localStorage.getItem("token")) 

  fetch(deleteFriendRoute, {
    method:"PATCH",
        body:JSON.stringify({ 
          me: currentUser._id,
          friend: currentSelected._id
        }),
        headers: {
          authorization:"Bearer: " + token,
          'Content-type': 'application/json; charset=UTF-8',
          },
      })  
      setShowDelete(!showDelete)
      setCurrentSelected(undefined)
}
  useEffect(()=>{
    const fetchData = async () => {
      const response = await fetch(getMessagesRoute, {
        method:"POST",
        body:JSON.stringify({ 
          from: currentUser._id,
          to: currentSelected._id
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          },
      })
      const data = await response.json()
      setMessages(data)

    }
    fetchData()

  },[currentSelected])

  const handleSendMsg = async (msg) => {
    await fetch(sendMessagesRoute,{
      method:"POST",
      body:JSON.stringify({ 
        from: currentUser._id,
        to: currentSelected._id,
        message:msg
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        },
    }) 
    socket.current.emit("send-msg", {
      to: currentSelected._id,
      from: currentUser._id,
      message:msg
    })
    const msgs = [...messages]
    msgs.push({ fromSelf:true, message:msg })
    setMessages(msgs)
  }

  useEffect(() => {
    if(socket.current){
      socket.current.on("msg-receive", (msg) => {
        setMsgArrived({fromSelf:false, message:msg})
      })
    }
  },[])

  useEffect(()=>{
    msgArrived && setMessages(prev => [...prev, msgArrived])
  },[msgArrived])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" })
  },[messages])

  return (
    <div className="chat-header">
        <div className="user-details">
          <div className="user">
            <img className="picture" src = {`data:image/svg+xml;base64,${currentSelected && currentSelected.avatarImg}`} alt="avatar" />
            <div className="username">
              <h2>{currentSelected && currentSelected.username}</h2>
            </div>
          </div>
          <div className="close" onClick={()=>setShowDelete(!showDelete)}>
            <RiDeleteBinLine/>
          </div>
        </div>
        {showDelete && 
          <div className="show-delete-container">
            <p>Do you really want to delete {currentSelected.username} from your friendlist?</p>
            <button className="delete-btn" onClick={deleteHandler}>delete</button>
            <button onClick={()=>setShowDelete(!showDelete)}>cancel</button>
          </div>
        }
      <div className="chat-messages">
        {messages.map((msg, index)=>{
          return(
            <div>
              <div 
              className={`message ${msg.fromSelf ? "sended" : "received" }`}>
                <div className="content">
                  <p>{msg.message}</p>
                </div>
              </div>
            </div>
          )
        })}  
      </div>
      <ChatInput handleSendMsg={handleSendMsg}/>
    </div>
  );
};

export default ChatContainer;