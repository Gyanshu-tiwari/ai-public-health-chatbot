package com.healthchat.service;

import com.healthchat.model.Doctor;
import org.springframework.stereotype.Service;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.util.StringUtils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class DoctorDataService {

    private final Random random = new Random();

    public List<Doctor> parseDoctorsFromCSV() {
        List<Doctor> doctors = new ArrayList<>();
        Resource resource = new ClassPathResource("Doctor's Data.csv");
        
        try (BufferedReader br = new BufferedReader(new InputStreamReader(resource.getInputStream()))) {
            String line;
            boolean isFirstLine = true;
            
            while ((line = br.readLine()) != null) {
                if (isFirstLine) {
                    isFirstLine = false;
                    continue; // Skip header
                }
                
                String[] parts = parseCSVLine(line);
                if (parts.length >= 4) {
                    Doctor doctor = createDoctorFromCSV(parts);
                    doctors.add(doctor);
                }
            }
        } catch (IOException e) {
            System.err.println("Error reading CSV file: " + e.getMessage());
            // Return empty list if file not found
        }
        
        return doctors;
    }

    private String[] parseCSVLine(String line) {
        List<String> parts = new ArrayList<>();
        StringBuilder current = new StringBuilder();
        boolean inQuotes = false;
        
        for (int i = 0; i < line.length(); i++) {
            char c = line.charAt(i);
            
            if (c == '"') {
                inQuotes = !inQuotes;
            } else if (c == ',' && !inQuotes) {
                parts.add(current.toString());
                current = new StringBuilder();
            } else {
                current.append(c);
            }
        }
        
        parts.add(current.toString());
        return parts.toArray(new String[0]);
    }

    private Doctor createDoctorFromCSV(String[] parts) {
        String name = parts[0].trim();
        String specialization = parts[1].trim();
        String degree = parts[2].trim();
        String state = parts[3].trim();
        String city = parts.length > 4 ? parts[4].trim() : "";
        
        // Generate a unique doctor code
        String code = generateDoctorCode(name);
        
        // Generate random contact details
        String phone = generatePhoneNumber();
        String email = generateEmail(name);
        
        // Generate random experience (1-30 years)
        int experience = random.nextInt(30) + 1;
        
        // Generate consultation fee based on specialization
        String consultationFee = generateConsultationFee(specialization);
        
        // Determine availability (90% chance of being available)
        boolean available = random.nextDouble() < 0.9;
        
        Doctor doctor = new Doctor();
        doctor.setName(name);
        doctor.setCode(code);
        doctor.setSpecialization(specialization);
        doctor.setQualification(degree);
        doctor.setPhone(phone);
        doctor.setEmail(email);
        doctor.setExperience(experience + " years");
        doctor.setConsultationFee(consultationFee);
        doctor.setAvailable(available);
        doctor.setState(state);
        doctor.setCity(city);
        
        return doctor;
    }

    private String generateDoctorCode(String name) {
        // Generate code from name initials and random number
        String[] nameParts = name.toUpperCase().split(" ");
        String initials = "";
        for (String part : nameParts) {
            if (!part.isEmpty() && part.length() > 0) {
                initials += part.charAt(0);
            }
        }
        if (initials.length() > 3) {
            initials = initials.substring(0, 3);
        }
        return initials + random.nextInt(1000);
    }

    private String generatePhoneNumber() {
        // Generate random 10-digit phone number starting with 9, 8, 7, or 6
        String[] prefixes = {"9", "8", "7", "6"};
        String prefix = prefixes[random.nextInt(prefixes.length)];
        StringBuilder number = new StringBuilder(prefix);
        for (int i = 0; i < 9; i++) {
            number.append(random.nextInt(10));
        }
        return number.toString();
    }

    private String generateEmail(String name) {
        // Generate email from name with random domain
        String emailName = name.toLowerCase().replaceAll("[^a-zA-Z0-9]", "").replaceAll("\\s+", ".");
        if (emailName.isEmpty()) {
            emailName = "doctor" + random.nextInt(1000);
        }
        String[] domains = {"gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "rediffmail.com"};
        String domain = domains[random.nextInt(domains.length)];
        return emailName + "@" + domain;
    }

    private String generateConsultationFee(String specialization) {
        // Generate consultation fee based on specialization
        int baseFee = 200; // Base fee
        
        if (specialization.toUpperCase().contains("CARDIOLOGIST")) {
            baseFee = 800 + random.nextInt(700); // 800-1500
        } else if (specialization.toUpperCase().contains("NEUROLOGIST") || 
                   specialization.toUpperCase().contains("NEUROSURGEON")) {
            baseFee = 1000 + random.nextInt(1000); // 1000-2000
        } else if (specialization.toUpperCase().contains("ONCOLOGIST")) {
            baseFee = 1200 + random.nextInt(800); // 1200-2000
        } else if (specialization.toUpperCase().contains("ORTHOPAEDIC")) {
            baseFee = 600 + random.nextInt(400); // 600-1000
        } else if (specialization.toUpperCase().contains("GYNAECOLOGIST")) {
            baseFee = 400 + random.nextInt(300); // 400-700
        } else if (specialization.toUpperCase().contains("PAEDIATRICIAN")) {
            baseFee = 300 + random.nextInt(400); // 300-700
        } else if (specialization.toUpperCase().contains("DERMATOLOGIST")) {
            baseFee = 500 + random.nextInt(300); // 500-800
        } else if (specialization.toUpperCase().contains("PSYCHIATRIST")) {
            baseFee = 800 + random.nextInt(700); // 800-1500
        } else if (specialization.toUpperCase().contains("SURGEON")) {
            baseFee = 1000 + random.nextInt(1000); // 1000-2000
        } else if (specialization.toUpperCase().contains("RADIOLOGIST")) {
            baseFee = 500 + random.nextInt(500); // 500-1000
        } else if (specialization.toUpperCase().contains("PATHOLOGIST")) {
            baseFee = 400 + random.nextInt(400); // 400-800
        } else if (specialization.toUpperCase().contains("ANAESTHESIOLOGIST")) {
            baseFee = 800 + random.nextInt(700); // 800-1500
        } else if (specialization.toUpperCase().contains("DENTAL")) {
            baseFee = 300 + random.nextInt(400); // 300-700
        } else {
            baseFee = 200 + random.nextInt(300); // 200-500 for others
        }
        
        return String.valueOf(baseFee);
    }
}
