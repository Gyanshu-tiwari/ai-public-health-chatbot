package com.healthchat.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.healthchat.dto.ORSAppointmentRequest;
import com.healthchat.model.Department;
import com.healthchat.model.Doctor;
import com.healthchat.model.Hospital;
import com.healthchat.model.ORSAppointment;

@Service
public class ORSService {

    @Autowired
    private MongoTemplate mongoTemplate;

    private final Random random = new Random();

    // Phone number authentication
    public String generateOTP(String phoneNumber) {
        // In a real implementation, this would send SMS
        // For demo, generate a 6-digit OTP
        String otp = String.format("%06d", random.nextInt(1000000));
        
        // Store OTP in session/cache (simplified for demo)
        // In production, use Redis or database with expiry
        System.out.println("OTP for " + phoneNumber + ": " + otp);
        
        return otp;
    }

    public boolean verifyOTP(String phoneNumber, String otp) {
        // In production, verify against stored OTP
        // For demo, accept any 6-digit OTP
        return otp != null && otp.matches("\\d{6}");
    }

    // Hospital operations
    public List<Hospital> getAllHospitals() {
        Query query = new Query(Criteria.where("active").is(true));
        return mongoTemplate.find(query, Hospital.class);
    }

    public Hospital getHospitalById(String hospitalId) {
        return mongoTemplate.findById(hospitalId, Hospital.class);
    }

    public List<Department> getDepartmentsByHospital(String hospitalId) {
        Query query = new Query(Criteria.where("hospitalId").is(hospitalId).and("active").is(true));
        return mongoTemplate.find(query, Department.class);
    }

    public List<Doctor> getDoctorsByDepartment(String hospitalId, String departmentId) {
        Query query = new Query(Criteria.where("hospitalId").is(hospitalId)
                .and("departmentId").is(departmentId)
                .and("available").is(true));
        return mongoTemplate.find(query, Doctor.class);
    }

    // Appointment operations
    public ORSAppointment bookAppointment(ORSAppointmentRequest request) {
        // Validate hospital, department, and doctor exist
        Hospital hospital = getHospitalById(request.getHospitalId());
        if (hospital == null) {
            throw new RuntimeException("Hospital not found");
        }

        Department department = mongoTemplate.findById(request.getDepartmentId(), Department.class);
        if (department == null) {
            throw new RuntimeException("Department not found");
        }

        Doctor doctor = mongoTemplate.findById(request.getDoctorId(), Doctor.class);
        if (doctor == null) {
            throw new RuntimeException("Doctor not found");
        }

        // Create appointment
        ORSAppointment appointment = new ORSAppointment();
        appointment.setAppointmentId(generateAppointmentId());
        appointment.setHospitalId(request.getHospitalId());
        appointment.setHospitalName(hospital.getName());
        appointment.setDepartmentId(request.getDepartmentId());
        appointment.setDepartmentName(department.getName());
        appointment.setDoctorId(request.getDoctorId());
        appointment.setDoctorName(doctor.getName());
        appointment.setPatientName(request.getPatientName());
        appointment.setPhoneNumber(request.getPhoneNumber());
        appointment.setEmail(request.getEmail());
        appointment.setAge(request.getAge());
        appointment.setGender(request.getGender());
        appointment.setAppointmentDate(request.getAppointmentDate());
        appointment.setTimeSlot(request.getTimeSlot());
        appointment.setConsultationType(request.getConsultationType());
        appointment.setBookingReference(generateBookingReference());

        return mongoTemplate.save(appointment);
    }

    public List<ORSAppointment> getAppointmentsByPhone(String phoneNumber) {
        Query query = new Query(Criteria.where("phoneNumber").is(phoneNumber));
        return mongoTemplate.find(query, ORSAppointment.class);
    }

    public ORSAppointment getAppointmentById(String appointmentId) {
        return mongoTemplate.findById(appointmentId, ORSAppointment.class);
    }

    public ORSAppointment cancelAppointment(String appointmentId, String phoneNumber) {
        ORSAppointment appointment = getAppointmentById(appointmentId);
        if (appointment == null) {
            throw new RuntimeException("Appointment not found");
        }

        if (!appointment.getPhoneNumber().equals(phoneNumber)) {
            throw new RuntimeException("Unauthorized to cancel this appointment");
        }

        appointment.setStatus("CANCELLED");
        appointment.setUpdatedAt(LocalDateTime.now());
        return mongoTemplate.save(appointment);
    }

