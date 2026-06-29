package com.Company.SMS.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@EqualsAndHashCode
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class UserNotificationId implements Serializable {
    private static final long serialVersionUID = 1L;

    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "USER_ID", nullable = false)
    private Long userId;

    @NotNull
    @Column(name = "NOTIFICATION_ID", nullable = false)
    private Long notificationId;

    @NotNull
    @Column(name = "SENT_TO", nullable = false)
    private Long sentTo;
}
