import "../styles/welcome.scss"
import logo from "../logo/Decrypt-welcome.png"
const Welcome = ({currentUser}) => {
  return (
    <div className="welcome-container">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="welcome-text">
        <h1>Welcome <span>{currentUser && currentUser.username}!</span></h1>
        <h3>please Select a Friend to start chat</h3>
      </div>
      <h4>If you´re new feel free to add itzFlorian to your friends.</h4>
      <h4>Attention: usernames are casesensitive!</h4>
    </div>
  );
};

export default Welcome;