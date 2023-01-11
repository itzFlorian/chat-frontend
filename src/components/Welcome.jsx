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
        <h3>please Select a friend to start</h3>
        <p>All messages are fully encrypted.</p>
      </div>
      <h4>If you´re new feel free to add itzFlorian to your friends.</h4>
      <h4>Attention: usernames are casesensitive!</h4>
      <br />
    </div>
  );
};

export default Welcome;