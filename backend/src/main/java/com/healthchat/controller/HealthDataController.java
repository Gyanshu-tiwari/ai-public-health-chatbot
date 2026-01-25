package com.healthchat.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.healthchat.model.Disease;
import com.healthchat.model.HealthData.PreventionTips;
import com.healthchat.service.HealthDataService;

@RestController
@RequestMapping("/health-data")
@CrossOrigin(origins = "*", maxAge = 3600)
public class HealthDataController {

    @Autowired
    private HealthDataService healthDataService;

    @GetMapping("/diseases")
    public ResponseEntity<List<Disease>> getAllDiseases() {
        return ResponseEntity.ok(healthDataService.getAllDiseases());
    }

    @GetMapping("/diseases/{id}")
    public ResponseEntity<Disease> getDiseaseById(@PathVariable int id) {
        Optional<Disease> disease = healthDataService.getDiseaseById(id);
        return disease.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/diseases/search")
    public ResponseEntity<List<Disease>> searchDiseases(@RequestParam String query) {
        // Try to find by name first
        Optional<Disease> diseaseByName = healthDataService.getDiseaseByName(query);
        if (diseaseByName.isPresent()) {
            return ResponseEntity.ok(List.of(diseaseByName.get()));
        }
        
        // If not found, search by symptom
        List<Disease> diseasesBySymptom = healthDataService.searchDiseasesBySymptom(query);
        return ResponseEntity.ok(diseasesBySymptom);
    }

    @GetMapping("/prevention-tips")
    public ResponseEntity<PreventionTips> getPreventionTips() {
        return ResponseEntity.ok(healthDataService.getPreventionTips());
    }

    @GetMapping("/emergency-symptoms")
    public ResponseEntity<List<String>> getEmergencySymptoms() {
        return ResponseEntity.ok(healthDataService.getEmergencySymptoms());
    }

    @PostMapping("/check-emergency")
    public ResponseEntity<Map<String, Object>> checkEmergencySymptoms(@RequestBody Map<String, String> request) {
        String symptom = request.get("symptom");
        boolean isEmergency = healthDataService.isEmergencySymptom(symptom);
        
        Map<String, Object> response = Map.of(
            "isEmergency", isEmergency,
            "message", isEmergency ? 
                "This appears to be an emergency symptom. Please seek immediate medical attention!" :
                "This doesn't appear to be an emergency symptom, but please consult a healthcare professional if symptoms persist."
        );
        
        return ResponseEntity.ok(response);
    }
}
