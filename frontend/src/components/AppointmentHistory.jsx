import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, MapPin, X, CheckCircle, XCircle } from 'lucide-react';

const AppointmentHistory = ({ phoneNumber }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDetails, setShowDetails] = useState(null);

  const API_BASE = import.meta.env.VITE_SERVER_URL || 'http://localhost:8080';

  useEffect(() => {
    if (phoneNumber) {
      fetchAppointments();
    }
  }, [phoneNumber]);

  const fetchAppointments = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE}/api/ors/appointments/phone/${phoneNumber}`);
      const data = await response.json();
      if (data.success) {
        setAppointments(data.appointments);
      } else {
        setError(data.message || 'Failed to fetch appointments');
      }
    } catch (error) {
      setError('Failed to fetch appointments');
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/ors/appointments/${appointmentId}/cancel?phoneNumber=${phoneNumber}`, {
        method: 'PUT'
      });
      const data = await response.json();
      if (data.success) {
        // Update the appointment in the list
        setAppointments(appointments.map(apt => 
          apt.id === appointmentId ? data.appointment : apt
        ));
        alert('Appointment cancelled successfully');
      } else {
        setError(data.message || 'Failed to cancel appointment');
      }
    } catch (error) {
      setError('Failed to cancel appointment');
      console.error('Error cancelling appointment:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'BOOKED':
        return 'bg-blue-100 text-blue-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'BOOKED':
        return <Clock size={16} />;
      case 'COMPLETED':
        return <CheckCircle size={16} />;
      case 'CANCELLED':
        return <XCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Your Appointments</h3>
        <button
          onClick={fetchAppointments}
          className="text-blue-500 hover:text-blue-600 text-sm font-medium"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
          <X className="text-red-500 mr-2" size={20} />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {appointments.length === 0 ? (
        <div className="text-center py-8">
          <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-500">No appointments found</p>
          <p className="text-sm text-gray-400 mt-2">Book your first appointment to see it here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {getStatusIcon(appointment.status)}
                      <span className="ml-1">{appointment.status}</span>
                    </span>
                    <span className="text-sm text-gray-500">
                      ID: {appointment.appointmentId}
                    </span>
                  </div>
                  
                  <h4 className="font-semibold text-gray-800 mb-2">{appointment.hospitalName}</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <User className="mr-2" size={16} />
                      <span>Dr. {appointment.doctorName}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2" size={16} />
                      <span>{appointment.departmentName}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-2" size={16} />
                      <span>{formatDate(appointment.appointmentDate)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2" size={16} />
                      <span>{appointment.timeSlot}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="mr-2" size={16} />
                      <span>{appointment.patientName} ({appointment.age}, {appointment.gender})</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-2" size={16} />
                      <span>{appointment.phoneNumber}</span>
                    </div>
                  </div>

                  {appointment.email && (
                    <div className="mt-2 text-sm text-gray-600">
                      <span className="font-medium">Email:</span> {appointment.email}
                    </div>
                  )}

                  <div className="mt-2 text-sm text-gray-600">
                    <span className="font-medium">Consultation Type:</span> {appointment.consultationType}
                  </div>

                  <div className="mt-2 text-sm text-gray-500">
                    <span className="font-medium">Booking Reference:</span> {appointment.bookingReference}
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <button
                    onClick={() => setShowDetails(showDetails === appointment.id ? null : appointment.id)}
                    className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                  >
                    {showDetails === appointment.id ? 'Hide' : 'Details'}
                  </button>
                  
                  {appointment.status === 'BOOKED' && (
                    <button
                      onClick={() => cancelAppointment(appointment.id)}
                      className="text-red-500 hover:text-red-600 text-sm font-medium"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              {showDetails === appointment.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h5 className="font-medium text-gray-800 mb-2">Full Details</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Created:</span>
                      <div>{new Date(appointment.createdAt).toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Last Updated:</span>
                      <div>{new Date(appointment.updatedAt).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentHistory;
