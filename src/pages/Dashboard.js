import React, { useState, useEffect } from 'react';
import bookingService from '../services/bookingService';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bookingService.getAllBookings()
      .then(res => { setBookings(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const pending = bookings.filter(b => b.status === 'PENDING');
  const approved = bookings.filter(b => b.status === 'APPROVED');
  const rejected = bookings.filter(b => b.status === 'REJECTED');
  const cancelled = bookings.filter(b => b.status === 'CANCELLED');

  const handleApprove = (id) => {
    bookingService.approveBooking(id)
      .then(() => bookingService.getAllBookings()
      .then(res => setBookings(res.data)));
  };

  const handleReject = (id) => {
    const reason = prompt('Enter rejection reason:');
    if (reason) {
      bookingService.rejectBooking(id, reason)
        .then(() => bookingService.getAllBookings()
        .then(res => setBookings(res.data)));
    }
  };

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const calDates = Array.from({ length: 35 }, (_, i) => i - 2);
  const today = 20;

  const statCards = [
    { label: 'Total Bookings', value: bookings.length, icon: '📅', from: '#6366f1', to: '#4f46e5' },
    { label: 'Approved', value: approved.length, icon: '✅', from: '#22c55e', to: '#16a34a' },
    { label: 'Pending', value: pending.length, icon: '⏳', from: '#f59e0b', to: '#d97706' },
    { label: 'Cancelled', value: cancelled.length, icon: '❌', from: '#ef4444', to: '#dc2626' },
  ];

  const linePoints = [40, 25, 35, 20, 30, 15, 25, 10, 20, 30, 15, 25];
  const maxLine = Math.max(...linePoints);
  const svgLine = linePoints.map((v, i) => `${i * 45},${50 - (v / maxLine) * 40}`).join(' ');

  const barData = [30, 45, 35, 50, 40, 55, 45];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Booking Management Dashboard</h1>
          <p className="text-sm text-gray-400 mt-0.5">Welcome back, Admin!</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none w-56 pl-9"
              placeholder="Search Bookings" />
            <svg className="absolute left-3 top-2.5" width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="#aaa" strokeWidth="1.5"/>
              <path d="M11 11l3 3" stroke="#aaa" strokeWidth="1.5"/>
            </svg>
          </div>
          <button className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-lg">+</button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {statCards.map((s, i) => (
          <div key={i} className="rounded-2xl p-5 text-white relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${s.from}, ${s.to})` }}>
            <p className="text-3xl font-bold mb-1">{loading ? '...' : s.value}</p>
            <p className="text-sm opacity-90">{s.label}</p>
            <div className="absolute right-4 top-4 text-3xl opacity-80">{s.icon}</div>
          </div>
        ))}
      </div>

      {/* Charts + Calendar Row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Total Sales Chart */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-gray-400">Total Bookings</p>
            <span className="text-xs text-green-500 font-medium">+2.5% ↑</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-3">{bookings.length}</p>
          <svg viewBox="0 0 495 60" className="w-full h-16">
            <defs>
              <linearGradient id="lg1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2"/>
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <polyline points={svgLine} fill="none" stroke="#6366f1" strokeWidth="2"/>
            <polygon points={`0,50 ${svgLine} 495,50`} fill="url(#lg1)"/>
          </svg>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-gray-400">Weekly Bookings</p>
            <span className="text-xs text-green-500 font-medium">+1.3% ↑</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-3">{approved.length}</p>
          <div className="flex items-end gap-2 h-16">
            {barData.map((v, i) => (
              <div key={i} className="flex-1 rounded-t-md"
                style={{
                  height: `${v}%`,
                  background: i === 4 ? '#6366f1' : '#e0e7ff'
                }}></div>
            ))}
          </div>
          <div className="flex justify-between mt-1">
            {['M','T','W','T','F','S','S'].map((d,i) => (
              <span key={i} className="text-xs text-gray-400 flex-1 text-center">{d}</span>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <p className="text-sm font-semibold text-gray-900 mb-3">Upcoming Schedule</p>
          <div className="grid grid-cols-7 gap-0.5 mb-1">
            {days.map((d, i) => (
              <div key={i} className="text-center text-xs text-gray-400 font-medium py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-0.5">
            {calDates.map((d, i) => {
              const date = d + 1;
              const isToday = date === today;
              const isValid = date >= 1 && date <= 30;
              return (
                <div key={i} className={`text-center text-xs py-1.5 rounded-full cursor-pointer ${
                  isToday ? 'bg-indigo-600 text-white font-semibold' :
                  isValid ? 'text-gray-600 hover:bg-indigo-50' : 'text-gray-200'
                }`}>
                  {isValid ? date : ''}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Booking List + Schedule */}
      <div className="grid grid-cols-3 gap-4">
        {/* Booking Table */}
        <div className="col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-900">Booking List</span>
            <span className="text-xs text-gray-400">···</span>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400">#</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400">Resource</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400">User</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400">Start</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" className="px-5 py-8 text-center text-sm text-gray-400">Loading...</td></tr>
              ) : bookings.length === 0 ? (
                <tr><td colSpan="5" className="px-5 py-8 text-center text-sm text-gray-400">No bookings found</td></tr>
              ) : bookings.slice(0, 6).map((b, i) => (
                <tr key={b.id} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3 text-gray-400">{i + 1}</td>
                  <td className="px-5 py-3">
                    <span className="bg-indigo-50 text-indigo-600 text-xs font-medium px-2 py-1 rounded-md">{b.resourceId}</span>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{b.userId}</td>
                  <td className="px-5 py-3 text-gray-500">{new Date(b.startTime).toLocaleDateString()}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      b.status === 'APPROVED' ? 'bg-green-50 text-green-700' :
                      b.status === 'PENDING' ? 'bg-amber-50 text-amber-700' :
                      b.status === 'REJECTED' ? 'bg-red-50 text-red-700' :
                      'bg-gray-100 text-gray-500'
                    }`}>{b.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Upcoming / Pending Actions */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50">
            <span className="text-sm font-semibold text-gray-900">Pending Actions</span>
          </div>
          <div className="p-4">
            {loading ? (
              <p className="text-sm text-gray-400 text-center py-4">Loading...</p>
            ) : pending.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">No pending bookings</p>
            ) : pending.slice(0, 4).map((b, i) => {
              const colors = ['bg-indigo-600', 'bg-green-500', 'bg-amber-500', 'bg-red-500'];
              return (
                <div key={b.id} className="flex items-start gap-3 mb-4 pb-4 border-b border-gray-50 last:border-0 last:mb-0 last:pb-0">
                  <div className={`w-8 h-8 rounded-lg ${colors[i % 4]} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                    {b.resourceId.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{b.purpose}</p>
                    <p className="text-xs text-gray-400">{b.resourceId}</p>
                    <p className="text-xs text-gray-400">{new Date(b.startTime).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <button onClick={() => handleApprove(b.id)}
                      className="bg-green-50 text-green-700 border border-green-200 text-xs px-2 py-0.5 rounded">✓</button>
                    <button onClick={() => handleReject(b.id)}
                      className="bg-red-50 text-red-700 border border-red-200 text-xs px-2 py-0.5 rounded">✗</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;