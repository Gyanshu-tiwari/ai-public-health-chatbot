package com.healthchat.service.gemini;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class GeminiService {

    @Value("${openai.api.key}")
    private String apiKey;

    private final ObjectMapper objectMapper;

    public GeminiService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public String generateResponse(String prompt) {
        try {
            if (apiKey == null || apiKey.trim().isEmpty()) {
                System.err.println("Gemini API key is null or empty");
                return "AI service is not properly configured. Please contact administrator.";
            }
            
            System.out.println("=== GEMINI API DEBUG ===");
            System.out.println("Gemini API Key: " + (apiKey != null ? "Present" : "NULL"));
            System.out.println("Gemini API Key Length: " + (apiKey != null ? apiKey.length() : 0));
            System.out.println("Gemini API Key First 10 chars: " + (apiKey != null && apiKey.length() > 10 ? apiKey.substring(0, 10) + "..." : "N/A"));
            
            String requestBody = buildRequestBody(prompt);
            System.out.println("Request Body: " + requestBody);
            
            URL url = new URL("https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=" + apiKey);
            System.out.println("Request URL: " + url.toString());
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setConnectTimeout(30000); // 30 seconds timeout
            connection.setReadTimeout(30000); // 30 seconds timeout
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
                String result = extractResponse(response.toString());
                System.out.println("Extracted Response: " + result);
                System.out.println("=== END GEMINI API DEBUG ===");
                return result;
            } else {
                // Read error response
                String errorResponse = readErrorResponse(connection);
                System.out.println("Gemini API Error Response: " + errorResponse);
                
                // Handle specific error cases
                if (responseCode == 403) {
                    return "AI service access is denied. Please check API key configuration.";
                } else if (responseCode == 429) {
                    return "AI service is temporarily unavailable due to rate limits. Please try again in a few moments.";
                } else if (responseCode >= 500) {
                    return "AI service is temporarily unavailable. Please try again later.";
                } else {
                    return "AI service returned an error. Please try again later.";
                }
            }
            
        } catch (Exception e) {
            System.err.println("Error calling Gemini API: " + e.getMessage());
            e.printStackTrace();
            return "I'm having trouble connecting to the AI service right now. Please try again later.";
        }
    }
    
    private String readErrorResponse(HttpURLConnection connection) {
        try {
            BufferedReader errorBr = new BufferedReader(
                    new InputStreamReader(connection.getErrorStream(), StandardCharsets.UTF_8));
            
            StringBuilder errorResponse = new StringBuilder();
            String errorLine;
            while ((errorLine = errorBr.readLine()) != null) {
                errorResponse.append(errorLine.trim());
            }
            errorBr.close();
            return errorResponse.toString();
        } catch (Exception e) {
            return "Error reading error response: " + e.getMessage();
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
