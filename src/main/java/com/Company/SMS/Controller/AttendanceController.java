package com.Company.SMS.Controller;


import com.Company.SMS.DTO.Request.SaveAttendanceRequest;
import com.Company.SMS.DTO.Response.AttendanceGridResponse;
import com.Company.SMS.DTO.Response.ClassResponse;
import com.Company.SMS.DTO.Response.StudentHistoryResponse;
import com.Company.SMS.Service.AttendanceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/attendance")
@CrossOrigin("*")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @GetMapping("/classes")
    public ResponseEntity<List<ClassResponse>> getAllClasses() {
        return ResponseEntity.ok(attendanceService.getAllClasses());
    }

    @GetMapping("/grid")
    public ResponseEntity<AttendanceGridResponse> getAttendanceGrid(
            @RequestParam Long classId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        return ResponseEntity.ok(attendanceService.getAttendanceGrid(classId, date));
    }

    @PutMapping
    public ResponseEntity<AttendanceGridResponse> saveAttendance(
            @RequestBody @Valid SaveAttendanceRequest request
    ) {
        return ResponseEntity.ok(attendanceService.saveAttendance(request));
    }

    @GetMapping("/today-count")
    public ResponseEntity<Double> getTodayAttendance() {
        return ResponseEntity.ok(attendanceService.getTodayAttendance());
    }

    @GetMapping("/weekly-counts")
    public ResponseEntity<List<Long>> getWeeklyAttendanceCounts(
            @RequestParam(defaultValue = "8") int weeks
    ) {
        return ResponseEntity.ok(attendanceService.getWeeklyAttendanceCounts(weeks));
    }

    @GetMapping("/weekly-labels")
    public ResponseEntity<List<String>> getWeeklyLabels(
            @RequestParam(defaultValue = "8") int weeks
    ) {
        return ResponseEntity.ok(attendanceService.getWeeklyLabels(weeks));
    }

    @GetMapping("/absence-by-grade")
    public ResponseEntity<List<Object[]>> getAbsenceByGrade() {
        return ResponseEntity.ok(attendanceService.getAbsenceByGrade());
    }

    @GetMapping("/student/{studentId}/history")
    public ResponseEntity<StudentHistoryResponse> getStudentHistory(
            @PathVariable Long studentId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(attendanceService.getStudentHistory(studentId, date));
    }
}
