package com.Company.SMS.Repo;

import com.Company.SMS.DTO.notifacation.NotificationRES;
import com.Company.SMS.entities.Notification;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepo extends CrudRepository<Notification, Long> {
    @Query("""
SELECT new com.Company.SMS.DTO.notifacation.NotificationRES(
    n.id,
    n.title,
    n.body,
    n.priority,
    n.type,
    n.sentAt
)
FROM Notification n
""")
    List<NotificationRES> getAllNotifications();
}
