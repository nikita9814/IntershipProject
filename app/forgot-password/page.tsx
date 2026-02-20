'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import Link from 'next/link';

export default function ForgotPassword() {
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [resetType, setResetType] = useState<'email' | 'mobile' | ''>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setContact(value);
    setError('');

    // Determine if it's email or mobile
    if (value.includes('@')) {
      setResetType('email');
    } else if (/^\d/.test(value)) {
      setResetType('mobile');
    } else {
      setResetType('');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate input
      if (!contact.trim()) {
        setError('Please enter your email or mobile number');
        setLoading(false);
        return;
      }

      // Check if it's email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
      const isEmail = emailRegex.test(contact);

      // Check if it's mobile
      const mobileRegex = /^[0-9]{10}$/;
      const cleanedMobile = contact.replace(/\D/g, '');
      const isMobile = mobileRegex.test(cleanedMobile);

      if (!isEmail && !isMobile) {
        if (contact.includes('@')) {
          setError('❌ Invalid email format. Example: user@example.com');
        } else {
          setError('❌ Invalid mobile number. Please enter a 10-digit number.');
        }
        setLoading(false);
        return;
      }

      // Simulate API call
      if (isEmail) {
        console.log('Password reset requested for email:', contact);
        setSuccess(`✓ Reset link sent to ${contact}`);
      } else {
        console.log('Password reset requested for mobile:', cleanedMobile);
        setSuccess(`✓ Reset code sent to ${cleanedMobile}`);
      }

      setSubmitted(true);
    } catch (err) {
      setError('⚠️ An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-8">
        {/* Back Button */}
        <Link
          href="/"
          className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-8 font-semibold text-sm"
        >
          ← Back to Login
        </Link>

        <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 text-center">
          Reset Password
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Enter your email or 10-digit mobile number
        </p>

        {submitted ? (
          <div className="bg-green-50/20 border border-green-400/40 rounded-xl p-6 text-center">
            <div className="text-4xl mb-4">✓</div>
            <p className="text-green-300 mb-4 font-semibold">{success}</p>
            <p className="text-gray-300 text-sm mb-6">
              {resetType === 'email'
                ? 'Check your email inbox for reset instructions (valid for 24 hours)'
                : 'Check your SMS for the verification code (valid for 10 minutes)'}
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-2 bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 rounded-lg transition font-semibold"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input Field */}
            <div>
              <label htmlFor="contact" className="block text-sm font-semibold text-gray-200 mb-3">
                Email or Mobile Number
              </label>
              <input
                type="text"
                id="contact"
                value={contact}
                onChange={handleChange}
                placeholder="user@example.com or 9876543210"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
              {resetType && (
                <p className="text-xs mt-2 text-gray-400">
                  📝 Detected as: {resetType === 'email' ? '📧 Email' : '📱 Mobile Number'}
                </p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50/20 border border-red-400/40 rounded-xl text-red-300 text-sm font-medium">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !contact}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 rounded-xl transition transform hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-indigo-500/40"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Sending...
                </span>
              ) : (
                'Send Reset Link/Code'
              )}
            </button>

            {/* Info Box */}
            <div className="p-4 bg-blue-50/20 border border-blue-400/40 rounded-xl">
              <p className="text-blue-300 text-xs">
                <span className="font-semibold">📌 Note:</span> You can reset using either:
              </p>
              <ul className="text-blue-300 text-xs mt-2 space-y-1">
                <li>• <span className="font-semibold">Email:</span> user@example.com</li>
                <li>• <span className="font-semibold">Mobile:</span> 10-digit number</li>
              </ul>
            </div>
          </form>
        )}

        {!submitted && (
          <p className="text-center text-gray-400 text-sm mt-8">
            Remember your password?{' '}
            <Link href="/" className="text-indigo-400 hover:text-indigo-300 font-semibold">
              Sign In
            </Link>
          </p>
        )}
      </div>
    </main>
  );
}
