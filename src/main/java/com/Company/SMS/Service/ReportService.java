package com.Company.SMS.Service;

import com.Company.SMS.DTO.Report.ReportRES;
import com.Company.SMS.Repo.ReportRepo;
import com.Company.SMS.entities.Report;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {

    @Autowired
    ReportRepo reportRepo;

    public List<ReportRES> findAll() {
        return reportRepo.findAllReports();
    }

}
