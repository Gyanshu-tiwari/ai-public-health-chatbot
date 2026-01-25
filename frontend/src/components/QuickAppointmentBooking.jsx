import React, { useState } from 'react';
import { Calendar, Phone, MapPin, User, Clock, ChevronRight } from 'lucide-react';

const QuickAppointmentBooking = () => {
  const [showBooking, setShowBooking] = useState(false);

  const handleBookAppointment = () => {
    // Navigate to appointment booking page
    window.location.href = '/book-appointment';
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <Calendar className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Book Hospital Appointment</h3>
            <p className="text-sm text-gray-600">Quick appointment booking at government hospitals</p>
          </div>
        </div>
        <button
          onClick={handleBookAppointment}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center space-x-2"
        >
          <span>Book Now</span>
          <ChevronRight size={18} />
        </button>
      </div>
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Phone size={16} className="text-blue-500" />
          <span>Phone-based authentication</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <MapPin size={16} className="text-blue-500" />
          <span>Multiple hospitals</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Clock size={16} className="text-blue-500" />
          <span>Instant confirmation</span>
        </div>
      </div>
    </div>
  );
};

export default QuickAppointmentBooking;
