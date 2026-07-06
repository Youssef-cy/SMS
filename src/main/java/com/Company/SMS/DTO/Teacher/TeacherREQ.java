package com.Company.SMS.DTO.Teacher;

import com.Company.SMS.entities.Grade;
import com.Company.SMS.entities.Role;
import com.Company.SMS.entities.Term;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeacherREQ {
    private String firstName;
    private String firstNameAnArabic;
    private String lastName;
    private String lastNameAnArabic;
    private Long nationalId;
    private String email;
    private String password;
    private String address;
    private char gender;
    private String nationality;
    private LocalDate birthDate;
    private Long role;
    private String subject;
    private String subjectType;
    private String subjectDescription;
    private Long gradeId;
    private boolean isDeleted;
    private String religion;
    private String education;
    private String employeeHistory;
    private Long numberYearsOfExperience;
    private Long termId;
    private String materials;
}
