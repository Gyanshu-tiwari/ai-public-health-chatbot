import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context/AppProvider";
import MessageItems from "./MessageItems";
import QuickAppointmentBooking from "../QuickAppointmentBooking";
import sendIcon from "../../assets/send_icon.svg";
import stopIcon from "../../assets/stop_icon.svg";
import toast from "react-hot-toast";
import api from "../../../utils/api";

const ChatWindow = () => {
  const containerRef = useRef(null);

  const { selectedChat, user, token, setUser } = useAppContext();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setprompt] = useState("");

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!user) return toast("login to send Message");
      if (!selectedChat) return toast("Preparing chat...");
      setLoading(true);
      const promptCopy = prompt;
      setprompt("");
      setMessages((prev) => [
        ...prev,
        { role: "user", content: prompt, timestamp: Date.now() },
      ]);

      const { data } = await api.post(
        `/api/message/text`,
        { chatId: selectedChat.id || selectedChat._id, prompt },
        { headers: { Authorization: token } }
      );
      if (data.success) {
        setMessages((prev) => [...prev, data.reply]);
        // decrease credit
        setUser((prev) => ({
          ...prev,
          credits: Math.max((prev?.credits ?? 0) - 1, 0),
        }));
      } else {
        toast.error(data.message);
        setprompt(promptCopy);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setprompt("");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages);
    }
  }, [selectedChat]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behaviour: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40">
      {/* chat messages */}
      <div
        ref={containerRef}
        className="flex-1 mb-5 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden "
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center gap-2">
            <div className="max-w-7xl flex gap-3 items-center justify-center h-16">
              <div className="w-14 h-14 bg-gradient-to-tr from-indigo-500 to-emerald-400 rounded-xl shadow-lg shadow-indigo-500/20" />
              <div className="flex flex-col items-left">
                <span className="font-bold text-xl tracking-tight text-white">
                  HealthGPT
                </span>
                <span className="text-md">AI Health Assistant</span>
              </div>
            </div>
            <p className="mt-5 text-4xl sm:text-6xl text-center text-center text-gray-400 ">
              Ask Suggestions.
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <MessageItems key={index} message={message} />
        ))}
        
        {/* Quick Appointment Booking */}
        <QuickAppointmentBooking />

        {/* Three Dot Loading animation */}
        {loading && (
          <div className="loader flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 bg-white animate-bounce"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 bg-white animate-bounce"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 bg-white animate-bounce"></div>
          </div>
        )}
      </div>

      {/* Prompt Input Box */}
      <form
        onSubmit={onSubmit}
        className="bg-[#583C79]/30 border border-[#80609F]/30 rounded-full w-full max-w-2xl p-3 pl-7 mx-auto flex gap-4 items-center "
      >
        <input
          onChange={(e) => setprompt(e.target.value)}
          value={prompt}
          type="text"
          placeholder="Type your symptoms here..."
          className="flex-1 w-full text-sm outline-none"
          required
        />
        <button disabled={loading}>
          <img
            src={loading ? stopIcon : sendIcon}
            className="w-8 cursor-pointer"
          />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
