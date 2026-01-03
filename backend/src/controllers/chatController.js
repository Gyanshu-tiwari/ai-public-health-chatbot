import { getAIChatResponse } from '../services/aiService.js';

/**
 * POST /api/chat
 * Handles incoming chat messages and returns AI-generated responses
 * Request body: { message: string, language: "en" | "hi" }
 * Response: { reply: string }
 */
export const chat = async (req, res, next) => {
  try {
    const { message, language = 'en' } = req.body;

    // Validation
    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: 'Invalid request. Please provide a message string.'
      });
    }

    if (!['en', 'hi'].includes(language)) {
      return res.status(400).json({
        error: 'Language must be "en" (English) or "hi" (Hindi)'
      });
    }

    // Trim and check message length
    const trimmedMessage = message.trim();
    if (trimmedMessage.length === 0) {
      return res.status(400).json({
        error: 'Message cannot be empty'
      });
    }

    if (trimmedMessage.length > 2000) {
      return res.status(400).json({
        error: 'Message is too long (max 2000 characters)'
      });
    }

    // Get AI response
    const reply = await getAIChatResponse(trimmedMessage, language);

    res.json({ reply });

  } catch (error) {
    console.error('Chat controller error:', error.message);
    
    // Handle API errors gracefully
    if (error.message.includes('API key')) {
      return res.status(500).json({
        error: 'API configuration error. Please contact support.'
      });
    }

    if (error.message.includes('rate limit')) {
      return res.status(429).json({
        error: 'Too many requests. Please try again later.'
      });
    }

    res.status(500).json({
      error: 'Failed to generate response. Please try again.'
    });
  }
};
