package com.Company.SMS.DTO.Student;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentInfoProfileRES {
    private String firstName;
    private String lastName;
    private String email;
    private LocalDate birthday;
    private char gender;
    private Long studentId;
    private Long nationalId;
    private String className;
    private String gradeName;
}
