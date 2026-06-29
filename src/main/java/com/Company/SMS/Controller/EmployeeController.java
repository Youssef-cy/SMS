package com.Company.SMS.Controller;

import com.Company.SMS.DTO.User.UserReq;
import com.Company.SMS.DTO.User.UserRes;
import com.Company.SMS.Service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/API/Employee")
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;
    @GetMapping("/")
    public List<UserRes> getEmployees(){
        return employeeService.allEmployees();
    }

    @PostMapping("/Add")
    public ResponseEntity<UserRes> addEmployee(@RequestBody UserReq user){
        UserRes userRes = employeeService.addEmployee(user);
        return ResponseEntity.ok(userRes);
    }

}
