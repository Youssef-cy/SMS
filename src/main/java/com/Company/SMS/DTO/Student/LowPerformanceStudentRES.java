package com.Company.SMS.DTO.Student;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LowPerformanceStudentRES {

    private Long id;
    private String studentName;
    private Double average;
}