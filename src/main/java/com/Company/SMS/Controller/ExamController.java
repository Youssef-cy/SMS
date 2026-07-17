package com.Company.SMS.Controller;

import com.Company.SMS.DTO.Exam.ExamREQ;
import com.Company.SMS.DTO.Exam.ExamRES;
import com.Company.SMS.Service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/API/Exam")
public class ExamController {
    @Autowired
    ExamService examService;

    @GetMapping
    public List<ExamRES> allExams() {
        return examService.allExams();
    }

    @PostMapping
    public void createExam(@RequestBody ExamREQ req) {

        examService.createExam(req);
    }

    @PutMapping("/{id}")
    public void updateExam(@PathVariable Long id, @RequestBody ExamREQ req) {
        examService.updateExam(id, req);
    }

    @DeleteMapping("/{id}")
    public void deleteExam(@PathVariable Long id) {
        examService.deleteExam(id);
    }
}
