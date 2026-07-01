package com.Company.SMS.Service;

import com.Company.SMS.DTO.Student.StudentRES;
import com.Company.SMS.Repo.AttendanceRepo;
import com.Company.SMS.entities.Attendance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AttendanceService {
    @Autowired
    AttendanceRepo attendanceRepo;

    public List<Attendance> getTodayAbsence() {
        int dayOfWeek = LocalDate.now().getDayOfWeek().getValue();

        return attendanceRepo.getTodayAbsence(dayOfWeek);
    }

    public double getAttendanceStats(){
       return attendanceRepo.getAttendanceStats();

    }

}
