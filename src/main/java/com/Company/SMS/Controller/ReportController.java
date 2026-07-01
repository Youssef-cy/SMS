package com.Company.SMS.Controller;

import com.Company.SMS.DTO.Report.ReportRES;
import com.Company.SMS.Service.ReportService;
import com.Company.SMS.entities.Report;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("API/Report")
public class ReportController {

    @Autowired
    ReportService reportService;

    @GetMapping
    public List<ReportRES> findAll() {
        return reportService.findAll();
    }

}
