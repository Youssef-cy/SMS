package com.Company.SMS.Controller.EmployeeAndTeacher;

import com.Company.SMS.DTO.User.UserReq;
import com.Company.SMS.DTO.User.UserRes;
import com.Company.SMS.Service.EmployeeService;
import com.Company.SMS.Service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/API/Workers")
public class WorkersController {

    @Autowired
    EmployeeService employeeService;
    @Autowired
    TeacherService teacherService;

    @PostMapping
    public ResponseEntity<UserRes> addEmployee(@RequestBody UserReq user){
        log.info("Adding employee: {}", user);
        UserRes userRes = employeeService.addEmployee(user);
        return ResponseEntity.ok(userRes);
    }

    @PutMapping("/{id}/deactivate")
    public ResponseEntity<Map<String, String>> deactivateEmployee(@PathVariable Long id){
        log.info("Deactivating employee with ID: {}", id);
        employeeService.deactivateEmployee(id);
        return ResponseEntity.ok(
                Map.of("message", "Deactivated")
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserRes> updateEmployee(@PathVariable Long id, @RequestBody UserReq userReq) {
        UserRes updatedUser = employeeService.updateEmployee(id, userReq);
        return ResponseEntity.ok(updatedUser);
    }
}
