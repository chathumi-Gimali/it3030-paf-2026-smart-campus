package com.smartcampus.booking.dto;

import com.smartcampus.booking.enums.BookingStatus;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class BookingResponseDTO {
    private String id;
    private String resourceId;
    private String userId;
    private String purpose;
    private int expectedAttendees;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private BookingStatus status;
    private String rejectionReason;
    private LocalDateTime createdAt;
}