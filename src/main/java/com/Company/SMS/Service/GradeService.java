package com.Company.SMS.Service;

import com.Company.SMS.DTO.Grades.GradeRES;
import com.Company.SMS.DTO.User.UserRes;
import com.Company.SMS.Repo.GradeRepo;
import com.Company.SMS.entities.Grade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GradeService {

    @Autowired
    private GradeRepo gradeRepo;


    public List<GradeRES> findAll(){
        return gradeRepo.findAllGrade();
    }

}
