import "../styles/chat-container.scss"


const ChatContainer = ({currentUser, currentSelected}) => {
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
      <div className="chat-messages"></div>
      <div className="chat-input"></div>
    </div>
  );
};

export default ChatContainer;