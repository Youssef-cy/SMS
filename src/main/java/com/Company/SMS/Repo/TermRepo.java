package com.Company.SMS.Repo;

import com.Company.SMS.entities.Term;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TermRepo extends JpaRepository<Term, Long> {
}
