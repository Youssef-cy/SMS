package com.Company.SMS.Service;

import com.Company.SMS.DTO.Student.StudentRES;
import com.Company.SMS.DTO.Student.TopStudentRES;
import com.Company.SMS.Repo.AttendanceRepo;
import com.Company.SMS.Repo.MarkRepo;
import com.Company.SMS.Repo.StudentRepo;
import com.Company.SMS.entities.Attendance;
import com.Company.SMS.entities.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class StudentService {
    @Autowired
    StudentRepo studentRepo;
    @Autowired
    AttendanceRepo attendanceRepo;
    @Autowired
    MarkRepo markRepo;

    public long sumOfStudent(){
        return studentRepo.count();
    }

    public List<StudentRES> students(){
        return studentRepo.allStudents();

    }



}
