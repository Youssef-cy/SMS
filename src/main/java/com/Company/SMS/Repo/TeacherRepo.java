package com.Company.SMS.Repo;

import com.Company.SMS.DTO.Course.CourseInfo;
import com.Company.SMS.DTO.Teacher.TeacherRES;
import com.Company.SMS.entities.Teacher;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherRepo extends CrudRepository<Teacher, Long> {
    @Query("""
            SELECT new com.Company.SMS.DTO.Teacher.TeacherRES(
                t.id,
                u.firstName,
                u.email,
                u.password,
                u.role.roleName,
                c.courseName,
                u.isDeleted
            )
            FROM Teacher t
            JOIN t.user u
            LEFT JOIN Course c ON c.teacher = t
            """)
    List<TeacherRES> getAllTeachers();

    @Query("""
            select new com.Company.SMS.DTO.Course.CourseInfo(
                c.courseName,
                c.courseType,
                c.description,
                c.grade.id,
                c.term.id,
                c.materials
            )
            from Course c
            where c.teacher.id = :teacherId
            """)
    List<CourseInfo> getTeacherCourses(@Param("teacherId") Long teacherId);

}
