package com.Company.SMS.Service;

import com.Company.SMS.DTO.material.MaterialRes;
import com.Company.SMS.Repo.CourseRepo;
import com.Company.SMS.entities.Course;
import jdk.jfr.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MaterialService {

    @Autowired
    CourseRepo courseRepo;

    //    all materials
    public List<MaterialRes> findAllMaterials(){
        List<MaterialRes> materials = courseRepo.findMaterials();
        return materials;
    }

    // find by course name

    public List<MaterialRes> findMaterialsByCourseName(@Param("courseName") String courseName){
        List<MaterialRes> materials = courseRepo.findMaterialsByCourseName(courseName);
        return materials;
    }

}
