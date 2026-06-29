package com.Company.SMS.DTO.Student;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TopStudentRES {
    private Long gradeId;
    private String gradeName;
    private Long studentId;
    private String studentName;
    private Double totalScore;
}
