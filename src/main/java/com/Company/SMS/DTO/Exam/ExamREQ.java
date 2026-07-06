package com.Company.SMS.DTO.Exam;

import com.Company.SMS.entities.ExamType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExamREQ {
    private String courseName;
    private Long duration;
    private Long gradeId;
    private String committeeName;
    private LocalDate examDate;
    private LocalTime examTime;
    private String status;
    private ExamType examType;
}
