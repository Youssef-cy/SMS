package com.Company.SMS.Service;

import com.Company.SMS.DTO.Teacher.TeacherInfo;
import com.Company.SMS.DTO.Teacher.TeacherREQ;
import com.Company.SMS.DTO.Teacher.TeacherRES;
import com.Company.SMS.Repo.*;
import com.Company.SMS.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Service
public class TeacherService {

    @Autowired
    TeacherRepo teacherRepo;
    @Autowired
    CourseRepo courseRepo;
    @Autowired
    RoleRepo roleRepo;
    @Autowired
    GradeRepo gradeRepo;
    @Autowired
    UserRepo userRepo;
    @Autowired
    TermRepo termRepo;

    public Long sumOfTeachers(){
        return teacherRepo.count();
    }



    @Transactional
    public TeacherRES addTeacher(TeacherREQ req) {
        Role role = roleRepo.findById(req.getRole())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        Grade grade = gradeRepo.findById(req.getGradeId())
                .orElseThrow(() -> new RuntimeException("Grade not found"));
        Term term = termRepo.findById(req.getTermId())
                .orElseThrow(() -> new RuntimeException("term not found"));

        User user = new User();

        user.setFirstName(req.getFirstName());
        user.setFirstNameInArabic(req.getFirstNameAnArabic());
        user.setLastName(req.getLastName());
        user.setLastNameInArabic(req.getLastNameAnArabic());
        user.setNationalNumber(req.getNationalId());
        user.setEmail(req.getEmail());
        user.setPassword(req.getPassword());
        user.setAddress(req.getAddress());
        user.setGender(req.getGender());
        user.setNationality(req.getNationality());
        user.setBirthDate(req.getBirthDate());
        user.setRole(role);
        user.setIsDeleted(req.isDeleted());
        user.setReligion(req.getReligion());

        Teacher teacher = new Teacher();

        teacher.setUser(user);
        teacher.setEducation(req.getEducation());
        teacher.setEmploymentHistory(req.getEmployeeHistory());
        teacher.setNumberOfYearsOfExperience(req.getNumberYearsOfExperience());

        Course course = new Course();
        course.setTeacher(teacher);
        course.setCourseName(req.getSubject());
        course.setCourseType(req.getSubjectType());
        course.setDescription(req.getSubjectDescription());
        course.setGrade(grade);
        course.setTerm(term);
        course.setMaterials(req.getMaterials());

        teacherRepo.save(teacher);
        courseRepo.save(course);
        return new TeacherRES(
                teacher.getId(),
                user.getFirstName(),
                user.getEmail(),
                user.getPassword(),
                user.getRole().getId(),
                course.getCourseName(),
                user.getIsDeleted()
        );

    }

    public List<Course> Profile(Long id){
        System.out.println("proffffffff");
        return courseRepo.findByTeacher_User_UserId(id);
    }




}
