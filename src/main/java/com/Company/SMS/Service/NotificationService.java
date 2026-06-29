package com.Company.SMS.Service;

import com.Company.SMS.DTO.notifacation.NotificationREQ;
import com.Company.SMS.DTO.notifacation.NotificationRES;
import com.Company.SMS.Repo.NotificationRepo;
import com.Company.SMS.entities.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class NotificationService {

    @Autowired
    NotificationRepo notificationRepo;

    public NotificationRES createNotification(NotificationREQ notification){
        Notification notificationEntity = new Notification();
        notificationEntity.setTitle(notification.getTitle());
        notificationEntity.setBody(notification.getBody());
        notificationEntity.setType(notification.getType());
        notificationEntity.setPriority(notification.getPriority());
        notificationEntity.setSentAt(notification.getSentDate());
        notificationRepo.save(notificationEntity);
        return new NotificationRES(
                notificationEntity.getId(),
                notificationEntity.getTitle(),
                notificationEntity.getBody(),
                notificationEntity.getPriority(),
                notificationEntity.getType(),
                notificationEntity.getSentAt()
        );
    }

    public List<NotificationRES> getNotifications() {

        return notificationRepo.getAllNotifications();

    }

}
