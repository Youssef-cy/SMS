package com.Company.SMS.Repo;

import com.Company.SMS.DTO.Session.SessionRES;
import com.Company.SMS.DTO.Session.TeacherListRES;
import com.Company.SMS.entities.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SessionsRepo extends JpaRepository<Session, Long> {

    // ========================= GET ALL SESSIONS =========================

    @Query("""
                SELECT new com.Company.SMS.DTO.Session.SessionRES(
                    s.id,
                    s.course.id,
                    s.classField.name,
                    s.course.courseName,
                    s.course.teacher.user.firstName,
                    s.dayOfWeek,
                    s.startAt,
                    s.endAt
                )
                FROM Session s
                WHERE s.classField.id = :classId
            """)
    List<SessionRES> findAllSessionsByClassId(@Param("classId") Long classId);

    List<Session> findAllByClassFieldId(Long classId);

    // ========================= GET TEACHERS =========================

    @Query("""
                SELECT new com.Company.SMS.DTO.Session.TeacherListRES(
                    c.id,
                    c.courseName,
                    c.teacher.user.firstName
                )
                FROM Course c
            """)
    List<TeacherListRES> findAllTeacherList();

    List<Session> findByClassField_IdAndDayOfWeekOrderByStartAtAsc(Long classId, Long dayOfWeek);
}