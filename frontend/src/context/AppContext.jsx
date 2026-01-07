import { createContext, useContext, useEffect, useState} from "react" ;
import { useNavigate } from "react-router-dom";
const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
    
    const navigate = useNavigate()
    const [ user, setUser ] = useState(null)
    const [ chats, setChats ] = useState([])
    const [ selectedChat, setSelectedChat ] = useState(null)

    const fetchUser = async () =>{
        setuser()
    }

    const fetchUserChats = async () =>{
        setChats()
        setSelectedChat()
    }

    useEffect(()=>{
        if (user){
            fetchUserChats
        }else{
            setChats([])
            setSelectedChat()
        }
    },[user])

    useEffect(()=>{
        fetchUser()
    },[])

    const value={}

    return (
        <AppContext.Provider value={value}>
            { children }
        </AppContext.Provider>
    )
}
export const useAppContext = ()=> useContext(AppContext)