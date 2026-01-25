package com.healthchat.service;

import org.springframework.stereotype.Service;

@Service
public class EmailService {

    public void sendOTPEmail(String recipientEmail, String otp) {
        // Mock implementation - just log the OTP
        System.out.println("MOCK EMAIL: OTP " + otp + " sent to " + recipientEmail);
        // In production, this would send an actual email
    }
}
