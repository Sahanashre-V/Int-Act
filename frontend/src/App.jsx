import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import About from './components/About';
import chat from './components/Chat';
import Chat from './components/Chat';

function App() {
  return (

    <Router>
      <div className="min-h-screen bg-gradient-to-br from-[#F7FFE5] to-[#E1ECC8]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About/>} />
          <Route path="/chat" element={<Chat/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;