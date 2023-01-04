import "../styles/chat-container.scss"
import ChatInput from "./ChatInput.jsx";
import Messages from "./Messages.jsx";
import { sendMessagesRoute, getMessagesRoute } from "../api-routes/ApiRoutes.js";
import { useState, useEffect } from "react";
import Logout from "./Logout.jsx";


const ChatContainer = ({currentUser, currentSelected}) => {

  const [messages, setMessages] = useState([])
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
      console.log(data);
    }
    fetchData()

  },[currentSelected])

  console.log(messages);
  const handleSendMsg = async (msg) => {
    const response = await fetch(sendMessagesRoute,{
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
    const data = await response.json()
    console.log(data);
  }
  return (
    <div className="chat-header">
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