
import React, { useState } from "react";
import { useAppContext } from "../../context/AppProvider";
import { Search, Trash, X, Zap } from "lucide-react";
import moment from "moment";
import LogoutIcon from '../../assets/logout_icon.svg'
import UserIcon from '../../assets/user_icon.svg'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from '../../../utils/api'




const SideBar = ({ isMenuOpen, setIsMenuOpen }) => {
  const { chats, setSelectedChat, user, createNewChat, setchats, fetchUserChats, setToken } = useAppContext();
  const navigate = useNavigate();
  const limitWords = (text, maxWords = 5) => {
    if (!text) return "";

    const words = text.trim().split(/\s+/);
    if (words.length <= maxWords) return text;

    return words.slice(0, maxWords).join(" ") + "...";
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };


  const deleteChat = async (e, chatId) => {
    e.stopPropagation();

    const confirmDelete = window.confirm("Are you sure you want to delete this chat?");
    if (!confirmDelete) return;

    try {
      const { data } = await api.post("/api/chat/delete", { chatId });

      if (data.success) {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const [search, setSearch] = useState("");
  return (
    <div
      className={`flex flex-col h-full min-w-72 p-5 bg-gradient-to-b from-[#242124]/30 to-[#000000]/30 border-[#80609F]/30 backdrop-blur-3xl transition-all duration-500 max-md:absolute left-0 z-1 ${!isMenuOpen && "max-md:-translate-x-full"
        }`}
    >
      {/* Logo */}
      <div className="max-w-7xl mx-auto flex gap-3 items-center justify-between h-16">
        <div className="w-14 h-14 bg-gradient-to-tr from-indigo-500 to-emerald-400 rounded-xl shadow-lg shadow-indigo-500/20" />

        <div className="flex flex-col items-left">
          <span className="font-bold text-xl tracking-tight text-white">
            HealthGPT
          </span>
          <span className="text-md">AI Health Assistant</span>
        </div>
      </div>

      {/* New Chat button */}
      <button onClick={createNewChat} className="w-full text-sm py-2 mt-10 rounded-md text-white bg-gradient-to-b from-[#A456f7] to-[#3D81F6] shadow-sm flex items-center justify-center ">
        <span>+</span>
        New Chat
      </button>

      {/* Search Conversation */}
      <div className="flex items-center gap-2 p-3 mt-4 border border-gray-400 rounded-md">
        <Search size={20} className="text-slate-400" />
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="outline-none w-full"
          placeholder="Search conversations"
        />
      </div>

      {/*  Recent Chats */}
      {chats.length > 0 && (
        <p className="text-sm font-black mt-4 mb-4 text-zinc-400 uppercase tracking-widest">
          Recent Chats
        </p>
      )}
      <div className="flex-1 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mt-sm space-y-3">
        {chats
          .filter((chat) =>
            chat.messages[0]
              ? chat.messages[0]?.content
                .toLowerCase()
                .includes(search.toLowerCase())
              : chat.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((chat) => (
            <div
              onClick={() => {
                navigate("/chat");
                setSelectedChat(chat);
                setIsMenuOpen(false);
              }}
              key={chat._id}
              className="p-2 px-4 bg-[#57317c]/10 border-[#80609F]/15  rounded-md cursor-pointer flex justify-between group "
            >
              <div>
                <p className="tuncate w-full">
                  {chat.messages.length > 0
                    ? limitWords(chat.messages[0].content, 5)
                    : limitWords(chat.name, 5)}
                </p>
                <p className="text-xs text-[#B1A60]">
                  {moment(chat.updatedAt).fromNow()}
                </p>
              </div>
              <Trash
                size={20}
                onClick={e => toast.promise(deleteChat(e, chat._id), { loading: 'deleting..' })}
                className="hidden group-hover:block cursor-pointer my-auto text-slate-400"
              />
            </div>
          ))}
      </div>

      {/* Credit Purchases option */}

      <div
        onClick={() => {
          setIsMenuOpen(false);
        }}
        className="flex items-center gap-2 p-3 mt-4 border border-gray-300  rounded-md cursor-pointer hover:scale-103 transition-all"
      >
        <Zap size={20} className="cursor-pointer text-slate-400" />
        <div className="flex flex-col text-sm">
          <p>Credits:{user?.credits}</p>
          <p>Purchase credits to use Aestheris</p>
        </div>
      </div>

      {/* User Account */}
      <div className="group flex items-center gap-2 p-3 mt-4 border border-gray-300 rounded-md cursor-pointer hover:scale-103 transition-all">
        <img src={UserIcon} className="text-slate-400" />

        <div className="flex flex-col text-sm">
          <p>{user ? user.name : "Login your Account"}</p>
        </div>

        {user && (
          <img
            onClick={logout}
            src={LogoutIcon}
            className=" hidden group-hover:block cursor-pointer ml-auto h-5 text-slate-400"
          />
        )}
      </div>

      <X
        onClick={() => setIsMenuOpen(false)}
        size={20}
        className=" absolute top-3 right-3 cursor-pointer md:hidden text-slate-400 "
      />
    </div>
  );
};

export default SideBar;
