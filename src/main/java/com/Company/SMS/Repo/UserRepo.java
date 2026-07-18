package com.Company.SMS.Repo;

import com.Company.SMS.DTO.User.UserResPost;
import com.Company.SMS.DTO.User.WorkerInfo;
import com.Company.SMS.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u JOIN FETCH u.role WHERE u.email = :email")
    Optional<User> findByEmail(@Param("email") String email);
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


    @Query("""
select new com.Company.SMS.DTO.User.WorkerInfo(
    u.firstName,
    u.firstNameInArabic,
    u.lastName,
    u.lastNameInArabic,
    u.nationalNumber,
    u.email,
    u.password,
    u.address,
    u.gender,
    u.nationality,
    u.birthDate,
    u.role.id,
    u.isDeleted,
    u.religion
)
from User u
where u.userId = :UserId
""")
    WorkerInfo getWorkerInfo(@Param("UserId") Long userId);


//    count all employees

    @Query("""
SELECT COUNT(u)
FROM User u
WHERE u.role.id IN (1, 2)
""")
    Long countEmployees();

    @Query("""
SELECT COUNT(u)
FROM User u
WHERE u.isDeleted = false and u.role.id IN (1, 2)
""")
    Long countActiveUsers();

@Query("""
SELECT COUNT(u)
FROM User u
WHERE u.isDeleted = true and u.role.id IN (1, 2)
""")
    Long countOnLeaveUsers();



}

