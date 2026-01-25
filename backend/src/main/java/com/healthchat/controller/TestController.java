package com.healthchat.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.healthchat.service.gemini.GeminiService;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    private GeminiService geminiService;

    @GetMapping("/gemini")
    public ResponseEntity<?> testGemini(@RequestParam(defaultValue = "Hello, how are you?") String message) {
        try {
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("input", message);
            response.put("output", geminiService.generateResponse(message));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }
}
