'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';

interface Record {
  id: number;
  date: string;
  doctorName: string;
  specialization: string;
  type: string;
  diagnosis: string;
  status: 'normal' | 'follow-up-needed' | 'urgent';
}

const mockRecords: Record[] = [
  {
    id: 1,
    date: '2026-02-20',
    doctorName: 'Dr. Prakash Das',
    specialization: 'Psychologist',
    type: 'Consultation',
    diagnosis: 'Mild Anxiety',
    status: 'follow-up-needed',
  },
  {
    id: 2,
    date: '2026-02-15',
    doctorName: 'Dr. Kumar Das',
    specialization: 'Ophthalmologist',
    type: 'Eye Checkup',
    diagnosis: 'Normal Vision',
    status: 'normal',
  },
  {
    id: 3,
    date: '2026-02-10',
    doctorName: 'Dr. Prakash Das',
    specialization: 'Psychologist',
    type: 'Follow-up',
    diagnosis: 'Progress Good',
    status: 'normal',
  },
  {
    id: 4,
    date: '2026-02-05',
    doctorName: 'Dr. Prakash Das',
    specialization: 'Psychologist',
    type: 'Initial Consultation',
    diagnosis: 'Assessment Complete',
    status: 'normal',
  },
];

export default function RecordsPage() {
  const [records] = useState<Record[]>(mockRecords);
  const [filter, setFilter] = useState<'all' | 'normal' | 'follow-up-needed' | 'urgent'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecords = records.filter((record) => {
    const matchesFilter = filter === 'all' || record.status === filter;
    const matchesSearch =
      record.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-500/20 text-green-400';
      case 'follow-up-needed': return 'bg-yellow-500/20 text-yellow-400';
      case 'urgent': return 'bg-red-500/20 text-red-400';
      default: return 'bg-blue-500/20 text-blue-400';
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pb-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          
          <h1 className="text-4xl font-bold mb-8">Medical Records</h1>

          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search by doctor name or diagnosis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
            {(['all', 'normal', 'follow-up-needed', 'urgent'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  filter === status ? 'bg-indigo-500 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {status === 'all' ? 'All' : status.replace('-', ' ').charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          {/* Records List */}
          <div className="space-y-6">
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <div
                  key={record.id}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{record.doctorName}</h3>
                      <p className="text-indigo-400 mb-2">{record.specialization}</p>
                      <p className="text-gray-400">📅 {record.date}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-lg text-sm font-bold ${getStatusColor(record.status)}`}>
                      {record.status === 'normal' ? '✓ Normal' : record.status === 'follow-up-needed' ? '⚠ Follow-up' : '🚨 Urgent'}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 rounded-lg p-4">
                      <p className="text-gray-400 text-xs uppercase mb-1">Type</p>
                      <p className="font-semibold">{record.type}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <p className="text-gray-400 text-xs uppercase mb-1">Diagnosis</p>
                      <p className="font-semibold">{record.diagnosis}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-1 px-6 py-2 bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/40 rounded-lg transition font-semibold">
                      View Details
                    </button>
                    <button className="flex-1 px-6 py-2 bg-purple-500/20 text-purple-400 hover:bg-purple-500/40 rounded-lg transition font-semibold">
                      Download PDF
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/20">
                <p className="text-gray-400 text-lg">No records matching your search</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}