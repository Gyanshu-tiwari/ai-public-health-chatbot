package com.healthchat.dto;

import jakarta.validation.constraints.NotBlank;

public class MessageRequest {
    
    @NotBlank(message = "Chat ID is required")
    private String chatId;
    
    @NotBlank(message = "Prompt is required")
    private String prompt;

    // Default constructor
    public MessageRequest() {}

    // Constructor
    public MessageRequest(String chatId, String prompt) {
        this.chatId = chatId;
        this.prompt = prompt;
    }

    // Getters and Setters
    public String getChatId() {
        return chatId;
    }

    public void setChatId(String chatId) {
        this.chatId = chatId;
    }

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }
}
