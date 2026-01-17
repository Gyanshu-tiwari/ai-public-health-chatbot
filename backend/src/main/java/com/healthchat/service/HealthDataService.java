package com.healthchat.service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.healthchat.model.Disease;
import com.healthchat.model.HealthData;
import com.healthchat.model.HealthData.PreventionTips;

import jakarta.annotation.PostConstruct;

@Service
public class HealthDataService {

    private HealthData healthData;

    @PostConstruct
    public void init() {
        // Initialize health data from the JSON structure
        List<Disease> diseases = Arrays.asList(
            new Disease(1, "Common Cold", 
                Arrays.asList("runny nose", "cough", "sore throat", "sneezing"),
                Arrays.asList("Wash hands regularly", "Avoid close contact with sick people", "Maintain good hygiene"),
                "If symptoms persist for more than 10 days or worsen"),
            
            new Disease(2, "Influenza (Flu)",
                Arrays.asList("fever", "body aches", "fatigue", "cough", "sore throat"),
                Arrays.asList("Get annual flu vaccine", "Maintain distance from sick people", "Practice good hygiene"),
                "If experiencing severe symptoms or shortness of breath - seek immediate medical attention"),
            
            new Disease(3, "COVID-19",
                Arrays.asList("fever", "cough", "fatigue", "loss of taste/smell", "difficulty breathing"),
                Arrays.asList("Get vaccinated", "Wear masks in crowded places if needed", "Maintain distance", "Practice hygiene"),
                "If experiencing difficulty breathing or severe symptoms - seek immediate medical care"),
            
            new Disease(4, "Diabetes",
                Arrays.asList("increased thirst", "frequent urination", "fatigue", "blurred vision"),
                Arrays.asList("Maintain healthy weight", "Exercise regularly", "Eat balanced diet", "Reduce sugar intake"),
                "If experiencing multiple symptoms, consult a healthcare professional for testing"),
            
            new Disease(5, "Hypertension (High Blood Pressure)",
                Arrays.asList("Often asymptomatic", "headaches", "shortness of breath"),
                Arrays.asList("Reduce salt intake", "Exercise regularly", "Maintain healthy weight", "Manage stress"),
                "Regular check-ups recommended for early detection"),
            
            new Disease(6, "Heart Disease",
                Arrays.asList("chest pain", "shortness of breath", "fatigue"),
                Arrays.asList("Regular exercise", "Healthy diet", "Avoid smoking", "Manage stress"),
                "If experiencing chest pain or severe symptoms - CALL EMERGENCY IMMEDIATELY")
        );

        PreventionTips tips = new PreventionTips(
            Arrays.asList(
                "Wash hands frequently with soap and water",
                "Maintain a balanced diet rich in fruits and vegetables",
                "Exercise regularly for at least 30 minutes daily",
                "Get 7-9 hours of quality sleep",
                "Manage stress through meditation or exercise",
                "Stay hydrated - drink plenty of water",
                "Avoid smoking and excessive alcohol",
                "Get vaccinated as recommended by health authorities"
            ),
            Arrays.asList(
                "Rest and recover properly",
                "Stay hydrated",
                "Use a humidifier to ease congestion",
                "Gargle with salt water for sore throat",
                "Maintain isolation to prevent spreading to others",
                "Monitor symptoms and seek help if they worsen"
            )
        );

        List<String> emergencySymptoms = Arrays.asList(
            "Chest pain or pressure",
            "Difficulty breathing or shortness of breath",
            "Severe allergic reaction",
            "Loss of consciousness",
            "Severe bleeding",
            "Signs of stroke (face drooping, arm weakness, speech difficulty)",
            "Severe poisoning or overdose",
            "Severe choking",
            "Severe abdominal pain",
            "High fever with confusion"
        );

        this.healthData = new HealthData(diseases, tips, emergencySymptoms);
    }

    public List<Disease> getAllDiseases() {
        return healthData.getCommonDiseases();
    }

    public Optional<Disease> getDiseaseById(int id) {
        return healthData.getCommonDiseases().stream()
            .filter(disease -> disease.getId() == id)
            .findFirst();
    }

    public Optional<Disease> getDiseaseByName(String name) {
        return healthData.getCommonDiseases().stream()
            .filter(disease -> disease.getName().toLowerCase().contains(name.toLowerCase()))
            .findFirst();
    }

    public List<Disease> searchDiseasesBySymptom(String symptom) {
        return healthData.getCommonDiseases().stream()
            .filter(disease -> disease.getSymptoms().stream()
                .anyMatch(s -> s.toLowerCase().contains(symptom.toLowerCase())))
            .toList();
    }

    public PreventionTips getPreventionTips() {
        return healthData.getPreventionTips();
    }

    public List<String> getEmergencySymptoms() {
        return healthData.getEmergencySymptoms();
    }

    public boolean isEmergencySymptom(String symptom) {
        return healthData.getEmergencySymptoms().stream()
            .anyMatch(emergency -> emergency.toLowerCase().contains(symptom.toLowerCase()));
    }
}
