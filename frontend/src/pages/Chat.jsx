import React, { useState } from 'react';
import Navbar from "../components/chatComponents/Navbar.jsx";
import Sidebar from '../components/chatComponents/layout/SideBar';
import ChatWindow from '../components/chatComponents/chat/ChatWindow';
import { Routes, Route } from "react-router-dom";


const Chat = () => {
  const [chats, setChats] = useState([
    { id: '1', title: 'AI-based HealthTech Project', folder: 'Web Development' },
    { id: '2', title: 'Professional branding', folder: 'Branding' },
  ]);
  const [folders, setFolders] = useState([
    { id: 'f1', name: 'Branding', color: 'text-pink-400' },
    { id: 'f2', name: 'Web Development', color: 'text-blue-400' },
  ]);

  const handleAddFolder = (name) => {
    setFolders([...folders, { id: Date.now().toString(), name, color: 'text-indigo-400' }]);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  

  return (
    <>
      {/* Background with deep gradients */}
      <div className=" h-screen w-full bg-[#0B0C10] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#0B0C10] to-purple-900/20 font-sans overflow-hidden">
        <Navbar isLoggedIn={isLoggedIn} />
        {/* Main Glass Container - Refined Proportion */}
        <div className="h-[92%] w-full  glass-dark flex overflow-hidden">
          
          <Sidebar 
            chats={chats} 
            setChats={setChats} 
            folders={folders} 
            onAddFolder={handleAddFolder} 
          />

          <main className="flex-1 flex flex-col  -z-20 relative bg-white/[0.02]">
            <Routes>
              <Route path="/chat/:id" element={<ChatWindow />} />
              <Route path="*" element={
                <div className="h-full flex flex-col items-center justify-center text-slate-500">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-6 border border-white/5">
                    <div className="w-10 h-10 bg-indigo-500/40 rounded-full blur-xl animate-pulse" />
                  </div>
                  <h2 className="text-xl font-semibold text-slate-300">Welcome to Aetheris</h2>
                  <p className="text-sm mt-2 opacity-60">Select a conversation to begin</p>
                </div>
              } />
            </Routes>
          </main> 
          
        </div>
      </div>
    </>
  );
};

export default Chat;