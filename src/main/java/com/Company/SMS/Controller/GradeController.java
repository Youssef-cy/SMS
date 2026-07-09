package com.Company.SMS.Controller;

import com.Company.SMS.DTO.Grades.GradeREQ;
import com.Company.SMS.DTO.Grades.GradeRES;
import com.Company.SMS.Service.GradeService;
import com.Company.SMS.entities.Grade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/API/Grade")
public class GradeController {

    @Autowired
    private GradeService gradeService;


    @GetMapping()
    public List<GradeRES> getAllGrades(){
        return gradeService.findAll();
    }


    @PostMapping
    public void saveGrade(@RequestBody GradeREQ grade){
        gradeService.addGrade(grade);
    }
}
