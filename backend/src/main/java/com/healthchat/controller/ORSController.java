package com.healthchat.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.healthchat.dto.ORSAppointmentRequest;
import com.healthchat.dto.ORSLoginRequest;
import com.healthchat.model.Department;
import com.healthchat.model.Doctor;
import com.healthchat.model.Hospital;
import com.healthchat.model.ORSAppointment;
import com.healthchat.service.ORSService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/ors")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ORSController {

    @Autowired
    private ORSService orsService;

    // Authentication endpoints
    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOTP(@RequestParam String phoneNumber) {
        try {
            String otp = orsService.generateOTP(phoneNumber);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "OTP sent successfully");
            response.put("otp", otp); // Only for demo - remove in production
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOTP(@Valid @RequestBody ORSLoginRequest loginRequest) {
        try {
            boolean isValid = orsService.verifyOTP(loginRequest.getPhoneNumber(), loginRequest.getOtp());
            Map<String, Object> response = new HashMap<>();
            
            if (isValid) {
                response.put("success", true);
                response.put("message", "OTP verified successfully");
                response.put("phoneNumber", loginRequest.getPhoneNumber());
                response.put("token", "dummy-jwt-token-" + loginRequest.getPhoneNumber()); // Simplified token
            } else {
                response.put("success", false);
                response.put("message", "Invalid OTP");
            }
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    // Hospital endpoints
    @GetMapping("/hospitals")
    public ResponseEntity<?> getAllHospitals() {
        try {
            List<Hospital> hospitals = orsService.getAllHospitals();
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("hospitals", hospitals);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping("/hospitals/{hospitalId}")
    public ResponseEntity<?> getHospitalById(@PathVariable String hospitalId) {
        try {
            Hospital hospital = orsService.getHospitalById(hospitalId);
            if (hospital == null) {
                Map<String, Object> error = new HashMap<>();
                error.put("success", false);
                error.put("message", "Hospital not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("hospital", hospital);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    // Department endpoints
    @GetMapping("/hospitals/{hospitalId}/departments")
    public ResponseEntity<?> getDepartmentsByHospital(@PathVariable String hospitalId) {
        try {
            List<Department> departments = orsService.getDepartmentsByHospital(hospitalId);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("departments", departments);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    // Doctor endpoints
    @GetMapping("/hospitals/{hospitalId}/departments/{departmentId}/doctors")
    public ResponseEntity<?> getDoctorsByDepartment(@PathVariable String hospitalId, 
                                                   @PathVariable String departmentId) {
        try {
            List<Doctor> doctors = orsService.getDoctorsByDepartment(hospitalId, departmentId);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("doctors", doctors);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    // Time slot endpoints
    @GetMapping("/doctors/{doctorId}/time-slots")
    public ResponseEntity<?> getAvailableTimeSlots(@PathVariable String doctorId,
                                                  @RequestParam String date) {
        try {
            // Parse date string to LocalDateTime (simplified)
            LocalDateTime appointmentDate = LocalDateTime.parse(date + "T00:00:00");
            List<String> timeSlots = orsService.getAvailableTimeSlots(doctorId, appointmentDate);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("timeSlots", timeSlots);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    // Appointment endpoints
    @PostMapping("/appointments")
    public ResponseEntity<?> bookAppointment(@Valid @RequestBody ORSAppointmentRequest request) {
        try {
            ORSAppointment appointment = orsService.bookAppointment(request);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Appointment booked successfully");
            response.put("appointment", appointment);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    @GetMapping("/appointments/phone/{phoneNumber}")
    public ResponseEntity<?> getAppointmentsByPhone(@PathVariable String phoneNumber) {
        try {
            List<ORSAppointment> appointments = orsService.getAppointmentsByPhone(phoneNumber);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("appointments", appointments);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping("/appointments/{appointmentId}")
    public ResponseEntity<?> getAppointmentById(@PathVariable String appointmentId) {
        try {
            ORSAppointment appointment = orsService.getAppointmentById(appointmentId);
            if (appointment == null) {
                Map<String, Object> error = new HashMap<>();
                error.put("success", false);
                error.put("message", "Appointment not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("appointment", appointment);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PutMapping("/appointments/{appointmentId}/cancel")
    public ResponseEntity<?> cancelAppointment(@PathVariable String appointmentId,
                                              @RequestParam String phoneNumber) {
        try {
            ORSAppointment appointment = orsService.cancelAppointment(appointmentId, phoneNumber);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Appointment cancelled successfully");
            response.put("appointment", appointment);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    // Initialize sample data
    @PostMapping("/initialize-data")
    public ResponseEntity<?> initializeSampleData() {
        try {
            orsService.initializeSampleData();
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Sample data initialized successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
}
