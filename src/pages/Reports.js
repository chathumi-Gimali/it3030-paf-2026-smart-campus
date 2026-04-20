import React, { useState } from 'react';

const Reports = () => {
  const [activeRange, setActiveRange] = useState('month');

  const metrics = [
    { label: 'Sessions', value: '65.57%', sub: '9,858 vs 5,954' },
    { label: 'Users', value: '96.33%', sub: '6,909 vs 3,519' },
    { label: 'Pageviews', value: '43.24%', sub: '20,175 vs 14,085' },
  ];

  const utilizationData = [
    { label: 'Campus', score: 124 },
    { label: 'Usability Views', score: 85 },
  ];

  const roomBookings = [
    { label: 'Room Bookings', score: 1.88 },
    { label: 'Aroom Bookings', score: 1.72 },
  ];

  const systemStatus = [
    { name: 'API v3.11', status: 'Online', color: 'bg-green-500' },
    { name: 'Database', status: 'Stable', color: 'bg-green-500' },
    { name: 'Mail Server', status: 'Available', color: 'bg-green-500' },
    { name: 'Compute Nodes', status: 'Minor Latency', color: 'bg-amber-400' },
  ];

  const linePoints = [
    [0, 60], [60, 45], [120, 55], [180, 40], [240, 65],
    [300, 50], [360, 70], [420, 45], [480, 60], [540, 35],
    [600, 55], [660, 45], [720, 65], [780, 80], [840, 60],
    [900, 75], [960, 55], [1020, 70],
  ];

  const line2Points = [
    [0, 75], [60, 65], [120, 70], [180, 60], [240, 75],
    [300, 65], [360, 80], [420, 60], [480, 70], [540, 55],
    [600, 65], [660, 60], [720, 75], [780, 65], [840, 70],
    [900, 80], [960, 65], [1020, 75],
  ];

  const toPath = (pts) => pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');
  const toArea = (pts) => `${toPath(pts)} L ${pts[pts.length-1][0]} 100 L 0 100 Z`;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-xl font-medium text-gray-900">Reports & Analytics</h1>
        </div>
        <button className="bg-indigo-600 text-white text-sm px-6 py-2 rounded-lg font-medium">
          EXPORT
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-gray-100 rounded-xl p-4 mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <select className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none text-gray-700">
            <option>Sessions</option>
            <option>Bookings</option>
            <option>Users</option>
          </select>
          <span className="text-sm text-gray-400">VS.</span>
          <select className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none text-gray-400">
            <option>Select a metric</option>
            <option>Approvals</option>
            <option>Rejections</option>
          </select>
        </div>
        <div className="flex gap-1">
          {['hourly', 'day', 'week', 'month'].map(r => (
            <button key={r} onClick={() => setActiveRange(r)}
              className={`text-xs px-3 py-1.5 rounded-md border transition-colors ${
                activeRange === r
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-500 border-gray-200'
              }`}>{r}</button>
          ))}
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white border border-gray-100 rounded-xl p-5 mb-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-blue-500"></div>
              <span className="text-xs text-gray-500">New Visitor</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-green-500"></div>
              <span className="text-xs text-gray-500">Returning Visitor</span>
            </div>
          </div>
        </div>
        <svg viewBox="0 0 1020 100" className="w-full h-40" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#93c5fd" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#86efac" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#86efac" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d={toArea(linePoints)} fill="url(#grad1)"/>
          <path d={toArea(line2Points)} fill="url(#grad2)"/>
          <path d={toPath(linePoints)} fill="none" stroke="#3b82f6" strokeWidth="1.5"/>
          <path d={toPath(line2Points)} fill="none" stroke="#22c55e" strokeWidth="1.5"/>
          {linePoints.filter((_, i) => i % 3 === 0).map((p, i) => (
            <circle key={i} cx={p[0]} cy={p[1]} r="3" fill="#3b82f6"/>
          ))}
          {line2Points.filter((_, i) => i % 3 === 0).map((p, i) => (
            <circle key={i} cx={p[0]} cy={p[1]} r="3" fill="#22c55e"/>
          ))}
        </svg>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Aug 15</span>
          <span>Aug 22</span>
          <span>Aug 29</span>
        </div>
      </div>

      {/* Metrics + Charts */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {/* 3 metric cards */}
        {metrics.map((m, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-1">{m.label}</p>
            <p className="text-2xl font-medium text-indigo-600">{m.value}</p>
            <p className="text-xs text-gray-400 mt-1">{m.sub}</p>
            <svg viewBox="0 0 100 30" className="w-full h-8 mt-2">
              <path d="M0 20 L20 15 L40 18 L60 10 L80 14 L100 8"
                fill="none" stroke="#6366f1" strokeWidth="1.5"/>
            </svg>
          </div>
        ))}

        {/* Donut chart */}
        <div className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col items-center justify-center">
          <p className="text-xs font-medium text-gray-700 mb-2">Campus Utilization</p>
          <svg viewBox="0 0 100 100" width="90" height="90">
            <circle cx="50" cy="50" r="35" fill="none" stroke="#f0f0f0" strokeWidth="14"/>
            <circle cx="50" cy="50" r="35" fill="none" stroke="#4f46e5" strokeWidth="14"
              strokeDasharray="138 220" strokeDashoffset="0" transform="rotate(-90 50 50)"/>
            <circle cx="50" cy="50" r="35" fill="none" stroke="#22c55e" strokeWidth="14"
              strokeDasharray="82 220" strokeDashoffset="-138" transform="rotate(-90 50 50)"/>
            <text x="50" y="46" textAnchor="middle" fontSize="8" fill="#374151" fontWeight="500">Total</text>
            <text x="50" y="57" textAnchor="middle" fontSize="8" fill="#374151" fontWeight="500">Score:</text>
          </svg>
          <div className="flex gap-3 mt-1">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
              <span className="text-xs text-gray-400">33.1%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-400">36.3%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Facility Utilization</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-600">Total Score</th>
              </tr>
            </thead>
            <tbody>
              {utilizationData.map((r, i) => (
                <tr key={i} className="border-t border-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-600">{r.label}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 font-medium text-right">{r.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Room Bookings</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-600">Total Score</th>
              </tr>
            </thead>
            <tbody>
              {roomBookings.map((r, i) => (
                <tr key={i} className="border-t border-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-600">{r.label}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 font-medium text-right">{r.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white border border-gray-100 rounded-xl p-5">
        <h2 className="text-sm font-medium text-gray-900 mb-4">System Status</h2>
        <div className="grid grid-cols-4 gap-4">
          {systemStatus.map((s, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">{s.name}</span>
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${s.color}`}></div>
                <span className="text-xs font-medium text-gray-600">{s.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;