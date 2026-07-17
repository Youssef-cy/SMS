package com.Company.SMS.Repo;

import com.Company.SMS.DTO.Exam.ExamRES;
import com.Company.SMS.entities.ExamTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface ExamRepo extends JpaRepository<ExamTable,Long> {
    @Query("""
select new com.Company.SMS.DTO.Exam.ExamRES(
     e.id,
     e.courseName,
     e.duration,
     e.grade.name,
     e.location,
     e.examDate,
     e.examTime,
     e.status,
     e.examType
)
from ExamTable e
order by e.grade.name, e.examDate
""")
    List<ExamRES> allExams();

    @Query("""
select new com.Company.SMS.DTO.Exam.ExamRES(
     e.id,
     e.courseName,
     e.duration,
     e.grade.name,
     e.location,
     e.examDate,
     e.examTime,
     e.status,
     e.examType
)
from ExamTable e
where e.examDate between :startDate and :endDate
order by e.examDate
""")
    List<ExamRES> getExamsThisWeek(LocalDate startDate, LocalDate endDate);


}

