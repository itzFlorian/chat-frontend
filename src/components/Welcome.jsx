import "../styles/welcome.scss"
import logo from "../logo/Decrypt-welcome.png"
const Welcome = ({currentUser}) => {
  return (
    <div className="welcome-container">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <h1 className="welcome-text">Welcome <span>{currentUser && currentUser.username}!</span></h1>
      <h3>please Select a Friend to start chat</h3>
    </div>
  );
};

export default Welcome;