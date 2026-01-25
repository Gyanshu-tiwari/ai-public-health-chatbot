package com.healthchat.controller;

import com.healthchat.model.Chat;
import com.healthchat.service.ChatService;
import com.healthchat.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/chat")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private UserService userService;

    @GetMapping("/create")
    public ResponseEntity<?> createChat(@RequestHeader("Authorization") String token) {
        try {
            String userId = userService.getUserIdFromToken(token);
            Chat chat = chatService.createChat(userId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", "true");
            response.put("message", "Chat created successfully");
            response.put("chat", chat);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("success", "false");
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    @GetMapping("/get")
    public ResponseEntity<?> getChats(@RequestHeader("Authorization") String token) {
        try {
            String userId = userService.getUserIdFromToken(token);
            List<Chat> chats = chatService.getUserChats(userId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", "true");
            response.put("chats", chats);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("success", "false");
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<?> deleteChat(@RequestHeader("Authorization") String token, 
                                       @Valid @RequestBody Map<String, String> request) {
        try {
            String userId = userService.getUserIdFromToken(token);
            String chatId = request.get("chatId");
            
            if (chatId == null || chatId.trim().isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("success", "false");
                error.put("message", "chatId is required");
                return ResponseEntity.badRequest().body(error);
            }
            
            chatService.deleteChat(chatId, userId);
            
            Map<String, String> response = new HashMap<>();
            response.put("success", "true");
            response.put("message", "Chat deleted");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("success", "false");
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
}
