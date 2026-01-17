package com.healthchat.service;

import com.healthchat.dto.MessageRequest;
import com.healthchat.dto.MessageResponse;
import com.healthchat.model.Chat;
import com.healthchat.repository.ChatRepository;
import com.healthchat.service.openai.OpenAIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
public class MessageService {

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private OpenAIService openAIService;

    public MessageResponse processMessage(String userId, MessageRequest messageRequest) {
        // Find chat
        Chat chat = chatRepository.findByIdAndUserId(messageRequest.getChatId(), userId)
                .orElseThrow(() -> new RuntimeException("Chat not found"));

        // Initialize messages list if null
        if (chat.getMessages() == null) {
            chat.setMessages(new ArrayList<>());
        }

        // Add user message
        Chat.Message userMessage = new Chat.Message();
        userMessage.setRole("user");
        userMessage.setContent(messageRequest.getPrompt());
        userMessage.setTimestamp(System.currentTimeMillis());
        chat.getMessages().add(userMessage);

        // Get AI response
        String aiResponse = openAIService.generateResponse(messageRequest.getPrompt());

        // Add AI message
        Chat.Message aiMessage = new Chat.Message();
        aiMessage.setRole("assistant");
        aiMessage.setContent(aiResponse);
        aiMessage.setTimestamp(System.currentTimeMillis());
        chat.getMessages().add(aiMessage);

        // Update chat
        chat.setUpdatedAt(LocalDateTime.now());
        chatRepository.save(chat);

        return new MessageResponse(aiMessage);
    }
}
