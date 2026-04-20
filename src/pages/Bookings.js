import React, { useState, useEffect } from 'react';
import bookingService from '../services/bookingService';

const statusBadge = (status) => {
  const styles = {
    PENDING: 'bg-amber-50 text-amber-700',
    APPROVED: 'bg-green-50 text-green-700',
    REJECTED: 'bg-red-50 text-red-700',
    CANCELLED: 'bg-gray-100 text-gray-500',
  };
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${styles[status]}`}>
      {status}
    </span>
  );
};

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ALL');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    resourceId: '', userId: '', purpose: '',
    expectedAttendees: 1, startTime: '', endTime: ''
  });

  const fetchBookings = () => {
    bookingService.getAllBookings()
      .then(res => { setBookings(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchBookings(); }, []);

  const filtered = bookings.filter(b => {
    const matchTab = activeTab === 'ALL' || b.status === activeTab;
    const matchSearch =
      b.resourceId.toLowerCase().includes(search.toLowerCase()) ||
      b.userId.toLowerCase().includes(search.toLowerCase()) ||
      b.purpose.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const handleApprove = (id) => bookingService.approveBooking(id).then(fetchBookings);

  const handleReject = (id) => {
    const reason = prompt('Enter rejection reason:');
    if (reason) bookingService.rejectBooking(id, reason).then(fetchBookings);
  };

  const handleCancel = (id) => bookingService.cancelBooking(id).then(fetchBookings);

  const handleSubmit = () => {
    bookingService.createBooking(form)
      .then(() => { setShowForm(false); fetchBookings(); })
      .catch(err => alert('Error: ' + JSON.stringify(err.response?.data)));
  };

  const tabs = ['ALL', 'PENDING', 'APPROVED', 'REJECTED', 'CANCELLED'];

  return (
    <div className="p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-xl font-medium text-gray-900">Booking Management</h1>
          <p className="text-sm text-gray-400 mt-1">Manage and track all facility bookings.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg">
          + New Booking
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-gray-100 rounded-xl p-5 mb-5">
          <h2 className="text-sm font-medium text-gray-900 mb-4">Create New Booking</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Resource ID</label>
              <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
                placeholder="e.g. room-101"
                value={form.resourceId}
                onChange={e => setForm({...form, resourceId: e.target.value})} />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">User ID</label>
              <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
                placeholder="e.g. user-001"
                value={form.userId}
                onChange={e => setForm({...form, userId: e.target.value})} />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Purpose</label>
              <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
                placeholder="e.g. Team Meeting"
                value={form.purpose}
                onChange={e => setForm({...form, purpose: e.target.value})} />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Expected Attendees</label>
              <input type="number"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
                value={form.expectedAttendees}
                onChange={e => setForm({...form, expectedAttendees: parseInt(e.target.value)})} />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Start Time</label>
              <input type="datetime-local"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
                value={form.startTime}
                onChange={e => setForm({...form, startTime: e.target.value})} />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">End Time</label>
              <input type="datetime-local"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
                value={form.endTime}
                onChange={e => setForm({...form, endTime: e.target.value})} />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleSubmit}
              className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg">
              Submit Booking
            </button>
            <button onClick={() => setShowForm(false)}
              className="border border-gray-200 text-gray-500 text-sm px-4 py-2 rounded-lg">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: 'Total', value: bookings.length, color: 'text-indigo-600' },
          { label: 'Pending', value: bookings.filter(b => b.status === 'PENDING').length, color: 'text-amber-600' },
          { label: 'Approved', value: bookings.filter(b => b.status === 'APPROVED').length, color: 'text-green-600' },
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
          <span className="text-sm font-medium text-gray-900">All Bookings</span>
          <input
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none bg-gray-50 w-48"
            placeholder="Search bookings..."
            value={search}
            onChange={e => setSearch(e.target.value)} />
        </div>
        {loading ? (
          <div className="p-8 text-center text-sm text-gray-400">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-400">No bookings found</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Resource</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">User</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Purpose</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Start Time</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Status</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.id} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <span className="bg-indigo-50 text-indigo-600 text-xs font-medium px-2 py-1 rounded-md">
                      {b.resourceId}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{b.userId}</td>
                  <td className="px-5 py-3 text-gray-600">{b.purpose}</td>
                  <td className="px-5 py-3 text-gray-500">{new Date(b.startTime).toLocaleString()}</td>
                  <td className="px-5 py-3">{statusBadge(b.status)}</td>
                  <td className="px-5 py-3">
                    {b.status === 'PENDING' && (
                      <>
                        <button onClick={() => handleApprove(b.id)}
                          className="bg-green-50 text-green-700 border border-green-200 text-xs px-3 py-1 rounded-md mr-2">
                          Approve
                        </button>
                        <button onClick={() => handleReject(b.id)}
                          className="bg-red-50 text-red-700 border border-red-200 text-xs px-3 py-1 rounded-md">
                          Reject
                        </button>
                      </>
                    )}
                    {b.status === 'APPROVED' && (
                      <button onClick={() => handleCancel(b.id)}
                        className="bg-gray-100 text-gray-600 border border-gray-200 text-xs px-3 py-1 rounded-md">
                        Cancel
                      </button>
                    )}
                    {(b.status === 'REJECTED' || b.status === 'CANCELLED') && (
                      <span className="text-xs text-gray-400">No actions</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Bookings;