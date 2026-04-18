package com.smartcampus.booking.model;

import com.smartcampus.booking.enums.BookingStatus;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "bookings")
public class Booking {

    @Id
    private String id;

    private String resourceId;
    private String userId;
    private String purpose;
    private int expectedAttendees;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    private BookingStatus status = BookingStatus.PENDING;
    private String rejectionReason;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
}