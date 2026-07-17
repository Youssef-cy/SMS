package com.Company.SMS.DTO.Session;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SessionREQ {
    private Long id;
    private Long classid;
    private Long courseid;
    private Integer dayOfWeek;
    private LocalTime startAt;
    private LocalTime endAt;
    private LocalDate updated;
}
