package com.Company.SMS.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@Entity
@Table(name = "USER_NOTIFICATIONS")
@AllArgsConstructor
@NoArgsConstructor
public class UserNotification {
    @EmbeddedId
    private UserNotificationId id;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    
    @JoinColumn(name = "USER_ID", nullable = false)
    private User user;

    @MapsId("notificationId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    
    @JoinColumn(name = "NOTIFICATION_ID", nullable = false)
    private Notification notification;

    @MapsId("sentTo")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    
    @JoinColumn(name = "SENT_TO", nullable = false)
    private User sentTo;


}
