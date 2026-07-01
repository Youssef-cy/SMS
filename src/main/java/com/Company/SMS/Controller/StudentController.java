package com.Company.SMS.Controller;

import com.Company.SMS.DTO.Student.StudentRES;
import com.Company.SMS.DTO.Student.TopStudentRES;
import com.Company.SMS.Service.StudentService;
import com.Company.SMS.entities.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/API/Student")
public class StudentController {

    @Autowired
    StudentService studentService;
    @GetMapping
    public ResponseEntity<List<StudentRES>> getStudents(){
    List<StudentRES> Students = studentService.students();
    return ResponseEntity.ok(Students);
    }


//    @GetMapping("/Top")
//    public List<TopStudentRES> getTopStudents(){
//        return studentService.getTop3StudentsEachGrade();
//    }

}
