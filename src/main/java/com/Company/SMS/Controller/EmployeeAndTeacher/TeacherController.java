package com.Company.SMS.Controller.EmployeeAndTeacher;

import com.Company.SMS.DTO.Teacher.TeacherREQ;
import com.Company.SMS.DTO.Teacher.TeacherRES;
import com.Company.SMS.Service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/API/Teacher")
public class TeacherController {
    @Autowired
    TeacherService teacherService;

    @PostMapping
    public TeacherRES CreateTeacher(@RequestBody TeacherREQ req) {
      return teacherService.addTeacher(req);
    }

    @PutMapping("/{id}")
    public TeacherRES updateTeacher(@PathVariable Long id, @RequestBody TeacherREQ req) {
        return teacherService.updateTeacher(id, req);
    }
}
