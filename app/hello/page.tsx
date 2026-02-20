'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';

interface UserInfo {
  name: string;
  contact: string;
}

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  availability: string[];
  slots: string[];
  rating: number;
  patients: string;
  experience: string;
  image: string;
  verified: boolean;
  reviews: number;
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Prakash Das',
    specialization: 'Psychologist',
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    slots: ['08:30 AM', '09:00 AM', '02:00 PM', '03:00 PM', '07:00 PM'],
    rating: 4.8,
    patients: '5,000+',
    experience: '15+ years',
    image: '👨‍⚕️',
    verified: true,
    reviews: 2456,
  },
  {
    id: 2,
    name: 'Dr. Kumar Das',
    specialization: 'Ophthalmologist',
    availability: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
    slots: ['09:00 AM', '10:00 AM', '11:00 AM', '03:00 PM', '05:00 PM'],
    rating: 4.9,
    patients: '6,000+',
    experience: '18+ years',
    image: '👨‍⚕️',
    verified: true,
    reviews: 3120,
  },
  {
    id: 3,
    name: 'Dr. Neha Sharma',
    specialization: 'Cardiologist',
    availability: ['Tuesday', 'Thursday', 'Saturday', 'Sunday'],
    slots: ['10:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'],
    rating: 4.7,
    patients: '4,500+',
    experience: '12+ years',
    image: '👩‍⚕️',
    verified: true,
    reviews: 1890,
  },
  {
    id: 4,
    name: 'Dr. Rajesh Patel',
    specialization: 'Dentist',
    availability: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    slots: ['09:00 AM', '10:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'],
    rating: 4.6,
    patients: '3,800+',
    experience: '10+ years',
    image: '👨‍⚕️',
    verified: true,
    reviews: 1567,
  },
];

export default function HelloPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    // Get user info from localStorage
    const stored = localStorage.getItem('userInfo');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUserInfo(parsed);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/';
  };

  return (
    <>
      <Navigation />
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
          <h2 className="text-4xl font-black mb-2">
            Hello, {userInfo?.name || 'Guest'}
          </h2>
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
                <div className="flex items-start justify-between mb-6">
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

                      {/* Rating and Reviews */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-yellow-400">⭐ {doctor.rating}</span>
                        <span className="text-gray-400">({doctor.reviews} reviews)</span>
                      </div>

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
                          <p className="text-gray-400 text-xs">Available Days</p>
                          <p className="text-white font-semibold">{doctor.availability.length}/7</p>
                        </div>
                      </div>

                      {/* Availability Details */}
                      <div className="mb-4">
                        <p className="text-gray-400 text-xs mb-2">📅 Available: {doctor.availability.join(', ')}</p>
                        <p className="text-gray-400 text-xs">🕐 Time Slots: {doctor.slots.join(', ')}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <a
                    href="/appointments"
                    className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-indigo-500/50 transition group-hover:scale-105 whitespace-nowrap"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-around">
            <a href="/hello" className="flex flex-col items-center gap-2 text-indigo-400 group hover:text-indigo-300">
              <span className="text-2xl">🏥</span>
              <span className="text-xs font-semibold">Find Doctor</span>
            </a>
            <a href="/appointments" className="flex flex-col items-center gap-2 text-gray-400 hover:text-white group">
              <span className="text-2xl">📅</span>
              <span className="text-xs font-semibold">Appointments</span>
            </a>
            <a href="/records" className="flex flex-col items-center gap-2 text-gray-400 hover:text-white group">
              <span className="text-2xl">📋</span>
              <span className="text-xs font-semibold">Records</span>
            </a>
            <a href="/profile" className="flex flex-col items-center gap-2 text-gray-400 hover:text-white group">
              <span className="text-2xl">👤</span>
              <span className="text-xs font-semibold">Profile</span>
            </a>
            <a href="/doctor-join" className="flex flex-col items-center gap-2 text-gray-400 hover:text-white group">
              <span className="text-2xl">➕</span>
              <span className="text-xs font-semibold">Join</span>
            </a>
          </div>
        </div>
      </main>
      </div>
    </>
  );
}
