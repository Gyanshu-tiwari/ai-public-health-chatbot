package com.healthchat.dto;

import com.healthchat.model.Chat.Message;

public class MessageResponse {
    private Message reply;

    // Default constructor
    public MessageResponse() {}

    // Constructor
    public MessageResponse(Message reply) {
        this.reply = reply;
    }

    // Getters and Setters
    public Message getReply() {
        return reply;
    }

    public void setReply(Message reply) {
        this.reply = reply;
    }
}
