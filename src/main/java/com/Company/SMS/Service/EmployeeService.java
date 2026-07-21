package com.Company.SMS.Service;

import lombok.extern.slf4j.Slf4j;
import com.Company.SMS.DTO.Teacher.TeacherRES;
import com.Company.SMS.DTO.User.UserReq;
import com.Company.SMS.DTO.User.UserRes;
import com.Company.SMS.DTO.User.UserResPost;
import com.Company.SMS.Repo.RoleRepo;
import com.Company.SMS.Repo.TeacherRepo;
import com.Company.SMS.Repo.UserRepo;
import com.Company.SMS.entities.Role;
import com.Company.SMS.entities.Teacher;
import com.Company.SMS.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Slf4j
@Service
public class EmployeeService {
    @Autowired
    UserRepo userRepo;
    @Autowired
    RoleRepo roleRepo;
    @Autowired
    TeacherRepo teacherRepo;

    @Autowired
    EmailAndPasswordService emailAndPasswordService;
    @Autowired
    org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @Transactional
    public UserRes addEmployee(UserReq req) {
        log.info("Adding employee with role ID: {}", req.getRole());
        Role role = roleRepo.findById(req.getRole())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        User user = new User();

        user.setFirstName(req.getFirstName());
        user.setFirstNameInArabic(req.getFirstNameAnArabic());
        user.setLastName(req.getLastName());
        user.setLastNameInArabic(req.getLastNameAnArabic());
        user.setNationalNumber(req.getNationalId());
        user.setEmail(req.getEmail());
        
        String rawPassword = emailAndPasswordService.generatePassword();
        user.setPassword(passwordEncoder.encode(rawPassword));
        
        user.setAddress(req.getAddress());
        user.setGender(req.getGender());
        user.setNationality(req.getNationality());
        user.setBirthDate(req.getBirthDate());
        user.setRole(role);
        user.setIsDeleted(req.isDeleted());
        user.setReligion(req.getReligion());

        user = userRepo.save(user);

        emailAndPasswordService.sendPasswordEmail(rawPassword, user.getEmail());

        return new UserRes(
                user.getUserId(),
                user.getFirstName(),
                user.getEmail(),
                user.getPassword(),
                user.getRole().getRoleName(),
                user.getIsDeleted());
    }

    @Transactional
    public UserRes updateEmployee(Long id, UserReq req) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Role role = roleRepo.findById(req.getRole())
                .orElseThrow(() -> new RuntimeException("Role not found"));

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

        user = userRepo.save(user);

        return new UserRes(
                user.getUserId(),
                user.getFirstName(),
                user.getEmail(),
                user.getPassword(),
                user.getRole().getRoleName(),
                user.getIsDeleted());
    }

    public List<UserResPost> allEmployees() {
        return userRepo.findAllEmployees();

    }

    public void deactivateEmployee(Long id) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setIsDeleted(!user.getIsDeleted());
        userRepo.save(user);

    }

    public Long countEmployees() {
        return userRepo.countEmployees();
    }

    public Long countActiveUsers() {
        return userRepo.countActiveUsers();
    }

    public Long countOnLeaveUsers() {
        return userRepo.countOnLeaveUsers();
    }

    public User profile(Long id) {

        return userRepo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

    }

}
