package com.Company.SMS.DTO.notifacation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationREQ {
    private String title;
    private String body;
    private String priority;
    private String type;
    private LocalDate sentDate;

}
