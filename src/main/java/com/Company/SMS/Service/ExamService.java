package com.Company.SMS.Service;

import com.Company.SMS.DTO.Exam.ExamREQ;
import com.Company.SMS.DTO.Exam.ExamRES;
import com.Company.SMS.Repo.ExamRepo;
import com.Company.SMS.Repo.GradeRepo;
import com.Company.SMS.entities.ExamTable;
import com.Company.SMS.entities.Grade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamService {

    @Autowired
    ExamRepo examRepo;
    @Autowired
    GradeRepo gradeRepo;

    public List<ExamRES> allExams() {
        return examRepo.allExams();
    }


    public void createExam(ExamREQ req) {

        Grade grade = gradeRepo.findById(req.getGradeId())
                .orElseThrow(() -> new RuntimeException("Grade not found"));

        ExamTable exam = new ExamTable();

        exam.setCourseName(req.getCourseName());
        exam.setDuration(req.getDuration());
        exam.setLocation(req.getCommitteeName());
        exam.setExamDate(req.getExamDate());
        exam.setExamTime(req.getExamTime());
        exam.setStatus(req.getStatus());
        exam.setGrade(grade);
        exam.setExamType(req.getExamType());

        examRepo.save(exam);
    }

}
