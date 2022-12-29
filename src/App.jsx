import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Register from './components/Register.jsx'
import Chat from "./components/Chat.jsx"
import Login from './components/Login.jsx'
import SetAvatar from './components/SetAvatar.jsx'

function App() {
  const navigate = useNavigate()

  return (
    <>
    <Routes>
      <Route path="/users/register" element={<Register/>} />
      <Route path='/users/login' element={<Login />} />
      <Route path='/users/setAvatar' element={<SetAvatar />} />
      <Route path="/" element={<Chat />} />
    </Routes>

    </>
  )
}

export default App
