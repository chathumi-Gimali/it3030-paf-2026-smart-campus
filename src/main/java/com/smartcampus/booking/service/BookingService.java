package com.smartcampus.booking.service;

import com.smartcampus.booking.dto.BookingRequestDTO;
import com.smartcampus.booking.dto.BookingResponseDTO;
import java.util.List;

public interface BookingService {
    BookingResponseDTO createBooking(BookingRequestDTO dto);
    BookingResponseDTO approveBooking(String id);
    BookingResponseDTO rejectBooking(String id, String reason);
    BookingResponseDTO cancelBooking(String id);
    BookingResponseDTO getBookingById(String id);
    List<BookingResponseDTO> getBookingsByUser(String userId);
    List<BookingResponseDTO> getAllBookings();
}