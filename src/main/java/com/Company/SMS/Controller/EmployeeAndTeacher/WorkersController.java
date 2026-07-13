package com.Company.SMS.Controller.EmployeeAndTeacher;

import com.Company.SMS.DTO.User.UserReq;
import com.Company.SMS.DTO.User.UserRes;
import com.Company.SMS.Service.EmployeeService;
import com.Company.SMS.Service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/API/Workers")
public class WorkersController {

    @Autowired
    EmployeeService employeeService;
    @Autowired
    TeacherService teacherService;

    @PostMapping
    public ResponseEntity<UserRes> addEmployee(@RequestBody UserReq user){
        System.out.println(user);
        UserRes userRes = employeeService.addEmployee(user);
        return ResponseEntity.ok(userRes);
    }

    @PutMapping("/{id}/deactivate")
    public ResponseEntity<Map<String, String>> deactivateEmployee(@PathVariable Long id){
        System.out.println(id);
        employeeService.deactivateEmployee(id);
        return ResponseEntity.ok(
                Map.of("message", "Deactivated")
        );
    }



}
