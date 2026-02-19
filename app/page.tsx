'use client';

import { useState } from 'react';
import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}
