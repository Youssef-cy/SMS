package com.Company.SMS.DTO.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SessionAttendanceResponse {
    private Long sessionId;
    private int periodNumber;   // 1-based ordering index for the column header
    private String courseName;
    private java.time.LocalTime startAt;
    private java.time.LocalTime endAt;
    private Character status; // null = not recorded yet; 'P'/'A'/'L'/'E'
}

