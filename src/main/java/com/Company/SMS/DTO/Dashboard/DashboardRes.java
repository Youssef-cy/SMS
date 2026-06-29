package com.Company.SMS.DTO.Dashboard;

import com.Company.SMS.DTO.Student.TopStudentRES;
import com.Company.SMS.entities.Attendance;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardRes {
    private Long totalStudents;
    private Long totalTeachers;
    private List<TopStudentRES> topStudents;
    private List<Attendance> absent;

}
