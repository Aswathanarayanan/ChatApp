import './App.css';
import { Route,Routes } from 'react-router-dom';
import React, { useState } from 'react';
import HomePage from './Pages/HomePage';
import ChatPage from './Pages/ChatPage';



function App() {

  const [user,setUser] = useState();

  return (
      
       <div className="App">
      <Routes>
    <Route path="/" element={<HomePage/>} exact />
    <Route path="/chats" element={<ChatPage/>} />
    </Routes>
    </div>

  );
}

export default App;
