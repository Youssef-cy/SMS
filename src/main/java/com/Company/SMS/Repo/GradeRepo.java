package com.Company.SMS.Repo;

import com.Company.SMS.entities.Grade;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GradeRepo extends JpaRepository<Grade,Long> {
}
