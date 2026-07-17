package com.Company.SMS.DTO.Teacher;

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
        private String role;
        private String subject;
        private boolean deleted;


}

