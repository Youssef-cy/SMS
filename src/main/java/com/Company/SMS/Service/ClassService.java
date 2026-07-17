package com.Company.SMS.Service;

import com.Company.SMS.DTO.Class.ClassREQ;
import com.Company.SMS.DTO.Class.ClassRes;
import com.Company.SMS.Repo.ClassRepo;
import com.Company.SMS.Repo.GradeRepo;
import com.Company.SMS.entities.Class;
import com.Company.SMS.entities.Grade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;

@Service
public class ClassService {
    @Autowired
    ClassRepo classRepo;
    @Autowired
    GradeRepo gradeRepo;
    public List<ClassRes> findAllClass(){
        List<ClassRes> classResList = classRepo.findAllClassRes();
        if(classResList !=null && !classResList.isEmpty()){
            return classResList;
        }
        return Collections.emptyList();
    }


    public void saveClass(ClassREQ classREQ){

        com.Company.SMS.entities.Grade grade = gradeRepo.findById(classREQ.getGradeId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Grade not found"));

        Class newClass = new Class();
        newClass.setName(classREQ.getClassName());
        newClass.setGrade(grade);
        newClass.setCapacity(classREQ.getCapacity());
        classRepo.save(newClass);

    }

    public void updateClass(Long id, ClassREQ classREQ){
        Class existingClass = classRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Class not found"));

        com.Company.SMS.entities.Grade grade = gradeRepo.findById(classREQ.getGradeId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Grade not found"));

        existingClass.setName(classREQ.getClassName());
        existingClass.setGrade(grade);
        existingClass.setCapacity(classREQ.getCapacity());
        classRepo.save(existingClass);
    }

    public void deleteClass(Long id) {
        if (!classRepo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Class not found");
        }
        classRepo.deleteById(id);
    }

    public void deleteAllClasses() {
        classRepo.deleteAll();
    }
}

