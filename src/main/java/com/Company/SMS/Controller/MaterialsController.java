package com.Company.SMS.Controller;


import com.Company.SMS.DTO.material.MaterialRes;
import com.Company.SMS.Service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/API/Materials")
public class MaterialsController {

    @Autowired
    MaterialService materialService;

    @GetMapping
    public ResponseEntity<List<MaterialRes>> findAllMaterials(){
        List<MaterialRes> list = materialService.findAllMaterials();
        return ResponseEntity.ok(list);
    }

    @PutMapping("/{courseId}")
    public ResponseEntity<String> updateMaterial(@PathVariable Long courseId, @RequestBody String material) {
        materialService.updateCourseMaterial(courseId, material);
        return ResponseEntity.ok("Material updated successfully");
    }
}
