package com.Company.SMS.DTO.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResPost {
    private Long id;
    private String firstName;
    private String email;
    private String password;
    private String role;
    private Boolean isDeleted;
    private String subject;

}
