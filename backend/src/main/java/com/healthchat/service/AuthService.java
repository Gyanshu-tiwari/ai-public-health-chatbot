package com.healthchat.service;

import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.healthchat.dto.AuthResponse;
import com.healthchat.dto.LoginRequest;
import com.healthchat.dto.RegisterRequest;
import com.healthchat.dto.UserDTO;
import com.healthchat.model.User;
import com.healthchat.repository.UserRepository;
import com.healthchat.util.JwtUtil;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthResponse register(RegisterRequest registerRequest) {
        // Check if user already exists
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("User already exists");
        }

        // Create new user
        User user = new User();
        user.setName(registerRequest.getName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setCredits(100);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        user = userRepository.save(user);

        // Generate JWT token
        String token = jwtUtil.generateToken(user);

        // Create user DTO
        UserDTO userDTO = new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getCredits());

        return new AuthResponse(true, token, userDTO);
    }

    public AuthResponse login(LoginRequest loginRequest) {
        // Find user by email
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        // Check password
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(user);

        // Create user DTO
        UserDTO userDTO = new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getCredits());

        return new AuthResponse(true, token, userDTO);
    }

    public UserDTO getCurrentUser(String token) {
        String email = jwtUtil.extractUsername(token);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getCredits());
    }

    public void sendRecoveryOTP(String recipientEmail) {
        User user = userRepository.findByEmail(recipientEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Generate OTP
        String otp = String.format("%04d", new Random().nextInt(10000));

        // Set OTP and expiry
        user.setResetOTP(otp);
        user.setResetOTPExpiry(LocalDateTime.now().plusMinutes(5));
        userRepository.save(user);

        // Send email
        emailService.sendOTPEmail(recipientEmail, otp);
    }

    public void verifyRecoveryOTP(String recipientEmail, String otp) {
        User user = userRepository.findByEmail(recipientEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getResetOTP() == null || user.getResetOTPExpiry() == null) {
            throw new RuntimeException("OTP not requested");
        }

        if (LocalDateTime.now().isAfter(user.getResetOTPExpiry())) {
            throw new RuntimeException("OTP expired");
        }

        if (!user.getResetOTP().equals(otp)) {
            throw new RuntimeException("Invalid OTP");
        }

        // Clear OTP
        user.setResetOTP(null);
        user.setResetOTPExpiry(null);
        userRepository.save(user);
    }

    public void resetPassword(String email, String newPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetOTP(null);
        user.setResetOTPExpiry(null);
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
    }
}
