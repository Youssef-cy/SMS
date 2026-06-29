package com.Company.SMS.DTO.notifacation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationRES {
    private Long id;
    private String title;
    private String message;
    private String priority;
    private String type;
    private LocalDate sentDate;
}
