'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const pages = [
  { name: 'Home', path: '/hello', icon: '🏠' },
  { name: 'Appointments', path: '/appointments', icon: '📅' },
  { name: 'Records', path: '/records', icon: '📋' },
  { name: 'Profile', path: '/profile', icon: '👤' },
];

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const index = pages.findIndex(p => p.path === pathname);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [pathname]);

  const goToPrevious = () => {
    if (currentIndex > 0) {
      router.push(pages[currentIndex - 1].path);
    }
  };

  const goToNext = () => {
    if (currentIndex < pages.length - 1) {
      router.push(pages[currentIndex + 1].path);
    }
  };

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < pages.length - 1;

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Back Button */}
          <button
            onClick={goToPrevious}
            disabled={!canGoPrevious}
            className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
              canGoPrevious
                ? 'bg-white/20 hover:bg-white/30 text-white cursor-pointer transform hover:scale-110'
                : 'bg-white/10 text-white/40 cursor-not-allowed'
            }`}
            title="Previous page"
          >
            <span className="text-xl">←</span>
          </button>

          {/* Page Info */}
          <div className="flex-1 text-center">
            <h1 className="text-white font-bold text-lg md:text-xl">
              <span className="text-2xl">{pages[currentIndex].icon}</span> {pages[currentIndex].name}
            </h1>
            <p className="text-white/70 text-xs md:text-sm">
              {currentIndex + 1} of {pages.length}
            </p>
          </div>

          {/* Forward Button */}
          <button
            onClick={goToNext}
            disabled={!canGoNext}
            className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
              canGoNext
                ? 'bg-white/20 hover:bg-white/30 text-white cursor-pointer transform hover:scale-110'
                : 'bg-white/10 text-white/40 cursor-not-allowed'
            }`}
            title="Next page"
          >
            <span className="text-xl">→</span>
          </button>
        </div>

        {/* Page Indicators */}
        <div className="flex justify-center gap-2 pb-4">
          {pages.map((page, index) => (
            <button
              key={page.path}
              onClick={() => router.push(page.path)}
              className={`px-3 py-1 rounded-full text-sm font-semibold transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-white text-purple-600 shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {page.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
