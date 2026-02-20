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
  reviews: number;
  experience: string;
  patients: string;
  image: string;
  isAvailable: boolean;
}

interface PatientDetails {
  name: string;
  age: string;
  gender: string;
  mobile: string;
  weight: string;
  problem: string;
  relationship: string;
}

interface Appointment {
  id: number;
  appointmentNumber: string;
  doctorName: string;
  specialization: string;
  date: string;
  time: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  patientDetails?: PatientDetails;
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Prakash Das',
    specialization: 'Psychologist',
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    slots: ['08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '02:00 PM', '02:30 PM', '03:00 PM', '07:00 PM'],
    rating: 4.8,
    reviews: 2456,
    experience: '15+ years',
    patients: '5,000+',
    image: '👨‍⚕️',
    isAvailable: true,
  },
  {
    id: 2,
    name: 'Dr. Kumar Das',
    specialization: 'Cardiologist - Dombiwall',
    availability: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
    slots: ['09:00 AM', '10:00 AM', '11:00 AM', '03:00 PM', '04:00 PM', '05:00 PM'],
    rating: 4.9,
    reviews: 3120,
    experience: '18+ years',
    patients: '6,000+',
    image: '👨‍⚕️',
    isAvailable: true,
  },
];

const mockAppointments: Appointment[] = [
  {
    id: 1,
    appointmentNumber: '#45',
    doctorName: 'Dr. Prakash Das',
    specialization: 'Psychologist',
    date: '2026-02-25',
    time: '02:00 PM',
    status: 'confirmed',
  },
];

