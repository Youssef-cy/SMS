package com.Company.SMS.DTO.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRes {
    private Long id;
    private String username;
    private String email;
    private String password;
    private Long role;
    private Boolean isDeleted;

}
