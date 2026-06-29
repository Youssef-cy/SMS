package com.Company.SMS.DTO.Session;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeacherListRES {
    private Long id;
    private String courseName;
    private String teacherName;
}
