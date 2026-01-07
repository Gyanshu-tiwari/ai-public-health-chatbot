import OpenAI from "openai";

let client = null;

export const getOpenAI = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing");
  }

  if (!client) {
    client = new OpenAI({
      apiKey: process.env.GEMINI_API_KEY,
      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
    });
  }

  return client;
};
