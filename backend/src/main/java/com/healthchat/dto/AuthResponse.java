package com.healthchat.dto;

public class AuthResponse {
    private boolean success;
    private String token;
    private UserDTO user;

    // Default constructor
    public AuthResponse() {}

    // Constructor
    public AuthResponse(boolean success, String token, UserDTO user) {
        this.success = success;
        this.token = token;
        this.user = user;
    }

    // Getters and Setters
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }
}
