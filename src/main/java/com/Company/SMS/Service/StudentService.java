package com.Company.SMS.Service;

import com.Company.SMS.DTO.Student.StudentRES;
import com.Company.SMS.DTO.Student.TopStudentRES;
import com.Company.SMS.Repo.AttendanceRepo;
import com.Company.SMS.Repo.MarkRepo;
import com.Company.SMS.Repo.StudentRepo;
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
        if (attendanceRepo.getAttendanceStats() != null && !attendanceRepo.getAttendanceStats().isEmpty()){
            return attendanceRepo.getAttendanceStats();
        }
        return Collections.emptyList();
    }


//    top

    public List<TopStudentRES> getTop3StudentsEachGrade() {

        List<TopStudentRES> students = markRepo.getStudentsOrderedByGrade();

        Map<Long, List<TopStudentRES>> map = students.stream()
                .collect(Collectors.groupingBy(TopStudentRES::getGradeId));

        List<TopStudentRES> result = new ArrayList<>();

        for (List<TopStudentRES> list : map.values()) {
            result.addAll(list.stream().limit(3).toList());
        }

        return result;
    }


}
