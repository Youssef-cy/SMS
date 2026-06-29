package com.Company.SMS.Controller;

import com.Company.SMS.DTO.Dashboard.DashboardRes;
import com.Company.SMS.DTO.Student.TopStudentRES;
import com.Company.SMS.Service.AttendanceService;
import com.Company.SMS.Service.StudentService;
import com.Company.SMS.Service.TeacherService;
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

    @GetMapping("/")
    public DashboardRes Dashboard(){
        DashboardRes dashboardRes = new DashboardRes(
           studentService.sumOfStudent(),
           teacherService.sumOfTeachers(),
           studentService.getTop3StudentsEachGrade(),
            attendanceService.getTodayAbsence()
        );
    return dashboardRes;
    }






}
