package com.Company.SMS.Controller;

import com.Company.SMS.DTO.User.UserReq;
import com.Company.SMS.DTO.User.UserRes;
import com.Company.SMS.DTO.User.UserResPost;
import com.Company.SMS.Service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/API/Employee")
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;
    @GetMapping
    public List<UserResPost> getEmployees(){
        System.out.println(employeeService.allEmployees());
        return employeeService.allEmployees();
    }

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
