package com.healthchat.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class OTPVerifyRequest {
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String recipientEmail;
    
    @NotBlank(message = "OTP is required")
    private String otp;

    // Default constructor
    public OTPVerifyRequest() {}

    // Constructor
    public OTPVerifyRequest(String recipientEmail, String otp) {
        this.recipientEmail = recipientEmail;
        this.otp = otp;
    }

    // Getters and Setters
    public String getRecipientEmail() {
        return recipientEmail;
    }

    public void setRecipientEmail(String recipientEmail) {
        this.recipientEmail = recipientEmail;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }
}
