package com.Company.SMS.Service;

import com.Company.SMS.DTO.Class.ClassRes;
import com.Company.SMS.Repo.ClassRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class ClassService {
    @Autowired
    ClassRepo classRepo;

    public List<ClassRes> findAllClass(){
        List<ClassRes> classResList = classRepo.findAllClassRes();
        if(classResList !=null && !classResList.isEmpty()){
            return classResList;
        }
        return Collections.emptyList();
    }

}
