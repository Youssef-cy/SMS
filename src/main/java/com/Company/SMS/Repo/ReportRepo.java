package com.Company.SMS.Repo;

import com.Company.SMS.DTO.Report.ReportRES;
import com.Company.SMS.entities.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ReportRepo extends JpaRepository<Report,Long> {
@Query("""

select new com.Company.SMS.DTO.Report.ReportRES(
r.id,
r.user.firstName,
r.content,
r.fileLink,
r.createdAt,
r.sentTo.userId,
r.user.role.roleName,
r.reportType

)from Report r

""")
    List<ReportRES> findAllReports ();

}
