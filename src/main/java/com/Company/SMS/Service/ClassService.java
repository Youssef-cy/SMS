package com.Company.SMS.Service;

import com.Company.SMS.DTO.Class.ClassREQ;
import com.Company.SMS.DTO.Class.ClassRes;
import com.Company.SMS.Repo.ClassRepo;
import com.Company.SMS.Repo.GradeRepo;
import com.Company.SMS.entities.Class;
import com.Company.SMS.entities.Grade;
import com.Company.SMS.Repo.StudentRepo;
import com.Company.SMS.Repo.SessionsRepo;
import com.Company.SMS.Repo.AttendanceRepo;
import com.Company.SMS.entities.Student;
import com.Company.SMS.entities.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;

@Service
public class ClassService {
    @Autowired
    ClassRepo classRepo;
    @Autowired
    GradeRepo gradeRepo;
    @Autowired
    StudentRepo studentRepo;
    @Autowired
    SessionsRepo sessionsRepo;
    @Autowired
    AttendanceRepo attendanceRepo;

    public List<ClassRes> findAllClass() {
        List<ClassRes> classResList = classRepo.findAllClassRes();
        if (classResList != null && !classResList.isEmpty()) {
            return classResList;
        }
        return Collections.emptyList();
    }

    public void saveClass(ClassREQ classREQ) {

        com.Company.SMS.entities.Grade grade = gradeRepo.findById(classREQ.getGradeId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Grade not found"));

        Class newClass = new Class();
        newClass.setName(classREQ.getClassName());
        newClass.setGrade(grade);
        newClass.setCapacity(classREQ.getCapacity());
        classRepo.save(newClass);

    }

    public void updateClass(Long id, ClassREQ classREQ) {
        Class existingClass = classRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Class not found"));

        com.Company.SMS.entities.Grade grade = gradeRepo.findById(classREQ.getGradeId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Grade not found"));

        existingClass.setName(classREQ.getClassName());
        existingClass.setGrade(grade);
        existingClass.setCapacity(classREQ.getCapacity());
        classRepo.save(existingClass);
    }

    @Transactional
    public void deleteClass(Long id) {
        if (!classRepo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Class not found");
        }

        // 1. Set the class of all students to null
        List<Student> students = studentRepo.findByStudentClassIdOrderByUserFirstNameAsc(id);
        for (Student student : students) {
            student.setStudentClass(null);
        }
        studentRepo.saveAll(students);

        // 2. Find all sessions of this class
        List<Session> sessions = sessionsRepo.findAllByClassFieldId(id);
        for (Session session : sessions) {
            // Nullify attendance references for each session
            attendanceRepo.nullifySessionReferences(session.getId());
        }

        // 3. Delete all sessions associated with this class
        sessionsRepo.deleteAll(sessions);

        // 4. Delete the class itself
        classRepo.deleteById(id);
    }

    public void deleteAllClasses() {
        classRepo.deleteAll();
    }
}
