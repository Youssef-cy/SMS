package com.Company.SMS.DTO.Report;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReportRES {

    private Long id;
    private String firstName;
    private String content;
    private String fileLink;
    private LocalDate creationDate;
    private Long sendTo;


}
