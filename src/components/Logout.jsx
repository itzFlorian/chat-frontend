import "../styles/logout.scss"
import { BiPowerOff } from "react-icons/bi"

const Logout = ({handleClick}) => {  
  return (
    <div className="logoff">
      <button className="logout-btn" onClick={handleClick}>
        <BiPowerOff />
      </button>
    </div>
  );
};

export default Logout;