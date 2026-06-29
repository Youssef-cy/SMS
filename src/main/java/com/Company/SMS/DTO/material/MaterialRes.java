package com.Company.SMS.DTO.material;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MaterialRes {
    private String MaterialLink;
    private String TeacherName;
    private String courseName;
    private String coursetype;
    private String grade;
}
