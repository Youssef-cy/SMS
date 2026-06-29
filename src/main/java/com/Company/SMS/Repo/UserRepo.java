package com.Company.SMS.Repo;

import com.Company.SMS.DTO.User.UserRes;
import com.Company.SMS.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    @Query("""
        select new com.Company.SMS.DTO.User.UserRes(
            u.userId,
            u.firstName,
            u.email,
            u.password,
            u.role.id,
            u.isDeleted
            
        )from User u 
""")
     List<UserRes> findAllUsers();
}
