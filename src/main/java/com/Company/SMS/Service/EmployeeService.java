package com.Company.SMS.Service;

import com.Company.SMS.DTO.Teacher.TeacherInfo;
import com.Company.SMS.DTO.Teacher.TeacherREQ;
import com.Company.SMS.DTO.Teacher.TeacherRES;
import com.Company.SMS.DTO.User.UserReq;
import com.Company.SMS.DTO.User.UserRes;
import com.Company.SMS.DTO.User.UserResPost;
import com.Company.SMS.DTO.User.WorkerInfo;
import com.Company.SMS.Repo.RoleRepo;
import com.Company.SMS.Repo.TeacherRepo;
import com.Company.SMS.Repo.UserRepo;
import com.Company.SMS.entities.Course;
import com.Company.SMS.entities.Role;
import com.Company.SMS.entities.Teacher;
import com.Company.SMS.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;

@Service
public class EmployeeService {
    @Autowired
    UserRepo userRepo;
    @Autowired
    RoleRepo roleRepo;
    @Autowired
    TeacherRepo teacherRepo;

    public Long sumOfEmployees(){
        return userRepo.count();
    }
    @Transactional
    public UserRes addEmployee(UserReq req) {
        System.out.println(req.getRole());
        Role role = roleRepo.findById(req.getRole())
                .orElseThrow(() -> new RuntimeException("Role not found"));

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

        user = userRepo.save(user);

        return new UserRes(
                user.getUserId(),
                user.getFirstName(),
                user.getEmail(),
                user.getPassword(),
                user.getRole().getRoleName(),
                user.getIsDeleted()

        );
    }
    public List<UserResPost> allEmployees(){
            return userRepo.findAllUsers();

    }


    public void deactivateEmployee(Long id){
    User user = userRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));
    user.setIsDeleted(!user.getIsDeleted());
    userRepo.save(user);

    }




}
