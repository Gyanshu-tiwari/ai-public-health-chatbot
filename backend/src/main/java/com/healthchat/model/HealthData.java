package com.healthchat.model;

import java.util.List;

public class HealthData {
    private List<Disease> commonDiseases;
    private PreventionTips preventionTips;
    private List<String> emergencySymptoms;

    // Constructors
    public HealthData() {}

    public HealthData(List<Disease> commonDiseases, PreventionTips preventionTips, List<String> emergencySymptoms) {
        this.commonDiseases = commonDiseases;
        this.preventionTips = preventionTips;
        this.emergencySymptoms = emergencySymptoms;
    }

    // Getters and Setters
    public List<Disease> getCommonDiseases() {
        return commonDiseases;
    }

    public void setCommonDiseases(List<Disease> commonDiseases) {
        this.commonDiseases = commonDiseases;
    }

    public PreventionTips getPreventionTips() {
        return preventionTips;
    }

    public void setPreventionTips(PreventionTips preventionTips) {
        this.preventionTips = preventionTips;
    }

    public List<String> getEmergencySymptoms() {
        return emergencySymptoms;
    }

    public void setEmergencySymptoms(List<String> emergencySymptoms) {
        this.emergencySymptoms = emergencySymptoms;
    }

    // Inner class for prevention tips
    public static class PreventionTips {
        private List<String> general;
        private List<String> duringIllness;

        // Constructors
        public PreventionTips() {}

        public PreventionTips(List<String> general, List<String> duringIllness) {
            this.general = general;
            this.duringIllness = duringIllness;
        }

        // Getters and Setters
        public List<String> getGeneral() {
            return general;
        }

        public void setGeneral(List<String> general) {
            this.general = general;
        }

        public List<String> getDuringIllness() {
            return duringIllness;
        }

        public void setDuringIllness(List<String> duringIllness) {
            this.duringIllness = duringIllness;
        }
    }
}
