package com.Company.SMS.Controller;

import com.Company.SMS.DTO.Class.ClassRes;
import com.Company.SMS.Service.ClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/API/Class")
public class ClassController {
    @Autowired
    ClassService classService;

    @GetMapping
    public ResponseEntity<List<ClassRes>> allClass(){
        List<ClassRes> List = classService.findAllClass();
        return ResponseEntity.ok(List);
    }

}
