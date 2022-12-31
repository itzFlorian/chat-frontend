import "../styles/friends.scss"
import logo from "../logo/Decrypt-chat.png"
import { useState } from "react"

const Friends = ({currentUser, setCurrentUser, currentSelected, setCurrentSelected, friends}) => {



return (
  <>
      <div className="friends">
        <div className="brand">
          <img src={logo} alt="logo" />
        </div>
        {friends.map((friend, index) => {
          return (
                <div key={index} className={`card-container ${friend === currentSelected && "selected"}`} onClick={() => {
                  console.log("selected",currentSelected);
                  setCurrentSelected(friend)
                }
                  }>
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