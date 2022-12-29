const Chat = () => {
  
  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token){
      navigate("/")
    }else{
      navigate("users/login")
    }
  },[])

  return (
    <div>
      chat
    </div>
  );
};

export default Chat;