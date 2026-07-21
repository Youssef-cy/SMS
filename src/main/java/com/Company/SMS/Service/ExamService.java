package com.Company.SMS.Service;

import com.Company.SMS.DTO.Exam.ExamREQ;
import com.Company.SMS.DTO.Exam.ExamRES;
import com.Company.SMS.Repo.ExamRepo;
import com.Company.SMS.Repo.GradeRepo;
import com.Company.SMS.entities.ExamTable;
import com.Company.SMS.entities.Grade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
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

    public Long countOfExams() {
        return allExams().stream().count();
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

    public void updateExam(Long id, ExamREQ req) {
        ExamTable exam = examRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        Grade grade = gradeRepo.findById(req.getGradeId())
                .orElseThrow(() -> new RuntimeException("Grade not found"));

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

    public void deleteExam(Long id) {
        if (!examRepo.existsById(id)) {
            throw new RuntimeException("Exam not found");
        }
        examRepo.deleteById(id);
    }


    public List<ExamRES> getExamForThisWeek() {
        // Determine the start of the current week (Saturday) using the previous or same Saturday.
        // The original implementation used .with(DayOfWeek.SATURDAY) which returns the *next* Saturday
        // when the current day is after Saturday, causing the week window to be shifted forward.
        LocalDate startOfWeek = LocalDate.now()
                .with(java.time.temporal.TemporalAdjusters.previousOrSame(DayOfWeek.SATURDAY));
        // The week spans Saturday through the following Friday (6 days after the start).
        LocalDate endOfWeek = startOfWeek.plusDays(6);
        return examRepo.getExamsThisWeek(startOfWeek, endOfWeek);
    }

}
