package com.Company.SMS.Controller;

import com.Company.SMS.DTO.Teacher.TeacherInfo;
import com.Company.SMS.DTO.Teacher.TeacherREQ;
import com.Company.SMS.DTO.Teacher.TeacherRES;
import com.Company.SMS.Service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/API/Teacher")
public class TeacherController {
    @Autowired
    TeacherService teacherService;

    @PostMapping
    public TeacherRES CreateTeacher(@RequestBody TeacherREQ req) {
      return teacherService.addTeacher(req);
    }


    @GetMapping
    public List<TeacherRES> getAllTeacher(){
        return teacherService.allTeacher();
    }

    @GetMapping("/profile")
    public TeacherInfo getTeacherProfile(@RequestParam Long teacherId) {
        return teacherService.getTeacherProfile(teacherId);
    }

}
