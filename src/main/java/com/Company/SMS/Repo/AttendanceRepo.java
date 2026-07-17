package com.Company.SMS.Repo;

import com.Company.SMS.DTO.Attendance.AttendanceChartRES;
import com.Company.SMS.entities.Attendance;
import org.springframework.data.jpa.repository.Modifying;
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
    Long getAttendanceStats();

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

    @Modifying
    @Query("UPDATE Attendance a SET a.session = null WHERE a.session.id = :sessionId")
    void nullifySessionReferences(@Param("sessionId") Long sessionId);

    @Query("""
                SELECT COUNT(a)
                FROM Attendance a
                WHERE a.dateTime >= :startOfDay
                  AND a.dateTime < :startOfNextDay
            """)
    long countByDateBetween(
            @Param("startOfDay") java.time.LocalDateTime startOfDay,
            @Param("startOfNextDay") java.time.LocalDateTime startOfNextDay
    );

    @Query("SELECT a FROM Attendance a WHERE a.student.student_id = :studentId")
    List<Attendance> findByStudentId(@Param("studentId") Long studentId);

    @Query("""
            SELECT COUNT(DISTINCT a.student.student_id)
            FROM Attendance a
            WHERE (a.dateTime >= :startOfDay AND a.dateTime < :startOfNextDay)
            AND a.student.student_id IN (
                SELECT sub.student.student_id
                FROM Attendance sub
                WHERE (sub.dateTime >= :startOfDay AND sub.dateTime < :startOfNextDay)
                  AND sub.status = 'A'
                GROUP BY sub.student.student_id
                HAVING COUNT(sub.id) = 7
            )
            """)
    long countAbsenceByDateBetween(
            @Param("startOfDay") java.time.LocalDateTime startOfDay,
            @Param("startOfNextDay") java.time.LocalDateTime startOfNextDay
    );

    @Query("""
                SELECT COUNT(a)
                FROM Attendance a
                WHERE a.dateTime >= :weekStart
                  AND a.dateTime < :weekEnd
            """)
    long countByWeek(
            @Param("weekStart") java.time.LocalDateTime weekStart,
            @Param("weekEnd")   java.time.LocalDateTime weekEnd
    );

    @Query("""
    SELECT g.name, COUNT(a)
    FROM Attendance a
    JOIN a.student s
    JOIN s.studentClass c
    JOIN c.grade g
    WHERE a.status = 'A'
    GROUP BY g.name
""")
    List<Object[]> countAbsenceByGrade();

    @Query("""
        SELECT a FROM Attendance a
        WHERE a.student.studentClass.id = :classId
        AND a.dateTime >= :dayStart AND a.dateTime < :dayEnd
    """)
    List<Attendance> findGridByClassAndDate(
            @Param("classId") Long classId,
            @Param("dayStart") java.time.LocalDateTime dayStart,
            @Param("dayEnd") java.time.LocalDateTime dayEnd
    );

    @Query("""
        SELECT a FROM Attendance a
        WHERE a.student.student_id = :studentId
        AND a.session.id = :sessionId
        AND a.dateTime >= :dayStart AND a.dateTime < :dayEnd
    """)
    java.util.Optional<Attendance> findByStudentAndSessionOnDate(
            @Param("studentId") Long studentId,
            @Param("sessionId") Long sessionId,
            @Param("dayStart") java.time.LocalDateTime dayStart,
            @Param("dayEnd") java.time.LocalDateTime dayEnd
    );
}

