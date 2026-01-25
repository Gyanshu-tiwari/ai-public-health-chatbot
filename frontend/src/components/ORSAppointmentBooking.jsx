import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, MapPin, CreditCard, Check, X, ChevronRight, History } from 'lucide-react';
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

  const API_BASE = import.meta.env.VITE_SERVER_URL || 'http://localhost:8080';

  useEffect(() => {
    // Initialize sample data
    initializeData();
  }, []);

  const initializeData = async () => {
    try {
      await fetch(`${API_BASE}/api/ors/initialize-data`, {
        method: 'POST'
      });
      fetchHospitals();
    } catch (error) {
      console.error('Error initializing data:', error);
    }
  };

  const fetchHospitals = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/ors/hospitals`);
      const data = await response.json();
      if (data.success) {
        setHospitals(data.hospitals);
      }
    } catch (error) {
      setError('Failed to fetch hospitals');
      console.error('Error fetching hospitals:', error);
    }
  };

  const fetchDepartments = async (hospitalId) => {
    try {
      const response = await fetch(`${API_BASE}/api/ors/hospitals/${hospitalId}/departments`);
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
      const response = await fetch(`${API_BASE}/api/ors/hospitals/${hospitalId}/departments/${departmentId}/doctors`);
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
      const response = await fetch(`${API_BASE}/api/ors/doctors/${doctorId}/time-slots?date=${date}`);
      const data = await response.json();
      if (data.success) {
        setTimeSlots(data.timeSlots);
      }
    } catch (error) {
      setError('Failed to fetch time slots');
      console.error('Error fetching time slots:', error);
    }
  };

  const sendOTP = async () => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE}/api/ors/send-otp?phoneNumber=${phoneNumber}`, {
        method: 'POST'
      });
      const data = await response.json();
      if (data.success) {
        setGeneratedOtp(data.otp); // Only for demo - remove in production
        setSuccess('OTP sent successfully! (Demo: ' + data.otp + ')');
        setStep(2);
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      setError('Failed to send OTP');
      console.error('Error sending OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE}/api/ors/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          otp: otp
        })
      });
      const data = await response.json();
      if (data.success) {
        setIsAuthenticated(true);
        setSuccess('Login successful!');
        setStep(3);
      } else {
        setError(data.message || 'Invalid OTP');
      }
    } catch (error) {
      setError('Failed to verify OTP');
      console.error('Error verifying OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleHospitalSelect = (hospital) => {
    setSelectedHospital(hospital);
    setSelectedDepartment(null);
    setSelectedDoctor(null);
    setDepartments([]);
    setDoctors([]);
    fetchDepartments(hospital.id);
  };

  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
    setSelectedDoctor(null);
    setDoctors([]);
    fetchDoctors(selectedHospital.id, department.id);
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedTimeSlot('');
    setTimeSlots([]);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTimeSlot('');
    if (selectedDoctor) {
      fetchTimeSlots(selectedDoctor.id, date);
    }
  };

  const bookAppointment = async () => {
    if (!selectedHospital || !selectedDepartment || !selectedDoctor || !selectedDate || !selectedTimeSlot) {
      setError('Please fill all required fields');
      return;
    }

    if (!appointmentDetails.patientName || !appointmentDetails.age || !appointmentDetails.gender) {
      setError('Please fill all patient details');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const appointmentData = {
        hospitalId: selectedHospital.id,
        departmentId: selectedDepartment.id,
        doctorId: selectedDoctor.id,
        patientName: appointmentDetails.patientName,
        phoneNumber: phoneNumber,
        email: appointmentDetails.email,
        age: appointmentDetails.age,
        gender: appointmentDetails.gender,
        appointmentDate: new Date(selectedDate + 'T00:00:00').toISOString(),
        timeSlot: selectedTimeSlot,
        consultationType: appointmentDetails.consultationType
      };

      const response = await fetch(`${API_BASE}/api/ors/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointmentData)
      });

      const data = await response.json();
      if (data.success) {
        setBookedAppointment(data.appointment);
        setSuccess('Appointment booked successfully!');
        setStep(6);
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
    setIsAuthenticated(false);
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
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">ORS Appointment Booking</h1>
        <p className="text-gray-600">Book your appointment at government hospitals</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {['Phone Login', 'Select Hospital', 'Choose Department', 'Select Doctor', 'Book Slot', 'Confirmation'].map((stepName, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step > index + 1 ? 'bg-green-500 text-white' :
              step === index + 1 ? 'bg-blue-500 text-white' :
              'bg-gray-200 text-gray-600'
            }`}>
              {step > index + 1 ? <Check size={16} /> : index + 1}
            </div>
            <span className={`ml-2 text-sm ${
              step > index + 1 ? 'text-green-600' :
              step === index + 1 ? 'text-blue-600 font-medium' :
              'text-gray-500'
            }`}>
              {stepName}
            </span>
            {index < 5 && <ChevronRight className="mx-4 text-gray-400" size={20} />}
          </div>
        ))}
      </div>

      {/* Error and Success Messages */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
          <X className="text-red-500 mr-2" size={20} />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
          <Check className="text-green-500 mr-2" size={20} />
          <span className="text-green-700">{success}</span>
        </div>
      )}

      {/* Step 1: Phone Number Login */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="inline mr-2" size={18} />
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter 10-digit phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              maxLength={10}
            />
          </div>
          <button
            onClick={sendOTP}
            disabled={loading}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </div>
      )}

      {/* Step 2: OTP Verification */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter OTP sent to {phoneNumber}
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter 6-digit OTP"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              maxLength={6}
            />
          </div>
          <button
            onClick={verifyOTP}
            disabled={loading}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
          <button
            onClick={() => setStep(1)}
            className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Back
          </button>
        </div>
      )}

      {/* Step 3: Select Hospital */}
      {step === 3 && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-800">Select Hospital</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hospitals.map((hospital) => (
              <div
                key={hospital.id}
                onClick={() => handleHospitalSelect(hospital)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedHospital?.id === hospital.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h4 className="font-medium text-gray-800">{hospital.name}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  <MapPin className="inline mr-1" size={14} />
                  {hospital.address}, {hospital.city}
                </p>
                <p className="text-sm text-gray-600">
                  <Phone className="inline mr-1" size={14} />
                  {hospital.phone}
                </p>
              </div>
            ))}
          </div>
          {selectedHospital && (
            <button
              onClick={() => setStep(4)}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Continue
            </button>
          )}
        </div>
      )}

      {/* Step 4: Select Department */}
      {step === 4 && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-800">Select Department</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {departments.map((department) => (
              <div
                key={department.id}
                onClick={() => handleDepartmentSelect(department)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedDepartment?.id === department.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h4 className="font-medium text-gray-800">{department.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{department.description}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setStep(3)}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Back
            </button>
            {selectedDepartment && (
              <button
                onClick={() => setStep(5)}
                className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                Continue
              </button>
            )}
          </div>
        </div>
      )}

      {/* Step 5: Book Appointment */}
      {step === 5 && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-800">Complete Your Booking</h3>
          
          {/* Selected Doctor */}
          {selectedDoctor && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-gray-800">Selected Doctor</h4>
              <p className="text-gray-700">{selectedDoctor.name}</p>
              <p className="text-sm text-gray-600">{selectedDoctor.qualification}</p>
              <p className="text-sm text-gray-600">{selectedDoctor.specialization}</p>
              <p className="text-sm text-gray-600">Experience: {selectedDoctor.experience}</p>
              <p className="text-sm text-gray-600">Consultation Fee: ₹{selectedDoctor.consultationFee}</p>
            </div>
          )}

          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline mr-2" size={18} />
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Time Slots */}
          {timeSlots.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="inline mr-2" size={18} />
                Available Time Slots
              </label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`p-2 text-sm border rounded-lg transition-all ${
                      selectedTimeSlot === slot
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Patient Details */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-800">Patient Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <User className="inline mr-1" size={16} />
                  Patient Name
                </label>
                <input
                  type="text"
                  value={appointmentDetails.patientName}
                  onChange={(e) => setAppointmentDetails({...appointmentDetails, patientName: e.target.value})}
                  placeholder="Enter patient name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Mail className="inline mr-1" size={16} />
                  Email (Optional)
                </label>
                <input
                  type="email"
                  value={appointmentDetails.email}
                  onChange={(e) => setAppointmentDetails({...appointmentDetails, email: e.target.value})}
                  placeholder="Enter email address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="text"
                  value={appointmentDetails.age}
                  onChange={(e) => setAppointmentDetails({...appointmentDetails, age: e.target.value})}
                  placeholder="Enter age"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  value={appointmentDetails.gender}
                  onChange={(e) => setAppointmentDetails({...appointmentDetails, gender: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Consultation Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Type</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="OFFLINE"
                  checked={appointmentDetails.consultationType === 'OFFLINE'}
                  onChange={(e) => setAppointmentDetails({...appointmentDetails, consultationType: e.target.value})}
                  className="mr-2"
                />
                Offline (Hospital Visit)
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="ONLINE"
                  checked={appointmentDetails.consultationType === 'ONLINE'}
                  onChange={(e) => setAppointmentDetails({...appointmentDetails, consultationType: e.target.value})}
                  className="mr-2"
                />
                Online (Video Consultation)
              </label>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setStep(4)}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Back
            </button>
            <button
              onClick={bookAppointment}
              disabled={loading}
              className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
            >
              {loading ? 'Booking...' : 'Book Appointment'}
            </button>
          </div>
        </div>
      )}

      {/* Step 6: Confirmation */}
      {step === 6 && bookedAppointment && (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-green-500" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Appointment Booked Successfully!</h3>
            <p className="text-gray-600">Your appointment has been confirmed</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-4">Appointment Details</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Appointment ID:</span>
                <span className="font-medium">{bookedAppointment.appointmentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Booking Reference:</span>
                <span className="font-medium">{bookedAppointment.bookingReference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hospital:</span>
                <span className="font-medium">{bookedAppointment.hospitalName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Department:</span>
                <span className="font-medium">{bookedAppointment.departmentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Doctor:</span>
                <span className="font-medium">{bookedAppointment.doctorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{new Date(bookedAppointment.appointmentDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">{bookedAppointment.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Patient:</span>
                <span className="font-medium">{bookedAppointment.patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span className="font-medium">{bookedAppointment.phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Consultation Type:</span>
                <span className="font-medium">{bookedAppointment.consultationType}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Important Instructions</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Please arrive 15 minutes before your appointment time</li>
              <li>• Bring a valid ID proof and any previous medical records</li>
              <li>• For online consultation, ensure stable internet connection</li>
              <li>• You can cancel or reschedule up to 24 hours before the appointment</li>
            </ul>
          </div>

          <button
            onClick={resetBooking}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Book Another Appointment
          </button>
        </div>
      )}

      {/* Appointment History Section */}
      {isAuthenticated && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Appointment History</h3>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium"
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
  );
};

export default ORSAppointmentBooking;
