package com.Company.SMS.Repo;

import com.Company.SMS.DTO.User.UserRes;
import com.Company.SMS.DTO.User.UserResPost;
import com.Company.SMS.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    @Query("""
SELECT new com.Company.SMS.DTO.User.UserResPost(
    u.userId,
    u.firstName,
    u.email,
    u.password,
    u.role.roleName,
    u.isDeleted,
    c.courseName
)
FROM User u
LEFT JOIN Teacher t ON t.user = u
LEFT JOIN Course c ON c.teacher = t
""")
    List<UserResPost> findAllUsers();
}
