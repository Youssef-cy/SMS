package com.Company.SMS.Repo;

import com.Company.SMS.DTO.Student.TopStudentRES;
import com.Company.SMS.entities.Mark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MarkRepo extends JpaRepository<Mark,Long> {
    @Query("""
SELECT new com.Company.SMS.DTO.Student.TopStudentRES(
    g.id,
    g.name,
    s.student_id,
    u.firstName,
    SUM(m.score)
)
FROM Mark m
JOIN m.student s
JOIN s.user u
JOIN s.studentClass c
JOIN c.grade g
GROUP BY
    g.id,
    g.name,
    s.student_id,
    u.firstName
ORDER BY
    g.id,
    SUM(m.score) DESC
""")
    List<TopStudentRES> getStudentsOrderedByGrade();
}
