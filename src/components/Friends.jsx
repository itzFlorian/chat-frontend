import "../styles/friends.scss"
import logo from "../logo/Decrypt-chat.png"
import { useState } from "react"

const Friends = ({currentUser, setCurrentUser, friends, changeChat}) => {
  
  const [currentSelected, setCurrentSelected] = useState(undefined)

return (
  <>
      <div className="friends">
        <div className="brand">
          <img src={logo} alt="logo" />
        </div>
        {friends.map((friend, index) => {
          return (
          <div key={index} className={`card-container ${index === currentSelected ? "selected" : ""}`}>
                  <img className="picture" src = {friend.isAvatarImgSet ? `data:image/svg+xml;base64,${friend.avatarImg}` : "https://www.apex-motor.co.za/wp-content/uploads/2020/10/test-avatar.png"} alt="avatar" />
                  <p>{friend.username}</p>
                </div>
            )
          })} {friends.map((friend, index) => {
            return (
            <div key={index} className={`card-container ${index === currentSelected ? "selected" : ""}`}>
                    <img className="picture" src = {friend.isAvatarImgSet ? `data:image/svg+xml;base64,${friend.avatarImg}` : "https://www.apex-motor.co.za/wp-content/uploads/2020/10/test-avatar.png"} alt="avatar" />
                    <p>{friend.username}</p>
                  </div>
              )
            })} 
      </div>      
  </>
)
}

export default Friends