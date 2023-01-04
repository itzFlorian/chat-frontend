import "../styles/chat-container.scss"
import ChatInput from "./ChatInput.jsx";
import Messages from "./Messages.jsx";

const ChatContainer = ({currentUser, currentSelected}) => {

  const handleSendMsg = async (msg) => {
    
  }
  return (
    <div className="chat-header">
      <div className="user-details">
        <div className="user">
          <img className="picture" src = {`data:image/svg+xml;base64,${currentUser.avatarImg}`} alt="avatar" />
        <div className="username">
          <h2>{currentUser.username}</h2>
        </div>
        </div>
        <div className="logout">

        </div>
      </div>
      <Messages/>
      <ChatInput handleSendMsg={handleSendMsg}/>
    </div>
  );
};

export default ChatContainer;