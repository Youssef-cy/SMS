package com.Company.SMS.Controller;

import com.Company.SMS.DTO.notifacation.NotificationREQ;
import com.Company.SMS.DTO.notifacation.NotificationRES;
import com.Company.SMS.Service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/API/Notification")
public class NotificationController {
    @Autowired
    NotificationService notificationService;
    @PostMapping
    public ResponseEntity<NotificationRES> createNotification(@RequestBody NotificationREQ notification){
        NotificationRES response = notificationService.createNotification(notification);
        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    @GetMapping
    public ResponseEntity<List<NotificationRES>> getAllNotifications(){
        List<NotificationRES> List = notificationService.getNotifications();
        return new ResponseEntity<>(List , HttpStatus.OK);
    }

}
