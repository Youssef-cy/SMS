package com.Company.SMS.Controller;

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


    @GetMapping("/Teachers/Count")
    public Long sumOfTeachers() {
        return teacherService.sumOfTeachers();
    }
    @GetMapping("/Students/Count")
    public Long sumOfStudents() {
        return studentService.sumOfStudent();
    }




}
