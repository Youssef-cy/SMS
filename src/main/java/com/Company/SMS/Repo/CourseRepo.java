package com.Company.SMS.Repo;

import com.Company.SMS.DTO.Course.CourseInfo;
import com.Company.SMS.DTO.material.MaterialRes;
import com.Company.SMS.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Repository
public interface CourseRepo extends JpaRepository<Course, Long> {

    //return all materials
    @Query("""
        SELECT new com.Company.SMS.DTO.material.MaterialRes(
            g.id,
            g.name,
            t.id,
            t.term,
            c.id,
            c.courseName,
            c.teacher.user.firstName,
            c.materials,
            c.courseType
        )
        FROM Course c
        JOIN c.grade g
        join c.term t
    """)
    List<MaterialRes> findMaterials();


}
