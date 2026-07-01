package com.Company.SMS.DTO.material;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MaterialRes {
    private Long gradeId;
    private String gradeName;
    private Long termId;
    private Long term;
    private Long courseId;
    private String courseName;
    private String teacherName;
    private String materials;
    private String materialType;

}
