import React from "react";
import Chat from "./pages/Chat.jsx";
import Navbar from "./components/Navbar.jsx";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <div className="h-screen w-full">
      <MemoryRouter>
        <Navbar isLoggedIn={isLoggedIn} />
      </MemoryRouter>
      <Chat />
    </div>
  );
};

export default App;
