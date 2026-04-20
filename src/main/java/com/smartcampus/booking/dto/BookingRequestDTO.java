package com.smartcampus.booking.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class BookingRequestDTO {

    @NotBlank(message = "Resource ID is required")
    private String resourceId;

    @NotBlank(message = "User ID is required")
    private String userId;

    @NotBlank(message = "Purpose is required")
    @Size(max = 255, message = "Purpose must be under 255 characters")
    private String purpose;

    @Min(value = 1, message = "At least 1 attendee required")
    private int expectedAttendees;

    @NotNull(message = "Start time is required")
    @Future(message = "Start time must be in the future")
    private LocalDateTime startTime;

    @NotNull(message = "End time is required")
    @Future(message = "End time must be in the future")
    private LocalDateTime endTime;
}