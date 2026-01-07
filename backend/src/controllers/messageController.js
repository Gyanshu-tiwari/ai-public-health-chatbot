import { text } from "express";
import Chat from "../models/chat.js";
import { getOpenAI } from "../config/openai.js";

//Text-based AI chat message controller
export const textMessageController = async (req, res) => {
  try {
    const userId = req.user._id;
    const openai = getOpenAI();
    //check credits
    if (req.user.credits < 1){
        return res.json({success:false, message: "you don't have enough credits to use this feature"})
    }
    const { chatId, prompt } = req.body;

    const chat = await Chat.findOne({ _id: chatId, userId });
    if (!chat) {
      return res.json({ success: false, message: "Chat not found" });
    }

    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
    });


    // Here you would integrate with your AI service to get a response
    const { choices } = await openai.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const reply = {
      ...choices[0].message, 
      timestamp: Date.now(),
      }
    res.json({ success: true, reply });

    // Save the user message and AI response to the chat history
    chat.messages.push( reply );
    await chat.save();
    await User.updateOne({_id: userId}),{$inc: {credits:-1}}

} catch (error) {
    res.json({ success: false, message: error.message });
};
}
