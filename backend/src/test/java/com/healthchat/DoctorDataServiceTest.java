package com.healthchat;

import com.healthchat.service.DoctorDataService;
import com.healthchat.model.Doctor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class DoctorDataServiceTest {

    @Autowired
    private DoctorDataService doctorDataService;

    @Test
    public void testParseDoctorsFromCSV() {
        List<Doctor> doctors = doctorDataService.parseDoctorsFromCSV();
        System.out.println("Loaded " + doctors.size() + " doctors from CSV");
        
        if (!doctors.isEmpty()) {
            Doctor firstDoctor = doctors.get(0);
            System.out.println("First doctor: " + firstDoctor.getName());
            System.out.println("Phone: " + firstDoctor.getPhone());
            System.out.println("Email: " + firstDoctor.getEmail());
            System.out.println("State: " + firstDoctor.getState());
            System.out.println("City: " + firstDoctor.getCity());
        }
    }
}