export default function AppointmentPage() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [step, setStep] = useState<'list' | 'details' | 'date' | 'patient' | 'confirm'>('list');
  const [message, setMessage] = useState('');
  const [patientDetails, setPatientDetails] = useState<PatientDetails>({
    name: '',
    age: '',
    gender: '',
    mobile: '',
    weight: '',
    problem: '',
    relationship: '',
  });

  const handlePatientDetailsChange = (field: keyof PatientDetails, value: string) => {
    setPatientDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleBookAppointment = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      setMessage('Please select doctor, date, and time');
      return;
    }

    if (!patientDetails.name || !patientDetails.age || !patientDetails.gender || !patientDetails.mobile) {
      setMessage('Please fill all required patient details');
      return;
    }

    const appointmentNumber = `#${Math.floor(Math.random() * 1000) + 1}`;

    const newAppointment: Appointment = {
      id: appointments.length + 1,
      appointmentNumber,
      doctorName: selectedDoctor.name,
      specialization: selectedDoctor.specialization,
      date: selectedDate,
      time: selectedTime,
      status: 'confirmed',
      patientDetails,
    };

    setAppointments([...appointments, newAppointment]);
    setMessage(`Appointment booked successfully!`);
    setStep('confirm');

    setTimeout(() => {
      setSelectedDoctor(null);
      setSelectedDate('');
      setSelectedTime('');
      setStep('list');
      setMessage('');
      setPatientDetails({
        name: '',
        age: '',
        gender: '',
        mobile: '',
        weight: '',
        problem: '',
        relationship: '',
      });
    }, 3000);
  };

  const handleCancelAppointment = (id: number) => {
    setAppointments(prev => prev.filter(apt => apt.id !== id));
  };

  /* ================= DOCTOR DETAILS SCREEN ================= */
  if (step === 'details' && selectedDoctor) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4">
          <div className="max-w-2xl mx-auto mt-8">
            <button
              onClick={() => {
                setSelectedDoctor(null);
                setStep('list');
              }}
              className="mb-8 text-indigo-400 font-semibold flex items-center gap-2"
            >
              ← Back
            </button>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-8">
              {/* Doctor Profile */}
              <div className="flex items-center gap-6 mb-8">
                <div className="text-6xl">{selectedDoctor.image}</div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedDoctor.name}</h2>
                  <p className="text-indigo-400 mb-4">{selectedDoctor.specialization}</p>
                  <div className="flex items-center gap-4">
                    <span className="text-yellow-400 font-bold">⭐ {selectedDoctor.rating}</span>
                    <span className="text-gray-400">({selectedDoctor.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Doctor Stats */}
              <div className="grid grid-cols-4 gap-4 mb-8 py-6 border-y border-white/20">
                <div className="text-center">
                  <p className="text-gray-400 text-sm mb-2">Patients</p>
                  <p className="text-2xl font-bold">{selectedDoctor.patients}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm mb-2">Experience</p>
                  <p className="text-2xl font-bold">{selectedDoctor.experience}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm mb-2">Rating</p>
                  <p className="text-2xl font-bold text-yellow-400">{selectedDoctor.rating}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm mb-2">Reviews</p>
                  <p className="text-2xl font-bold">{selectedDoctor.reviews}</p>
                </div>
              </div>

              {/* Doctor Status */}
              <div className="mb-8">
                <p className="text-gray-400 text-sm mb-2">Service & Specialization</p>
                <p className="text-white font-semibold mb-4">Specialization: {selectedDoctor.specialization}</p>
                <p className="text-gray-400 text-sm mb-4">Availability For Consulting: Monday to Friday, 10 PM to 5 PM</p>
              </div>

              {/* Availability Status */}
              {selectedDoctor.isAvailable ? (
                <div className="bg-green-500/20 border border-green-400 rounded-lg p-4 mb-8">
                  <p className="text-green-400 font-semibold">✓ Doctor is Available</p>
                </div>
              ) : (
                <div className="bg-red-500/20 border border-red-400 rounded-lg p-4 mb-8">
                  <p className="text-red-400 font-semibold">✗ Doctor is Currently Unavailable</p>
                  <p className="text-red-300 text-sm mt-2">Sorry, the consulting time is over. Would you like to book for the next available slot?</p>
                </div>
              )}

              <button
                onClick={() => setStep('date')}
                disabled={!selectedDoctor.isAvailable}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Continue to Book Appointment
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  /* ================= DATE & TIME SELECTION ================= */
  if (step === 'date' && selectedDoctor) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4">
          <div className="max-w-2xl mx-auto mt-8">
            <button
              onClick={() => setStep('details')}
              className="mb-8 text-indigo-400 font-semibold flex items-center gap-2"
            >
              ← Back
            </button>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">Book Appointment with {selectedDoctor.name}</h2>

              {/* Select Date */}
              <div className="mb-8">
                <label className="block text-lg font-semibold mb-4">Select Day</label>
                <div className="grid grid-cols-3 gap-4 mb-4">
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

              {/* Select Time Slots */}
              {selectedDate && (
                <div className="mb-8">
                  <label className="block text-lg font-semibold mb-4">Select Time Slot</label>

                  <div className="mb-6">
                    <p className="text-gray-400 text-sm mb-3 font-semibold">Morning Slots</p>
                    <div className="grid grid-cols-4 gap-3 mb-6">
                      {selectedDoctor.slots
                        .filter((slot) => {
                          const hour = parseInt(slot.split(':')[0]);
                          return hour < 12;
                        })
                        .map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setSelectedTime(slot)}
                            className={`p-2 rounded-lg text-sm font-semibold transition ${
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

                  <div className="mb-6">
                    <p className="text-gray-400 text-sm mb-3 font-semibold">Afternoon Slots</p>
                    <div className="grid grid-cols-4 gap-3 mb-6">
                      {selectedDoctor.slots
                        .filter((slot) => {
                          const hour = parseInt(slot.split(':')[0]);
                          return hour >= 12 && hour < 17;
                        })
                        .map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setSelectedTime(slot)}
                            className={`p-2 rounded-lg text-sm font-semibold transition ${
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

                  <div>
                    <p className="text-gray-400 text-sm mb-3 font-semibold">Evening Slots</p>
                    <div className="grid grid-cols-4 gap-3">
                      {selectedDoctor.slots
                        .filter((slot) => {
                          const hour = parseInt(slot.split(':')[0]);
                          return hour >= 17;
                        })
                        .map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setSelectedTime(slot)}
                            className={`p-2 rounded-lg text-sm font-semibold transition ${
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
                </div>
              )}

              {selectedDate && selectedTime && (
                <button
                  onClick={() => setStep('patient')}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-3 rounded-lg hover:shadow-lg transition"
                >
                  Continue to Patient Details
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  /* ================= PATIENT DETAILS FORM ================= */
  if (step === 'patient' && selectedDoctor) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 pb-20">
          <div className="max-w-2xl mx-auto mt-8">
            <button
              onClick={() => setStep('date')}
              className="mb-8 text-indigo-400 font-semibold flex items-center gap-2"
            >
              ← Back
            </button>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">Add Patient Details</h2>

              {/* Full Name */}
              <div className="mb-6">
                <label className="block text-gray-400 text-sm mb-2 font-semibold">Full Name *</label>
                <input
                  type="text"
                  value={patientDetails.name}
                  onChange={(e) => handlePatientDetailsChange('name', e.target.value)}
                  placeholder="Enter full name"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Age & Gender */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-semibold">Age *</label>
                  <input
                    type="number"
                    value={patientDetails.age}
                    onChange={(e) => handlePatientDetailsChange('age', e.target.value)}
                    placeholder="Age"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-semibold">Gender *</label>
                  <select
                    value={patientDetails.gender}
                    onChange={(e) => handlePatientDetailsChange('gender', e.target.value)}
                    style={{ colorScheme: 'dark' }}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Mobile Number */}
              <div className="mb-6">
                <label className="block text-gray-400 text-sm mb-2 font-semibold">Mobile Number *</label>
                <input
                  type="tel"
                  value={patientDetails.mobile}
                  onChange={(e) => handlePatientDetailsChange('mobile', e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Weight */}
              <div className="mb-6">
                <label className="block text-gray-400 text-sm mb-2 font-semibold">Weight (kg)</label>
                <input
                  type="number"
                  value={patientDetails.weight}
                  onChange={(e) => handlePatientDetailsChange('weight', e.target.value)}
                  placeholder="Weight in kg"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Problem Description */}
              <div className="mb-6">
                <label className="block text-gray-400 text-sm mb-2 font-semibold">Problem</label>
                <textarea
                  value={patientDetails.problem}
                  onChange={(e) => handlePatientDetailsChange('problem', e.target.value)}
                  placeholder="Write something about your problem"
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Relationship */}
              <div className="mb-8">
                <label className="block text-gray-400 text-sm mb-2 font-semibold">Relationship with Patient</label>
                <select
                  value={patientDetails.relationship}
                  onChange={(e) => handlePatientDetailsChange('relationship', e.target.value)}
                  style={{ colorScheme: 'dark' }}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Relationship</option>
                  <option value="Self">Self</option>
                  <option value="Son">Son</option>
                  <option value="Daughter">Daughter</option>
                  <option value="Brother">Brother</option>
                  <option value="Sister">Sister</option>
                  <option value="Parent">Parent</option>
                  <option value="Spouse">Spouse</option>
                </select>
              </div>

              <button
                onClick={handleBookAppointment}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-3 rounded-lg hover:shadow-lg transition"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  /* ================= APPOINTMENT CONFIRMATION ================= */
  if (step === 'confirm' && selectedDoctor) {
    const lastAppointment = appointments[appointments.length - 1];
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 flex items-center justify-center">
          <div className="max-w-2xl w-full">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center">
              <div className="text-6xl mb-6">✓</div>
              <h2 className="text-4xl font-bold mb-4">Appointment Scheduled</h2>

              <div className="bg-white/10 rounded-xl p-6 mb-8 text-left">
                <div className="flex items-center gap-6 mb-6">
                  <div className="text-5xl">{selectedDoctor.image}</div>
                  <div>
                    <h3 className="text-2xl font-bold">{selectedDoctor.name}</h3>
                    <p className="text-indigo-400">{selectedDoctor.specialization}</p>
                  </div>
                </div>

                <div className="border-t border-white/20 pt-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Appointment Number:</span>
                    <span className="font-bold text-lg">{lastAppointment.appointmentNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date:</span>
                    <span className="font-bold">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Time:</span>
                    <span className="font-bold">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="font-bold text-green-400">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Patient Name:</span>
                    <span className="font-bold">{patientDetails.name}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedDoctor(null);
                  setSelectedDate('');
                  setSelectedTime('');
                  setStep('list');
                  setPatientDetails({
                    name: '',
                    age: '',
                    gender: '',
                    mobile: '',
                    weight: '',
                    problem: '',
                    relationship: '',
                  });
                }}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-3 rounded-lg hover:shadow-lg transition"
              >
                View My Appointment
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  /* ================= MAIN APPOINTMENTS LIST ================= */
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pb-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {message && (
            <div className="mb-8 p-4 bg-green-500/20 border border-green-400 rounded-lg text-green-300">
              ✓ {message}
            </div>
          )}

          <h1 className="text-4xl font-bold mb-12">Your Appointments</h1>

          {/* Booked Appointments */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Booked Appointments</h2>
            {appointments.length === 0 ? (
              <p className="text-gray-400">No appointments yet. Book your first appointment!</p>
            ) : (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold">{appointment.doctorName}</h3>
                        <p className="text-gray-400 mb-2">{appointment.specialization}</p>
                        <p className="text-indigo-400 font-semibold mb-2">
                          Appointment Number: {appointment.appointmentNumber}
                        </p>
                        <p className="text-indigo-400">
                          📅 {appointment.date} at {appointment.time}
                        </p>
                        {appointment.patientDetails && (
                          <p className="text-gray-400 text-sm mt-2">
                            Patient: {appointment.patientDetails.name}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-bold ${
                            appointment.status === 'confirmed'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-blue-500/20 text-blue-400'
                          }`}
                        >
                          {appointment.status.toUpperCase()}
                        </span>
                        <button
                          onClick={() => handleCancelAppointment(appointment.id)}
                          className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/40 rounded-lg transition font-semibold text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Available Doctors */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Available Doctors</h2>
            <div className="grid gap-6">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-white/10 border border-white/20 rounded-xl p-6 hover:bg-white/15 transition"
                >
                  <div className="flex gap-6 items-start mb-4">
                    <div className="text-6xl">{doctor.image}</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold">{doctor.name}</h3>
                      <p className="text-indigo-400 mb-3">{doctor.specialization}</p>

                      {/* Stats */}
                      <div className="grid grid-cols-4 gap-3 mb-4">
                        <div>
                          <p className="text-gray-400 text-xs">Patients</p>
                          <p className="font-bold text-sm">{doctor.patients}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Experience</p>
                          <p className="font-bold text-sm">{doctor.experience}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Rating</p>
                          <p className="font-bold text-sm text-yellow-400">⭐ {doctor.rating}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Reviews</p>
                          <p className="font-bold text-sm">{doctor.reviews}</p>
                        </div>
                      </div>

                      <p className="text-gray-400 text-sm">⭐ {doctor.rating} | Available: {doctor.availability.join(', ')}</p>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedDoctor(doctor);
                        setStep('details');
                      }}
                      className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-lg hover:shadow-lg transition whitespace-nowrap"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}