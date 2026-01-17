package com.healthchat.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

@Document(collection = "users")
public class User {
    
    @Id
    private String id;
    
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    @Field("name")
    private String name;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @Field("email")
    private String email;
    
    @NotBlank(message = "Password is required")
    @Field("password")
    private String password;
    
    @Field("resetOTP")
    private String resetOTP;
    
    @Field("resetOTPExpiry")
    private LocalDateTime resetOTPExpiry;
    
    @Field("credits")
    private Integer credits = 100;
    
    @Field("createdAt")
    private LocalDateTime createdAt;
    
    @Field("updatedAt")
    private LocalDateTime updatedAt;
    
    // Default constructor
    public User() {}
    
    // Constructor with required fields
    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.credits = 100;
    }
    
    // Getters and Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getResetOTP() {
        return resetOTP;
    }
    
    public void setResetOTP(String resetOTP) {
        this.resetOTP = resetOTP;
    }
    
    public LocalDateTime getResetOTPExpiry() {
        return resetOTPExpiry;
    }
    
    public void setResetOTPExpiry(LocalDateTime resetOTPExpiry) {
        this.resetOTPExpiry = resetOTPExpiry;
    }
    
    public Integer getCredits() {
        return credits;
    }
    
    public void setCredits(Integer credits) {
        this.credits = credits;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", credits=" + credits +
                ", createdAt=" + createdAt +
                '}';
    }
}
