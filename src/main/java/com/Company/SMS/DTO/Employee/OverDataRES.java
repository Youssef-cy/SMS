package com.Company.SMS.DTO.Employee;

import com.Company.SMS.DTO.User.UserResPost;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OverDataRES {

    private Long totalEmployees;
    private Long activeEmployees;
    private Long onLeave;
    private Long totalTeacher;
    private List<UserResPost> employeesList;
}

