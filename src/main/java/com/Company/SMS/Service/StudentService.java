package com.Company.SMS.Service;

import com.Company.SMS.DTO.Student.StudentInfoProfileRES;
import com.Company.SMS.DTO.Student.StudentRES;
import com.Company.SMS.Repo.AttendanceRepo;
import com.Company.SMS.Repo.MarkRepo;
import com.Company.SMS.Repo.StudentRepo;
import com.Company.SMS.entities.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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


    public StudentInfoProfileRES profile(Long id){
        return studentRepo.getProfile(id);
    }



}

