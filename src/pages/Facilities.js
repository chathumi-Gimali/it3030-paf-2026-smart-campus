import React, { useState } from 'react';

const facilities = [
  { id: 1, name: 'Room 101', type: 'Meeting Room', location: 'Block A, Floor 1', capacity: 10, status: 'ACTIVE' },
  { id: 2, name: 'Lab A', type: 'Laboratory', location: 'Block B, Floor 2', capacity: 30, status: 'ACTIVE' },
  { id: 3, name: 'Auditorium', type: 'Lecture Hall', location: 'Main Block', capacity: 200, status: 'ACTIVE' },
  { id: 4, name: 'Meeting Room B', type: 'Meeting Room', location: 'Block A, Floor 2', capacity: 8, status: 'MAINTENANCE' },
  { id: 5, name: 'Lab B', type: 'Laboratory', location: 'Block B, Floor 1', capacity: 25, status: 'ACTIVE' },
  { id: 6, name: 'Projector #3', type: 'Equipment', location: 'Store Room', capacity: 1, status: 'OUT_OF_SERVICE' },
  { id: 7, name: 'Room 203', type: 'Meeting Room', location: 'Block C, Floor 2', capacity: 15, status: 'ACTIVE' },
  { id: 8, name: 'Camera Set #1', type: 'Equipment', location: 'Store Room', capacity: 1, status: 'ACTIVE' },
];

const statusBadge = (status) => {
  const styles = {
    ACTIVE: 'bg-green-50 text-green-700',
    MAINTENANCE: 'bg-amber-50 text-amber-700',
    OUT_OF_SERVICE: 'bg-red-50 text-red-700',
  };
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${styles[status]}`}>
      {status.replace('_', ' ')}
    </span>
  );
};

const Facilities = () => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  const tabs = ['ALL', 'Meeting Room', 'Laboratory', 'Lecture Hall', 'Equipment'];

  const filtered = facilities.filter(f => {
    const matchTab = activeTab === 'ALL' || f.type === activeTab;
    const matchSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.location.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-xl font-medium text-gray-900">Facilities & Assets</h1>
          <p className="text-sm text-gray-400 mt-1">Browse and manage all bookable resources.</p>
        </div>
        <button className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg">
          + Add Resource
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Total Resources', value: facilities.length, color: 'text-indigo-600' },
          { label: 'Active', value: facilities.filter(f => f.status === 'ACTIVE').length, color: 'text-green-600' },
          { label: 'Maintenance', value: facilities.filter(f => f.status === 'MAINTENANCE').length, color: 'text-amber-600' },
          { label: 'Out of Service', value: facilities.filter(f => f.status === 'OUT_OF_SERVICE').length, color: 'text-red-600' },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-1">{s.label}</p>
            <p className={`text-2xl font-medium ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-5">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-lg text-sm border transition-colors ${
              activeTab === tab
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-gray-500 border-gray-200'
            }`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900">All Resources</span>
          <input
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none bg-gray-50 w-48"
            placeholder="Search resources..."
            value={search}
            onChange={e => setSearch(e.target.value)} />
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Name</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Type</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Location</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Capacity</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Status</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(f => (
              <tr key={f.id} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-5 py-3 font-medium text-gray-900">{f.name}</td>
                <td className="px-5 py-3">
                  <span className="bg-indigo-50 text-indigo-600 text-xs font-medium px-2 py-1 rounded-md">
                    {f.type}
                  </span>
                </td>
                <td className="px-5 py-3 text-gray-500">{f.location}</td>
                <td className="px-5 py-3 text-gray-600">{f.capacity}</td>
                <td className="px-5 py-3">{statusBadge(f.status)}</td>
                <td className="px-5 py-3">
                  <button className="border border-gray-200 text-gray-500 text-xs px-3 py-1 rounded-md mr-2">
                    Edit
                  </button>
                  {f.status === 'ACTIVE' && (
                    <button className="bg-indigo-50 text-indigo-600 border border-indigo-100 text-xs px-3 py-1 rounded-md">
                      Book
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Facilities;