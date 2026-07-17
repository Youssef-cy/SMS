package com.Company.SMS.DTO.Student;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentRES {
    private Long studentId;
    private String firstName;
    private String className;
    private String gradeName;
    private Double absencePercentage;
}

