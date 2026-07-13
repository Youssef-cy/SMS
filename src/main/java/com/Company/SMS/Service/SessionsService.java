package com.Company.SMS.Service;

import com.Company.SMS.DTO.Session.SessionREQ;
import com.Company.SMS.DTO.Session.SessionRES;
import com.Company.SMS.DTO.Session.TeacherListRES;
import com.Company.SMS.Repo.ClassRepo;
import com.Company.SMS.Repo.CourseRepo;
import com.Company.SMS.Repo.GradeRepo;
import com.Company.SMS.Repo.SessionsRepo;
import com.Company.SMS.entities.Class;
import com.Company.SMS.entities.Course;
import com.Company.SMS.entities.Grade;
import com.Company.SMS.entities.Session;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class SessionsService {

    @Autowired
    private SessionsRepo repo;

    @Autowired
    private ClassRepo classRepo;

    @Autowired
    private CourseRepo courseRepo;
    @Autowired
    private GradeRepo gradeRepo;

    // ========================= GET ALL SESSIONS =========================

    public List<SessionRES> allSessions(@Param("classId") Long classId) {

        List<SessionRES> sessions = repo.findAllSessionsByClassId(classId);

        if (sessions == null || sessions.isEmpty()) {
            return Collections.emptyList();
        }

        return sessions;
    }

    // ========================= ADD SESSION =========================

    public SessionRES addSession(SessionREQ request) {

        Class classEntity = classRepo.findById(request.getClassid())
                .orElseThrow(() -> new EntityNotFoundException("Class not found"));

        Course course = courseRepo.findById(request.getCourseid())
                .orElseThrow(() -> new EntityNotFoundException("Course not found"));

        Session session = new Session();

        session.setClassField(classEntity);
        session.setCourse(course);

        session.setDayOfWeek(request.getDayOfWeek().longValue());
        session.setStartAt(request.getStartAt());
        session.setEndAt(request.getEndAt());

        session.setUpdatedAt(request.getUpdated());

        Session saved = repo.save(session);

        return new SessionRES(
                saved.getId(),
                saved.getClassField().getName(),
                saved.getCourse().getCourseName(),
                saved.getCourse().getTeacher().getUser().getFirstName(),
                saved.getDayOfWeek(),
                saved.getStartAt(),
                saved.getEndAt()
        );
    }

    // ========================= SAVE ALL SESSIONS (BATCH UPDATE/DELETE) =========================
    @Transactional
    public List<SessionRES> saveAllSessions(Long classId, List<SessionREQ> requests) {
        List<Session> existingSessions = repo.findAllByClassFieldId(classId);

        Map<String, Session> existingMap = new HashMap<>();
        for (Session s : existingSessions) {
            String key = s.getDayOfWeek() + "-" + s.getStartAt();
            existingMap.put(key, s);
        }

        List<Session> toSave = new ArrayList<>();
        Set<String> processedKeys = new HashSet<>();

        for (SessionREQ req : requests) {
            String key = req.getDayOfWeek() + "-" + req.getStartAt();
            processedKeys.add(key);

            Session session = existingMap.get(key);
            Course course = courseRepo.findById(req.getCourseid())
                    .orElseThrow(() -> new EntityNotFoundException("Course not found"));

            if (session != null) {
                session.setCourse(course);
                session.setEndAt(req.getEndAt());
                session.setUpdatedAt(req.getUpdated());
            } else {
                Class classEntity = classRepo.findById(req.getClassid())
                        .orElseThrow(() -> new EntityNotFoundException("Class not found"));
                session = new Session();
                session.setClassField(classEntity);
                session.setCourse(course);
                session.setDayOfWeek(req.getDayOfWeek().longValue());
                session.setStartAt(req.getStartAt());
                session.setEndAt(req.getEndAt());
                session.setUpdatedAt(req.getUpdated());
            }
            toSave.add(session);
        }

        for (Session s : existingSessions) {
            String key = s.getDayOfWeek() + "-" + s.getStartAt();
            if (!processedKeys.contains(key)) {
                repo.delete(s);
            }
        }

        List<Session> savedList = repo.saveAll(toSave);

        List<SessionRES> response = new ArrayList<>();
        for (Session saved : savedList) {
            response.add(new SessionRES(
                    saved.getId(),
                    saved.getClassField().getName(),
                    saved.getCourse().getCourseName(),
                    saved.getCourse().getTeacher().getUser().getFirstName(),
                    saved.getDayOfWeek(),
                    saved.getStartAt(),
                    saved.getEndAt()
            ));
        }
        return response;
    }

    // ========================= GET TEACHERS =========================

    public List<TeacherListRES> AllTeacherList() {

        List<TeacherListRES> teacherList = repo.findAllTeacherList();

        if (teacherList == null || teacherList.isEmpty()) {
            return Collections.emptyList();
        }

        return teacherList;
    }


//    ===============================grade====================


    public List<Grade> getAllGrades (){
        return gradeRepo.findAll();
    }


//    =====================class====================


    public List<Class> getAllClasses (){
        return classRepo.findAll();
    }


}