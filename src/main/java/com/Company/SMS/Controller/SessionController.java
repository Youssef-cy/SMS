package com.Company.SMS.Controller; import com.Company.SMS.DTO.Session.SessionREQ;
import com.Company.SMS.DTO.Session.SessionRES;
import com.Company.SMS.DTO.Session.TeacherListRES;
import com.Company.SMS.Service.SessionsService; import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/API/Sessions")
public class SessionController {

    @Autowired
    private SessionsService sessions;

    @GetMapping("/")
    public ResponseEntity<List<SessionRES>> getAllSessions(
            @RequestParam Long courseId) {
        List<SessionRES> list = sessions.allSessions(courseId);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/Teachers")
    public ResponseEntity<List<TeacherListRES>> getAllTeacherList() {
        List<TeacherListRES> Teachers = sessions.AllTeacherList();
        return ResponseEntity.ok(Teachers);
    }

    @PostMapping("/Add")
    public ResponseEntity<SessionRES> addSession(@RequestBody SessionREQ request) {
        SessionRES response = sessions.addSession(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

}