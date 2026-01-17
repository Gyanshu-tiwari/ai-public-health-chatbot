package com.healthchat.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/health")
    public Map<String, Object> health() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "ok");
        response.put("message", "Server is running");
        response.put("features", java.util.Arrays.asList(
            "Chat (AI health awareness)",
            "Telemedicine (video consultations)",
            "Appointments (booking)",
            "Symptoms (checker with doctor referral)",
            "Medical Database (conditions, medications, health tips)",
            "Health Records (secure storage and sharing)",
            "Insurance (coverage and claims)"
        ));
        return response;
    }

    @GetMapping("/")
    public Map<String, String> welcome() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Welcome to the Health Chatbot API");
        return response;
    }
}
