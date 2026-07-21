package com.Company.SMS.Repo;

import com.Company.SMS.DTO.Role.RoleRES;
import com.Company.SMS.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleRepo extends JpaRepository<Role, Long> {
    @Query("""
            SELECT  new com.Company.SMS.DTO.Role.RoleRES(
                R.id,
                R.roleName
            )from Role R
            """)
    List<RoleRES> findAllRole();
}
