import "../styles/friends.scss"
import logo from "../logo/Dunkel Hellblau Neon Futuristisch Musik Band Logo .png"
import Logout from "./Logout.jsx"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
const Friends = ({currentUser, currentSelected, setCurrentSelected, friends, setFriends, showDelete}) => {
  const [logoffVar, setLogoffVar] = useState(false)
  
  const navigate = useNavigate()

  const handleClick = async () => {
    setLogoffVar(!logoffVar)
  }
  const handleLogoff = () => {
    navigate("/users/login")
    localStorage.clear()
  }
  return (
  <>
      <div className="friends">
        <div className="brand">
          <img src={logo} alt="logo" />
        </div>

        {friends.map((friend, index) => {
          return (
        <div key={index} className={`card-container ${friend === currentSelected && "selected"}`} onClick={() =>{                
          setCurrentSelected(friend)
        }
        }>
        <img className="picture" src ={friend.isAvatarImgSet ? `data:image/svg+xml;base64,${friend.avatarImg}` : "https://www.apex-motor.co.za/wp-content/uploads/2020/10/test-avatar.png"} alt="avatar" />
        <p>{friend.username}</p>
        </div>
            )
          })} 
          
        <div className="user-details">
            <div className="user">
                <img className="picture" src = {`data:image/svg+xml;base64,${currentUser && currentUser.avatarImg}`} alt="avatar" />
              <div className="username">
                <h2>{currentUser && currentUser.username}</h2>
              </div>
            </div>
            <div className="logout">
              <Logout handleClick={handleClick}/>
            </div>
              { logoffVar &&
                <div className="log-off-container">
                  <p>Do you really want to log out?</p>
                  <button className="delete-btn" onClick={handleLogoff}>Logout</button>
                  <button onClick={handleClick}>cancel</button>
                </div>
              }
        </div>
      </div>      
  </>
)
}

export default Friends