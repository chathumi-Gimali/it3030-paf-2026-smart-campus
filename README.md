# Smart Campus Operations Hub - IT3030 PAF Assignment 2026

## Group: [Your Group Number]

## Tech Stack
- Java 21 + Spring Boot 3.4.4
- MongoDB
- React (Frontend)
- GitHub Actions (CI/CD)

## Team Members & Modules
| Member | Module |
|--------|--------|
| Member 1 | Module A - Facilities & Assets Catalogue |
| Member 2 | Module B - Booking Management |
| Member 3 | Module C - Incident Ticketing |
| Member 4 | Module D - Notifications & Auth |

## Setup Instructions

### Backend
1. Install Java 21, Maven, MongoDB
2. Clone the repository
3. Navigate to booking-service folder
4. Run: `mvn spring-boot:run`
5. API runs on: `http://localhost:8080`

### API Endpoints (Module B - Booking Management)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/bookings | Create booking |
| GET | /api/bookings | Get all bookings |
| GET | /api/bookings/{id} | Get booking by ID |
| GET | /api/bookings/user/{userId} | Get user bookings |
| PATCH | /api/bookings/{id}/approve | Approve booking |
| PATCH | /api/bookings/{id}/reject | Reject booking |
| PATCH | /api/bookings/{id}/cancel | Cancel booking |