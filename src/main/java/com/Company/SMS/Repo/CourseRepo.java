package com.Company.SMS.Repo;

import com.Company.SMS.DTO.material.MaterialRes;
import com.Company.SMS.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepo extends JpaRepository<Course, Long> {

    //return all materials
    @Query("""
    SELECT new com.Company.SMS.DTO.material.MaterialRes(
        c.materials,
        c.teacher.user.firstName,
        c.courseName,
        c.courseType,
        s.classField.grade.name
    )
    FROM Course c
    JOIN Session s ON s.course = c
   
""")
    List<MaterialRes> findMaterials();

    @Query("""
    SELECT new com.Company.SMS.DTO.material.MaterialRes(
        c.materials,
        c.teacher.user.firstName,
        c.courseName,
        c.courseType,
        s.classField.grade.name
    )
    FROM Course c
    JOIN Session s ON s.course = c
    WHERE c.courseName = :courseName
""")
    List<MaterialRes> findMaterialsByCourseName(@Param("courseName") String courseName);
}
