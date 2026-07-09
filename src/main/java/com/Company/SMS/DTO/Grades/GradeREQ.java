package com.Company.SMS.DTO.Grades;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GradeREQ {

    private String gradeName;
    private Long year;
    private Set<Long> termIds;

}