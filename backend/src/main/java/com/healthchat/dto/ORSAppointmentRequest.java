package com.healthchat.dto;

import jakarta.validation.constraints.NotBlank;

public class ORSAppointmentRequest {
    
    @NotBlank(message = "Hospital ID is required")
    private String hospitalId;
    
    @NotBlank(message = "Department ID is required")
    private String departmentId;
    
    @NotBlank(message = "Doctor ID is required")
    private String doctorId;
    
    @NotBlank(message = "Patient name is required")
    private String patientName;
    
    @NotBlank(message = "Phone number is required")
    private String phoneNumber;
    
    private String email;
    
    @NotBlank(message = "Age is required")
    private String age;
    
    @NotBlank(message = "Gender is required")
    private String gender;
    
    @NotBlank(message = "Appointment date is required")
    private String appointmentDate;
    
    @NotBlank(message = "Time slot is required")
    private String timeSlot;
    
    private String consultationType = "OFFLINE"; // ONLINE or OFFLINE

    // Constructors
    public ORSAppointmentRequest() {}

    public ORSAppointmentRequest(String hospitalId, String departmentId, String doctorId, 
                                String patientName, String phoneNumber, String age, String gender, 
                                String appointmentDate, String timeSlot) {
        this.hospitalId = hospitalId;
        this.departmentId = departmentId;
        this.doctorId = doctorId;
        this.patientName = patientName;
        this.phoneNumber = phoneNumber;
        this.age = age;
        this.gender = gender;
        this.appointmentDate = appointmentDate;
        this.timeSlot = timeSlot;
    }

    // Getters and Setters
    public String getHospitalId() { return hospitalId; }
    public void setHospitalId(String hospitalId) { this.hospitalId = hospitalId; }

    public String getDepartmentId() { return departmentId; }
    public void setDepartmentId(String departmentId) { this.departmentId = departmentId; }

    public String getDoctorId() { return doctorId; }
    public void setDoctorId(String doctorId) { this.doctorId = doctorId; }

    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getAge() { return age; }
    public void setAge(String age) { this.age = age; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getAppointmentDate() { return appointmentDate; }
    public void setAppointmentDate(String appointmentDate) { this.appointmentDate = appointmentDate; }

    public String getTimeSlot() { return timeSlot; }
    public void setTimeSlot(String timeSlot) { this.timeSlot = timeSlot; }

    public String getConsultationType() { return consultationType; }
    public void setConsultationType(String consultationType) { this.consultationType = consultationType; }
}
