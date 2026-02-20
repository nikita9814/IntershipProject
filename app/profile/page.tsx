'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';

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
    const stored = localStorage.getItem('userInfo');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUserInfo(parsed);
      setEditName(parsed.name);
    }
  }, []);

  const handleUpdateName = () => {
    if (!editName.trim() || !userInfo) {
      alert('Name cannot be empty');
      return;
    }

    const updated: UserInfo = { ...userInfo, name: editName };
    localStorage.setItem('userInfo', JSON.stringify(updated));
    setUserInfo(updated);
    setEditMode(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/';
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl font-bold">Profile</h1>
            <button
              onClick={handleLogout}
              className="px-6 py-2 border border-red-400 text-red-400 hover:bg-red-500/10 rounded-lg transition font-semibold"
            >
              Logout
            </button>
          </div>

          {userInfo && (
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-8">
              <div className="flex items-center gap-8 mb-8">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full w-32 h-32 flex items-center justify-center text-6xl font-bold">
                  {userInfo.name.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1">
                  {editMode ? (
                    <div className="mb-4">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white w-full mb-4"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleUpdateName}
                          className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditMode(false);
                            setEditName(userInfo.name);
                          }}
                          className="px-6 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg font-semibold transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-3xl font-bold mb-2">{userInfo.name}</h2>
                      <p className="text-gray-400 mb-4">Email / Mobile: {userInfo.contact}</p>
                      <button
                        onClick={() => setEditMode(true)}
                        className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-semibold transition"
                      >
                        Edit Name
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-2">Total Appointments</p>
                  <p className="text-3xl font-bold">12</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-2">Completed</p>
                  <p className="text-3xl font-bold text-green-400">10</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-2">Member Since</p>
                  <p className="text-3xl font-bold">2026</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 mb-8 border-b border-white/20">
            {['profile', 'records', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-4 font-semibold transition capitalize ${
                  activeTab === tab
                    ? 'border-b-2 border-indigo-500 text-indigo-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'profile' && (
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Full Name</label>
                  <p className="text-lg font-semibold">{userInfo?.name}</p>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Contact</label>
                  <p className="text-lg font-semibold">{userInfo?.contact}</p>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Account Type</label>
                  <p className="text-lg font-semibold">Patient</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'records' && (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold mb-6">Medical Records</h3>
              {records.map((record) => (
                <div
                  key={record.id}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold mb-1">{record.doctorName}</h4>
                      <p className="text-gray-400">{record.diagnosis}</p>
                    </div>
                    <span className="text-sm text-gray-400">{record.date}</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">
                    <span className="font-semibold">Prescription:</span> {record.prescription}
                  </p>
                  <p className="text-gray-300 text-sm">
                    <span className="font-semibold">Notes:</span> {record.notes}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">Settings</h3>
              <div className="space-y-4">
                <button className="w-full px-6 py-3 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-lg transition font-semibold">
                  Change Password
                </button>
                <button className="w-full px-6 py-3 bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 rounded-lg transition font-semibold">
                  Privacy Settings
                </button>
                <button className="w-full px-6 py-3 bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 rounded-lg transition font-semibold">
                  Notification Preferences
                </button>

                <div className="pt-8 border-t border-white/20">
                  <h3 className="text-xl font-bold mb-4">Danger Zone</h3>
                  <button className="px-6 py-3 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition font-semibold">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}