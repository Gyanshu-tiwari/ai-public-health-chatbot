package com.healthchat.service.gemini;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class GeminiService {

    private String apiKey;

    private final ObjectMapper objectMapper;

    public GeminiService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
        // Temporary hardcoded API key for testing
        this.apiKey = "AIzaSyCjqBUK8T8ycYT6g-WgsWcpGUA43x9tJ6g";
    }

    public String generateResponse(String prompt) {
        try {
            System.out.println("Gemini API Key: " + (apiKey != null ? "Present" : "NULL"));
            System.out.println("Gemini API Key Length: " + (apiKey != null ? apiKey.length() : 0));
            
            String requestBody = buildRequestBody(prompt);
            System.out.println("Request Body: " + requestBody);
            
            URL url = new URL("https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=" + apiKey);
            System.out.println("Request URL: " + url.toString());
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setDoOutput(true);
            
            // Send request
            try (OutputStream os = connection.getOutputStream()) {
                byte[] input = requestBody.getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }
            
            // Get response
            int responseCode = connection.getResponseCode();
            System.out.println("Gemini API Response Code: " + responseCode);
            
            if (responseCode == HttpURLConnection.HTTP_OK) {
                BufferedReader br = new BufferedReader(
                    new InputStreamReader(connection.getInputStream(), StandardCharsets.UTF_8));
                
                StringBuilder response = new StringBuilder();
                String responseLine;
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine.trim());
                }
                br.close();
                
                System.out.println("Gemini API Response: " + response.toString());
                return extractResponse(response.toString());
            } else {
                // Read error response
                BufferedReader errorBr = new BufferedReader(
                    new InputStreamReader(connection.getErrorStream(), StandardCharsets.UTF_8));
                
                StringBuilder errorResponse = new StringBuilder();
                String errorLine;
                while ((errorLine = errorBr.readLine()) != null) {
                    errorResponse.append(errorLine.trim());
                }
                errorBr.close();
                
                System.out.println("Gemini API Error Response: " + errorResponse.toString());
                return "I apologize, but the AI service returned an error. Please try again later.";
            }
            
        } catch (Exception e) {
            System.err.println("Error calling Gemini API: " + e.getMessage());
            return "I apologize, but I'm having trouble connecting to the AI service right now. Please try again later.";
        }
    }

    private String buildRequestBody(String prompt) {
        return String.format(
            "{\"contents\":[{\"parts\":[{\"text\":\"%s\"}]}]}",
            prompt.replace("\"", "\\\"").replace("\n", "\\n")
        );
    }

    private String extractResponse(String jsonResponse) {
        try {
            JsonNode root = objectMapper.readTree(jsonResponse);
            JsonNode candidates = root.path("candidates");
            if (candidates.isArray() && candidates.size() > 0) {
                JsonNode content = candidates.get(0).path("content");
                JsonNode parts = content.path("parts");
                if (parts.isArray() && parts.size() > 0) {
                    return parts.get(0).path("text").asText();
                }
            }
            return "I received a response but couldn't extract the content properly.";
        } catch (Exception e) {
            System.err.println("Error parsing Gemini response: " + e.getMessage());
            return "I had trouble understanding the AI response. Please try again.";
        }
    }
}
