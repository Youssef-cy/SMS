package com.Company.SMS.Service;

import com.Company.SMS.DTO.Marks.MarksRes;
import com.Company.SMS.DTO.Student.TopStudentRES;
import com.Company.SMS.Repo.MarkRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarksService {


    @Autowired
    MarkRepo markRepo;


   public List<MarksRes> getMarks(){
       return  markRepo.getStudentsOrderedByGrade();
   }

}
