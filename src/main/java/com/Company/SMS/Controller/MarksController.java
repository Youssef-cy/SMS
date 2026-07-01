package com.Company.SMS.Controller;


import com.Company.SMS.DTO.Marks.MarksRes;
import com.Company.SMS.Service.MarksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("API/Marks")
public class MarksController {

    @Autowired
    MarksService marksService;

    @GetMapping
    public ResponseEntity<List<MarksRes>> getMarksService() {
        List<MarksRes> Marks = marksService.getMarks();
        return ResponseEntity.ok(Marks);
    }

}
