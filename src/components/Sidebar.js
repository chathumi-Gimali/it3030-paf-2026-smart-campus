import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const sections = [
    {
      label: 'Main',
      items: [
        { path: '/', label: 'Dashboard', icon: <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2"/></svg> },
      ]
    },
    {
      label: 'Booking Management',
      items: [
        { path: '/bookings', label: 'Bookings', icon: <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M5 1v4M11 1v4M1 7h14" stroke="currentColor" strokeWidth="1.2"/></svg> },
        { path: '/my-bookings', label: 'My Bookings', icon: <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="3" stroke="currentColor" strokeWidth="1.2"/><path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" strokeWidth="1.2"/></svg> },
      ]
    },
    {
      label: 'Resources',
      items: [
        { path: '/facilities', label: 'Facilities', icon: <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M5 8h6M8 5v6" stroke="currentColor" strokeWidth="1.2"/></svg> },
        { path: '/reports', label: 'Reports', icon: <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M2 12l4-4 3 3 5-6" stroke="currentColor" strokeWidth="1.2"/><rect x="1" y="1" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.2"/></svg> },
      ]
    },
  ];

  return (
    <div className="fixed top-0 left-0 h-full w-52 bg-white border-r border-gray-100 flex flex-col z-10">
      <div className="p-4 border-b border-gray-100 flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="2" stroke="white" strokeWidth="1.3"/><path d="M4 1v4M12 1v4M1 6h14" stroke="white" strokeWidth="1.3"/></svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">Smart Campus</p>
          <p className="text-xs text-gray-400">Operations Hub</p>
        </div>
      </div>

      <div className="flex-1 p-2 overflow-y-auto">
        {sections.map((section, si) => (
          <div key={si} className="mb-3">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider px-2 mb-1.5 mt-2">
              {section.label}
            </p>
            {section.items.map((item) => (
              <div key={item.path} onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm cursor-pointer mb-0.5 transition-colors ${
                  location.pathname === item.path
                    ? 'bg-indigo-50 text-indigo-600 font-medium'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }`}>
                {item.icon}
                {item.label}
                {location.pathname === item.path && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="p-2 border-t border-gray-100">
        <div className="flex items-center gap-2 px-2 py-2 mb-1">
          <div className="w-7 h-7 rounded-full bg-indigo-50 flex items-center justify-center text-xs font-semibold text-indigo-600 flex-shrink-0">IT</div>
          <div>
            <p className="text-xs font-medium text-gray-900">IT23334566</p>
            <p className="text-xs text-gray-400">Student</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-2.5 py-2 text-red-500 cursor-pointer rounded-lg hover:bg-red-50 text-sm transition-colors">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3M10 11l3-3-3-3M13 8H6" stroke="#ef4444" strokeWidth="1.2"/></svg>
          Log out
        </div>
      </div>
    </div>
  );
};

export default Sidebar;