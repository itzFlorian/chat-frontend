import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Register from './components/Register.jsx'
import Chat from "./components/Chat.jsx"
import Login from './components/Login.jsx'

function App() {
  return (
    <>
    <Routes>
      <Route path="/users/register" element={<Register/>} />
      <Route path='/users/login' element={<Login />} />
      <Route path="/" element={<Chat />} />
    </Routes>

    </>
  )
}

export default App
