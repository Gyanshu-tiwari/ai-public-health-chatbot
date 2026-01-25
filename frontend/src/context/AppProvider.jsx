import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../utils/api";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  /* ================= AUTH STATE ================= */
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  /* ================= CHAT STATE ================= */
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  /* ================= FETCH LOGGED-IN USER ================= */
  const fetchUser = async () => {
    try {
      const { data } = await api.get("/api/auth/me",{headers:{Authorization: `Bearer ${token}`}});
      setUser(data.user);
    } catch {
      // ❗ Do NOT logout here (OTP/reset flow needs this)
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  /* ================= FETCH USER CHATS ================= */
  const fetchUserChats = async () => {
    if (!user) return;

    try {
      const { data } = await api.get("/api/chat/get",{headers:{Authorization: `Bearer ${token}`}});
      setChats(data.chats || []);
      setSelectedChat(data.chats?.[0] || null);
    } catch {
      toast.error("Failed to load chats");
    }
  };

  /* ================= CREATE NEW CHAT ================= */
  const createNewChat = async () => {
    if (!user) return toast.error("Please login first");

    try {
      await api.get("/api/chat/create",{headers:{Authorization: `Bearer ${token}`}});
      fetchUserChats();
    } catch {
      toast.error("Failed to create chat");
    }
  };
  

  /* ================= LOGOUT ================= */
  const logout = (redirect = true) => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setChats([]);
    setSelectedChat(null);
    setLoadingUser(false);

    if (redirect) navigate("/login");
  };

  /* ================= AUTO LOGIN ================= */
  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setUser(null);
      setLoadingUser(false);
    }
  }, [token]);

  /* ================= LOAD CHATS ================= */
  useEffect(() => {
    if (user && token) {
      fetchUserChats();
    } else {
      setChats([]);
      setSelectedChat(null);
    }
  }, [user, token]);

  return (
    <AppContext.Provider
      value={{
        /* auth */
        user,
        setUser,
        token,
        setToken,
        loadingUser,
        fetchUser,
        logout,
        navigate,

        /* chats */
        chats,
        selectedChat,
        setSelectedChat,
        fetchUserChats,
        createNewChat,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
