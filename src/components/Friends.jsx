import "../styles/friends.scss"
import logo from "../logo/Decrypt-chat.png"
import Logout from "./Logout.jsx"
import { useEffect } from "react"

const Friends = ({currentUser, currentSelected, setCurrentSelected, friends}) => {
return (
  <>
      <div className="friends">
        <div className="brand">
          <img src={logo} alt="logo" />
        </div>

        {friends.map((friend, index) => {
          return (
                <div key={index} className={`card-container ${friend === currentSelected && "selected"}`} onClick={() => {                
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
              <Logout/>
            </div>
        </div>
      </div>      
  </>
)
}

export default Friends