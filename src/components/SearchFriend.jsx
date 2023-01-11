import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

import "../styles/searchFriend.scss"
import { addFriendRoute, searchRoute, getAllFriendsRoute } from "../api-routes/ApiRoutes.js";

const SearchFriend = ({setCurrentUser, setFriends, showDelete, setShowAddFriend}) => {  
  const [search, setSearch] = useState("")
  const [found, setFound] = useState(undefined)

  const toastOptions = {
    position:"bottom-right",
    autoClose: 8000,
    theme:"dark"
  }
  useEffect(() => {   
    const token = JSON.parse(localStorage.getItem("token")) 
    const id = JSON.parse(localStorage.getItem("id"))
    if ( token && id ){
      const fetchData = async  () => {        
        await fetch(`${getAllFriendsRoute}/${id}`)
          .then((response) => response.json())
          .then((data) => {
            setCurrentUser(data.me)
            setFriends(data.friends)
          });
      }
      fetchData()
    }
  },[found, showDelete])

  const changeHandler = (e) => {
    setSearch(e.target.value)
  }
  const closeHandler = () => {
    setFound(undefined)
  }
  const addFriendHandler = () => {
    const myId = JSON.parse(localStorage.getItem("id"))
    console.log(myId);
    fetch(`${addFriendRoute}/${found._id}`, {
  method: 'PATCH',
  body: JSON.stringify({
    id: myId
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => {
    if(json.status == true){
      toast.info(json.message, toastOptions)
      closeHandler()
    }else{
      toast.info(json.message, toastOptions)
    }
  });

  }

  const searchSubmitHandler = (e) => {
    const token = JSON.parse(localStorage.getItem("token"))
    console.log(search);
    console.log(token);
    e.preventDefault()
    fetch(`${searchRoute}/${search}`,{
      headers:{
        authorization:`Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.status === false){
          toast.error(json.message, toastOptions)
        }else{
          setFound(json.existedUser)
        }
      });
  }  
      return (
        <div className="search">
          <form onSubmit={searchSubmitHandler}></form>
          <h1>Search for Friends </h1>
          <p className="att">attenion: usernames are casesensitive</p>
          <input type="text" name="search" onChange={changeHandler} placeholder="username" value={search} />
          <div>
            <button className="btn" type="submit" onClick={searchSubmitHandler}>search</button>
            <button onClick={()=> setShowAddFriend(false)}>back</button>
          </div>
          {found && 
          <div className="found-container">
            <img className="picture" src={found.isAvatarImgSet ? `data:image/svg+xml;base64,${found.avatarImg}` : "https://www.apex-motor.co.za/wp-content/uploads/2020/10/test-avatar.png"} alt="" />
            <p>{found.username}</p>
            <div className="found-btn-container">
              <button className="btn" onClick={addFriendHandler}>Add</button>
              <button className="btn" onClick={closeHandler}>close</button>
            </div>
          </div>
          }
      </div>      
      );
      

          
      
  
};

export default SearchFriend;