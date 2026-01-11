import Chat from "../models/chat.js";
import User from "../models/user.js";
import { getOpenAI } from "../config/openai.js";

export const textMessageController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { chatId, prompt } = req.body;
    const openai = getOpenAI();

    // ✅ Credit check
    if (req.user.credits < 1) {
      return res.status(403).json({
        success: false,
        message: "You don't have enough credits",
      });
    }

    // ✅ Chat check
    const chat = await Chat.findOne({ _id: chatId, userId });
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    // Save user message
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
    });

    // AI response
    const { choices } = await openai.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [{ role: "user", content: prompt }],
    });

    const reply = {
      ...choices[0].message,
      timestamp: Date.now(),
    };

    // Save AI message
    chat.messages.push(reply);
    await chat.save();

    // ✅ Deduct credits (FIXED)
    await User.updateOne(
      { _id: userId },
      { $inc: { credits: -1 } }
    );

    // ✅ SINGLE RESPONSE — LAST LINE
    return res.status(200).json({
      success: true,
      reply,
    });

  } catch (error) {
    console.error("textMessageController error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
