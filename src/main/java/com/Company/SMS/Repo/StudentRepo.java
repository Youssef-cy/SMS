package com.Company.SMS.Repo;

import com.Company.SMS.DTO.Student.StudentRES;
import com.Company.SMS.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepo extends JpaRepository<Student, Long> {
    @Query("""
select new com.Company.SMS.DTO.Student.StudentRES(
    s.student_id,
    s.user.firstName,
    s.studentClass.name,
    s.studentClass.grade.name,
    (count(a) * 100.0 / 
        (select count(a2) from Attendance a2 where a2.student.student_id = s.student_id)
    )
)
from Student s
left join Attendance a 
    on a.student.student_id = s.student_id and a.status = 'P'
group by s.student_id, s.user.firstName, s.studentClass.name, s.studentClass.grade.name
""")
    List<StudentRES> allStudents();
}
