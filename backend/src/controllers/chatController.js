  import Chat from "../models/chat.js";
  // API controller for creating a new chat 
  export const createChat = async (req, res) =>{
    try{
      console.log(req.user)
      const userId = req.user._id
      const chatData = {
        userId ,
        messages:[],
        name : "New Chat",
        userName: req.user.name
      }
      await Chat.create(chatData)
      res.json({success:true, message:"Chat created succesfully"})
    } catch (error) {
      res.json({success:false, message: error.message});
      
    }

  }

  //API controller for getting all chats 
  export const getChats = async (req, res) =>{
    try{
      const userId = req.user._id
      const chats = await Chat.find({userId : userId}).sort({updatedAt : -1})
      
      res.json({success: true, chats})
    } catch (error) {
      res.json({success:false, message: error.message});

    }

  }

    //API controller for deleting a chats 
  export const deleteChat = async (req, res) =>{
    try{
      const userId = req.user._id
      const {chatId} = req.body

      await Chat.deleteOne({id:chatId, userId})
      
      res.json({success: true, message: "chat deleted"})
    } catch (error) {
      res.json({success:false, message: error.message});

    }

  }