package com.healthchat.service.openai;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class OpenAIService {

    @Value("${openai.api.key}")
    private String apiKey;

    public String generateResponse(String prompt) {
        // Simple AI response for testing
        return "AI Response: Based on your prompt '" + prompt + "', here's a helpful health response. This is a test message while OpenAI integration is being configured.";
    }
}
