import React from 'react';
import { useLocation } from 'react-router-dom';

const Topbar = () => {
  const location = useLocation();

  const titles = {
    '/': 'Dashboard',
    '/bookings': 'Booking Management',
    '/my-bookings': 'My Bookings',
    '/facilities': 'Facilities & Assets',
    '/reports': 'Reports & Analytics',
  };

  const subtitles = {
    '/': 'Overview',
    '/bookings': 'All Bookings',
    '/my-bookings': 'My Bookings',
    '/facilities': 'All Resources',
    '/reports': 'Analytics',
  };

  return (
    <div className="bg-white border-b border-gray-100 px-6 h-14 flex items-center justify-between sticky top-0 z-10">
      <div className="text-sm text-gray-400">
        {titles[location.pathname]} &rsaquo;{' '}
        <span className="text-gray-900 font-medium">
          {subtitles[location.pathname]}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">IT23334566</p>
          <p className="text-xs text-gray-400">it23334566@gmail.com</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-xs font-medium text-indigo-600">
          IT
        </div>
      </div>
    </div>
  );
};

export default Topbar;