    // Available time slots (simplified - in production, this would check doctor availability)
    public List<String> getAvailableTimeSlots(String doctorId, LocalDateTime date) {
        return List.of(
            "09:00 AM - 09:30 AM",
            "09:30 AM - 10:00 AM",
            "10:00 AM - 10:30 AM",
            "10:30 AM - 11:00 AM",
            "11:00 AM - 11:30 AM",
            "11:30 AM - 12:00 PM",
            "02:00 PM - 02:30 PM",
            "02:30 PM - 03:00 PM",
            "03:00 PM - 03:30 PM",
            "03:30 PM - 04:00 PM",
            "04:00 PM - 04:30 PM",
            "04:30 PM - 05:00 PM"
        );
    }

    // Helper methods
    private String generateAppointmentId() {
        return "APT" + System.currentTimeMillis() + random.nextInt(1000);
    }

    private String generateBookingReference() {
        return "REF" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    // Initialize sample data
    public void initializeSampleData() {
        // Clear existing data
        mongoTemplate.dropCollection(Hospital.class);
        mongoTemplate.dropCollection(Department.class);
        mongoTemplate.dropCollection(Doctor.class);

        // Sample hospitals
        Hospital aiims = new Hospital("All India Institute of Medical Sciences", "AIIMS", 
            "Ansari Nagar, Aurobindo Marg", "New Delhi", "Delhi", "110029");
        aiims.setPhone("011-26588500");
        aiims.setEmail("director@aiims.edu");
        aiims.setDepartments(List.of("CARD", "NEURO", "ORTHO", "GEN", "PED"));
        mongoTemplate.save(aiims);

        Hospital safdarjung = new Hospital("Safdarjung Hospital", "SJH", 
            "Safdarjung Enclave", "New Delhi", "Delhi", "110029");
        safdarjung.setPhone("011-26702500");
        safdarjung.setEmail("med superintendent@safdarjunghospital.in");
        safdarjung.setDepartments(List.of("CARD", "NEURO", "ORTHO", "GEN", "PED"));
        mongoTemplate.save(safdarjung);

        // Sample departments for AIIMS
        Department cardiology = new Department("Cardiology", "CARD", aiims.getId(), 
            "Heart and cardiovascular diseases");
        mongoTemplate.save(cardiology);

        Department neurology = new Department("Neurology", "NEURO", aiims.getId(), 
            "Brain and nervous system disorders");
        mongoTemplate.save(neurology);

        Department orthopedics = new Department("Orthopedics", "ORTHO", aiims.getId(), 
            "Bone and joint disorders");
        mongoTemplate.save(orthopedics);

        Department general = new Department("General Medicine", "GEN", aiims.getId(), 
            "General health and primary care");
        mongoTemplate.save(general);

        Department pediatrics = new Department("Pediatrics", "PED", aiims.getId(), 
            "Child healthcare");
        mongoTemplate.save(pediatrics);

        // Sample doctors
        Doctor dr1 = new Doctor("Dr. Rajesh Kumar", "DR001", aiims.getId(), cardiology.getId(), 
            "MD, DM (Cardiology)", "Interventional Cardiology");
        dr1.setExperience("15 years");
        dr1.setConsultationFee("500");
        mongoTemplate.save(dr1);

        Doctor dr2 = new Doctor("Dr. Priya Sharma", "DR002", aiims.getId(), neurology.getId(), 
            "MD, DM (Neurology)", "Stroke and Neurocritical Care");
        dr2.setExperience("12 years");
        dr2.setConsultationFee("600");
        mongoTemplate.save(dr2);

        Doctor dr3 = new Doctor("Dr. Amit Patel", "DR003", aiims.getId(), orthopedics.getId(), 
            "MS, MCh (Orthopedics)", "Joint Replacement Surgery");
        dr3.setExperience("18 years");
        dr3.setConsultationFee("800");
        mongoTemplate.save(dr3);

        Doctor dr4 = new Doctor("Dr. Sunita Reddy", "DR004", aiims.getId(), general.getId(), 
            "MD, DNB (General Medicine)", "Internal Medicine");
        dr4.setExperience("10 years");
        dr4.setConsultationFee("300");
        mongoTemplate.save(dr4);

        Doctor dr5 = new Doctor("Dr. Rohan Gupta", "DR005", aiims.getId(), pediatrics.getId(), 
            "MD, DNB (Pediatrics)", "Pediatric Intensive Care");
        dr5.setExperience("8 years");
        dr5.setConsultationFee("400");
        mongoTemplate.save(dr5);
    }
}
