'use client';

import { useState } from 'react';

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  availability: string;
  time: string;
  rating: number;
  patients: string;
  experience: string;
  image: string;
  verified: boolean;
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Prakash Das',
    specialization: 'Psychologist',
    availability: 'Available today',
    time: '08:30 AM-07:00 PM',
    rating: 4.8,
    patients: '5,000+',
    experience: '15+ years',
    image: '👨‍⚕️',
    verified: true,
  },
  {
    id: 2,
    name: 'Dr. Prakash Das',
    specialization: 'Psychologist',
    availability: 'Available today',
    time: '08:30 AM-07:00 PM',
    rating: 4.8,
    patients: '5,000+',
    experience: '15+ years',
    image: '👨‍⚕️',
    verified: true,
  },
  {
    id: 3,
    name: 'Dr. Prakash Das',
    specialization: 'Psychologist',
    availability: 'Available today',
    time: '08:30 AM-07:00 PM',
    rating: 4.8,
    patients: '5,000+',
    experience: '15+ years',
    image: '👨‍⚕️',
    verified: true,
  },
  {
    id: 4,
    name: 'Dr. Prakash Das',
    specialization: 'Psychologist',
    availability: 'Available today',
    time: '08:30 AM-07:00 PM',
    rating: 4.8,
    patients: '5,000+',
    experience: '15+ years',
    image: '👨‍⚕️',
    verified: true,
  },
];

export default function HelloPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full p-2 w-10 h-10 flex items-center justify-center">
              <span className="text-lg font-bold">Y</span>
            </div>
            <h1 className="text-2xl font-bold">HealthCare</h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 border border-red-400 text-red-400 hover:bg-red-500/10 rounded-lg transition font-semibold"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-black mb-2">Hello, Priya</h2>
          <p className="text-gray-300">Trusted Member</p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Doctors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl">🔍</span>
          </div>
        </div>

        {/* Specialty Filter */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Find by Specialty</h3>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {['All', 'Cardiologist', 'Psychologist', 'Neurologist', 'Dermatologist'].map((specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty)}
                className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition ${
                  selectedSpecialty === specialty
                    ? 'bg-indigo-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors List */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Available Doctors</h3>
          <div className="grid gap-6">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-6 flex-1">
                    {/* Doctor Image */}
                    <div className="text-6xl">{doctor.image}</div>

                    {/* Doctor Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-xl font-bold">{doctor.name}</h4>
                        {doctor.verified && (
                          <span className="text-green-400 text-lg">✓</span>
                        )}
                      </div>
                      <p className="text-indigo-400 mb-1">{doctor.specialization}</p>
                      <p className="text-green-400 text-sm mb-4">{doctor.availability}</p>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-gray-400 text-xs">Patients</p>
                          <p className="text-white font-semibold">{doctor.patients}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Experience</p>
                          <p className="text-white font-semibold">{doctor.experience}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Rating</p>
                          <p className="text-white font-semibold">{doctor.rating}</p>
                        </div>
                      </div>

                      {/* Availability Time */}
                      <p className="text-gray-400 text-sm">{doctor.time}</p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-indigo-500/50 transition group-hover:scale-105">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-around">
            <button className="flex flex-col items-center gap-2 text-indigo-400 group">
              <span className="text-2xl">🏥</span>
              <span className="text-xs font-semibold">Find a Doctor</span>
            </button>
            <button className="flex flex-col items-center gap-2 text-gray-400 hover:text-white group">
              <span className="text-2xl">📅</span>
              <span className="text-xs font-semibold">Appointments</span>
            </button>
            <button className="flex flex-col items-center gap-2 text-gray-400 hover:text-white group">
              <span className="text-2xl">📋</span>
              <span className="text-xs font-semibold">Records</span>
            </button>
            <button className="flex flex-col items-center gap-2 text-gray-400 hover:text-white group">
              <span className="text-2xl">👤</span>
              <span className="text-xs font-semibold">Profile</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
