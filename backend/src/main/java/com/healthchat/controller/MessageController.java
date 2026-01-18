package com.healthchat.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthchat.dto.MessageRequest;
import com.healthchat.dto.MessageResponse;
import com.healthchat.service.MessageService;
import com.healthchat.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/message")
@CrossOrigin(origins = "*", maxAge = 3600)
public class MessageController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @PostMapping("/text")
    public ResponseEntity<?> sendMessage(@RequestHeader("Authorization") String token,
            @Valid @RequestBody MessageRequest messageRequest) {
        try {
            System.out.println("Received message request: " + messageRequest.getPrompt() + " for chat: "
                    + messageRequest.getChatId());
            String userId = userService.getUserIdFromToken(token);
            System.out.println("User ID resolved: " + userId);

            // Check credits
            if (!userService.hasSufficientCredits(userId, 1)) {
                System.out.println("Insufficient credits for user: " + userId);
                Map<String, String> error = new HashMap<>();
                error.put("success", "false");
                error.put("message", "You don't have enough credits");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
            }

            MessageResponse response = messageService.processMessage(userId, messageRequest);
            System.out.println("Message processed successfully");

            // Deduct credits
            userService.deductCredits(userId, 1);

            Map<String, Object> result = new HashMap<>();
            result.put("success", "true");
            result.put("reply", response.getReply());

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            System.err.println("Error processing message: " + e.getMessage());
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("success", "false");
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
}
