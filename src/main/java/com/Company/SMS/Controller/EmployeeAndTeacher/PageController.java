package com.Company.SMS.Controller.EmployeeAndTeacher;

import com.Company.SMS.DTO.Employee.OverDataRES;
import com.Company.SMS.Service.EmployeeService;
import com.Company.SMS.Service.TeacherService;
import com.Company.SMS.entities.Teacher;
import com.Company.SMS.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/API/Employees")
public class PageController {

    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private TeacherService teacherService;


    @GetMapping
    public OverDataRES getEmployeeData(){
        return new  OverDataRES(
                employeeService.countEmployees(),
                employeeService.countActiveUsers(),
                employeeService.countOnLeaveUsers(),
                teacherService.sumOfTeachers(),
                employeeService.allEmployees()
        );
    }

    @GetMapping("/Profile/{id}")
    public ResponseEntity<?> getProfile(@PathVariable Long id){

        User employee = employeeService.profile(id);

        System.out.println(employee);

        if(employee == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        if(employee.getRole().getId() == 2){
            return new ResponseEntity<>(teacherService.Profile(id), HttpStatus.OK);
        }

        return new ResponseEntity<>(employee ,  HttpStatus.OK);

    }

}
