import "../styles/logout.scss"

import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi"

const Logout = () => {
  const navigate = useNavigate()
  const handleClick = async () => {
    localStorage.clear()
    navigate("/users/login")
  }
  return (
    <button className="logout-btn">
      <BiPowerOff onClick={handleClick}/>
    </button>
  );
};

export default Logout;