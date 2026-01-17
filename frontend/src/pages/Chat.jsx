import React, { useEffect, useState } from "react";
import Sidebar from "../components/chatComponents/SideBar";
import ChatWindow from "../components/chatComponents/ChatWindow";
import { Menu } from "lucide-react";
import Login from "./Login";
import { useAppContext } from "../context/AppProvider";

const Chat = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, chats, createNewChat, selectedChat } = useAppContext();

  // 🔥 AUTO CREATE FIRST CHAT
  useEffect(() => {
    if (user && chats.length === 0) {
      createNewChat(true); // silent create
    }
  }, [user, chats]);

  return (
    <>
      {!isMenuOpen && (
        <Menu
          size={20}
          className="absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden"
          onClick={() => setIsMenuOpen(true)}
        />
      )}

      {user ? (
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
