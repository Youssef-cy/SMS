package com.Company.SMS.Service;

import com.Company.SMS.DTO.Teacher.TeacherREQ;
import com.Company.SMS.DTO.Teacher.TeacherRES;
import com.Company.SMS.DTO.User.UserReq;
import com.Company.SMS.DTO.User.UserRes;
import com.Company.SMS.Repo.UserRepo;
import com.Company.SMS.entities.Course;
import com.Company.SMS.entities.Teacher;
import com.Company.SMS.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Service
public class EmployeeService {
    @Autowired
    UserRepo userRepo;

    public Long sumOfEmployees(){
        return userRepo.count();
    }
    @Transactional
    public UserRes addEmployee(UserReq req) {

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
        user.setRole(req.getRole());
        user.setIsDeleted(req.isDeleted());
        user.setReligion(req.getReligion());
        return new UserRes(
                user.getUserId(),
                user.getFirstName(),
                user.getEmail(),
                user.getPassword(),
                user.getRole().getId(),
                user.getIsDeleted()
        );

    }

    public List<UserRes> allEmployees(){
        if(userRepo.findAllUsers() != null && userRepo.findAllUsers().isEmpty()){
            return userRepo.findAllUsers();
        }
        return Collections.emptyList();
    }


}
