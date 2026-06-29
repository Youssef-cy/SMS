package com.Company.SMS.Controller;


import com.Company.SMS.DTO.Session.SessionRES;
import com.Company.SMS.DTO.material.MaterialRes;
import com.Company.SMS.Service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/API/Materials")
public class MaterialsController {

    @Autowired
    MaterialService materialService;

    @GetMapping
    public ResponseEntity< List<MaterialRes>> findAllMaterials(){
        List<MaterialRes> list = materialService.findAllMaterials();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/course")
    public ResponseEntity<List<MaterialRes>> findMaterialsByCourseName(
            @RequestParam String courseName) {

        List<MaterialRes> list = materialService.findMaterialsByCourseName(courseName);
        return ResponseEntity.ok(list);
    }
}
