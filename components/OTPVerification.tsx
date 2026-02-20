'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

interface OTPVerificationProps {
  mobileOrEmail: string;
  onVerified: () => void;
  onBack: () => void;
}

export default function OTPVerification({
  mobileOrEmail,
  onVerified,
  onBack,
}: OTPVerificationProps) {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  const isEmail = mobileOrEmail.includes('@');
  const maskedContact = isEmail
    ? mobileOrEmail.substring(0, 3) + '****' + mobileOrEmail.substring(mobileOrEmail.lastIndexOf('@') - 3)
    : mobileOrEmail.substring(0, 2) + '*****' + mobileOrEmail.substring(8);

  const handleOTPChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
    setError('');
  };

  const handleResendOTP = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Simulate sending OTP
      console.log('Resending OTP to:', mobileOrEmail);
      setSuccess('OTP sent successfully!');
      setOtp('');
      setResendTimer(60);

      // Countdown timer
      const timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!otp || otp.length !== 6) {
        setError('Please enter a valid 6-digit OTP');
        setLoading(false);
        return;
      }

      // Simulate OTP verification
      console.log('Verifying OTP:', otp);
      setSuccess('OTP verified successfully!');
      
      setTimeout(() => {
        onVerified();
      }, 1500);
    } catch (err) {
      setError('Invalid OTP. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Auto-focus input field
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (!/^\d$/.test(e.key) && e.key !== 'Backspace') {
      e.preventDefault();
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-10 md:p-12 border border-white/20 max-w-md w-full">
      {/* Header */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold mb-8 transition"
      >
        <span className="text-xl">←</span>
        Back
      </button>

      {/* Logo Section */}
      <div className="flex justify-center mb-10">
        <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full p-1 w-20 h-20 flex items-center justify-center transform transition-transform hover:scale-110">
          <div className="bg-white rounded-full w-full h-full flex items-center justify-center">
            <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Y</span>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Verify OTP
        </h1>
        <p className="text-gray-500 text-sm">
          Code has been sent to {maskedContact}
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50/80 border border-red-200 rounded-xl text-red-700 text-sm font-medium backdrop-blur-sm animate-in fade-in slide-in-from-top">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚠️</span>
            {error}
          </div>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-50/80 border border-green-200 rounded-xl text-green-700 text-sm font-medium backdrop-blur-sm animate-in fade-in slide-in-from-top">
          <div className="flex items-center gap-2">
            <span className="text-lg">✓</span>
            {success}
          </div>
        </div>
      )}

      {/* OTP Form */}
      <form onSubmit={handleVerifyOTP} className="space-y-6">
        {/* OTP Input */}
        <div>
          <label htmlFor="otp" className="block text-sm font-semibold text-gray-800 mb-4">
            Enter 6-Digit OTP
          </label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={handleOTPChange}
            onKeyPress={handleKeyPress}
            placeholder="000000"
            maxLength={6}
            className="w-full px-4 py-4 text-center text-2xl tracking-widest border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition placeholder-gray-300 bg-gray-50/50 hover:bg-gray-50 text-gray-900 font-semibold"
          />
        </div>

        {/* Verify Button */}
        <button
          type="submit"
          disabled={loading || otp.length !== 6}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 rounded-xl transition transform hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-indigo-500/40"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Verifying...
            </span>
          ) : (
            'Verify OTP'
          )}
        </button>
      </form>

      {/* Resend Section */}
      <div className="text-center mt-8">
        <p className="text-gray-600 text-sm mb-4">Didn&apos;t receive code?</p>
        <button
          onClick={handleResendOTP}
          disabled={loading || resendTimer > 0}
          className="text-indigo-600 hover:text-indigo-700 font-semibold transition disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
        </button>
      </div>

      {/* Contact Info */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <p className="text-gray-600 text-xs">
          <span className="font-semibold">Note:</span> OTP is valid for 10 minutes. Please check your {isEmail ? 'email' : 'SMS'}.
        </p>
      </div>
    </div>
  );
}
