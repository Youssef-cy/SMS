package com.Company.SMS.Service;

import lombok.extern.slf4j.Slf4j;
import com.Company.SMS.DTO.Teacher.TeacherREQ;
import com.Company.SMS.DTO.Teacher.TeacherRES;
import com.Company.SMS.Repo.*;
import com.Company.SMS.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
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
                user.getRole().getRoleName(),
                course.getCourseName(),
                user.getIsDeleted()
        );

    }

    @Transactional
    public TeacherRES updateTeacher(Long id, TeacherREQ req) {
        Teacher teacher = teacherRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));
        User user = teacher.getUser();
        
        Role role = roleRepo.findById(req.getRole())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        Grade grade = gradeRepo.findById(req.getGradeId())
                .orElseThrow(() -> new RuntimeException("Grade not found"));
        Term term = termRepo.findById(req.getTermId())
                .orElseThrow(() -> new RuntimeException("term not found"));

        user.setFirstName(req.getFirstName());
        user.setFirstNameInArabic(req.getFirstNameAnArabic());
        user.setLastName(req.getLastName());
        user.setLastNameInArabic(req.getLastNameAnArabic());
        user.setNationalNumber(req.getNationalId());
        user.setEmail(req.getEmail());
        if (req.getPassword() != null && !req.getPassword().trim().isEmpty()) {
            user.setPassword(req.getPassword());
        }
        user.setAddress(req.getAddress());
        user.setGender(req.getGender());
        user.setNationality(req.getNationality());
        user.setBirthDate(req.getBirthDate());
        user.setRole(role);
        user.setIsDeleted(req.isDeleted());
        user.setReligion(req.getReligion());

        teacher.setEducation(req.getEducation());
        teacher.setEmploymentHistory(req.getEmployeeHistory());
        teacher.setNumberOfYearsOfExperience(req.getNumberYearsOfExperience());

        // Update existing course for this teacher
        List<Course> courses = courseRepo.findByTeacher_User_UserId(user.getUserId());
        Course course;
        if (!courses.isEmpty()) {
            course = courses.get(0);
        } else {
            course = new Course();
            course.setTeacher(teacher);
        }
        course.setCourseName(req.getSubject());
        course.setCourseType(req.getSubjectType());
        course.setDescription(req.getSubjectDescription());
        course.setGrade(grade);
        course.setTerm(term);
        course.setMaterials(req.getMaterials());

        userRepo.save(user);
        teacherRepo.save(teacher);
        courseRepo.save(course);

        return new TeacherRES(
                teacher.getId(),
                user.getFirstName(),
                user.getEmail(),
                user.getPassword(),
                user.getRole().getRoleName(),
                course.getCourseName(),
                user.getIsDeleted()
        );
    }

    public List<Course> Profile(Long id){
        log.info("Fetching profile for teacher user ID: {}", id);
        return courseRepo.findByTeacher_User_UserId(id);
    }




}

