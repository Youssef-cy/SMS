package com.Company.SMS;

import com.Company.SMS.DTO.Exam.ExamRES;
import com.Company.SMS.Repo.ExamRepo;
import com.Company.SMS.Service.ExamService;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.test.context.ActiveProfiles;
import jakarta.persistence.EntityManager;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;

@SpringBootTest
public class ExamServiceTest {

    private static final Logger logger = LoggerFactory.getLogger(ExamServiceTest.class);

    @Autowired
    private ExamService examService;

    @Autowired
    private ExamRepo examRepo;
    
    @Autowired
    private EntityManager entityManager;

    @Test
    @Transactional
    public void testExamScenarios() {
        logger.info("Starting Exam Service Scenarios Test...");
        LocalDate today = LocalDate.now();
        LocalDate startOfWeek = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.SATURDAY));
        LocalDate endOfWeek = startOfWeek.plusDays(6);
        
        logger.info("Testing Scenario: Existing DB State");
        List<ExamRES> currentExams = examService.getExamForThisWeek();
        logger.info("Current Exams this week returned: {}", currentExams.size());

        // We can execute manual SQL inserts to bypass JPA constraints for quick testing
        entityManager.createNativeQuery("DELETE FROM EXAMS_TABLE").executeUpdate();

        // 1. No exams this week
        logger.info("--- Scenario: No exams this week ---");
        logger.info("Found: {}", examService.getExamForThisWeek().size());

        // 2. One exam this week
        logger.info("--- Scenario: One exam this week ---");
        insertExam(1L, today);
        logger.info("Found: {}", examService.getExamForThisWeek().size());

        // 3. Multiple exams this week
        logger.info("--- Scenario: Multiple exams this week ---");
        insertExam(2L, today.plusDays(1));
        insertExam(3L, today.plusDays(2));
        logger.info("Found: {}", examService.getExamForThisWeek().size());

        // 4. Exams from previous weeks
        logger.info("--- Scenario: Exams from previous weeks ---");
        insertExam(4L, startOfWeek.minusDays(1));
        insertExam(5L, startOfWeek.minusWeeks(1));
        logger.info("Found (should not include previous week): {}", examService.getExamForThisWeek().size());

        // 5. Exams from next week
        logger.info("--- Scenario: Exams from next week ---");
        insertExam(6L, endOfWeek.plusDays(1));
        insertExam(7L, endOfWeek.plusWeeks(1));
        logger.info("Found (should not include next week): {}", examService.getExamForThisWeek().size());

        // 6. Exams on the first and last day of the current week
        logger.info("--- Scenario: Exams on first and last day ---");
        entityManager.createNativeQuery("DELETE FROM EXAMS_TABLE").executeUpdate();
        insertExam(8L, startOfWeek);
        insertExam(9L, endOfWeek);
        logger.info("Found (should be exactly 2): {}", examService.getExamForThisWeek().size());
        
        // Let's test the BUGGY logic vs the NEW logic
        LocalDate buggyStart = today.with(DayOfWeek.SATURDAY);
        LocalDate buggyEnd = buggyStart.plusDays(6);
        logger.info("Buggy Start: {}, Buggy End: {}", buggyStart, buggyEnd);
        logger.info("Correct Start: {}, Correct End: {}", startOfWeek, endOfWeek);
    }

    private void insertExam(Long id, LocalDate date) {
        String sql = "INSERT INTO EXAMS_TABLE (ID, STUDENT_EXAM_ID, GRADE_ID, DURATION, EXAM_DATE, COURSE_NAME, EXAM_TIME, LOCATION, STATUS, EXAM_TYPE, CREATED_AT) " +
                     "VALUES (" + id + ", 1, 1, 120, DATE '" + date.toString() + "', 'Test Course', TO_DATE('09:00:00', 'HH24:MI:SS'), 'Hall 1', 'Scheduled', 'FINAL', CURRENT_TIMESTAMP)";
        entityManager.createNativeQuery(sql).executeUpdate();
    }
}
