import "../styles/welcome.scss"
import logo from "../logo/Dunkel Hellblau Neon Futuristisch Musik Band Logo  (3).png"
const Welcome = ({currentUser}) => {
  return (
    <div className="welcome-container">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="welcome-text">
        <h1>Welcome <span>{currentUser && currentUser.username}!</span></h1>
        <h3>please Select a friend to start a chat.</h3>
      </div>
      <h3>If you´re new feel free to add itzFlorian to your friends.</h3>
      <br />
    </div>
  );
};

export default Welcome;