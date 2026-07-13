package com.Company.SMS.DTO.Grades;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GradeAverageRES {

    private String gradeName;
    private Double average;
}
