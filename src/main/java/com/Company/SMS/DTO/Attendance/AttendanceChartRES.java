package com.Company.SMS.DTO.Attendance;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AttendanceChartRES {

    private Long dayOfWeek;
    private Long absentCount;

}
