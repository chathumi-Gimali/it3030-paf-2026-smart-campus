import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

const bookingService = {
  getAllBookings: () => api.get('/bookings'),
  getBookingById: (id) => api.get(`/bookings/${id}`),
  getBookingsByUser: (userId) => api.get(`/bookings/user/${userId}`),
  createBooking: (data) => api.post('/bookings', data),
  approveBooking: (id) => api.patch(`/bookings/${id}/approve`),
  rejectBooking: (id, reason) => api.patch(`/bookings/${id}/reject`, { reason }),
  cancelBooking: (id) => api.patch(`/bookings/${id}/cancel`),
};

export default bookingService;