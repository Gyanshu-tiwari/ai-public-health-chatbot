import React, { useState } from "react";
import Sidebar from "../components/chatComponents/SideBar";
import ChatWindow from "../components/chatComponents/ChatWindow";
import { Menu } from "lucide-react";
import "../assets/prism.css";
import Login from "./Login";
const Chat = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>

      {!isMenuOpen && (
        <Menu
          size={20}
          className="absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden"
          onClick={() => setIsMenuOpen(true)}
        />
      )}
      
      {props.user ? (
        <div className="bg-gradient-to-br from-[#242124] to-[#000000] flex h-screen w-full overflow-y-hidden">
          <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <ChatWindow />
        </div>
      ) : (
        <div className="bg-gradient-to-b from-[#242124] to-[#000000] flex item-center justify-center h-screen w-screen">
          <Login />
        </div>
      )}
    </>
  );
};

export default Chat;
