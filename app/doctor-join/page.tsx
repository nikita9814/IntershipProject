'use client';

import { useState, FormEvent } from 'react';

interface DoctorForm {
  fullName: string;
  email: string;
  phone: string;
  specialization: string;
  licenseNumber: string;
  experience: string;
  hospital: string;
  biography: string;
}

export default function DoctorJoinPage() {
  const [formData, setFormData] = useState<DoctorForm>({
    fullName: '',
    email: '',
    phone: '',
    specialization: '',
    licenseNumber: '',
    experience: '',
    hospital: '',
    biography: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      console.log('Doctor registration:', formData);
      setSubmitted(true);

      setTimeout(() => {
        window.location.href = '/hello';
      }, 3000);
    } catch (err) {
      console.error(err);
      alert('Error submitting form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center px-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-6">✓</div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Application Received!
          </h1>
          <p className="text-gray-300 mb-4">Thank you for joining our platform.</p>
          <p className="text-gray-400 mb-8">Our team will review your application and contact you within 24 hours.</p>
          <p className="text-gray-500 text-sm">Redirecting to home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Back Button */}
        <a
          href="/hello"
          className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-8 font-semibold"
        >
          ← Back to Home
        </a>

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Join as a Doctor
          </h1>
          <p className="text-gray-300 text-lg">Register your medical practice with us</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-3">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Dr. John Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-3">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="doctor@example.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-3">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="9876543210"
            />
          </div>

          {/* Specialization */}
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-3">
              Specialization
            </label>
            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Specialization</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Psychologist">Psychologist</option>
              <option value="Ophthalmologist">Ophthalmologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Orthopedic">Orthopedic</option>
              <option value="Dentist">Dentist</option>
            </select>
          </div>

          {/* License Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-3">
              Medical License Number
            </label>
            <input
              type="text"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="License #"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-3">
              Years of Experience
            </label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="15"
            />
          </div>

          {/* Hospital */}
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-3">
              Hospital / Clinic Name
            </label>
            <input
              type="text"
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your hospital name"
            />
          </div>

          {/* Biography */}
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-3">
              Professional Biography
            </label>
            <textarea
              name="biography"
              value={formData.biography}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="Tell us about your professional background and expertise..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>

        {/* Notice */}
        <div className="mt-8 p-6 bg-blue-500/10 border border-blue-400/20 rounded-xl">
          <p className="text-blue-300">
            📋 <span className="font-semibold">Note:</span> Your application will be reviewed by our admin team. Please ensure all information is accurate and complete.
          </p>
        </div>
      </div>
    </div>
  );
}
