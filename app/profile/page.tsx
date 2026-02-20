'use client';

import { useState, useEffect } from 'react';

interface UserInfo {
  name: string;
  contact: string;
}

interface MedicalRecord {
  id: number;
  date: string;
  doctorName: string;
  diagnosis: string;
  prescription: string;
  notes: string;
}

const mockRecords: MedicalRecord[] = [
  {
    id: 1,
    date: '2026-02-20',
    doctorName: 'Dr. Prakash Das',
    diagnosis: 'Mild Anxiety',
    prescription: 'Consultation recommended',
    notes: 'Patient needs regular follow-up sessions',
  },
  {
    id: 2,
    date: '2026-02-15',
    doctorName: 'Dr. Kumar Das',
    diagnosis: 'Eye checkup - Normal',
    prescription: 'No medication needed',
    notes: 'Vision is perfect. Continue wearing prescribed glasses.',
  },
];

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [records] = useState<MedicalRecord[]>(mockRecords);
  const [activeTab, setActiveTab] = useState<'profile' | 'records' | 'settings'>('profile');
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    // Get user info from localStorage
    const stored = localStorage.getItem('userInfo');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUserInfo(parsed);
      setEditName(parsed.name);
    }
  }, []);

  const handleUpdateName = () => {
    if (userInfo && editName.trim()) {
      const updated = { ...userInfo, name: editName };
      setUserInfo(updated);
      localStorage.setItem('userInfo', JSON.stringify(updated));
      setEditMode(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/';
  };

  if (!userInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">Profile</h1>
          <button
            onClick={handleLogout}
            className="px-6 py-2 border border-red-400 text-red-400 hover:bg-red-500/10 rounded-lg transition font-semibold"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-white/20">
          {(['profile', 'records', 'settings'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition ${
                activeTab === tab
                  ? 'border-b-2 border-indigo-500 text-indigo-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
            <div className="mb-8 text-center">
              <div className="text-6xl bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                👤
              </div>
              {editMode ? (
                <div className="flex gap-4 justify-center mb-4">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white"
                  />
                  <button
                    onClick={handleUpdateName}
                    className="px-6 py-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded-lg transition font-semibold"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="px-6 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <h2 className="text-3xl font-bold mb-4">{userInfo.name}</h2>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-white/10 rounded-lg p-6">
                <p className="text-gray-400 text-sm mb-2">Email / Mobile</p>
                <p className="text-xl font-semibold">{userInfo.contact}</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-2">Total Appointments</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-2">Completed</p>
                  <p className="text-2xl font-bold text-green-400">10</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-2">Member Since</p>
                  <p className="text-2xl font-bold">2026</p>
                </div>
              </div>

              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className="w-full px-6 py-3 bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 rounded-lg transition font-semibold"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        )}

        {/* Records Tab */}
        {activeTab === 'records' && (
          <div className="space-y-6">
            {records.map((record) => (
              <div
                key={record.id}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{record.doctorName}</h3>
                    <p className="text-gray-400 mb-2">📅 {record.date}</p>
                  </div>
                  <span className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-semibold">
                    Medical Record
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Diagnosis</p>
                    <p className="text-white">{record.diagnosis}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Prescription</p>
                    <p className="text-white">{record.prescription}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Notes</p>
                    <p className="text-white">{record.notes}</p>
                  </div>
                </div>

                <button className="mt-4 px-6 py-2 bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 rounded-lg transition font-semibold">
                  Download PDF
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Account Settings</h3>
              <div className="space-y-4">
                <label className="flex items-center gap-4 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                  <span>Email Notifications</span>
                </label>
                <label className="flex items-center gap-4 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                  <span>SMS Reminders</span>
                </label>
                <label className="flex items-center gap-4 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5" />
                  <span>Marketing Emails</span>
                </label>
              </div>
            </div>

            <div className="border-t border-white/20 pt-6">
              <h3 className="text-xl font-bold mb-4">Danger Zone</h3>
              <button className="px-6 py-3 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition font-semibold">
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
