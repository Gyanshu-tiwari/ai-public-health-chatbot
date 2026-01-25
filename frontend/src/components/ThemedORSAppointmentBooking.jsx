import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, MapPin, CreditCard, Check, X, ChevronRight, History, Stethoscope, Building, UserCircle, AlertCircle } from 'lucide-react';
import AppointmentHistory from './AppointmentHistory';

const ORSAppointmentBooking = () => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [appointmentDetails, setAppointmentDetails] = useState({
    patientName: '',
    email: '',
    age: '',
    gender: '',
    consultationType: 'OFFLINE'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [bookedAppointment, setBookedAppointment] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const API_BASE = import.meta.env.VITE_SERVER_URL || '';

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    try {
      const initResponse = await fetch(`${API_BASE}/ors/initialize-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!initResponse.ok) {
        throw new Error(`Failed to initialize data: ${initResponse.status}`);
      }
      
      const initData = await initResponse.json();
      
      if (initData.success) {
        await fetchHospitals();
      } else {
        console.error('Failed to initialize sample data:', initData.message);
      }
    } catch (error) {
      console.error('Error initializing data:', error);
      // Try to fetch hospitals anyway
      fetchHospitals();
    }
  };

  const fetchHospitals = async () => {
    try {
      const response = await fetch(`${API_BASE}/ors/hospitals`);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch hospitals: ${response.status}, message: ${errorText}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setHospitals(data.hospitals);
      } else {
        setError('Failed to fetch hospitals: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error fetching hospitals:', error);
      setError('Failed to fetch hospitals: ' + error.message);
    }
  };

  const fetchDepartments = async (hospitalId) => {
    try {
      const response = await fetch(`${API_BASE}/ors/hospitals/${hospitalId}/departments`);
      const data = await response.json();
      if (data.success) {
        setDepartments(data.departments);
      }
    } catch (error) {
      setError('Failed to fetch departments');
      console.error('Error fetching departments:', error);
    }
  };

  const fetchDoctors = async (hospitalId, departmentId) => {
    try {
      const response = await fetch(`${API_BASE}/ors/hospitals/${hospitalId}/departments/${departmentId}/doctors`);
      const data = await response.json();
      if (data.success) {
        setDoctors(data.doctors);
      }
    } catch (error) {
      setError('Failed to fetch doctors');
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchTimeSlots = async (doctorId, date) => {
    try {
      const response = await fetch(`${API_BASE}/ors/doctors/${doctorId}/time-slots?date=${date}`);
      const data = await response.json();
      if (data.success) {
        setTimeSlots(data.timeSlots);
      }
    } catch (error) {
      setError('Failed to fetch time slots');
      console.error('Error fetching time slots:', error);
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (step === 1) {
      if (!phoneNumber || phoneNumber.length !== 10) {
        errors.phoneNumber = 'Please enter a valid 10-digit phone number';
      }
    }
    
    if (step === 2) {
      if (!otp || otp.length !== 6) {
        errors.otp = 'Please enter a valid 6-digit OTP';
      }
    }
    
    if (step === 3) {
      if (!selectedHospital) {
        errors.hospital = 'Please select a hospital';
      }
    }
    
    if (step === 4) {
      if (!selectedDepartment) {
        errors.department = 'Please select a department';
      }
    }
    
    if (step === 5) {
      if (!selectedDoctor) {
        errors.doctor = 'Please select a doctor';
      }
    }
    
    if (step === 6) {
      if (!selectedDate) {
        errors.date = 'Please select a date';
      }
      if (!selectedTimeSlot) {
        errors.timeSlot = 'Please select a time slot';
      }
      if (!appointmentDetails.patientName.trim()) {
        errors.patientName = 'Patient name is required';
      }
      if (!appointmentDetails.age || appointmentDetails.age < 1 || appointmentDetails.age > 120) {
        errors.age = 'Please enter a valid age (1-120)';
      }
      if (!appointmentDetails.gender) {
        errors.gender = 'Please select gender';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const sendOTP = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await fetch(`${API_BASE}/ors/send-otp?phoneNumber=${phoneNumber}`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setGeneratedOtp(data.otp);
        setSuccess('OTP sent successfully! For demo, OTP is: ' + data.otp);
        setStep(2);
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError(`Failed to send OTP: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await fetch(`${API_BASE}/ors/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, otp }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setIsAuthenticated(true);
        setSuccess('OTP verified successfully!');
        setStep(3);
      } else {
        setError(data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError(`Failed to verify OTP: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const bookAppointment = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE}/ors/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hospitalId: selectedHospital.id,
          departmentId: selectedDepartment.id,
          doctorId: selectedDoctor.id,
          patientName: appointmentDetails.patientName,
          phoneNumber: phoneNumber,
          email: appointmentDetails.email,
          age: appointmentDetails.age,
          gender: appointmentDetails.gender,
          appointmentDate: selectedDate,
          timeSlot: selectedTimeSlot,
          consultationType: appointmentDetails.consultationType,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setBookedAppointment(data.appointment);
        setSuccess('Appointment booked successfully!');
        setStep(7);
      } else {
        setError(data.message || 'Failed to book appointment');
      }
    } catch (error) {
      setError('Failed to book appointment');
      console.error('Error booking appointment:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetBooking = () => {
    setStep(1);
    setPhoneNumber('');
    setOtp('');
    setSelectedHospital(null);
    setSelectedDepartment(null);
    setSelectedDoctor(null);
    setSelectedDate('');
    setSelectedTimeSlot('');
    setAppointmentDetails({
      patientName: '',
      email: '',
      age: '',
      gender: '',
      consultationType: 'OFFLINE'
    });
    setBookedAppointment(null);
    setError('');
    setSuccess('');
    setFormErrors({});
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-500/20 rounded-full mb-4">
                <Phone className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Enter Phone Number</h3>
              <p className="text-gray-400">We'll send you a verification code</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="Enter 10-digit phone number"
                  className={`w-full px-4 py-3 bg-gray-800/50 border ${formErrors.phoneNumber ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                  maxLength={10}
                />
                {formErrors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {formErrors.phoneNumber}
                  </p>
                )}
              </div>
              
              <button
                onClick={sendOTP}
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  'Send OTP'
                )}
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-500/20 rounded-full mb-4">
                <Mail className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Enter OTP</h3>
              <p className="text-gray-400">We've sent a 6-digit code to {phoneNumber}</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Verification Code <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit OTP"
                  className={`w-full px-4 py-3 bg-gray-800/50 border ${formErrors.otp ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-center text-2xl tracking-widest`}
                  maxLength={6}
                />
                {formErrors.otp && (
                  <p className="mt-1 text-sm text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {formErrors.otp}
                  </p>
                )}
              </div>
              
              <button
                onClick={verifyOTP}
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  'Verify OTP'
                )}
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-500/20 rounded-full mb-4">
                <Building className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Select Hospital</h3>
              <p className="text-gray-400">Choose your preferred hospital</p>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {hospitals.map((hospital) => (
                <div
                  key={hospital.id}
                  onClick={() => setSelectedHospital(hospital)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedHospital?.id === hospital.id
                      ? 'border-indigo-500 bg-indigo-500/10'
                      : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Building className="w-5 h-5 text-indigo-400" />
                        <h4 className="font-semibold text-white text-lg">{hospital.name}</h4>
                        {selectedHospital?.id === hospital.id && (
                          <Check className="w-5 h-5 text-green-400" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <MapPin className="w-4 h-4 text-indigo-400" />
                          <span>{hospital.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <span className="text-indigo-400">•</span>
                          <span>{hospital.city}, {hospital.state} - {hospital.pincode}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <span className="text-indigo-400">•</span>
                          <span>Code: {hospital.code}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {formErrors.hospital && (
              <p className="text-sm text-red-400 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formErrors.hospital}
              </p>
            )}
            
            <button
              onClick={() => {
                if (validateForm()) {
                  fetchDepartments(selectedHospital.id);
                  setStep(4);
                }
              }}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center"
            >
              Continue <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-500/20 rounded-full mb-4">
                <Stethoscope className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Select Department</h3>
              <p className="text-gray-400">Choose the medical department</p>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {departments.map((department) => (
                <div
                  key={department.id}
                  onClick={() => setSelectedDepartment(department)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedDepartment?.id === department.id
                      ? 'border-indigo-500 bg-indigo-500/10'
                      : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Stethoscope className="w-5 h-5 text-indigo-400" />
                        <h4 className="font-semibold text-white text-lg">{department.name}</h4>
                        {selectedDepartment?.id === department.id && (
                          <Check className="w-5 h-5 text-green-400" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <span className="text-indigo-400">•</span>
                          <span>{department.description}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <span className="text-indigo-400">•</span>
                          <span>Department Code: {department.code}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <span className="text-indigo-400">•</span>
                          <span>Floor: {department.floor || 'Ground Floor'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {formErrors.department && (
              <p className="text-sm text-red-400 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formErrors.department}
              </p>
            )}
            
            <button
              onClick={() => {
                if (validateForm()) {
                  fetchDoctors(selectedHospital.id, selectedDepartment.id);
                  setStep(5);
                }
              }}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center"
            >
              Continue <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-500/20 rounded-full mb-4">
                <UserCircle className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Select Doctor</h3>
              <p className="text-gray-400">Choose your preferred doctor</p>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  onClick={() => setSelectedDoctor(doctor)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedDoctor?.id === doctor.id
                      ? 'border-indigo-500 bg-indigo-500/10'
                      : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <UserCircle className="w-5 h-5 text-indigo-400" />
                        <h4 className="font-semibold text-white text-lg">Dr. {doctor.name}</h4>
                        {selectedDoctor?.id === doctor.id && (
                          <Check className="w-5 h-5 text-green-400" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <span className="text-indigo-400">•</span>
                          <span>{doctor.qualification}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <span className="text-indigo-400">•</span>
                          <span>Experience: {doctor.experience} years</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <span className="text-indigo-400">•</span>
                          <span>Specialization: {doctor.specialization || 'General Practice'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-indigo-400 font-medium">
                          <CreditCard className="w-4 h-4" />
                          <span>Consultation Fee: ₹{doctor.consultationFee}</span>
                        </div>
                        {doctor.phone && (
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <Phone className="w-4 h-4 text-green-400" />
                            <span>{doctor.phone}</span>
                          </div>
                        )}
                        {doctor.email && (
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <Mail className="w-4 h-4 text-blue-400" />
                            <span className="text-xs">{doctor.email}</span>
                          </div>
                        )}
                        {doctor.state && doctor.city && (
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <MapPin className="w-4 h-4 text-yellow-400" />
                            <span>{doctor.city}, {doctor.state}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <span className="text-indigo-400">•</span>
                          <span>Available: {doctor.available ? 'Yes' : 'No'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {formErrors.doctor && (
              <p className="text-sm text-red-400 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formErrors.doctor}
              </p>
            )}
            
            <button
              onClick={() => {
                if (validateForm()) {
                  setStep(6);
                }
              }}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center"
            >
              Continue <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-500/20 rounded-full mb-4">
                <Calendar className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Appointment Details</h3>
              <p className="text-gray-400">Fill in your appointment details</p>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Appointment Date <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      if (e.target.value && selectedDoctor) {
                        fetchTimeSlots(selectedDoctor.id, e.target.value);
                      }
                    }}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-3 bg-gray-800/50 border ${formErrors.date ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                  />
                  {formErrors.date && (
                    <p className="mt-1 text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {formErrors.date}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Time Slot <span className="text-red-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.length > 0 ? (
                      timeSlots.map((slot, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`p-3 border rounded-lg text-sm transition-all ${
                            selectedTimeSlot === slot
                              ? 'border-indigo-500 bg-indigo-500/10 text-white'
                              : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-indigo-400" />
                            <span>{slot}</span>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="col-span-2 text-center py-4 text-gray-400">
                        <Clock className="w-8 h-8 mx-auto mb-2 text-gray-500" />
                        <p>Select a date first to see available time slots</p>
                      </div>
                    )}
                  </div>
                  {formErrors.timeSlot && (
                    <p className="mt-1 text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {formErrors.timeSlot}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Patient Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={appointmentDetails.patientName}
                    onChange={(e) => setAppointmentDetails({...appointmentDetails, patientName: e.target.value})}
                    placeholder="Enter patient name"
                    className={`w-full px-4 py-3 bg-gray-800/50 border ${formErrors.patientName ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                  />
                  {formErrors.patientName && (
                    <p className="mt-1 text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {formErrors.patientName}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Age <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    value={appointmentDetails.age}
                    onChange={(e) => setAppointmentDetails({...appointmentDetails, age: e.target.value})}
                    placeholder="Enter age"
                    min="1"
                    max="120"
                    className={`w-full px-4 py-3 bg-gray-800/50 border ${formErrors.age ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                  />
                  {formErrors.age && (
                    <p className="mt-1 text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {formErrors.age}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={appointmentDetails.email}
                    onChange={(e) => setAppointmentDetails({...appointmentDetails, email: e.target.value})}
                    placeholder="Enter email (optional)"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Gender <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={appointmentDetails.gender}
                    onChange={(e) => setAppointmentDetails({...appointmentDetails, gender: e.target.value})}
                    className={`w-full px-4 py-3 bg-gray-800/50 border ${formErrors.gender ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {formErrors.gender && (
                    <p className="mt-1 text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {formErrors.gender}
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Consultation Type
                </label>
                <select
                  value={appointmentDetails.consultationType}
                  onChange={(e) => setAppointmentDetails({...appointmentDetails, consultationType: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="OFFLINE">Offline (Hospital Visit)</option>
                  <option value="ONLINE">Online (Video Consultation)</option>
                </select>
              </div>
            </div>
            
            {/* Appointment Summary */}
            {(selectedHospital || selectedDepartment || selectedDoctor || selectedDate || selectedTimeSlot) && (
              <div className="bg-gray-800/30 border border-gray-600 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-400" />
                  Appointment Summary
                </h4>
                <div className="space-y-2 text-sm">
                  {selectedHospital && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Hospital:</span>
                      <span className="text-white font-medium">{selectedHospital.name}</span>
                    </div>
                  )}
                  {selectedDepartment && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Department:</span>
                      <span className="text-white font-medium">{selectedDepartment.name}</span>
                    </div>
                  )}
                  {selectedDoctor && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Doctor:</span>
                      <span className="text-white font-medium">Dr. {selectedDoctor.name}</span>
                    </div>
                  )}
                  {selectedDate && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Date:</span>
                      <span className="text-white font-medium">{new Date(selectedDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  {selectedTimeSlot && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Time:</span>
                      <span className="text-white font-medium">{selectedTimeSlot}</span>
                    </div>
                  )}
                  {appointmentDetails.patientName && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Patient:</span>
                      <span className="text-white font-medium">{appointmentDetails.patientName}</span>
                    </div>
                  )}
                  {selectedDoctor && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Consultation Fee:</span>
                      <span className="text-indigo-400 font-medium">₹{selectedDoctor.consultationFee}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <button
              onClick={bookAppointment}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Book Appointment'
              )}
            </button>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
                <Check className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Appointment Booked!</h3>
              <p className="text-gray-400">Your appointment has been confirmed</p>
            </div>
            
            {bookedAppointment && (
              <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Appointment ID:</span>
                  <span className="text-white font-medium">{bookedAppointment.appointmentId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Hospital:</span>
                  <span className="text-white font-medium">{bookedAppointment.hospitalName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Department:</span>
                  <span className="text-white font-medium">{bookedAppointment.departmentName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Doctor:</span>
                  <span className="text-white font-medium">Dr. {bookedAppointment.doctorName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Date:</span>
                  <span className="text-white font-medium">{new Date(bookedAppointment.appointmentDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Time:</span>
                  <span className="text-white font-medium">{bookedAppointment.timeSlot}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Patient:</span>
                  <span className="text-white font-medium">{bookedAppointment.patientName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Phone:</span>
                  <span className="text-white font-medium">{bookedAppointment.phoneNumber}</span>
                </div>
              </div>
            )}
            
            <button
              onClick={resetBooking}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Book Another Appointment
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] text-slate-200 selection:bg-indigo-500/30 font-sans overflow-x-hidden">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] bg-emerald-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
            {/* Progress Steps */}
            <div className="bg-gray-800/50 px-6 py-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                {[
                  { number: 1, label: "Phone", icon: Phone },
                  { number: 2, label: "OTP", icon: Mail },
                  { number: 3, label: "Hospital", icon: Building },
                  { number: 4, label: "Department", icon: Stethoscope },
                  { number: 5, label: "Doctor", icon: UserCircle },
                  { number: 6, label: "Details", icon: Calendar }
                ].map((stepInfo, index) => (
                  <div key={stepInfo.number} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mb-1 transition-all ${
                        step >= stepInfo.number ? 'bg-indigo-500 text-white' : 'bg-gray-600 text-gray-400'
                      }`}>
                        {step >= stepInfo.number ? (
                          <stepInfo.icon size={18} />
                        ) : (
                          stepInfo.number
                        )}
                      </div>
                      <div className={`text-xs font-medium text-center ${
                        step >= stepInfo.number ? 'text-indigo-400' : 'text-gray-500'
                      }`}>
                        {stepInfo.label}
                      </div>
                    </div>
                    {index < 5 && (
                      <div className={`flex-1 h-0.5 mx-2 ${
                        step > stepInfo.number ? 'bg-indigo-500' : 'bg-gray-600'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center">
                  <X className="text-red-400 mr-2" size={20} />
                  <span className="text-red-400">{error}</span>
                </div>
              )}
              
              {success && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center">
                  <Check className="text-green-400 mr-2" size={20} />
                  <span className="text-green-400">{success}</span>
                </div>
              )}

              {renderStep()}
            </div>
          </div>

          {/* Appointment History Section */}
          {isAuthenticated && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Appointment History</h3>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  <History size={18} />
                  {showHistory ? 'Hide' : 'Show'} History
                </button>
              </div>
              
              {showHistory && (
                <AppointmentHistory phoneNumber={phoneNumber} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ORSAppointmentBooking;
