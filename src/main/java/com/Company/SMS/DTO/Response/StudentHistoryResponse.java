package com.Company.SMS.DTO.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentHistoryResponse {
    private Double attendanceRate;
    private Long recordedDays;
    private Stats stats;
    private List<StudentHistoryDay> historyDays;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Stats {
        private Integer present;
        private Integer absent;
        private Integer late;
        private Integer excused;
    }
}

