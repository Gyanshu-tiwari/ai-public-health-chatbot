package com.healthchat.model;

import java.util.List;

public class Disease {
    private int id;
    private String name;
    private List<String> symptoms;
    private List<String> prevention;
    private String whenToSeeDoctor;

    // Constructors
    public Disease() {}

    public Disease(int id, String name, List<String> symptoms, List<String> prevention, String whenToSeeDoctor) {
        this.id = id;
        this.name = name;
        this.symptoms = symptoms;
        this.prevention = prevention;
        this.whenToSeeDoctor = whenToSeeDoctor;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(List<String> symptoms) {
        this.symptoms = symptoms;
    }

    public List<String> getPrevention() {
        return prevention;
    }

    public void setPrevention(List<String> prevention) {
        this.prevention = prevention;
    }

    public String getWhenToSeeDoctor() {
        return whenToSeeDoctor;
    }

    public void setWhenToSeeDoctor(String whenToSeeDoctor) {
        this.whenToSeeDoctor = whenToSeeDoctor;
    }
}
