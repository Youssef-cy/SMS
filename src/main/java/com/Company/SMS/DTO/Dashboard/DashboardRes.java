package com.Company.SMS.DTO.Dashboard;

import com.Company.SMS.DTO.Attendance.AttendanceChartRES;
import com.Company.SMS.DTO.Exam.ExamRES;
import com.Company.SMS.DTO.Grades.GradeAverageRES;
import com.Company.SMS.entities.Attendance;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardRes {
    private Long absentForStudents;
    private Long countExams;
    private Long totalTopStudents;
    private Long totalLowStudents;
    private List<GradeAverageRES>  averageGrades;
    private List<AttendanceChartRES> attendanceChart;
    private List<ExamRES> exams;
}

