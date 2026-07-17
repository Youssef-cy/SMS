package com.Company.SMS.Service;

import lombok.extern.slf4j.Slf4j;
import com.Company.SMS.DTO.material.MaterialRes;
import com.Company.SMS.Repo.CourseRepo;
import com.Company.SMS.entities.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class MaterialService {

    @Autowired
    CourseRepo courseRepo;

    //    all materials
    public List<MaterialRes> findAllMaterials(){
        List<MaterialRes> materials = courseRepo.findMaterials();
        log.info("Found materials: {}", materials);
        return materials;
    }

    public void updateCourseMaterial(Long courseId, String material) {
        Course course = courseRepo.findById(courseId)
            .orElseThrow(() -> new RuntimeException("Course not found"));
        course.setMaterials(material);
        courseRepo.save(course);
    }



}

