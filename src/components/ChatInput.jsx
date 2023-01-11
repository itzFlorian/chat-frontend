import { useState } from "react";
import Picker from "emoji-picker-react"
import {IoMdSend} from "react-icons/io"
import {BsEmojiSmileFill} from "react-icons/bs"

import "../styles/chat-input.scss"

const ChatInput = ({handleSendMsg}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [msg, setMsg] = useState("")

  const handleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker)
    // setMsg("")
  }

  const handleEmojiClick = (emoji) => {
    let message = msg
    message += emoji.emoji
    setMsg(message)
  }

  const sendChat = (event) =>{
    event.preventDefault();
    if(msg.length > 0){
      handleSendMsg(msg)
      setMsg("")
      setShowEmojiPicker(false)
    }
  }
  return (
    <div className="chat-input-container">
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPicker}/>
          {showEmojiPicker && <Picker theme="dark" onEmojiClick={handleEmojiClick}/>}
        </div>
      </div>
      <form className="input-container" onSubmit={sendChat}>
        <input type="text" placeholder="Type your message here..." value={msg} onChange={(event)=>setMsg(event.target.value)}/>
        <button className="submit" >
          <IoMdSend/>
        </button>
      </form>
    </div>
  );
};

export default ChatInput;