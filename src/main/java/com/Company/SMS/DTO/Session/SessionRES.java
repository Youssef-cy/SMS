package com.Company.SMS.DTO.Session;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SessionRES {

    private Long id;
    private String className;
    private String courseName;
    private String teacherName;
    private Long dayOfWeek;
    private LocalTime startAt;
    private LocalTime endAt;
}