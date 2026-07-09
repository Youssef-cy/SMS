package com.Company.SMS.DTO.Course;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseInfo {

    private String subject;
    private String subjectType;
    private String subjectDescription;
    private Long gradeId;
    private Long termId;
    private String materials;
}