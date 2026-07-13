package com.Company.SMS.Repo;

import com.Company.SMS.DTO.Attendance.AttendanceChartRES;
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
SELECT
    
    (SUM(CASE WHEN a.status = 'P' THEN 1 ELSE 0 END) * 100.0) / COUNT(a.id)

FROM Attendance a

""")
    double getAttendanceStats();

//    attendance for today

    @Query("""
SELECT a
FROM Attendance a
JOIN a.session s
WHERE a.status = 'A'
AND s.dayOfWeek = :dayOfWeek
""")
    List<Attendance> getTodayAbsence(@Param("dayOfWeek") Integer dayOfWeek);

    @Query("""
select new com.Company.SMS.DTO.Attendance.AttendanceChartRES(
    s.dayOfWeek,
    count(a.id)
)
from Attendance a
join a.session s
where a.status = 'A'
group by s.dayOfWeek
order by s.dayOfWeek
""")
    List<AttendanceChartRES> getAbsentStudentsByDay();
}

