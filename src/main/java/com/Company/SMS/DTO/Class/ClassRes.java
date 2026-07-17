package com.Company.SMS.DTO.Class;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClassRes {
    private Long id;
    private String className;
    private String grade;
    private String term;
    private Long capacity;
    private Long studentsCount;
}
