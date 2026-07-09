package com.Company.SMS.Repo;

import com.Company.SMS.DTO.Class.ClassRes;
import com.Company.SMS.entities.Class;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassRepo extends JpaRepository<Class,Long> {
@Query("""
        SELECT new com.Company.SMS.DTO.Class.ClassRes(
        cl.id,
        cl.name,
        cl.grade.name,
        t.name

        )FROM Class cl
        JOIN cl.grade g
        JOIN g.terms t
""")
List<ClassRes> findAllClassRes();
}
