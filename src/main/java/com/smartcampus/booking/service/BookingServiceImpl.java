package com.smartcampus.booking.service;

import com.smartcampus.booking.dto.BookingRequestDTO;
import com.smartcampus.booking.dto.BookingResponseDTO;
import com.smartcampus.booking.enums.BookingStatus;
import com.smartcampus.booking.exception.BookingConflictException;
import com.smartcampus.booking.exception.ResourceNotFoundException;
import com.smartcampus.booking.model.Booking;
import com.smartcampus.booking.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;

    @Override
    public BookingResponseDTO createBooking(BookingRequestDTO dto) {
        List<Booking> conflicts = bookingRepository.findConflictingBookings(
                dto.getResourceId(), dto.getStartTime(), dto.getEndTime());

        if (!conflicts.isEmpty()) {
            throw new BookingConflictException(
                "Resource is already booked during the requested time slot.");
        }

        Booking booking = new Booking();
        booking.setResourceId(dto.getResourceId());
        booking.setUserId(dto.getUserId());
        booking.setPurpose(dto.getPurpose());
        booking.setExpectedAttendees(dto.getExpectedAttendees());
        booking.setStartTime(dto.getStartTime());
        booking.setEndTime(dto.getEndTime());
        booking.setStatus(BookingStatus.PENDING);

        return mapToResponse(bookingRepository.save(booking));
    }

    @Override
    public BookingResponseDTO approveBooking(String id) {
        Booking booking = findById(id);
        booking.setStatus(BookingStatus.APPROVED);
        booking.setUpdatedAt(LocalDateTime.now());
        return mapToResponse(bookingRepository.save(booking));
    }

    @Override
    public BookingResponseDTO rejectBooking(String id, String reason) {
        Booking booking = findById(id);
        booking.setStatus(BookingStatus.REJECTED);
        booking.setRejectionReason(reason);
        booking.setUpdatedAt(LocalDateTime.now());
        return mapToResponse(bookingRepository.save(booking));
    }

    @Override
    public BookingResponseDTO cancelBooking(String id) {
        Booking booking = findById(id);
        if (booking.getStatus() != BookingStatus.APPROVED) {
            throw new IllegalStateException("Only APPROVED bookings can be cancelled.");
        }
        booking.setStatus(BookingStatus.CANCELLED);
        booking.setUpdatedAt(LocalDateTime.now());
        return mapToResponse(bookingRepository.save(booking));
    }

    @Override
    public BookingResponseDTO getBookingById(String id) {
        return mapToResponse(findById(id));
    }

    @Override
    public List<BookingResponseDTO> getBookingsByUser(String userId) {
        return bookingRepository.findByUserId(userId)
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public List<BookingResponseDTO> getAllBookings() {
        return bookingRepository.findAll()
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    private Booking findById(String id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found: " + id));
    }

    private BookingResponseDTO mapToResponse(Booking b) {
        BookingResponseDTO dto = new BookingResponseDTO();
        dto.setId(b.getId());
        dto.setResourceId(b.getResourceId());
        dto.setUserId(b.getUserId());
        dto.setPurpose(b.getPurpose());
        dto.setExpectedAttendees(b.getExpectedAttendees());
        dto.setStartTime(b.getStartTime());
        dto.setEndTime(b.getEndTime());
        dto.setStatus(b.getStatus());
        dto.setRejectionReason(b.getRejectionReason());
        dto.setCreatedAt(b.getCreatedAt());
        return dto;
    }
}