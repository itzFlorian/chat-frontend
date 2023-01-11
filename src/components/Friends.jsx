import "../styles/friends.scss"
import logo from "../logo/Dunkel Hellblau Neon Futuristisch Musik Band Logo .png"
import Logout from "./Logout.jsx"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import {FiUserPlus, FiUserX} from "react-icons/fi"
import {BsPersonBoundingBox} from "react-icons/bs"

const Friends = ({currentUser, currentSelected, setCurrentSelected, friends, showAddFriend, setShowAddFriend, setFriends, showDelete}) => {
  const [logoffVar, setLogoffVar] = useState(false)
  const navigate = useNavigate()

  const handleClickLogout = async () => {
    setLogoffVar(!logoffVar)
  }
  const handleLogoff = () => {
    navigate("/users/login")
    localStorage.clear()
  }
  return (
  <>
      <div className="friends">
        <div className="brand" onClick={()=>{
          setCurrentSelected(undefined)
          setShowAddFriend(false)
        }}>
          <img src={logo} alt="logo" />
        </div>

        {friends.map((friend, index) => {
          return (
        <div key={index} className={`card-container ${friend === currentSelected && "selected"}`} onClick={() =>{                
          setCurrentSelected(friend)
          setShowAddFriend(false)
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
              <div className="logoff">
                <button className="logout-btn" onClick={()=>navigate("/users/setAvatar")}><BsPersonBoundingBox/>
                </button>
              </div>
              <div className="logoff">
                <button className="logout-btn" onClick={()=>setShowAddFriend(!showAddFriend)}>
                <FiUserPlus />                
                </button>
              </div>
              <Logout handleClick={handleClickLogout}/>
            </div>
              { logoffVar &&
                <div className="log-off-container">
                  <p>Do you really want to log out?</p>
                  <button className="delete-btn" onClick={handleLogoff}>Logout</button>
                  <button onClick={handleClickLogout}>cancel</button>
                </div>
              }
        </div>
      </div>      
  </>
)
}

export default Friends