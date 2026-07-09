package com.Company.SMS.DTO.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkerInfo {

    private String firstName;
    private String firstNameInArabic;
    private String lastName;
    private String lastNameInArabic;
    private Long nationalNumber;
    private String email;
    private String password;
    private String address;
    private char gender;
    private String nationality;
    private LocalDate birthDate;
    private Long role;
    private boolean isDeleted;
    private String religion;
}