package com.Company.SMS.Service;

import com.Company.SMS.DTO.Grades.GradeAverageRES;
import com.Company.SMS.DTO.Grades.GradeREQ;
import com.Company.SMS.DTO.Grades.GradeRES;
import com.Company.SMS.DTO.User.UserRes;
import com.Company.SMS.Repo.GradeRepo;
import com.Company.SMS.Repo.MarkRepo;
import com.Company.SMS.Repo.TermRepo;
import com.Company.SMS.entities.Grade;
import com.Company.SMS.entities.Term;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class GradeService {

    @Autowired
    private GradeRepo gradeRepo;
    @Autowired
    TermRepo termRepo;
    @Autowired
    MarkRepo markRepo;

    public List<GradeRES> findAll(){
        return gradeRepo.findAllGrade();
    }


    public void addGrade(GradeREQ gradeREQ) {

        Set<Term> terms = termRepo.findAllById(gradeREQ.getTermIds())
                .stream()
                .collect(Collectors.toSet());

        Grade grade = new Grade();
        grade.setName(gradeREQ.getGradeName());
        grade.setYear(gradeREQ.getYear());
        grade.setTerms(terms);
        gradeRepo.save(grade);
    }


    public List<GradeAverageRES> getAverageGradesByGrade() {
       return markRepo.getAverageGradesByGrade();
    }

}
