package com.Company.SMS.DTO.Marks;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MarksRes {

    private Long gradeId;
    private String gradeName;
    private Long StudentId;
    private String studentName;
    private Double Mark;

}
