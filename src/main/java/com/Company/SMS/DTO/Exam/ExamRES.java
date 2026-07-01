package com.Company.SMS.DTO.Exam;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExamRES {

    private Long id;
    private String courseName;
    private Long duration;
    private String gradeName;
    private String committeeName;
    private LocalDate examDate;
    private LocalTime examTime;
    private String status;

}
