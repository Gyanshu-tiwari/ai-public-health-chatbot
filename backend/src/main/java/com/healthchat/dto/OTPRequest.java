package com.healthchat.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class OTPRequest {
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String recipientEmail;

    // Default constructor
    public OTPRequest() {}

    // Constructor
    public OTPRequest(String recipientEmail) {
        this.recipientEmail = recipientEmail;
    }

    // Getters and Setters
    public String getRecipientEmail() {
        return recipientEmail;
    }

    public void setRecipientEmail(String recipientEmail) {
        this.recipientEmail = recipientEmail;
    }
}
