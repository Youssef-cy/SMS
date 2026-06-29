package com.Company.SMS.Repo;

import com.Company.SMS.DTO.Student.StudentRES;
import com.Company.SMS.entities.Attendance;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttendanceRepo extends CrudRepository<Attendance, Long> {

//   attendance persistent
    @Query("""
SELECT new com.Company.SMS.DTO.Student.StudentRES(
    s.student_id,
    u.firstName,
    c.name,
    g.name,
    (SUM(CASE WHEN a.status = 'A' THEN 1 ELSE 0 END) * 100.0) / COUNT(a.id)
)
FROM Attendance a
JOIN a.student s
JOIN s.user u
JOIN s.studentClass c
JOIN c.grade g
GROUP BY s.student_id, u.firstName, c.name, g.name
""")
    List<StudentRES> getAttendanceStats();

//    attendance for today

    @Query("""
SELECT a
FROM Attendance a
JOIN a.session s
WHERE a.status = 'A'
AND s.dayOfWeek = :dayOfWeek
""")
    List<Attendance> getTodayAbsence(@Param("dayOfWeek") Integer dayOfWeek);

}
