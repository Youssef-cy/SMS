package com.Company.SMS.Controller;

import com.Company.SMS.DTO.Class.ClassRes;
import com.Company.SMS.DTO.Session.SessionREQ;
import com.Company.SMS.DTO.Session.SessionRES;
import com.Company.SMS.DTO.Session.TeacherListRES;
import com.Company.SMS.Service.ClassService;
import com.Company.SMS.Service.SessionsService;
import com.Company.SMS.entities.Class;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/API/Sessions")
@CrossOrigin("*")
public class SessionController {

    @Autowired
    private SessionsService sessions;
    @Autowired
    private ClassService classes;
    // ========================= GET ALL SESSIONS =========================
    @GetMapping("/")
    public ResponseEntity<List<SessionRES>> getAllSessions(
            @RequestParam Long classId) {

        List<SessionRES> list = sessions.allSessions(classId);
        return ResponseEntity.ok(list);
    }

    // ========================= GET TEACHERS =========================
    @GetMapping("/Teachers")
    public ResponseEntity<List<TeacherListRES>> getAllTeacherList() {

        List<TeacherListRES> teachers = sessions.AllTeacherList();
        return ResponseEntity.ok(teachers);
    }

    // ========================= ADD SESSION =========================
    @PostMapping("/Add")
    public ResponseEntity<SessionRES> addSession(
            @RequestBody SessionREQ request) {

        SessionRES response = sessions.addSession(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    @GetMapping("/Class")
    public List<ClassRes> getAllClasses() {
    return classes.findAllClass();
    }

}