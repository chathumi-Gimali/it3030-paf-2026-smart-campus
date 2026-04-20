import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="px-6 py-6">
        <div className="grid grid-cols-4 gap-8 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="3" width="14" height="10" rx="2" stroke="white" strokeWidth="1.2"/>
                  <path d="M4 1v4M12 1v4M1 6h14" stroke="white" strokeWidth="1.2"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Smart Campus</p>
                <p className="text-xs text-gray-400">Operations Hub</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              A modern platform for managing university facility bookings and operations.
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-900 uppercase tracking-wider mb-3">Quick Support</p>
            <div className="space-y-2">
              {['User Guide', 'FAQ', 'API Docs', 'Troubleshooting'].map(item => (
                <p key={item} className="text-xs text-gray-500 cursor-pointer hover:text-indigo-600">{item}</p>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-900 uppercase tracking-wider mb-3">Account</p>
            <div className="space-y-2">
              {['Manage Profile', 'Subscription', 'Audit Logs', 'Settings'].map(item => (
                <p key={item} className="text-xs text-gray-500 cursor-pointer hover:text-indigo-600">{item}</p>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-900 uppercase tracking-wider mb-3">Submit a Ticket</p>
            <input
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none mb-2"
              placeholder="Describe your issue..." />
            <button className="w-full bg-indigo-600 text-white text-xs py-2 rounded-lg">
              Open Ticket
            </button>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
          <p className="text-xs text-gray-400">© 2026 Smart Campus Systems. All Rights Reserved.</p>
          <div className="flex gap-4">
            <span className="text-xs text-gray-400 cursor-pointer hover:text-indigo-600">Terms of Service</span>
            <span className="text-xs text-gray-400 cursor-pointer hover:text-indigo-600">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;