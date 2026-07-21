package com.Company.SMS.Repo;

import com.Company.SMS.DTO.Grades.GradeRES;
import com.Company.SMS.entities.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GradeRepo extends JpaRepository<Grade, Long> {

    @Query("""

            select new com.Company.SMS.DTO.Grades.GradeRES(
                g.id,
                g.name,
                g.year,
                t.name

            )from Grade g
            join g.terms t

            """)
    List<GradeRES> findAllGrade();
}
