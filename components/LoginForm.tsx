'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import OTPVerification from './OTPVerification';

interface FormData {
  mobileOrEmail: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginForm() {
  const [formData, setFormData] = useState<FormData>({
    mobileOrEmail: '',
    password: '',
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [step, setStep] = useState<'login' | 'otp'>('login');
  const [verifiedContact, setVerifiedContact] = useState('');
  const [userName, setUserName] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    let finalValue = value;
    if (name === 'mobileOrEmail') {
      // Allow alphanumeric, @, dots, hyphens, and underscores for emails and mobile
      finalValue = value.replace(/[^\w@.\-]/g, '');
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : finalValue,
    }));
    setError('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate form
      if (!formData.mobileOrEmail || !formData.password) {
        setError('Please enter mobile/email and password');
        setLoading(false);
        return;
      }

      // Check if it's a mobile number or email
      const mobileRegex = /^[0-9]{10}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/; // Must have @ and domain extension
      const input = formData.mobileOrEmail.replace(/\D/g, '');

      // Check if it's valid mobile (exactly 10 digits)
      const isMobile = mobileRegex.test(input);
      // Check if it's valid email (must contain @ and proper domain)
      const isEmail = emailRegex.test(formData.mobileOrEmail);

      if (!isMobile && !isEmail) {
        if (formData.mobileOrEmail.includes('@')) {
          setError('Please enter a valid email (e.g., user@example.com)');
        } else {
          setError('Please enter a valid 10-digit mobile number or email address');
        }
        setLoading(false);
        return;
      }

      // Simulate sending OTP
      console.log('Sending OTP to:', formData.mobileOrEmail);
      
      // Extract a name from email or generate from number
      let extractedName = 'User';
      if (formData.mobileOrEmail.includes('@')) {
        extractedName = formData.mobileOrEmail.split('@')[0];
        extractedName = extractedName.charAt(0).toUpperCase() + extractedName.slice(1);
      } else {
        extractedName = 'Customer';
      }
      
      setUserName(extractedName);
      setSuccess('OTP sent successfully! Check your email or SMS.');
      setVerifiedContact(formData.mobileOrEmail);
      
      setTimeout(() => {
        setStep('otp');
        setSuccess('');
      }, 1500);
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    // Implement Google OAuth logic here
    setSuccess('Redirecting to Google...');
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    // Redirect to password reset page
    window.location.href = '/forgot-password';
  };

  const handleSignUp = () => {
    window.location.href = '/signup';
  };

  const handleOTPVerified = (userInfo: { name: string; contact: string }) => {
    setSuccess('Login successful! Redirecting...');
    // Store user info in localStorage
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    
    setTimeout(() => {
      // Redirect to home/dashboard
      window.location.href = '/hello';
    }, 1500);
  };

  const handleBackToLogin = () => {
    setStep('login');
    setVerifiedContact('');
    setFormData({ ...formData, mobileOrEmail: '', password: '' });
    setError('');
    setSuccess('');
  };

  // Show OTP verification screen if step is 'otp'
  if (step === 'otp' && verifiedContact) {
    return (
      <OTPVerification
        mobileOrEmail={verifiedContact}
        userName={userName}
        onVerified={handleOTPVerified}
        onBack={handleBackToLogin}
      />
    );
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-10 md:p-12 border border-white/20 max-w-md w-full">
      {/* Logo Section */}
      <div className="flex justify-center mb-10">
        <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full p-1 w-20 h-20 flex items-center justify-center transform transition-transform hover:scale-110">
          <div className="bg-white rounded-full w-full h-full flex items-center justify-center">
            <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Y</span>
          </div>
        </div>
      </div>

      {/* Login Title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">Welcome Back</h1>
        <p className="text-gray-500 text-sm">Sign in to your account to continue</p>
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

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email/Mobile Input */}
        <div>
          <label htmlFor="mobileOrEmail" className="block text-sm font-semibold text-gray-800 mb-3">
            Mobile or Email
          </label>
          <input
            type="text"
            id="mobileOrEmail"
            name="mobileOrEmail"
            value={formData.mobileOrEmail}
            onChange={handleChange}
            placeholder="Enter 10-digit mobile or email"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition placeholder-gray-400 bg-gray-50/50 hover:bg-gray-50 text-gray-900"
          />
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-gray-800 mb-3">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition placeholder-gray-400 bg-gray-50/50 hover:bg-gray-50 text-gray-900"
          />
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between pt-2">
          <label className="flex items-center cursor-pointer group">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="w-5 h-5 text-indigo-600 border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
            />
            <span className="ml-2 text-sm text-gray-700 font-medium group-hover:text-gray-900">Remember Me</span>
          </label>
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold transition hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 rounded-xl transition transform hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-indigo-500/40 mt-2"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Logging in...
            </span>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-8">
        <div className="flex-1 border-t border-gray-200"></div>
        <span className="px-4 text-gray-500 text-xs font-medium uppercase tracking-wide">Or continue with</span>
        <div className="flex-1 border-t border-gray-200"></div>
      </div>

      {/* Google Login Button */}
      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50/50 transition font-semibold text-gray-700 hover:text-gray-900 group"
      >
        <svg
          className="w-5 h-5 group-hover:scale-110 transition-transform"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Google
      </button>

      {/* Sign Up Link */}
      <p className="text-center text-gray-600 text-sm mt-10">
        <span className="text-gray-500">Don&apos;t have an account?</span>
        <button
          onClick={handleSignUp}
          className="ml-2 text-indigo-600 hover:text-indigo-700 font-bold transition hover:underline"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}
