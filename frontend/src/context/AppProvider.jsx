import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../utils/api";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  // 🔐 Auth state
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // 💬 Chat state
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  /* ================= FETCH LOGGED-IN USER ================= */
  const fetchUser = async () => {
    try {
      const { data } = await api.get("/api/auth/me",{headers:{Authorization: token}});
      setUser(data.user);
    } catch (error) {
      // ❌ Token invalid / expired
      logout(false);
    } finally {
      setLoadingUser(false);
    }
  };

  /* ================= FETCH USER CHATS ================= */
  const fetchUserChats = async () => {
    try {
      const { data } = await api.get("/api/chat/get",{headers:{Authorization:'Bearer',token}});
      setChats(data.chats || []);
      setSelectedChat(data.chats?.[0] || null);
    } catch (error) {
      toast.error("Failed to load chats",error.message);
    }
  };

  /* ================= CREATE NEW CHAT ================= */
  const createNewChat = async () => {
    if (!user) return toast.error("Please login first");
    await api.get("/api/chat/create",{headers:{Authorization:token}});
    fetchUserChats();
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

  /* ================= AUTO LOGIN ON REFRESH ================= */
  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setUser(null)
      setLoadingUser(false);
    }
  }, [token]);

  /* ================= LOAD CHATS WHEN USER IS READY ================= */
  useEffect(() => {
    if (user) {
      fetchUserChats();
    }
    else{
      setChats([])
      setSelectedChat(null)
    }
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        // auth
        user,
        setUser,
        token,
        setToken,
        fetchUser,
        loadingUser,
        logout,

        // chats
        
        chats,
        selectedChat,
        fetchUserChats,
        setSelectedChat,
        createNewChat,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
