package com.Company.SMS.Controller;

import com.Company.SMS.DTO.Dashboard.DashboardRes;
import com.Company.SMS.DTO.Student.TopStudentRES;
import com.Company.SMS.Service.*;
import com.Company.SMS.entities.Teacher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/API/Dashboard")
public class DashBoardController {
    @Autowired
    TeacherService teacherService;
    @Autowired
    StudentService studentService;
    @Autowired
    AttendanceService attendanceService;
    @Autowired
    MarksService  marksService;
    @Autowired
    ExamService examService;
    @Autowired
    private GradeService gradeService;

    @GetMapping
    public DashboardRes Dashboard(){
        return new DashboardRes(
                attendanceService.getAttendanceStats(),
                examService.countOfExams(),
                marksService.countOfBestStudents(),
                marksService.getFailedStudentsCount(),
                gradeService.getAverageGradesByGrade(),
                attendanceService.getAttendanceChart(),
                examService.getExamForThisWeek()
        );
    }
}
