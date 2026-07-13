package com.Company.SMS.Repo;

import com.Company.SMS.DTO.Grades.GradeAverageRES;
import com.Company.SMS.DTO.Marks.MarksRes;
import com.Company.SMS.DTO.Student.LowPerformanceStudentRES;
import com.Company.SMS.DTO.Student.TopStudentRES;
import com.Company.SMS.entities.Mark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MarkRepo extends JpaRepository<Mark,Long> {
    @Query("""

            SELECT new com.Company.SMS.DTO.Marks.MarksRes(
                         g.id,
                         g.name,
                         s.student_id,
                         u.firstName,
                         (SUM(m.score) * 100.0 / 200)
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
    List<MarksRes> getStudentsOrderedByGrade();


    @Query("""
select m.student.student_id
from Mark m
group by m.student.student_id
having avg(m.score) < 50
""")
    List<Long> getFailedStudents();





    @Query("""
select new com.Company.SMS.DTO.Grades.GradeAverageRES(
    s.studentClass.grade.name,
    avg(m.score)
)
from Mark m
join m.student s
group by s.studentClass.grade.name
order by s.studentClass.grade.name
""")
    List<GradeAverageRES> getAverageGradesByGrade();

}
