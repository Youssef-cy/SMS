package com.Company.SMS.Repo;

import com.Company.SMS.DTO.Student.StudentInfoProfileRES;
import com.Company.SMS.DTO.Student.StudentRES;
import com.Company.SMS.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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



    @Query("""
select new com.Company.SMS.DTO.Student.StudentInfoProfileRES(
    s.user.firstName,
    s.user.lastName,
    s.user.email,
    s.user.birthDate,
    s.user.gender,
    s.student_id,
    s.user.nationalNumber,
    s.studentClass.name,
    s.studentClass.grade.name
)
from Student s
where s.student_id = :studentId
""")
    StudentInfoProfileRES getProfile(@Param("studentId") Long studentId);

    List<Student> findByStudentClassIdOrderByUserFirstNameAsc(Long classId);
    
    long countByStudentClassId(Long classId);

}

