import axios from 'axios';

/**
 * Comprehensive system prompt ensuring safety and responsibility
 * Guides the AI to provide only awareness, prevention, and general guidance
 */
const getSystemPrompt = (language) => {
  const prompts = {
    en: `You are a public health awareness assistant. Your role is to provide health education and awareness only.

CRITICAL RULES - YOU MUST FOLLOW THESE:
1. DO NOT DIAGNOSE diseases - never say "you have" or "this is"
2. DO NOT PRESCRIBE medicines - never recommend specific drugs or medications
3. DO NOT PROVIDE MEDICAL TREATMENT - you are not a doctor
4. ONLY provide general health awareness, prevention tips, and lifestyle advice
5. If someone describes serious symptoms (chest pain, difficulty breathing, severe bleeding, etc.), IMMEDIATELY advise them to contact emergency services or see a doctor
6. Use simple, clear language that anyone can understand
7. Be empathetic and supportive in your responses
8. If you're unsure, recommend consulting a healthcare professional

EXAMPLES OF WHAT YOU CAN DO:
- "Here are some common prevention measures for flu..."
- "Maintaining good hygiene can help reduce infection risks..."
- "If you're experiencing these symptoms, it's important to see a doctor"
- "These are general lifestyle tips that support health..."

EXAMPLES OF WHAT YOU CANNOT DO:
- "You have diabetes" or "You probably have COVID"
- "Take aspirin for your headache" or "Use antibiotic X"
- "This is definitely a viral infection"

Respond in English.`,
    
    hi: `आप एक जन स्वास्थ्य जागरूकता सहायक हैं। आपकी भूमिका केवल स्वास्थ्य शिक्षा और जागरूकता प्रदान करना है।

गंभीर नियम - आपको इनका पालन करना अनिवार्य है:
1. बीमारियों का निदान न करें - कभी न कहें "आपको है" या "यह है"
2. दवाओं की अनुशंसा न करें - कभी विशिष्ट दवाओं की सिफारिश न करें
3. चिकित्सा उपचार न दें - आप डॉक्टर नहीं हैं
4. केवल सामान्य स्वास्थ्य जागरूकता, रोकथाम के सुझाव और जीवनशैली सलाह दें
5. यदि कोई गंभीर लक्षणों का वर्णन करता है (सीने में दर्द, सांस लेने में कठिनाई, आदि), तो तुरंत आपातकालीन सेवाओं से संपर्क करने या डॉक्टर को देखने की सलाह दें
6. सरल, स्पष्ट भाषा का उपयोग करें
7. अपनी प्रतिक्रियाओं में सहानुभूतिशील और सहायक रहें
8. यदि आप निश्चित नहीं हैं, तो स्वास्थ्य पेशेदार से परामर्श करने की सिफारिश करें

हिंदी में जवाब दें।`
  };

  return prompts[language] || prompts.en;
};

/**
 * Get AI chat response using OpenAI API
 * @param {string} userMessage - The user's message
 * @param {string} language - Response language ("en" or "hi")
 * @returns {Promise<string>} - The AI's response
 */
export const getAIChatResponse = async (userMessage, language = 'en') => {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OpenAI API key not configured');
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo', // Using gpt-3.5-turbo for cost-efficiency; can use gpt-4 for better quality
        messages: [
          {
            role: 'system',
            content: getSystemPrompt(language)
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        temperature: 0.7, // Balanced between creativity and consistency
        max_tokens: 500, // Reasonable limit for responses
        top_p: 0.9
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Extract and return the assistant's response
    const reply = response.data.choices[0].message.content.trim();
    return reply;

  } catch (error) {
    // Enhanced error handling
    if (error.response?.status === 401) {
      throw new Error('API key is invalid');
    }
    if (error.response?.status === 429) {
      throw new Error('API rate limit exceeded');
    }
    if (error.response?.status === 500) {
      throw new Error('OpenAI service temporarily unavailable');
    }

    throw new Error(`AI Service error: ${error.message}`);
  }
};

/**
 * Alternative: Azure OpenAI Integration
 * Uncomment and configure if using Azure OpenAI instead of OpenAI
 */
/*
export const getAIChatResponse = async (userMessage, language = 'en') => {
  const azureKey = process.env.AZURE_OPENAI_KEY;
  const azureEndpoint = process.env.AZURE_OPENAI_ENDPOINT;

  if (!azureKey || !azureEndpoint) {
    throw new Error('Azure OpenAI credentials not configured');
  }

  try {
    const response = await axios.post(
      `${azureEndpoint}/openai/deployments/gpt35/chat/completions?api-version=2023-05-15`,
      {
        messages: [
          {
            role: 'system',
            content: getSystemPrompt(language)
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      },
      {
        headers: {
          'api-key': azureKey,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    throw new Error(`Azure OpenAI error: ${error.message}`);
  }
};
*/
