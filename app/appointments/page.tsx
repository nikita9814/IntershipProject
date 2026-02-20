'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  availability: string[];
  slots: string[];
  rating: number;
  image: string;
}

interface Appointment {
  id: number;
  doctorName: string;
  specialization: string;
  date: string;
  time: string;
  status: 'confirmed' | 'completed' | 'cancelled';
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Prakash Das',
    specialization: 'Psychologist',
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    slots: ['08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '02:00 PM', '02:30 PM', '03:00 PM', '07:00 PM'],
    rating: 4.8,
    image: '👨‍⚕️',
  },
  {
    id: 2,
    name: 'Dr. Kumar Das',
    specialization: 'Ophthalmologist',
    availability: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
    slots: ['09:00 AM', '10:00 AM', '11:00 AM', '03:00 PM', '04:00 PM', '05:00 PM'],
    rating: 4.9,
    image: '👨‍⚕️',
  },
];

const mockAppointments: Appointment[] = [
  {
    id: 1,
    doctorName: 'Dr. Prakash Das',
    specialization: 'Psychologist',
    date: '2026-02-25',
    time: '02:00 PM',
    status: 'confirmed',
  },
  {
    id: 2,
    doctorName: 'Dr. Kumar Das',
    specialization: 'Ophthalmologist',
    date: '2026-02-20',
    time: '10:00 AM',
    status: 'completed',
  },
];

export default function AppointmentPage() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [step, setStep] = useState<'list' | 'book' | 'confirm'>('list');
  const [message, setMessage] = useState('');

  const handleBookAppointment = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      setMessage('Please select doctor, date, and time');
      return;
    }

    const newAppointment: Appointment = {
      id: appointments.length + 1,
      doctorName: selectedDoctor.name,
      specialization: selectedDoctor.specialization,
      date: selectedDate,
      time: selectedTime,
      status: 'confirmed',
    };

    setAppointments([...appointments, newAppointment]);
    setMessage(`Appointment booked with ${selectedDoctor.name} on ${selectedDate} at ${selectedTime}`);
    setStep('confirm');

    setTimeout(() => {
      setSelectedDoctor(null);
      setSelectedDate('');
      setSelectedTime('');
      setStep('list');
      setMessage('');
    }, 2000);
  };

  const handleCancelAppointment = (id: number) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id ? { ...apt, status: 'cancelled' } : apt
      )
    );
  };

  if (step === 'book' && selectedDoctor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4">
        <div className="max-w-2xl mx-auto mt-20">
          <button
            onClick={() => {
              setSelectedDoctor(null);
              setStep('list');
            }}
            className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-8 font-semibold"
          >
            ← Back
          </button>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-6">
              Book Appointment with {selectedDoctor.name}
            </h2>
            <p className="text-gray-300 mb-8">
              Specialization: {selectedDoctor.specialization}
            </p>

            {/* Select Date */}
            <div className="mb-8">
              <label className="block text-lg font-semibold mb-4">
                Select Day
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {selectedDoctor.availability.map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(day)}
                    className={`p-3 rounded-lg font-semibold transition ${
                      selectedDate === day
                        ? 'bg-indigo-500 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Select Time */}
            <div className="mb-8">
              <label className="block text-lg font-semibold mb-4">
                Select Time Slot
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {selectedDoctor.slots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={`p-3 rounded-lg font-semibold transition text-sm ${
                      selectedTime === slot
                        ? 'bg-indigo-500 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleBookAppointment}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-3 rounded-lg hover:shadow-lg transition"
            >
              Confirm Appointment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-20">
          {message && (
            <div className="mb-8 p-4 bg-green-500/20 border border-green-400 rounded-lg text-green-300">
              ✓ {message}
            </div>
          )}

        <h1 className="text-4xl font-bold mb-12">Your Appointments</h1>

        {/* Booked Appointments */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Booked Appointments</h2>
          <div className="space-y-4">
            {appointments.filter((apt) => apt.status !== 'cancelled').map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{appointment.doctorName}</h3>
                    <p className="text-gray-400 mb-2">{appointment.specialization}</p>
                    <p className="text-indigo-400 font-semibold">
                      📅 {appointment.date} at {appointment.time}
                    </p>
                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-bold ${
                      appointment.status === 'confirmed'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </div>
                  {appointment.status === 'confirmed' && (
                    <button
                      onClick={() => handleCancelAppointment(appointment.id)}
                      className="px-6 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition font-semibold"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Book New Appointment */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Available Doctors</h2>
          <div className="grid gap-6">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{doctor.name}</h3>
                    <p className="text-indigo-400 mb-4">{doctor.specialization}</p>
                    <p className="text-gray-300 mb-4">
                      ⭐ Rating: {doctor.rating} | Available: {doctor.availability.join(', ')}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedDoctor(doctor);
                      setStep('book');
                    }}
                    className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-lg hover:shadow-lg transition"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
