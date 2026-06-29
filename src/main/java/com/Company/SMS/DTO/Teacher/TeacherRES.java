package com.Company.SMS.DTO.Teacher;

import com.Company.SMS.entities.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeacherRES {

    private Long id;
    private String firstName;
    private String email;
    private String password;
    private Long role;
    private String Subject;
    private boolean isDeleted;


}
