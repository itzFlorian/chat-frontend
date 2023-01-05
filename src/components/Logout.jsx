import "../styles/logout.scss"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi"

const Logout = () => {
  const [trigger, setTrigger] = useState(false)
  const navigate = useNavigate()

  const handleClick = async () => {
    navigate("/users/login")
    localStorage.clear()
    setTrigger(!trigger)
  }

  return (
    <button className="logout-btn" onClick={handleClick}>
      <BiPowerOff />
    </button>
  );
};

export default Logout;