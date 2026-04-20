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

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = 'user-001';

  const fetchBookings = () => {
    bookingService.getBookingsByUser(userId)
      .then(res => { setBookings(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleCancel = (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      bookingService.cancelBooking(id).then(fetchBookings);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-xl font-medium text-gray-900">My Bookings</h1>
          <p className="text-sm text-gray-400 mt-1">Bookings you've created and requested.</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">My Bookings</p>
          <p className="text-2xl font-medium text-indigo-600">{bookings.length}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">Approved</p>
          <p className="text-2xl font-medium text-green-600">
            {bookings.filter(b => b.status === 'APPROVED').length}
          </p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">Pending</p>
          <p className="text-2xl font-medium text-amber-600">
            {bookings.filter(b => b.status === 'PENDING').length}
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50">
          <span className="text-sm font-medium text-gray-900">My Booking History</span>
        </div>
        {loading ? (
          <div className="p-8 text-center text-sm text-gray-400">Loading...</div>
        ) : bookings.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-400">No bookings found</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Resource</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Purpose</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Start Time</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">End Time</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Attendees</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Status</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <span className="bg-indigo-50 text-indigo-600 text-xs font-medium px-2 py-1 rounded-md">
                      {b.resourceId}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{b.purpose}</td>
                  <td className="px-5 py-3 text-gray-500">{new Date(b.startTime).toLocaleString()}</td>
                  <td className="px-5 py-3 text-gray-500">{new Date(b.endTime).toLocaleString()}</td>
                  <td className="px-5 py-3 text-gray-600">{b.expectedAttendees}</td>
                  <td className="px-5 py-3">{statusBadge(b.status)}</td>
                  <td className="px-5 py-3">
                    {b.status === 'APPROVED' ? (
                      <button onClick={() => handleCancel(b.id)}
                        className="bg-red-50 text-red-700 border border-red-200 text-xs px-3 py-1 rounded-md">
                        Cancel
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
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

export default MyBookings;