package com.healthchat.dto;

public class UserDTO {
    private String id;
    private String name;
    private String email;
    private Integer credits;

    // Default constructor
    public UserDTO() {}

    // Constructor
    public UserDTO(String id, String name, String email, Integer credits) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.credits = credits;
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

    public Integer getCredits() {
        return credits;
    }

    public void setCredits(Integer credits) {
        this.credits = credits;
    }
}
