package com.Company.SMS.Controller;

import com.Company.SMS.DTO.Class.ClassREQ;
import com.Company.SMS.DTO.Class.ClassRes;
import com.Company.SMS.Service.ClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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


    @PostMapping
    public void addClass(@RequestBody ClassREQ classreq){
        classService.saveClass(classreq);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateClass(@PathVariable Long id, @RequestBody ClassREQ classreq) {
        classService.updateClass(id, classreq);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClass(@PathVariable Long id) {
        classService.deleteClass(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAllClasses() {
        classService.deleteAllClasses();
        return ResponseEntity.ok().build();
    }


}
