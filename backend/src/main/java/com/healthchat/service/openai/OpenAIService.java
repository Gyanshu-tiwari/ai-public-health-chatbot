package com.healthchat.service.openai;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatCompletionResult;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.completion.chat.ChatMessageRole;
import com.theokanning.openai.service.OpenAiService;

@Service
public class OpenAIService {

    @Value("${openai.api.key}")
    private String apiKey;

    private OpenAiService getOpenAiService() {
        return new OpenAiService(apiKey);
    }

    public String generateResponse(String prompt) {
        OpenAiService service = getOpenAiService();
        
        List<ChatMessage> messages = new ArrayList<>();
        messages.add(new ChatMessage(ChatMessageRole.USER.value(), prompt));

        ChatCompletionRequest request = ChatCompletionRequest.builder()
                .model("gpt-3.5-turbo")
                .messages(messages)
                .build();

        ChatCompletionResult result = service.createChatCompletion(request);
        
        if (result.getChoices().isEmpty()) {
            throw new RuntimeException("No response from AI service");
        }

        return result.getChoices().get(0).getMessage().getContent();
    }
}
